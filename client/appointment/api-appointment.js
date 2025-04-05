const create = async (appointment) => {
  try {
    let response = await fetch("/api/appointments/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const listAppointmentsWithPatients = async () => {
  let appointments = [];

  try {
    let response = await fetch("/api/appointments/", {
      method: "GET",
      // signal: signal,
    });
    appointments = await response.json();

    // Fetch patient details for each appointment
    const appointmentsWithPatients = await Promise.all(
      appointments.map(async (appointment) => {
        if (appointment.patientID) {
          let patientResponse = await fetch(
            `/api/patients/${appointment.patientID}`
          );
          let patient = await patientResponse.json();
          return {
            ...appointment,
            patientName: `${patient.lastname}, ${patient.firstname}`,
          };
        }
        return { ...appointment, patientName: "Unknown" };
      })
    );

    return appointmentsWithPatients;
  } catch (err) {
    console.log("Error fetching appointments with patients:", err);
    // return [];
    return appointments;
  }
};

const list = async () => {
  try {
    let response = await fetch("/api/appointments/", {
      method: "GET",
      // signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
// const read = async (params, credentials, signal) => {
const read = async (params, signal) => {
  try {
    let response = await fetch("/api/appointments/" + params.userId, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const update = async (params, appointment) => {
  try {
    let response = await fetch(`/api/appointments/${params.appointmentId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment), // Send updated data (e.g., updated status)
    });

    if (response.ok) {
      return await response.json(); // Return the updated appointment
    } else {
      throw new Error("Failed to update appointment");
    }
  } catch (err) {
    console.log("Error updating appointment:", err);
  }
};

const remove = async (params) => {
  try {
    let response = await fetch("/api/appointments/" + params.appointmentId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
export { create, list, read, update, remove, listAppointmentsWithPatients };
