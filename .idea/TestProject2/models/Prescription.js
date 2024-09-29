const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    //diagnosis: { type: String, required: true },
    dosage: { type: Number, required: true }, // Dosage in mg, for example, idk
    frequency: {type: String, required: true },
    route: {type: String, required: true }
});

module.exports = mongoose.model('Prescription', medicineSchema);