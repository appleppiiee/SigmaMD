import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink as HLink } from 'react-router-hash-link';

const LandingNavbar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="font-bold text-2xl">
          Sigma<span className="text-green-500">EMR</span>
        </div>
        <div className="space-x-6 flex items-center">   
        <HLink smooth className="hover:text-green-500" to="/#aboutus">
            About Us
          </HLink>
          <HLink smooth className="hover:text-green-500" to="/#sigmateam">
            Sigma Team
          </HLink>
          {/* Redirect to different pages for Sign In and Sign Up */}
          <Link className="hover:text-green-500" to="/signin">
            <button className="border rounded py-2 px-4">Sign In</button>
          </Link>
          <Link className="hover:text-green-500" to="/signup">
            <button className="bg-green-500 text-white rounded py-2 px-4">Sign Up</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;