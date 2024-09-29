// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ArrowRight, UserPlus } from 'lucide-react';
// import '../styles/Search-Portal.css';

// const SearchPage = () => {
//   const [name, setName] = useState('');
//   const [error, setError] = useState(false); 
//   const [isSubmitted, setIsSubmitted] = useState(false); 
//   const navigate = useNavigate(); 

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setIsSubmitted(true); 

//     if (!name.trim()) { 
//       setError(true); 
//     } else {
//       setError(false); 
//       navigate('/info-display', { state: { name } });
//     }
//   };

//   return (
//     <div className="search-page-container">
//       <div className="search-box">
//         <h1 className="search-title">Patient Search</h1>
//         <div className="input-container">
//           <label htmlFor="name-input" className="input-label">
//             Patient's Name:
//             <span className="required-asterisk">*</span> {/* Asterisk for required field */}
//           </label>
//           <input
//             type="text"
//             id="name-input"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className={`input-field ${error && isSubmitted ? 'error' : ''}`} // Apply 'error' class only after submission
//             placeholder="Enter name"
//             required
//           />
//           {error && isSubmitted && <p className="error-text">Patient's name is required!</p>} {/* Error message only after submit */}
//         </div>
//         <div className="button-group">
//           <button onClick={handleSearch} className="search-button">
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
//       </div>
//     </div>
//   );
// };

// export default SearchPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Search-Portal.css';

const SearchPage = () => {
    const [patientName, setPatientName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!patientName) {
            setError('Please enter a patient name');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:3000/api/search-patient?name=${encodeURIComponent(patientName)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch patient data');
            }

            const data = await response.json();
            console.log('Patient data fetched:', data);

            if (!data || !data.report || !data.patient) {
                setError('No report found for this patient');
                return;
            }

            // Navigate to InfoDisplay with patientId and generated report
            navigate('/info-display', { state: { report: data.report, patientId: data.patient._id } });

        } catch (error) {
            setError('Error fetching data: ' + error.message);
            console.error('Error during search:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="search-box">
            <h2 className="search-title">Search Patient Records</h2>
            <div className="input-container">
                <label htmlFor="patientName" className="input-label">Patient Name</label>
                <input
                    type="text"
                    id="patientName"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter patient name"
                    className={`input-field ${error ? 'error' : ''}`} // Add error class if there's an error
                />
                {error && <p className="error-text">{error}</p>}
            </div>

            <div className="button-group">
                <button onClick={handleSearch} className="search-button" disabled={isLoading}>
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </div>
        </div>
    );
};

export default SearchPage;
