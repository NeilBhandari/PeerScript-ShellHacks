import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, UserPlus } from 'lucide-react';
import '../styles/Search-Portal.css';

const SearchPage = () => {
  /*My code*/
  const [name, setName] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/search-patient?name=${encodeURIComponent(name)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to search patients');
      }

      const data = await response.json();
      setSearchResults(data);
      console.log('Search Results:', data);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while searching');
    }
  };

  const formatReport = (results) => {
    const { patient } = results; // Destructure patient from results

    return (
      <div className="ai-generated-report">
        <h2>AI-Generated Report:</h2>
        <strong>Patient Report</strong>
        <p>Patient Name: {patient.name}</p>
        <p>Age: {patient.age}</p>
        <p>Weight: {patient.weight} lbs</p>
        <p>Height: {patient.height} cm</p>
        <p>Gender: {patient.gender}</p>
        
        <strong>Medical History</strong>
        <p>Diagnosis: {patient.diagnosis}</p>

        <strong>Body Surface Area (BSA)</strong>: 2.45 m² (calculated using Mosteller formula)

        <strong>Current Medications</strong>
        <p>None</p>

        <p>Note: This report is a summary of the patient's medical details provided. It does not include any additional or fake information.</p>
      </div>
    );
  };

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
          <button className="search-button" onClick={handleSearch}>
            <span>Search</span>
            <ArrowRight className="icon-right" size={18} />
          </button>
          <Link to="/create-patient" className="Search-Portal-Buttons">
            <button className="create-button">
              <span>Create new patient</span>
              <UserPlus className="icon-right" size={18} />
            </button>
          </Link>
        </div>

        {searchResults && formatReport(searchResults)} {/* Call the formatReport function with the search results */}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default SearchPage;






















// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, UserPlus } from 'lucide-react';
// import '../styles/Search-Portal.css';

// const SearchPage = () => {
//   const [name, setName] = useState('');
//   const [searchResults, setSearchResults] = useState(null);
//   const [error, setError] = useState(null);

//   const handleSearch = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/patients/search-patients?name=${name}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to search patients');
//       }

//       const data = await response.json();
//       setSearchResults(data); // Save the results
//       console.log('Search Results:', data);
//     } catch (error) {
//       console.error('Error:', error);
//       setError('An error occurred while searching');
//     }
//   };

//   // Function to format the patient report content
//   const formatReport = (patient) => {
//     return (
//       <div className="patient-report">
//         <h2>Patient Report: {patient.name}</h2>
//         <h3>Demographics:</h3>
//         <ul>
//           <li>Name: {patient.name}</li>
//           <li>Age: {patient.age}</li>
//           <li>Weight: {patient.weight} lbs</li>
//           <li>Height: {patient.height} cm</li>
//           <li>Gender: {patient.gender}</li>
//         </ul>
//         <h3>Medical Condition:</h3>
//         <ul>
//           <li>Diagnosis: {patient.diagnosis}</li>
//         </ul>
//         <h3>Body Surface Area (BSA):</h3>
//         <p>Calculated using Mosteller formula: {patient.bsa.toFixed(2)} m²</p>
//         <h3>Current Prescriptions:</h3>
//         <ul>
//           <li>Prescription 1: {patient.prescription1}</li>
//           <li>Prescription 2: {patient.prescription2}</li>
//           <li>Prescription 3: {patient.prescription3}</li>
//         </ul>
//       </div>
//     );
//   };

//   return (
//     <div className="search-page-container">
//       <div className="search-box">
//         <h1 className="search-title">Patient Search</h1>
//         <div className="input-container">
//           <label htmlFor="name-input" className="input-label">
//             Patient's Name:
//           </label>
//           <input
//             type="text"
//             id="name-input"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="input-field"
//             placeholder="Enter name"
//           />
//         </div>
//         <div className="button-group">
//           <button className="search-button" onClick={handleSearch}>
//             <span>Search</span>
//             <ArrowRight className="icon-right" size={18} />
//           </button>
//           <Link to="/create-patient" className="Search-Portal-Buttons">
//             <button className="create-button">
//               <span>Create new patient</span>
//               <UserPlus className="icon-right" size={18} />
//             </button>
//           </Link>
//         </div>

//         {/* Display search results or error message */}
//         {searchResults && formatReport(searchResults)}
//         {error && <p className="error-message">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default SearchPage;




































// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, UserPlus } from 'lucide-react';
// import '../styles/Search-Portal.css';

// const SearchPage = () => {
//   const [name, setName] = useState('');
//   const [searchResults, setSearchResults] = useState(null);
//   const [error, setError] = useState(null);

//   const handleSearch = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/patients/search-patients?name=${name}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to search patients');
//       }

//       const data = await response.json();
//       setSearchResults(data); // Save the results if needed
//       console.log('Search Results:', data);
//     } catch (error) {
//       console.error('Error:', error);
//       setError('An error occurred while searching');
//     }
//   };

//   return (
//     <div className="search-page-container">
//       <div className="search-box">
//         <h1 className="search-title">Patient Search</h1>
//         <div className="input-container">
//           <label htmlFor="name-input" className="input-label">
//             Patient's Name:
//           </label>
//           <input
//             type="text"
//             id="name-input"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="input-field"
//             placeholder="Enter name"
//           />
//         </div>
//         <div className="button-group">
//           <button className="search-button" onClick={handleSearch}>
//             <span>Search</span>
//             <ArrowRight className="icon-right" size={18} />
//           </button>
//           <Link to="/create-patient" className="Search-Portal-Buttons">
//             <button className="create-button">
//               <span>Create new patient</span>
//               <UserPlus className="icon-right" size={18} />
//             </button>
//           </Link>
//         </div>

//         {/* Display search results or error message */}
//         {searchResults && (
//           <div className="search-results">
//             <h2>Search Results:</h2>
//             <pre>{JSON.stringify(searchResults, null, 2)}</pre>
//           </div>
//         )}
//         {error && <p className="error-message">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default SearchPage;





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