import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    required: 'First name is required',
  },

  middlename: {
    type: String,
    trim: true,
  },

  lastname: {
    type: String,
    trim: true,
    required: 'Last name is required',
  },

  dateOfBirth: {
    type: Date,
    required: 'Date of birth is required',
  },

  mobileNo: {
    type: String,
    required: 'Mobile number is required',
  },

  emailAddress: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required',
  },

  address: {
    type: String,
    required: 'Address is required',
  },

  maritalStatus: {
    type: String,
    enum: ['Single', 'Married', 'Divorced', 'Widowed'],
    required: 'Marital status is required',
  },

  bloodType: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: 'Blood type is required',
  },

  remarks: {
    type: String,
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
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
});

// Export the Patient model
export default mongoose.model('Patient', patientSchema);
