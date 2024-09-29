const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const patientRoutes = require('./routes/patientR');
const Patient = require('./models/Patients');
const Prescription = require('./models/Prescription');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/hackathon', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
})
    .then(() => {
        console.log("Connected to MongoDB");
        sendPatientDataToApp('John Meg');
    })
    .catch(err => console.error("Could not connect to MongoDB:", err));

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use('/api/patients', patientRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

async function sendPatientDataToApp(name) {
    try {
        const patient = await Patient.findOne({ name: new RegExp(name, 'i') });
        if (!patient) {
            console.log("No patient found with that name");
            return;
        }

        const prescriptions = await Prescription.find({ name: { $in: ["Tylenol", "Lithium", "Advil"] } });

        if (prescriptions.length === 0) {
            console.log("No prescriptions found for the specified names");
            return;
        }

        const patientData = patient.toObject();
        patientData.prescriptions = prescriptions;

        console.log("Sending patient and prescription data to App.mjs...");
        await axios.post('http://localhost:3001/process-patient', patientData);
    } catch (err) {
        console.error('Error fetching and sending patient data:', err);
    }
}