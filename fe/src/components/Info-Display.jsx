import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Info-Display.css';

const InfoDisplay = () => {
    const location = useLocation();
    const { name } = location.state || {};
    const [medications, setMedications] = useState(['']);
    const [isUpdating, setIsUpdating] = useState(false);

    const addMedication = async () => {
        if (medications.length < 3) {
            const newMedications = [...medications, ''];
            setMedications(newMedications);
            try {
                const response = await fetch('/api/add-medication', { // Your add endpoint
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ medication: newMedications[newMedications.length - 1] }), // Send the last added medication
                });
                const data = await response.json();
                console.log('Medication added:', data);
            } catch (error) {
                console.error('Error adding medication:', error);
            }
        }
    };

    const updateMedication = async (index, value) => {
        const updatedMedications = [...medications];
        updatedMedications[index] = value;
        setMedications(updatedMedications);

        try {
            const response = await fetch(`/api/update-medication/${index}`, { // Your update endpoint
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ medication: value }), // Send updated medication
            });
            const data = await response.json();
            console.log('Medication updated:', data);
        } catch (error) {
            console.error('Error updating medication:', error);
        }
    };

    const removeMedication = async (index) => {
        const updatedMedications = medications.filter((_, i) => i !== index);
        setMedications(updatedMedications);

        try {
            const response = await fetch(`/api/remove-medication/${index}`, { // Your remove endpoint
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ index }), // Send the index or any identifier if needed
            });
            const data = await response.json();
            console.log('Medication removed:', data);
        } catch (error) {
            console.error('Error removing medication:', error);
        }
    };

    const handleMedicationChange = (index, value) => {
        setIsUpdating(true);
        updateMedication(index, value);
        setIsUpdating(false);
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
                        disabled={isUpdating}
                    />
                    <button onClick={() => removeMedication(index)} className="remove-medication-button">
                        Remove
                    </button>
                </div>
            ))}

            {medications.length < 3 && (
                <button onClick={addMedication} className="add-medication-button">
                    Add Medication
                </button>
            )}

            <div className="button-container">
                <button onClick={generateReport} className="generate-report-button">
                    Generate Report
                </button>
            </div>
        </div>
    );
};

export default InfoDisplay;


