import React, { useState, useEffect } from 'react';
import './patient.css';
import { create, list } from '../patients/api-patient'; 

const PatientPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    mobileNo: '',
    email: '',
    dob: '',
    remarks: '',
    maritalStatus: '',
    bloodType: '',
    address: ''
  });

  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load patient list from backend on mount
  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    const data = await list();
    if (data && !data.error) {
      setPatients(data); // Setting the patients data
    } else {
      console.error("Failed to fetch patients:", data?.error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  //  Submit patient data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await create(formData); // Send data to backend

    if (res && !res.error) {
      await loadPatients(); // Refresh patient list after successful creation
      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        mobileNo: '',
        email: '',
        dob: '',
        remarks: '',
        maritalStatus: '',
        bloodType: '',
        address: ''
      });
    } else {
      console.error("Error creating patient:", res?.error);
    }
  };

  const filteredPatients = patients.filter(p =>
    `${p.firstName} ${p.middleName} ${p.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.mobileNo.includes(searchTerm) ||
    (p.remarks && p.remarks.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="patient-page">
      <h2 className="text-center mb-4">PATIENT</h2>
      <div className="patient-container">
        <div className="main-content">
          {/* Left: Add Patient Form */}
          <div className="form-section">
            <h3 className="mb-3">ADD PATIENT</h3>
            <form onSubmit={handleSubmit}>
              <div className="name-fields-vertical">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="form-control" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Middle Name</label>
                  <input type="text" name="middleName" value={formData.middleName} onChange={handleInputChange} className="form-control" />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="form-control" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Mobile No</label>
                  <input type="text" name="mobileNo" value={formData.mobileNo} onChange={handleInputChange} className="form-control" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-control" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Date Of Birth</label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="form-control" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Remarks</label>
                  <input type="text" name="remarks" value={formData.remarks} onChange={handleInputChange} className="form-control" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Marital Status</label>
                  <input type="text" name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} className="form-control" />
                </div>
                <div className="form-group">
                  <label className="form-label">Blood Type</label>
                  <select name="bloodType" value={formData.bloodType} onChange={handleInputChange} className="form-control">
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Complete Address</label>
                <textarea name="address" value={formData.address} onChange={handleInputChange} className="form-control" rows="2"></textarea>
              </div>

              <button type="submit" className="add-btn mt-3">Add Patient</button>
            </form>
          </div>

          {/* Right: Patient List */}
          <div className="list-section">
            <h3 className="mb-3">PATIENT LIST</h3>
            <div className="filter-section">
              <label>Filter Patients</label>
              <input type="text" placeholder="🔍 Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control" />
            </div>

            <table>
              <thead>
                <tr>
                  <th>Last Name, First Name, Middle Name</th>
                  <th>Mobile Number</th>
                  <th>Date of Birth</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.length === 0 ? (
                  <tr><td colSpan="4">No patients found</td></tr>
                ) : (
                  filteredPatients.map((p, index) => (
                    <tr key={index}>
                      <td>{p.lastName}, {p.firstName} {p.middleName}</td>
                      <td>{p.mobileNo}</td>
                      <td>{new Date(p.dob).toLocaleDateString()}</td>
                      <td>{p.remarks}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPage;
