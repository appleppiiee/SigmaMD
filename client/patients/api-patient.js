const create = async (patient) => {
    try {
      let response = await fetch("/api/patients/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patient),
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const listPatientsWithDetails = async () => {
    try {
      let response = await fetch("/api/patients", {
        method: "GET",
      });
      return await response.json();
    } catch (err) {
      console.log("Error fetching patients:", err);
      return [];
    }
  };
  
  const list = async () => {
    try {
      let response = await fetch("/api/patients/", {
        method: "GET",
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const read = async (params, signal) => {
    try {
      let response = await fetch("/api/patients/" + params.patientId, {
        method: "GET",
        signal: signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const update = async (params, patient) => {
    try {
      let response = await fetch(`/api/patients/${params.patientId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patient),
      });
  
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Failed to update patient");
      }
    } catch (err) {
      console.log("Error updating patient:", err);
    }
  };
  
  const remove = async (params) => {
    try {
      let response = await fetch("/api/patients/" + params.patientId, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const search = async (query) => {
    try {
      let response = await fetch(`/api/patients/search?q=${encodeURIComponent(query)}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (err) {
      console.log("Error searching patients:", err);
      return [];
    }
  };
  
  export { 
    create, 
    list, 
    read, 
    update, 
    remove, 
    listPatientsWithDetails,
    search
  };
