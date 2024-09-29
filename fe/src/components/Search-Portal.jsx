import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Search-Portal.css';

const SearchPage = () => {
    const [patientName, setPatientName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [patientList, setPatientList] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [prescriptions, setPrescriptions] = useState(['']);
    const [patientReport, setPatientReport] = useState(null);
    const [prescriptionErrors, setPrescriptionErrors] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!patientName) {
            setError('Please enter a patient name');
            return;
        }

        setIsLoading(true);
        setError(null);
        setPatientList(null);
        setSelectedPatient(null);
        setPatientReport(null);

        try {
            const response = await fetch(`http://localhost:3000/api/search-patient?name=${encodeURIComponent(patientName)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch patient data');
            }

            const data = await response.json();
            if (data.patients) {
                setPatientList(data.patients);
            } else {
                setError('No patients found');
            }
        } catch (error) {
            setError('Error fetching data: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePatientSelect = async (patientId) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:3000/api/patient/${patientId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch patient data');
            }

            const data = await response.json();
            setSelectedPatient(data.patient);
            setPatientReport(data.report);
        } catch (error) {
            setError(`Error fetching patient data: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePrescriptionChange = (index, value) => {
        const updatedPrescriptions = [...prescriptions];
        updatedPrescriptions[index] = value;
        setPrescriptions(updatedPrescriptions);

        // Clear any existing errors for this prescription
        const updatedErrors = [...prescriptionErrors];
        updatedErrors[index] = null;
        setPrescriptionErrors(updatedErrors);
    };

    const handleAddPrescription = (index) => {
        if (!prescriptions[index]) {
            // Display caution if input is empty
            const updatedErrors = [...prescriptionErrors];
            updatedErrors[index] = 'Please fill out this field before adding another.';
            setPrescriptionErrors(updatedErrors);
            return;
        }

        if (prescriptions.length < 3) {
            setPrescriptions([...prescriptions, '']);
        }
    };

    const handleRemovePrescription = (index) => {
        const updatedPrescriptions = [...prescriptions];
        updatedPrescriptions.splice(index, 1); // Remove the prescription at the given index
        setPrescriptions(updatedPrescriptions);

        const updatedErrors = [...prescriptionErrors];
        updatedErrors.splice(index, 1); // Remove the error associated with the prescription
        setPrescriptionErrors(updatedErrors);
    };

    const handleSubmitPrescriptions = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const prescriptionData = {
                prescription1: prescriptions[0] || null,
                prescription2: prescriptions[1] || null,
                prescription3: prescriptions[2] || null
            };

            const response = await fetch(`http://localhost:3000/api/patient/${selectedPatient._id}/prescriptions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(prescriptionData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update prescriptions');
            }

            const data = await response.json();
            navigate('/updated-report-display', { state: { updatedData: { ...data, patientReport } } });
        } catch (error) {
            setError(`Error updating prescriptions: ${error.message}`);
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
                    className={`input-field ${error ? 'error' : ''}`}
                />
                {error && <p className="error-message">{error}</p>}
            </div>

            <button onClick={handleSearch} className="search-button" disabled={isLoading}>
                {isLoading ? 'Searching...' : 'Search'}
            </button>

            {patientList && (
                <div className="patient-list">
                    <h3>Patients found. Please select one:</h3>
                    <ul>
                        {patientList.map((patient) => (
                            <li key={patient.id}>
                                <button onClick={() => handlePatientSelect(patient.id)}>
                                    {patient.name} (Age: {patient.age}, Gender: {patient.gender})
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {selectedPatient && (
                <div className="prescription-form">
                    <h3>Add Prescriptions for {selectedPatient.name}</h3>
                    {prescriptions.map((prescription, index) => (
                        <div key={index} className="input-container">
                            <label htmlFor={`prescription${index + 1}`}>Prescription {index + 1}</label>
                            <input
                                type="text"
                                id={`prescription${index + 1}`}
                                name={`prescription${index + 1}`}
                                value={prescription}
                                onChange={(e) => handlePrescriptionChange(index, e.target.value)}
                                className="input-field"
                            />
                            {prescriptionErrors[index] && <p className="error-message">{prescriptionErrors[index]}</p>}

                            {/* Add button for Prescription 1 and Prescription 2 */}
                            {index < 2 && prescriptions.length === index + 1 && (
                                <button onClick={() => handleAddPrescription(index)} className="add-button">
                                    Add
                                </button>
                            )}

                            {/* Remove button for Prescription 2 and Prescription 3 */}
                            {index > 0 && (
                                <button onClick={() => handleRemovePrescription(index)} className="remove-button">
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button onClick={handleSubmitPrescriptions} className="search-button" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit Prescriptions'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
