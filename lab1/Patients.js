
const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    patientname: String,
    age: Number,
    gender: String,
    contactnum: String,
    email: String,
    preferred_clinic: String,
    appointment_date: String,
    appointment_time: String,
    reason: String,
    status: String,
    note: String
        
})

const PatientModel = mongoose.model("patients", PatientSchema);

module.exports = PatientModel;
