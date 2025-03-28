import Checkout from '../models/checkout.model.js';
import extend from 'lodash/extend.js';
import errorHandler from './error.controller.js';

const create = async (req, res) => {
  const checkout = new Checkout(req.body);
  try {
    await checkout.save();
    return res.status(200).json({
      message: "Checkout successfully created!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    const checkouts = await Checkout.find()
      .select('checkoutID checkInDate checkInTime particulars quantity amount paymentMethod amountPaid patientID healthCareProviderID healthCareAdminID healthInsuranceProviderID clinicID remarks checkoutStatus createdAt updatedAt status');
    return res.json(checkouts);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const checkoutByID = async (req, res, next, id) => {
  try {
    const checkout = await Checkout.findById(id);
    if (!checkout) return res.status('400').json({
      error: "Checkout not found",
    });
    req.profile = checkout;
    next();
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve checkout",
    });
  }
};

const read = (req, res) => {
  req.profile.updatedAt = undefined;  
  return res.json(req.profile);
};

const update = async (req, res) => {
  try {
    let checkout = req.profile;
    checkout = extend(checkout, req.body);
    checkout.updatedAt = Date.now();
    await checkout.save();
    res.json(checkout);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let checkout = req.profile;
    let deletedCheckout = await checkout.deleteOne();
    res.json(deletedCheckout);
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
    const result = await Checkout.deleteMany({ _id: { $in: ids } });
    return res.status(200).json({
      message: `${result.deletedCount} checkouts successfully deleted!`,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  create,
  checkoutByID,
  read,
  list,
  remove,
  removeMany,
  update,
};
