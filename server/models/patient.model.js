const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  middlename: { type: String },
  lastname: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  mobileNo: { type: String, required: true },
  emailAddress: { type: String, required: true },
  address: { type: String, required: true },
  maritalStatus: { type: String, enum: ['Single', 'Married', 'Divorced', 'Widowed'], required: true },
  bloodType: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], required: true },
  remarks: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'a' }
});

// Create the Patient model
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
