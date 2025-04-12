import React, { useState } from 'react';
import './sigmapanel.css';

const Sigmapanel = () => {
  const [formData, setFormData] = useState({
    patientID: '',
    appointmentID: '',
    providerID: '',
    height: '',
    weight: '',
    bmi: '',
    temperature: '',
    bloodPressure: '',
    pulseRate: '',
    familyHistory: '',
    socialHistory: '',
    allergies: '',
    medication: '',
    diagnosis: '',
    planMedication: '',
    planReferrals: '',
    planFollowUp: '',
    planProcedures: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate required fields from the schema
  const handleValidation = () => {
    const newErrors = {};

    // Required fields from the schema
    if (!formData.patientID.trim()) {
      newErrors.patientID = 'Patient ID is required';
    }
    if (!formData.appointmentID.trim()) {
      newErrors.appointmentID = 'Appointment ID is required';
    }
    if (!formData.providerID.trim()) {
      newErrors.providerID = 'Provider ID is required';
    }
    if (!formData.height.trim()) {
      newErrors.height = 'Height is required';
    }
    if (!formData.weight.trim()) {
      newErrors.weight = 'Weight is required';
    }
    if (!formData.bmi.trim()) {
      newErrors.bmi = 'BMI is required';
    }
    if (!formData.temperature.trim()) {
      newErrors.temperature = 'Temperature is required';
    }
    if (!formData.bloodPressure.trim()) {
      newErrors.bloodPressure = 'Blood Pressure is required';
    }
    if (!formData.pulseRate.trim()) {
      newErrors.pulseRate = 'Pulse Rate is required';
    }
    if (!formData.diagnosis.trim()) {
      newErrors.diagnosis = 'Diagnosis is required';
    }
    if (!formData.notes.trim()) {
      newErrors.notes = 'Additional Notes is required';
    }

    setErrors(newErrors);

    // If no errors, return true
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      // All required fields are filled, you can perform an API call here
      alert('Form submitted successfully!');
      console.log('Submitted Data:', formData);
    }
  };

  return (
    <div className="sigmapanel-container">
      <form onSubmit={handleSubmit} className="sigmapanel-form">
        
        {/* LEFT COLUMN: Vitals + Medical History */}
        <div className="form-section">
          <h2>Vitals</h2>
          <div className="form-group">
            <label>Weight</label>
            <input 
              type="text"
              name="weight"
              placeholder="Enter Weight"
              value={formData.weight}
              onChange={handleChange}
            />
            {errors.weight && <span className="error-text">{errors.weight}</span>}
          </div>

          <div className="form-group">
            <label>Height</label>
            <input 
              type="text"
              name="height"
              placeholder="Enter Height"
              value={formData.height}
              onChange={handleChange}
            />
            {errors.height && <span className="error-text">{errors.height}</span>}
          </div>

          <div className="form-group">
            <label>BMI</label>
            <input
              type="text"
              name="bmi"
              placeholder="Enter BMI"
              value={formData.bmi}
              onChange={handleChange}
            />
            {errors.bmi && <span className="error-text">{errors.bmi}</span>}
          </div>

          <div className="form-group">
            <label>Temperature (Celsius)</label>
            <input
              type="text"
              name="temperature"
              placeholder="Enter Temperature in Celsius"
              value={formData.temperature}
              onChange={handleChange}
            />
            {errors.temperature && <span className="error-text">{errors.temperature}</span>}
          </div>

          <div className="form-group">
            <label>Blood Pressure</label>
            <input
              type="text"
              name="bloodPressure"
              placeholder="Enter Blood Pressure"
              value={formData.bloodPressure}
              onChange={handleChange}
            />
            {errors.bloodPressure && <span className="error-text">{errors.bloodPressure}</span>}
          </div>

          <div className="form-group">
            <label>Pulse Rate</label>
            <input
              type="text"
              name="pulseRate"
              placeholder="Enter Pulse Rate"
              value={formData.pulseRate}
              onChange={handleChange}
            />
            {errors.pulseRate && <span className="error-text">{errors.pulseRate}</span>}
          </div>

          <h2>Medical History</h2>
          <div className="form-group">
            <label>Family History</label>
            <input
              type="text"
              name="familyHistory"
              placeholder="Enter Family History"
              value={formData.familyHistory}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Social History</label>
            <input
              type="text"
              name="socialHistory"
              placeholder="Enter Social History"
              value={formData.socialHistory}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Allergies</label>
            <input
              type="text"
              name="allergies"
              placeholder="Enter Allergies"
              value={formData.allergies}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Current Medication</label>
            <input
              type="text"
              name="medication"
              placeholder="Enter Patient's Medication"
              value={formData.medication}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Diagnosis + Plan + Additional Notes + IDs */}
        <div className="form-section">
          <h2>Diagnosis</h2>
          <div className="form-group">
            <label>Diagnosis</label>
            <input 
              type="text"
              name="diagnosis"
              placeholder="Add Diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
            />
            {errors.diagnosis && <span className="error-text">{errors.diagnosis}</span>}
          </div>

          <div className="form-group">
            <label>Medication</label>
            <input
              type="text"
              name="planMedication"
              placeholder="Enter Medications"
              value={formData.planMedication}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Referrals</label>
            <input
              type="text"
              name="planReferrals"
              placeholder="Enter Referrals"
              value={formData.planReferrals}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Follow Up</label>
            <input
              type="text"
              name="planFollowUp"
              placeholder="Enter Follow Up"
              value={formData.planFollowUp}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Procedural</label>
            <input
              type="text"
              name="planProcedures"
              placeholder="Enter Procedural"
              value={formData.planProcedures}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Additional Notes</label>
            <textarea
              name="notes"
              placeholder="Add Patient Notes"
              value={formData.notes}
              onChange={handleChange}
            />
            {errors.notes && <span className="error-text">{errors.notes}</span>}
          </div>

          <h2>Hidden Fields (IDs)</h2>
          <div className="form-group">
            <label>Patient ID</label>
            <input
              type="text"
              name="patientID"
              placeholder="Patient ID"
              value={formData.patientID}
              onChange={handleChange}
            />
            {errors.patientID && <span className="error-text">{errors.patientID}</span>}
          </div>

          <div className="form-group">
            <label>Appointment ID</label>
            <input
              type="text"
              name="appointmentID"
              placeholder="Appointment ID"
              value={formData.appointmentID}
              onChange={handleChange}
            />
            {errors.appointmentID && <span className="error-text">{errors.appointmentID}</span>}
          </div>

          <div className="form-group">
            <label>Provider ID</label>
            <input
              type="text"
              name="providerID"
              placeholder="Provider ID"
              value={formData.providerID}
              onChange={handleChange}
            />
            {errors.providerID && <span className="error-text">{errors.providerID}</span>}
          </div>

          <button type="submit" className="proceed-button">PROCEED TO BILLING</button>
        </div>
      </form>
    </div>
  );
};

export default Sigmapanel;
