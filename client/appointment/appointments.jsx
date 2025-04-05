import React from "react";
import { useState, useEffect } from "react";
import {
  create,
  update,
  listAppointmentsWithPatients,
} from "./api-appointment.js";
import "./appointments.css";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filterPatientName, setFilterPatientName] = useState("");

  const getCurrentDateTime = () => {
    const now = new Date();

    // Get the date in YYYY-MM-DD format based on the user's local time zone
    const date = now.toISOString().split("T")[0];

    // Get the time in HH:MM format based on the user's local time zone
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return { date, time };
  };

  const { date, time } = getCurrentDateTime();

  const [formData, setFormData] = useState({
    patientID: "",
    purpose: "",
    appointmentDate: date,
    appointmentTime: time,
    appointmentStatus: "Created",
    paymentMethod: "",
    clinicID: "",
  });

  useEffect(() => {
    // const abortController = new AbortController();
    // const signal = abortController.signal;
    listAppointmentsWithPatients().then((data) => {
      console.log(data);
      if (data && data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setAppointments(data);
        setFilteredAppointments(data);
      }
    });

    return function cleanup() {
      // abortController.abort();
    };
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setFilterPatientName(value);

    // Update filteredAppointments in real-time
    setFilteredAppointments(
      appointments.filter((appointment) =>
        appointment.patientName.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStatusChange = async (event, appointmentId) => {
    const updatedStatus = event.target.value;

    const updatedAppointment = {
      appointmentStatus: updatedStatus, // Only update the status
    };

    try {
      // Call the `update()` function with the appointment ID and the updated data
      const updatedAppointmentData = await update(
        { appointmentId: appointmentId },
        updatedAppointment
      );

      const newAppointments = appointments.map((appointment) =>
        appointment._id === appointmentId
          ? { ...appointment, appointmentStatus: updatedStatus } // only update the status
          : appointment
      );

      setAppointments(newAppointments);

      // Use the updated newAppointments instead of stale `appointments`
      setFilteredAppointments(
        newAppointments.filter((appointment) =>
          appointment.patientName
            .toLowerCase()
            .includes(filterPatientName.toLowerCase())
        )
      );

      console.log("Appointment status updated:", updatedAppointmentData);
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const combinedDateTime = new Date(
      `${formData.appointmentDate}T${formData.appointmentTime}:00.000+00:00`
    );

    const appointmentData = {
      patientID: formData.patientID,
      purpose: formData.purpose,
      date: combinedDateTime,
      Time: combinedDateTime,
      paymentMethod: formData.paymentMethod,
      appointmentStatus: formData.appointmentStatus,
      clinicID: formData.clinicID,
    };

    console.log("form data to submit", appointmentData);

    try {
      const newAppointment = await create(appointmentData); // Wait for API response

      if (newAppointment && !newAppointment.error) {
        // If appointment creation is successful, fetch updated list
        // await list().then((data) => {
        //   console.log(data);
        //   if (data && data.error) {
        //     console.log(data.error);
        //   } else {
        //     console.log(data);
        //     setAppointments(data);
        //   }
        // });

        listAppointmentsWithPatients().then((data) => {
          console.log(data);
          if (data && data.error) {
            console.log(data.error);
          } else {
            console.log(data);
            setAppointments(data);
            setFilteredAppointments(data);
          }
        });
      } else {
        console.error("Error adding appointment:", newAppointment.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="appointments-container">
      <div className="appointment-form">
        <h2>Add Appointment</h2>
        <form id="appointment-form-body" onSubmit={handleSubmit}>
          <label htmlFor="patientID"> *Patient ID: </label>
          <input
            type="text"
            id="patientID"
            name="patientID"
            value={formData.patientID}
            onChange={handleChange}
          />
          <br /> <br />
          <label htmlFor="purpose"> *Purpose: </label>
          <input
            type="text"
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
          />
          <br /> <br />
          <div className="date-time-container">
            <div className="date-container">
              <label htmlFor="appointmentDate"> *Date: </label>
              <input
                type="date"
                id="appointmentDate"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="time-container">
              <label htmlFor="appointmentTime"> *Time: </label>
              <input
                type="time"
                id="appointmentTime"
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <br /> <br />
          <label htmlFor="paymentMethod"> *Payment Method: </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
            className="payment-dropdown"
          >
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
            <option value="Cash">Cash</option>
          </select>
          <br /> <br />
          <label htmlFor="clinicID"> *Clinic ID: </label>
          <input
            type="text"
            id="clinicID"
            name="clinicID"
            value={formData.clinicID}
            onChange={handleChange}
          />
          <br /> <br />
          <button type="submit" className="appoint-form-submit">
            Add Appointment
          </button>
          <br />
        </form>
        <br></br>
      </div>
      <div className="appointment-list">
        <h2>Appointment List</h2>
        <div className="filter-container">
          <label htmlFor="search">Filter Patients</label>
          <input
            type="text"
            id="search"
            placeholder="Search"
            value={filterPatientName}
            onChange={handleSearchChange}
          />
        </div>
        {filteredAppointments.map((item) => (
          <div key={item._id} className="appointment-card">
            <div className="appointment-left">
              <div className="avatar">👤</div>
              <div className="patient-info">
                <strong>{item.patientName || "unknown name"}</strong>
              </div>
            </div>
            <div className="appointment-right">
              <div className="time-box">
                <span>Time</span>
                <strong>
                  {new Date(item.Time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </strong>
              </div>
              <div className="date-box">
                <span>Date</span>
                <strong>{new Date(item.date).toLocaleDateString()}</strong>
              </div>
              <select
                id="appointmentStatus"
                name="appointmentStatus"
                value={item.appointmentStatus}
                onChange={(e) => handleStatusChange(e, item._id)}
                required
                className="status-dropdown"
              >
                <option>Created</option>
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Canceled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
