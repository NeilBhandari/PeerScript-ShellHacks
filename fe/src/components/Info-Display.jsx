
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const InfoDisplay = () => {
    const location = useLocation();
    const { report, patientId } = location.state || {};
    const navigate = useNavigate();

    const [medications, setMedications] = useState({
        prescription1: '',
        prescription2: '',
        prescription3: ''
    });

    const handleUpdateMedications = async () => {
        if (!patientId) {
            console.error('No patient ID provided.');
            return;
        }

        const prescriptions = [
            { name: medications.prescription1 || 'None', dosage: 10, frequency: 'once daily', route: 'oral' },
            { name: medications.prescription2 || 'None', dosage: 20, frequency: 'twice daily', route: 'oral' },
            { name: medications.prescription3 || 'None', dosage: 30, frequency: 'once daily', route: 'oral' }
        ];

        console.log('Sending prescriptions:', prescriptions); // Debugging

        try {
            const response = await fetch('http://localhost:3000/api/prescribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ patientId, prescriptions })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Medications updated:', data);
                navigate('/updated-report', { state: { updatedData: data } });
            } else {
                console.error('Failed to update medications');
            }
        } catch (error) {
            console.error('Error updating medications:', error);
        }
    };

    return (
        <div>
            <h2>Patient Report</h2>
            <p>{report}</p>

            <h3>Update Medications</h3>
            <input
                type="text"
                placeholder="Prescription 1"
                value={medications.prescription1}
                onChange={(e) => setMedications({ ...medications, prescription1: e.target.value })}
            />
            <input
                type="text"
                placeholder="Prescription 2"
                value={medications.prescription2}
                onChange={(e) => setMedications({ ...medications, prescription2: e.target.value })}
            />
            <input
                type="text"
                placeholder="Prescription 3"
                value={medications.prescription3}
                onChange={(e) => setMedications({ ...medications, prescription3: e.target.value })}
            />
            <button onClick={handleUpdateMedications}>Update Medications</button>
        </div>
    );
};

export default InfoDisplay;

/* Some bugs to fix* */


























// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const InfoDisplay = () => {
//     const location = useLocation();
//     const { report, patientId } = location.state || {};
//     const navigate = useNavigate();

//     const [medications, setMedications] = useState({
//         prescription1: '',
//         prescription2: '',
//         prescription3: ''
//     });

//     const handleUpdateMedications = async () => {
//         if (!patientId) {
//             console.error('Patient ID is missing');
//             return;
//         }
    
//         try {
//             const response = await fetch('http://localhost:3000/api/prescribe', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     patientId,
//                     prescriptions: [
//                         { name: medications.prescription1 },
//                         { name: medications.prescription2 },
//                         { name: medications.prescription3 }
//                     ]
//                 }),
//             });
    
//             if (response.ok) {
//                 const data = await response.json();
//                 console.log('Medications updated:', data);
    
//                 // Navigate to the new page with the full response data
//                 navigate('/updated-report', { state: { updatedData: data } });
//             } else {
//                 console.error('Failed to update medications');
//             }
//         } catch (error) {
//             console.error('Error updating medications:', error);
//         }
//     };
    

//     return (
//         <div style={styles.container}>
//             <h2 style={styles.header}>AI-Generated Patient Report</h2>
//             <div style={styles.reportSection}>
//                 {report ? <p style={styles.report}>{report}</p> : <p style={styles.noReport}>No report available</p>}
//             </div>

//             <div style={styles.formSection}>
//                 <h3 style={styles.subHeader}>Update Medications</h3>
//                 <input 
//                     type="text" 
//                     placeholder="Prescription 1" 
//                     style={styles.input} 
//                     value={medications.prescription1}
//                     onChange={(e) => setMedications({ ...medications, prescription1: e.target.value })}
//                 />
//                 <input 
//                     type="text" 
//                     placeholder="Prescription 2" 
//                     style={styles.input} 
//                     value={medications.prescription2}
//                     onChange={(e) => setMedications({ ...medications, prescription2: e.target.value })}
//                 />
//                 <input 
//                     type="text" 
//                     placeholder="Prescription 3" 
//                     style={styles.input} 
//                     value={medications.prescription3}
//                     onChange={(e) => setMedications({ ...medications, prescription3: e.target.value })}
//                 />
//                 <button style={styles.button} onClick={handleUpdateMedications}>Update Medications</button>
//             </div>
//         </div>
//     );
// };

// const styles = {
//     container: {
//         margin: '20px auto',
//         padding: '20px',
//         maxWidth: '600px',
//         backgroundColor: '#f9f9f9',
//         borderRadius: '10px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//         fontFamily: 'Arial, sans-serif',
//     },
//     header: {
//         textAlign: 'center',
//         fontSize: '24px',
//         color: '#333',
//         marginBottom: '20px',
//     },
//     reportSection: {
//         marginBottom: '20px',
//         padding: '15px',
//         backgroundColor: '#eef',
//         borderRadius: '8px',
//     },
//     report: {
//         fontSize: '16px',
//         color: '#333',
//     },
//     noReport: {
//         color: '#c00',
//         fontSize: '16px',
//         fontWeight: 'bold',
//     },
//     formSection: {
//         marginBottom: '20px',
//     },
//     subHeader: {
//         fontSize: '20px',
//         color: '#555',
//         marginBottom: '10px',
//     },
//     input: {
//         display: 'block',
//         width: '100%',
//         padding: '10px',
//         margin: '10px 0',
//         fontSize: '16px',
//         borderRadius: '5px',
//         border: '1px solid #ccc',
//     },
//     button: {
//         display: 'block',
//         width: '100%',
//         padding: '10px',
//         fontSize: '16px',
//         backgroundColor: '#28a745',
//         color: 'white',
//         border: 'none',
//         borderRadius: '5px',
//         cursor: 'pointer',
//     },
// };

// export default InfoDisplay;



























// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import '../styles/Info-Display.css';

// const InfoDisplay = () => {
//     const location = useLocation();
//     const { report } = location.state || {};

//     const formatReport = (reportText) => {
//         if (!reportText) return null;

//         const sections = reportText.split('**').filter(Boolean);
//         return sections.map((section, index) => {
//             const [title, ...content] = section.split('\n');
//             return (
//                 <div key={index} className="report-section">
//                     <h3 className="section-title">{title.trim()}</h3>
//                     {content.map((line, lineIndex) => {
//                         const [key, value] = line.split(':');
//                         if (value) {
//                             return (
//                                 <p key={lineIndex} className="report-item">
//                                     <span className="item-key">{key.trim()}:</span>
//                                     <span className="item-value">{value.trim()}</span>
//                                 </p>
//                             );
//                         }
//                         return <p key={lineIndex} className="report-text">{line.trim()}</p>;
//                     })}
//                 </div>
//             );
//         });
//     };

//     return (
//         <div className="info-container">
//             <h2 className="report-title">AI-Generated Patient Report</h2>
//             <div className="ai-report">
//                 {report ? formatReport(report) : <p>No report available</p>}
//             </div>
//         </div>
//     );
// };

// export default InfoDisplay;





// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import '../styles/Info-Display.css';

// const InfoDisplay = () => {
//     const location = useLocation();
//     const { name, report, patient } = location.state || {}; // Retrieve report and patient details
//     const [medications, setMedications] = useState(['']);
//     const [isUpdating, setIsUpdating] = useState(false);

//     const addMedication = async () => {
//         if (medications.length < 3) {
//             const newMedications = [...medications, ''];
//             setMedications(newMedications);
//             try {
//                 const response = await fetch('/api/add-medication', { // Your add endpoint
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ medication: newMedications[newMedications.length - 1] }), // Send the last added medication
//                 });
//                 const data = await response.json();
//                 console.log('Medication added:', data);
//             } catch (error) {
//                 console.error('Error adding medication:', error);
//             }
//         }
//     };

//     const updateMedication = async (index, value) => {
//         const updatedMedications = [...medications];
//         updatedMedications[index] = value;
//         setMedications(updatedMedications);

//         try {
//             const response = await fetch(`/api/update-medication/${index}`, { // Your update endpoint
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ medication: value }), // Send updated medication
//             });
//             const data = await response.json();
//             console.log('Medication updated:', data);
//         } catch (error) {
//             console.error('Error updating medication:', error);
//         }
//     };

//     const removeMedication = async (index) => {
//         const updatedMedications = medications.filter((_, i) => i !== index);
//         setMedications(updatedMedications);

//         try {
//             const response = await fetch(`/api/remove-medication/${index}`, { // Your remove endpoint
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ index }), // Send the index or any identifier if needed
//             });
//             const data = await response.json();
//             console.log('Medication removed:', data);
//         } catch (error) {
//             console.error('Error removing medication:', error);
//         }
//     };

//     const handleMedicationChange = (index, value) => {
//         setIsUpdating(true);
//         updateMedication(index, value);
//         setIsUpdating(false);
//     };

//     const generateReport = () => {
//         alert('Report generated!');
//     };

//     return (
//         <div className="info-container">
//             <h2>Patient Information</h2>
//             <div className="info-field"><strong>Name: </strong> {patient?.name || 'No name provided'}</div>
//             <div className="info-field"><strong>Age: </strong> {patient?.age || 'Unknown'}</div>
//             <div className="info-field"><strong>Weight: </strong> {patient?.weight || 'Unknown'}</div>
//             <div className="info-field"><strong>Height: </strong> {patient?.height || 'Unknown'}</div>
//             <div className="info-field"><strong>Diagnosis: </strong> {patient?.diagnosis || 'No diagnosis'}</div>

//             <h3>AI-Generated Report</h3>
//             <div className="ai-report">{report || 'No report available'}</div>

//             {medications.map((medication, index) => (
//                 <div className="info-field" key={index}>
//                     <strong>Medication {index + 1}:</strong>
//                     <input
//                         type="text"
//                         value={medication}
//                         onChange={(e) => handleMedicationChange(index, e.target.value)}
//                         placeholder={`Enter medication ${index + 1}`}
//                         className="medication-input"
//                         disabled={isUpdating}
//                     />
//                     <button onClick={() => removeMedication(index)} className="remove-medication-button">
//                         Remove
//                     </button>
//                 </div>
//             ))}

//             {medications.length < 3 && (
//                 <button onClick={addMedication} className="add-medication-button">
//                     Add Medication
//                 </button>
//             )}

//             <div className="button-container">
//                 <button onClick={generateReport} className="generate-report-button">
//                     Generate Report
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default InfoDisplay;


