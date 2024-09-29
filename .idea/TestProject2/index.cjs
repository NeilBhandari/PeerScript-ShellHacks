const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Groq = require('groq-sdk');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5174',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

mongoose.connect('mongodb://localhost:27017/hackathon', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB:", err));

const PatientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    weight: Number,
    height: Number,
    gender: String,
    diagnosis: String,
    prescription1: String,
    prescription2: String,
    prescription3: String,
});

const Patient = mongoose.model('Patient', PatientSchema);

const PrescriptionSchema = new mongoose.Schema({
    name: String,
    dosage: Number,
    frequency: String,
    route: String,
});

const Prescription = mongoose.model('Prescription', PrescriptionSchema);

const groq = new Groq({ apiKey: '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' });

function calculateBSA(weight, height) {
    return Math.sqrt((weight * height) / 3600);
}

function calculateClarkFormula(weight) {
    return (weight * 4 + 7) / (weight + 90);
}


async function getPatientReport(patient) {
    try {
        console.log('Starting patient report generation...');
        const prompt = `Generate a detailed medical report for the following patient:
        Name: ${patient.name}
        Age: ${patient.age}
        Gender: ${patient.gender}
        Weight: ${patient.weight} kg
        Height: ${patient.height} cm
        BSA: ${patient.bsa.toFixed(2)} m²
        Diagnosis: ${patient.diagnosis}

        Please include the following sections in your report:
        1. Patient Overview
        2. Current Health Status
        3. Treatment Recommendations
        4. Lifestyle Recommendations
        5. Follow-up Plan

        Provide detailed and specific information based on the patient's characteristics and diagnosis.`;

        console.log('Sending request to Groq API...');
        const completion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "mixtral-8x7b-32768",
        });
        console.log('Received response from Groq API');

        return completion.choices[0]?.message?.content || "Unable to generate report";
    } catch (error) {
        console.error('Error generating patient report:', error);
        return "Error generating report: " + error.message;
    }
}

async function getPrescriptionRecommendations(patient) {
    try {
        console.log('Starting prescription recommendations generation...');
        const bsa = calculateBSA(patient.weight, patient.height);
        let prescriptionDetails = '';

        const prescriptions = [patient.prescription1, patient.prescription2, patient.prescription3]
            .filter(p => p && p.trim().length > 0);

        for (const prescriptionName of prescriptions) {
            const prescription = await Prescription.findOne({ name: prescriptionName });
            if (prescription) {
                let dosage = prescription.dosage;
                let finalDosage = dosage * bsa;

                if (patient.age < 18) {
                    const clarkFactor = calculateClarkFormula(patient.weight);
                    finalDosage *= clarkFactor;
                }

                finalDosage = Math.round(finalDosage * 100) / 100; // Round to 2 decimal places

                prescriptionDetails += `${prescription.name} ${dosage} mg/m² ${prescription.frequency} ${prescription.route} Final Dosage: ${finalDosage} mg\n`;
            } else {
                prescriptionDetails += `${prescriptionName}: Prescription details not found in database\n`;
            }
        }

        const prompt = `Given the following patient information and current prescriptions, provide recommendations for optimizing the medication regimen:

        Patient:
        Name: ${patient.name}
        Age: ${patient.age}
        Gender: ${patient.gender}
        Weight: ${patient.weight} kg
        Height: ${patient.height} cm
        BSA: ${bsa.toFixed(2)} m²
        Diagnosis: ${patient.diagnosis}

        Current Prescriptions:
        ${prescriptionDetails}

        Please provide:
        1. An analysis of the current medication regimen
        2. Recommendations for adjusting dosages based on the patient's BSA, if applicable
        3. Suggestions for alternative medications or additional prescriptions, if needed
        4. Potential drug interactions to be aware of
        5. Recommendations for monitoring and follow-up`;

        console.log('Sending request to Groq API...');
        const completion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "mixtral-8x7b-32768",
        });
        console.log('Received response from Groq API');

        const aiRecommendations = completion.choices[0]?.message?.content || "Unable to generate prescription recommendations";

        return prescriptionDetails + "\n\nAI Recommendations:\n" + aiRecommendations;
    } catch (error) {
        console.error('Error generating prescription recommendations:', error);
        return "Error generating recommendations: " + error.message;
    }
}
app.get('/api/search-patient', async (req, res) => {
    const { name } = req.query;
    if (!name || name.trim().length === 0) {
        return res.status(400).json({ message: "Name is required for search" });
    }

    try {
        const nameParts = name.trim().split(/\s+/);
        const regexPattern = nameParts.map(part => `(?=.*\\b${part})`).join('');
        const regex = new RegExp(regexPattern, 'i');

        const patients = await Patient.find({ name: regex }).limit(10);

        if (patients.length === 0) {
            return res.status(404).json({ message: "No patients found" });
        }

        const patientList = patients.map(p => ({
            id: p._id,
            name: p.name,
            age: p.age,
            gender: p.gender
        }));

        res.json({
            message: "Patients found",
            patients: patientList
        });

    } catch (err) {
        console.error('Error searching patient:', err);
        res.status(500).json({ message: 'Error searching patient', error: err.message });
    }
});

app.get('/api/patient/:id', async (req, res) => {
    try {
        console.log(`Fetching patient with ID: ${req.params.id}`);
        const patient = await Patient.findById(req.params.id);

        if (!patient) {
            console.log(`Patient not found with ID: ${req.params.id}`);
            return res.status(404).json({ message: "Patient not found" });
        }
        console.log(`Patient found: ${patient.name}`);

        const bsa = calculateBSA(patient.weight, patient.height);
        console.log(`Calculated BSA: ${bsa}`);

        console.log('Generating patient report...');
        const report = await getPatientReport({ ...patient.toObject(), bsa });
        console.log('Report generated successfully');

        res.json({ patient, report });
    } catch (err) {
        console.error('Error fetching patient:', err);
        res.status(500).json({ message: 'Error fetching patient', error: err.message });
    }
});

app.post('/api/patient/:id/prescriptions', async (req, res) => {
    try {
        const { id } = req.params;
        const { prescription1, prescription2, prescription3 } = req.body;

        // Validate prescriptions
        const prescriptions = [prescription1, prescription2, prescription3].filter(Boolean);
        for (let prescription of prescriptions) {
            const prescriptionExists = await Prescription.findOne({ name: prescription });
            if (!prescriptionExists) {
                return res.status(400).json({ message: `Prescription '${prescription}' not found in database` });
            }
        }

        // Update patient
        const patient = await Patient.findByIdAndUpdate(id,
            { prescription1, prescription2, prescription3 },
            { new: true }
        );

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Generate recommendations
        const recommendations = await getPrescriptionRecommendations(patient);

        res.json({ patient, recommendations });
    } catch (err) {
        console.error('Error updating prescriptions:', err);
        res.status(500).json({ message: 'Error updating prescriptions', error: err.message });
    }
});
app.post('/api/add-patient', async (req, res) => {
    try {
        const { name, age, weight, height, gender, diagnosis, prescription1, prescription2, prescription3 } = req.body;

        // Validate input data
        if (!name || !age || !weight || !height || !gender || !diagnosis) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new patient instance
        const newPatient = new Patient({
            name,
            age,
            weight,
            height,
            gender,
            diagnosis,
            prescription1,
            prescription2,
            prescription3,
        });

        // Save patient to the database
        await newPatient.save();
        res.status(201).json({ message: "Patient added successfully", patient: newPatient });
    } catch (err) {
        console.error('Error adding patient:', err);
        res.status(500).json({ message: 'Error adding patient', error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});