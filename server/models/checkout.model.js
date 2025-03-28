import mongoose from 'mongoose';

const checkoutSchema = new mongoose.Schema({
  checkoutID: {
    type: String,
    required: [true, 'Checkout ID is required'],
  },
  checkInDate: {
    type: Date,
    required: [true, 'Check-in date is required'],
  },
  checkInTime: {
    type: String,
    required: [true, 'Check-in time is required'],
  },
  particulars: {
    type: String,
    required: [true, 'Particulars are required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Credit Card', 'Debit Card'],
    required: [true, 'Payment method is required'],
  },
  amountPaid: {
    type: Number,
    required: [true, 'Amount paid is required'],
  },
  patientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: [true, 'Patient ID is required'],
  },
  healthCareProviderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HealthCareProvider',
    required: [true, 'Health care provider ID is required'],
  },
  healthCareAdminID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HealthCareAdmin',
    required: [true, 'Health care admin ID is required'],
  },
  healthInsuranceProviderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HealthInsuranceProvider',
  },
  clinicID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clinic',
    required: [true, 'Clinic ID is required'],
  },
  remarks: {
    type: String,
  },
  checkoutStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    required: [true, 'Checkout status is required'],
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

checkoutSchema.virtual('fullName')
  .get(function() {
    return `${this.checkoutID} - ${this.patientID}`; 
  });

export default mongoose.model('Checkout', checkoutSchema);
