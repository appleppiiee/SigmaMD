const express = require('express');
const router = express.Router();
const {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient
} = require('../controllers/patientController');

// Create a new patient
router.post('/patients', createPatient);

// Get all patients
router.get('/patients', getAllPatients);

// Get a patient by ID
router.get('/patients/:id', getPatientById);

// Update a patient by ID
router.put('/patients/:id', updatePatient);

// Delete a patient by ID
router.delete('/patients/:id', deletePatient);

module.exports = router;