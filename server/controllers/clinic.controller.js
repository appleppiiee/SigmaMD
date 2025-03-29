import Clinic from '../models/clinic.model.js';
import extend from 'lodash/extend.js';
import errorHandler from './error.controller.js';

const create = async (req, res) => {
  const clinic = new Clinic(req.body);
  try {
    await clinic.save();
    return res.status(200).json({
      message: "Clinic successfully created!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    const clinics = await Clinic.find().select('nameaddress mobileNo phoneNo providerID adminID createdAt updatedAt remarks status');
    return res.json(clinics);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const clinicByID = async (req, res, next, id) => {
  try {
    const clinic = await Clinic.findById(id);
    if (!clinic) return res.status('400').json({
      error: "Clinic not found",
    });
    req.profile = clinic;
    next();
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve clinic",
    });
  }
};

const read = (req, res) => {
  req.profile.updatedAt = undefined;  
  return res.json(req.profile);
};

const update = async (req, res) => {
  try {
    let clinic = req.profile;
    clinic = extend(clinic, req.body);
    clinic.updatedAt = Date.now();
    await clinic.save();
    res.json(clinic);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let clinic = req.profile;
    let deletedClinic = await clinic.deleteOne();
    res.json(deletedClinic);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const removeMany = async (req, res) => {
  const { ids } = req.body;  
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({
      error: "Please provide an array of IDs to delete.",
    });
  }
  try {
    const result = await Clinic.deleteMany({ _id: { $in: ids } });
    return res.status(200).json({
      message: `${result.deletedCount} clinics successfully deleted!`,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  create,
  clinicByID,
  read,
  list,
  remove,
  removeMany,
  update,
};
