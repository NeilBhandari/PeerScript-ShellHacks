import express from 'express';
import bodyParser from 'body-parser';
import { getPatientReport, getPrescriptionRecommendations } from './AI.mjs';
import mongoose from 'mongoose';
import Prescription from '../models/Prescription.js';
import Patient from '../models/Patients.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/hackathon', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
})
    .then(() => console.log("Connected to MongoDB from App.mjs"))
    .catch(err => console.error("Could not connect to MongoDB from App.mjs:", err));

function calculateBSA(weight, height) {
    return Math.sqrt((weight * height) / 3600);
}

function calculateDosage(dosage, bsa) {
    return (bsa * dosage);
}

function applyClarksRule(weight) {
    return (weight / 150) * 10;
}

async function updatePatientPrescriptions(patientId, prescriptions) {
    const prescriptionStrings = prescriptions.map(p =>
        `${p.name} ${p.finalDose.toFixed(2)}mg ${p.frequency} ${p.route}`
    );

    // Pad the array with "None" if less than 3 prescriptions
    while (prescriptionStrings.length < 3) {
        prescriptionStrings.push("None");
    }

    await Patient.findByIdAndUpdate(patientId, {
        prescription1: prescriptionStrings[0],
        prescription2: prescriptionStrings[1],
        prescription3: prescriptionStrings[2]
    });
}

app.post('/process-patient', async (req, res) => {
    const patient = req.body;

    console.log("Received patient data:", patient);

    const bsa = calculateBSA(patient.weight, patient.height);
    console.log("Calculated BSA:", bsa);

    try {
        const finalPrescriptions = patient.prescriptions.map(p => {
            const standardDose = p.dosage;
            let finalDose = calculateDosage(standardDose, bsa);

            if (patient.age < 18) {
                finalDose = applyClarksRule(patient.weight);
            }

            return {
                name: p.name,
                dosage: standardDose,
                frequency: p.frequency,
                route: p.route,
                finalDose: finalDose
            };
        });

        console.log("Calculated Prescriptions with Final Doses:", finalPrescriptions);

        // Update patient's prescriptions in the database
        await updatePatientPrescriptions(patient._id, finalPrescriptions);

        // Fetch updated patient data
        const updatedPatient = await Patient.findById(patient._id);

        const report = await getPatientReport({
            ...updatedPatient.toObject(),
            bsa,
            prescription1: updatedPatient.prescription1,
            prescription2: updatedPatient.prescription2,
            prescription3: updatedPatient.prescription3
        });

        const recommendations = await getPrescriptionRecommendations({
            ...updatedPatient.toObject(),
            prescriptions: finalPrescriptions
        });

        res.json({ report, recommendations });

    } catch (err) {
        console.error('Error processing patient data:', err);
        res.status(500).json({ message: 'Error processing patient data.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});