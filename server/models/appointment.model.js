import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  patientID: {
    type: String,
    trim: true,
    required: "patientID is required",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  Time: {
    type: Date,
    default: Date.now,
  },
  purpose: {
    type: String,
    trim: true,
  },
  paymentMethod: {
    type: String,
    trim: true,
  },
  healthCareProviderID: {
    type: String,
    trim: true,
  },
  healthCareAdminID: {
    type: String,
    trim: true,
  },
  healthInsuranceProviderID: {
    type: String,
    trim: true,
  },
  clinicID: {
    type: String,
    trim: true,
    required: "clinicID is required",
  },
  remarks: {
    type: String,
    trim: true,
  },
  appointmentStatus: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    trim: true,
    default: "a", //'a' for active, 'i' for inactive
  },
});

export default mongoose.model("Appointment", AppointmentSchema);
