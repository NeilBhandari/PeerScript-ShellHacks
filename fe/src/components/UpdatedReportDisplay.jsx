import React from 'react';
import { useLocation } from 'react-router-dom';

const UpdatedReportDisplay = () => {
    const location = useLocation();
    const { updatedData } = location.state || {}; // Access the updated data from state

    if (!updatedData) {
        return <p>No updated report available</p>;
    }

    const { patient, recommendations } = updatedData;

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Updated Patient Report</h2>

            <div style={styles.section}>
                <h3 style={styles.subHeader}>Patient Information</h3>
                <p style={styles.text}><strong>Name:</strong> {patient.name}</p>
                <p style={styles.text}><strong>Age:</strong> {patient.age}</p>
                <p style={styles.text}><strong>Gender:</strong> {patient.gender}</p>
                <p style={styles.text}><strong>Diagnosis:</strong> {patient.diagnosis}</p>
                <p style={styles.text}><strong>Height:</strong> {patient.height} cm</p>
                <p style={styles.text}><strong>Weight:</strong> {patient.weight} kg</p>
            </div>

            <div style={styles.section}>
                <h3 style={styles.subHeader}>Prescriptions</h3>
                <p style={styles.text}><strong>Prescription 1:</strong> {patient.prescription1}</p>
                <p style={styles.text}><strong>Prescription 2:</strong> {patient.prescription2}</p>
                <p style={styles.text}><strong>Prescription 3:</strong> {patient.prescription3}</p>
            </div>

            <div style={styles.section}>
                <h3 style={styles.subHeader}>Recommendations</h3>
                <pre style={styles.pre}>{recommendations}</pre> {/* Using pre to preserve formatting of text */}
            </div>
        </div>
    );
};

// Inline styling for better presentation
const styles = {
    container: {
        margin: '20px auto',
        padding: '20px',
        maxWidth: '800px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        textAlign: 'center',
        color: '#333',
        fontSize: '24px',
        marginBottom: '20px',
    },
    subHeader: {
        fontSize: '20px',
        color: '#555',
        marginBottom: '10px',
        borderBottom: '2px solid #ddd',
        paddingBottom: '5px',
    },
    section: {
        marginBottom: '20px',
    },
    text: {
        fontSize: '16px',
        color: '#333',
        lineHeight: '1.5',
        marginBottom: '8px',
    },
    pre: {
        backgroundColor: '#e8e8e8',
        padding: '15px',
        borderRadius: '8px',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        fontSize: '14px',
        lineHeight: '1.6',
        color: '#444',
    },
};

export default UpdatedReportDisplay;
