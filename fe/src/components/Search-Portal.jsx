import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Search-Portal.css';

const SearchPage = () => {
    const [patientName, setPatientName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [patientList, setPatientList] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [prescriptions, setPrescriptions] = useState({ prescription1: '', prescription2: '', prescription3: '' });
    const [patientReport, setPatientReport] = useState(null);
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
            console.log('Patient data fetched:', data);

            if (data.patients) {
                setPatientList(data.patients);
            } else {
                setError('No patients found');
            }
        } catch (error) {
            setError('Error fetching data: ' + error.message);
            console.error('Error during search:', error);
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
            console.error('Error fetching patient data:', error);
            setError(`Error fetching patient data: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePrescriptionChange = (e) => {
        setPrescriptions({ ...prescriptions, [e.target.name]: e.target.value });
    };

    const handleSubmitPrescriptions = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:3000/api/patient/${selectedPatient._id}/prescriptions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(prescriptions),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update prescriptions');
            }

            const data = await response.json();
            navigate('/updated-report-display', { state: { updatedData: { ...data, patientReport } } });
        } catch (error) {
            console.error('Error updating prescriptions:', error);
            setError(`Error updating prescriptions: ${error.message}`);
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
                    <div className="input-container">
                        <label htmlFor="prescription1">Prescription 1</label>
                        <input
                            type="text"
                            id="prescription1"
                            name="prescription1"
                            value={prescriptions.prescription1}
                            onChange={handlePrescriptionChange}
                            className="search-input"
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="prescription2">Prescription 2</label>
                        <input
                            type="text"
                            id="prescription2"
                            name="prescription2"
                            value={prescriptions.prescription2}
                            onChange={handlePrescriptionChange}
                            className="search-input"
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="prescription3">Prescription 3</label>
                        <input
                            type="text"
                            id="prescription3"
                            name="prescription3"
                            value={prescriptions.prescription3}
                            onChange={handlePrescriptionChange}
                            className="search-input"
                        />
                    </div>
                    <button onClick={handleSubmitPrescriptions} className="search-button" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit Prescriptions'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default SearchPage;