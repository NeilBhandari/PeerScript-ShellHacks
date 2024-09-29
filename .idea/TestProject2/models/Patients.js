//this is the basic schema based on the info on the docs

const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    gender: { type: String, required: true },
    diagnosis: { type: String, required: true },
    prescription1: { type: String, required: true },
    prescription2: { type: String, required: true },
    prescription3: { type: String, required: true }

});

module.exports = mongoose.model('Patient',patientSchema);