import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Info-Display.css';

const InfoDisplay = () => {
    const location = useLocation();
    const { name } = location.state || {};
    const [medications, setMedications] = useState(['']);

    const addMedication = () => {
        if (medications.length < 3) {
            setMedications([...medications, '']);
        }
    };

    const handleMedicationChange = (index, value) => {
        const updatedMedications = [...medications];
        updatedMedications[index] = value;
        setMedications(updatedMedications);
    };

    const generateReport = () => {
        alert('Report generated!');
    };

    return (
        <div className="info-container">
            <h2>User Information</h2>
            <div className="info-field"><strong>Name: </strong> {name || 'No name provided'}</div>
            <div className="info-field"><strong>Age: </strong> 25</div>
            <div className="info-field"><strong>Weight: </strong> 70kg</div>
            <div className="info-field"><strong>Diagnosis: </strong> Healthy</div>

            {medications.map((medication, index) => (
                <div className="info-field" key={index}>
                    <strong>Medication {index + 1}:</strong>
                    <input
                        type="text"
                        value={medication}
                        onChange={(e) => handleMedicationChange(index, e.target.value)}
                        placeholder={`Enter medication ${index + 1}`}
                        className="medication-input"
                    />
                    {medications.length < 3 && (
                        <button onClick={addMedication} className="add-medication-button">
                            Add Medication
                        </button>
                    )}
                </div>
            ))}

            <div className="button-container">
                <button onClick={generateReport} className="generate-report-button">
                    Generate Report
                </button>
            </div>
        </div>
    );
};

export default InfoDisplay;
