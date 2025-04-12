import React from "react";

const LandingPage = () => (
  <div className="min-h-screen flex flex-col lg:flex-row justify-center items-center px-10 py-12 bg-gray-50">
    <div className="lg:w-1/2">
      <h1 className="text-5xl font-bold mb-4">Feel Comfort<br/>Be Healthy</h1>
      <p className="mb-8 text-lg">Our professional team will take care of you, we value your time and health.</p>

      <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded shadow-md">
        <div className="mb-4">
          <h3 className="font-bold text-green-600">Make an Appointment</h3>
          <p className="text-sm">Select best time for you.</p>
        </div>
        <div className="mb-4">
          <h3 className="font-bold text-green-600">Find the Best Doctor</h3>
          <p className="text-sm">Find the best doctor in a minute.</p>
        </div>
        <div className="mb-4">
          <h3 className="font-bold text-green-600">Visit the Clinic</h3>
          <p className="text-sm">We take care of your issues.</p>
        </div>
        <div className="mb-4">
          <h3 className="font-bold text-green-600">Ask Questions</h3>
          <p className="text-sm">Ask questions any time.</p>
        </div>
      </div>

      <button className="mt-6 px-8 py-2 bg-green-600 text-white rounded-full">
        Make Appointment
      </button>

      <div className="mt-4 text-sm">
        <div>Mon–Fri: 10AM–9PM</div>
        <div>Sat: 10AM–2PM</div>
      </div>
    </div>

    <div className="lg:w-1/2 flex justify-center">
      <img src="/vite.svg" alt="EMR Illustration" className="w-3/4"/>
    </div>
  </div>
);

export default LandingPage;
