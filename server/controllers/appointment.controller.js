import Appointment from "../models/appointment.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";
const create = async (req, res) => {
  const appointment = new Appointment(req.body);
  try {
    await appointment.save();
    return res.status(200).json({
      message: "Successfully created!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const list = async (req, res) => {
  try {
    let appointments = await Appointment.find().select(
      "patientID date Time purpose paymentMethod healthCareProviderID healthCareAdminID healthInsuranceProviderID clinicID remarks appointmentStatus createdAt updatedAt status"
    );
    res.json(appointments);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const appointmentByID = async (req, res, next, id) => {
  try {
    let appointment = await Appointment.findById(id);
    if (!appointment)
      return res.status("400").json({
        error: "Appointment not found",
      });
    req.appointment = appointment;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve appointment",
    });
  }
};
const read = (req, res) => {
  return res.json(req.appointment);
};
const update = async (req, res) => {
  try {
    let appointment = req.appointment;
    appointment = extend(appointment, req.body);
    appointment.updated = Date.now();
    await appointment.save();
    res.json(appointment);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const remove = async (req, res) => {
  try {
    let appointment = req.appointment;
    let deletedAppointment = await appointment.deleteOne();
    res.json(deletedAppointment);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// New function to remove multiple contacts
const removeMany = async (req, res) => {
  const { ids } = req.body; // Assuming IDs are sent in the request body
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({
      error: "Please provide an array of IDs to delete.",
    });
  }
  try {
    const result = await Appointment.deleteMany({ _id: { $in: ids } });
    return res.status(200).json({
      message: `${result.deletedCount} appointments successfully deleted!`,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// remove all projects
const removeAll = async (req, res) => {
  try {
    const result = await Appointment.deleteMany({});
    return res.status(200).json({
      message: `${result.deletedCount} of all appointments successfully deleted!`,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  create,
  appointmentByID,
  read,
  list,
  remove,
  removeMany,
  update,
  removeAll,
};
