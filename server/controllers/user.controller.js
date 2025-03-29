import User from "../models/user.model.js";
import _ from "lodash";
const { extend } = _;
import errorHandler from "../controllers/error.controller.js";

// Create a new user (Signup)
const create = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.status(200).json({
      message: "Successfully signed up!"
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

// List all users or filter by fields
const list = async (req, res) => {
  try {
    const {
      type,
      firstName,
      lastName,
      doctorType,
      specialization,
      availability,
      clinicRoomNo,
      status
    } = req.query;

    const query = {};

    if (type) query.userType = type;
    if (firstName) query.firstName = new RegExp(firstName, "i");
    if (lastName) query.lastName = new RegExp(lastName, "i");
    if (doctorType) query.doctorType = new RegExp(doctorType, "i");
    if (specialization) query.specialization = new RegExp(specialization, "i");
    if (availability) query.availability = new RegExp(availability, "i");
    if (clinicRoomNo) query.clinicRoomNo = new RegExp(clinicRoomNo, "i");
    if (status) query.status = new RegExp(status, "i");

    const users = await User.find(query).select("-password -__v");
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

// Read a single user by ID
const read = (req, res) => {
  const user = req.profile;

  if (user.userType === "provider") {
    // Doctor view
    return res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      mobileNo: user.mobileNo,
      phoneNo: user.phoneNo,
      email: user.email,
      doctorType: user.doctorType,
      specialization: user.specialization,
      availability: user.availability,
      clinicRoomNo: user.clinicRoomNo,
      remarks: user.remarks,
      status: user.status
    });
  }

  // Admin or secretary view
  return res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    mobileNo: user.mobileNo,
    phoneNo: user.phoneNo,
    email: user.email,
    userType: user.userType,
    specialization: user.specialization,
    availability: user.availability,
    remarks: user.remarks,
    status: user.status
  });
};

// Update user details (Allow Password Updates)
const update = async (req, res) => {
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updatedAt = new Date();
    await user.save();
    user.password = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

// Delete a user
const remove = async (req, res) => {
  try {
    const user = req.profile;
    await user.deleteOne();
    res.json({ message: "User deleted successfully!" });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

// Bulk delete all users
const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany();
    res.json({ message: "All users deleted successfully!" });
  } catch (err) {
    return res.status(500).json({
      error: "Error deleting all users"
    });
  }
};

// Middleware: Find user by ID
const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id).select("-password -__v");
    if (!user) {
      return res.status(400).json({
        error: "User not found"
      });
    }
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve user"
    });
  }
};

// Named exports and default
export { create, list, read, update, remove, deleteAllUsers, userByID };
export default { create, list, read, update, remove, deleteAllUsers, userByID };