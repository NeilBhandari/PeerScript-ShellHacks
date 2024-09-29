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
            // When navigating, ensure patientId is passed as part of the state
navigate('/info-display', { state: { report: data.report, patientId: data.patient._id } });

        } catch (error) {
            setError('Error fetching data: ' + error.message);
            console.error('Error during search:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="search-container">
            <h2>Search Patient Records</h2>
            <div className="input-container">
                <label htmlFor="patientName">Patient Name</label>
                <input
                    type="text"
                    id="patientName"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter patient name"
                    className="search-input"
                />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button onClick={handleSearch} className="search-button" disabled={isLoading}>
                {isLoading ? 'Searching...' : 'Search'}
            </button>
        </div>
    );
};

export default SearchPage;






















// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/Search-Portal.css';
//  // Assuming you have some styles for this page

// const SearchPage = () => {
//     const [patientName, setPatientName] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const handleSearch = async () => {
//         if (!patientName) {
//             setError('Please enter a patient name');
//             return;
//         }

//         setIsLoading(true);
//         setError(null);

//         try {
//             const response = await fetch(`http://localhost:3000/api/search-patient?name=${encodeURIComponent(patientName)}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to fetch patient data');
//             }

//             const data = await response.json();
//             console.log('Patient data fetched:', data);

//             if (!data || !data.patient || !data.report) {
//                 setError('No data found for this patient');
//                 return;
//             }

//             // Navigate to InfoDisplay with patient data and the generated report
//             navigate('/info-display', { state: { name: patientName, report: data.report, patient: data.patient } });

//         } catch (error) {
//             setError('Error fetching data: ' + error.message);
//             console.error('Error during search:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="search-container">
//             <h2>Search Patient Records</h2>
//             <div className="input-container">
//                 <label htmlFor="patientName">Patient Name</label>
//                 <input
//                     type="text"
//                     id="patientName"
//                     value={patientName}
//                     onChange={(e) => setPatientName(e.target.value)}
//                     placeholder="Enter patient name"
//                     className="search-input"
//                 />
//             </div>

//             {error && <p className="error-message">{error}</p>}

//             <button onClick={handleSearch} className="search-button" disabled={isLoading}>
//                 {isLoading ? 'Searching...' : 'Search'}
//             </button>
//         </div>
//     );
// };

// export default SearchPage;


