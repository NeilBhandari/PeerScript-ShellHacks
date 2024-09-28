import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, UserPlus } from 'lucide-react';
import '../styles/Search-Portal.css';


const SearchPage = () => {
  const [name, setName] = useState('');

  return (
    <div className="search-page-container">
      <div className="search-box">
        <h1 className="search-title">Patient Search</h1>
        <div className="input-container">
          <label htmlFor="name-input" className="input-label">
            Patient's Name:
          </label>
          <input
            type="text"
            id="name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            placeholder="Enter name"
          />
        </div>
        <div className="button-group">
        <Link to="/info-display" state={{ name }} className="Search-Portal-Buttons">
          <button className="search-button">
            <span>Search</span>
            <ArrowRight className="icon-right" size={18} />
          </button>
          </Link>
          <Link to="/create-patient" className="Search-Portal-Buttons">
          <button className="create-button">
            <span>Create new patient</span>
            <UserPlus className="icon-right" size={18} />
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;




// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/Search-Portal.css';

// const SearchPage = () => {
//     const [name, setName] = useState('');

//     return (
//         <div className="container-one">
//             <label htmlFor="name-input" className="title">Patient's Name:</label>
//             <input
//                 type="text"
//                 id="name-input"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="input-box"
//                 placeholder="Enter name"
//             />
//             <div className="buttons-container">
//                 <Link to="/info-display" state={{ name }} className="Search-Portal-Buttons">
//                     <button className="search-portal-search-button">Search</button>
//                 </Link>
//                 <Link to="/create-patient" className="Search-Portal-Buttons">
//                     <button className="create-patient-button">Create new patient</button>
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default SearchPage;





// import React, { useState } from 'react';
// import { ArrowRight, UserPlus } from 'lucide-react';

// const SearchPage = () => {
//   const [name, setName] = useState('');

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-green-400 animate-gradient-x">
//       <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg w-96">
//         <h1 className="text-3xl font-bold mb-6 text-white text-center">Patient Search</h1>
//         <div className="mb-6">
//           <label htmlFor="name-input" className="block text-white font-semibold mb-2">
//             Patient's Name:
//           </label>
//           <input
//             type="text"
//             id="name-input"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
//             placeholder="Enter name"
//           />
//         </div>
//         <div className="space-y-4">
//           <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center">
//             <span>Search</span>
//             <ArrowRight className="ml-2" size={18} />
//           </button>
//           <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center">
//             <span>Create new patient</span>
//             <UserPlus className="ml-2" size={18} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchPage;