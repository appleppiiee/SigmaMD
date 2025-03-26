import mongoose from 'mongoose';

const clinicSchema = new mongoose.Schema({
  nameaddress: {
    type: String,
    trim: true,
    required: [true, 'Name and Address are required'],
  },
  mobileNo: {
    type: String,
    trim: true,
    required: [true, 'Mobile number is required'],
  },
  phoneNo: {
    type: String,
    trim: true,
  },
  providerID: {
    type: String,
    required: [true, 'Provider ID is required'],
  },
  adminID: {
    type: String,
    required: [true, 'Admin ID is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  remarks: {
    type: String,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  }
});

clinicSchema.virtual('fullName')
  .get(function() {
    return `${this.nameaddress}`; 
  });

export default mongoose.model('Clinic', clinicSchema);
