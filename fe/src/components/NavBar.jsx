// Navbar.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css';

// const Navbar = () => {
//     return (
//         <div className="navbar">
//             {/* <div className="navbar-logo">
//                 Patient Information System
//             </div> */}

                


//         </div>
//     );
// };

// export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-purple-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Patient Management System
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/patients" className="hover:text-gray-300">
              Patients
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-300">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;