const Patient = require('../models/Patient');

// Create a new patient
const createPatient = async (req, res) => {
  try {
    // Check if patientID is already taken
    const existingPatient = await Patient.findOne({ patientID: req.body.patientID });
    if (existingPatient) {
      return res.status(400).json({ message: 'Patient ID already exists' });
    }

    // Create a new patient
    const patient = new Patient(req.body);
    await patient.save();

    // Send the response
    res.status(201).json(patient);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating patient', error: error.message });
  }
};

// Get all patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error: error.message });
  }
};

// Get a patient by ID
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient', error: error.message });
  }
};

// Update a patient by ID
const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient updated successfully', patient });
  } catch (error) {
    res.status(400).json({ message: 'Error updating patient', error: error.message });
  }
};

// Delete a patient by ID
const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting patient', error: error.message });
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient
};