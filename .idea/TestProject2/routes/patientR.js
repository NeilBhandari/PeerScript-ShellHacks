const express = require('express');
const Patient = require('../models/Patients');
const Medicine = require('../models/Prescription');
const router = express.Router();

// Route to add dummy patients
router.post('/add-patient', async (req, res) => {
    const { name, age, weight, height, gender, diagnosis, prescription1,prescription2,prescription3 } = req.body;

    const patient = new Patient({name, age, weight, height, gender, diagnosis, prescription1,prescription2,prescription3});

    try {
        const savedPatient = await patient.save();
        console.log('Patient saved successfully:', savedPatient);  // Log the saved patient to the console
        res.status(200).send(savedPatient);
    } catch (err) {
        console.error('Error while saving patient:', err);  // Log any errors
        res.status(500).send(err);
    }
});


// Route to add dummy medicines
router.post('/add-medicine', async (req, res) => {
    const { name, dosage, frequency } = req.body;

    const medicine = new Medicine({ name, dosage, frequency });

    try {
        const savedMedicine = await medicine.save();
        res.status(200).send(savedMedicine);
    } catch (err) {
        res.status(500).send(err);
    }
});


// Search patients by name
// Search patients by name
// Search patients by name
router.get('/search-patients', async (req, res) => {
    const { name } = req.query;
    try {
        const patients = await Patient.find({ name: new RegExp(name, 'i') });
        if (patients.length === 0) {
            return res.status(404).json({ message: 'No patients found' });
        }

        // Assuming you want to send data for the first patient found
        const patient = patients[0];
        const prescriptions = await Prescription.find({ name: { $in: ["Tylenol", "Lithium", "Advil"] } });
        if (prescriptions.length === 0) {
            console.log("No prescriptions found for the specified names");
        } else {
            const patientData = patient.toObject();
            patientData.prescriptions = prescriptions;

            console.log("Sending patient and prescription data to App.mjs...");
            await axios.post('http://localhost:3001/process-patient', patientData);
        }

        // Process each patient to generate report and recommendations
        const results = await Promise.all(patients.map(async patient => {
            const bsa = calculateBSA(patient.weight, patient.height);
            const report = await getPatientReport({
                ...patient.toObject(),
                bsa,
                prescription1: patient.prescription1,
                prescription2: patient.prescription2,
                prescription3: patient.prescription3
            });

            const prescriptions = [
                { name: patient.prescription1 },
                { name: patient.prescription2 },
                { name: patient.prescription3 }
            ].filter(p => p.name !== "None");

            const recommendations = await getPrescriptionRecommendations({
                ...patient.toObject(),
                prescriptions
            });

            return {
                ...patient.toObject(),
                aiReport: report,
                aiRecommendations: recommendations
            };
        }));

        res.status(200).json(results);
    } catch (err) {
        console.error('Error searching patients:', err);
        res.status(500).json({ message: 'Error searching patients' });
    }
});



// Get patient by ID
router.get('/patients/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).send("Patient not found");
        }
        res.status(200).json(patient);
    } catch (err) {
        res.status(500).send(err);
    }
});




module.exports = router;