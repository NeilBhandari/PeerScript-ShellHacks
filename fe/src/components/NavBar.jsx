import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css'

function Navbar() {
  return (
    <nav className="bg-purple-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-4">
        <li>
            <Link to="/info-display" className="hover:text-gray-300">
              Patients's Information
            </Link>
          </li>
          <li>
            <Link to="/create-patient" className="hover:text-gray-300">
              Add New Patient
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:text-gray-300">
              View Reports
            </Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;