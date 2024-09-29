import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Info-Display.css';

const InfoDisplay = () => {
    const location = useLocation();
    const { name } = location.state || {};

    const [medications, setMedications] = useState(['']);
    const [typedText, setTypedText] = useState('');
    const [showMedications, setShowMedications] = useState(false);
    const fullText = `Naame: ${name || 'No name provided'} \nAge: 25 \nWeight: 70kg \nDiagnosis: Healthy`;

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < fullText.length) {
                setTypedText((prev) => prev + fullText.charAt(index));
                index++;
            } else {
                clearInterval(interval);
                setShowMedications(true);
            }
        }, 50); // Adjust speed here (50ms per character for faster typing)
        return () => clearInterval(interval);
    }, [fullText]);

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
            <pre className="typing-effect">{typedText}</pre>

            {showMedications && (
                <>
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
                </>
            )}
        </div>
    );
};

export default InfoDisplay;
