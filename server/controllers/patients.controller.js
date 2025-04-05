import Patient from '../models/patient.model.js';
import extend from 'lodash/extend.js';
import errorHandler from './error.controller.js';

// Create a new patient
const createPatient = async (req, res) => {
  const patient = new Patient(req.body);
  try {
    await patient.save();
    return res.status(200).json({
      message: "Successfully created!"
    });
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(error)
    });
  }
};

// Get all patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(error)
    });
  }
};

// Get a patient by ID
const getPatientById = async (req, res, next, id) => {
  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(400).json({
        error: "Patient not found"
      });
    }
    req.patient = patient;
    next();
  } catch (error) {
    return res.status(400).json({
      error: "Could not retrieve patient"
    });
  }
};

// Read patient details
const readPatient = (req, res) => {
  return res.json(req.patient);
};

// Update patient by ID
const updatePatient = async (req, res) => {
  try {
    let patient = req.patient;
    patient = extend(patient, req.body);
    patient.updatedAt = Date.now();
    await patient.save();
    res.json(patient);
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(error)
    });
  }
};

// Delete a patient by ID
const deletePatient = async (req, res) => {
  try {
    const patient = req.patient;
    await patient.deleteOne();
    return res.status(200).json({
      message: "Successfully deleted!"
    });
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(error)
    });
  }
};

// New function to remove multiple patients
const removeManyPatients = async (req, res) => {
  const { ids } = req.body; // Assuming IDs are sent in the request body
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({
      error: "Please provide an array of IDs to delete."
    });
  }
  try {
    const result = await Patient.deleteMany({ _id: { $in: ids } });
    return res.status(200).json({
      message: `${result.deletedCount} patients successfully deleted!`
    });
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(error)
    });
  }
};

export default {
  createPatient,
  getPatientById,
  readPatient,
  getAllPatients,
  deletePatient,
  removeManyPatients,
  updatePatient
};
