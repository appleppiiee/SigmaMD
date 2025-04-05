import express from 'express';
import patientCtrl from '../controllers/patients.controller.js'; // Updated import
const router = express.Router();

// Create a new patient
router.route('/api/patients').post(patientCtrl.createPatient);

// Get all patients
router.route('/api/patients').get(patientCtrl.getAllPatients);

// Delete multiple patients
router.route('/api/patients').delete(patientCtrl.removeManyPatients); // Updated to match controller method

// Middleware to handle the patientId parameter
router.param('patientId', patientCtrl.getPatientById); // Updated to match controller method

// Get a specific patient by ID
router.route('/api/patients/:patientId').get(patientCtrl.readPatient); // Updated to match controller method

// Update a patient by ID
router.route('/api/patients/:patientId').put(patientCtrl.updatePatient);

// Delete a patient by ID
router.route('/api/patients/:patientId').delete(patientCtrl.deletePatient);

export default router;
