import React, { useState } from 'react';
import '../styles/Create-New-Patient.css';

const CreatePatient = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        weight: '',
        height: '',
        diagnosis: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [unfoldedFields, setUnfoldedFields] = useState([true, false, false, false, false]); // Start with Name field unfolded

    const fields = [
        { label: 'Name', name: 'name', type: 'text', required: true },
        { label: 'Age', name: 'age', type: 'number', required: true },
        { label: 'Weight (kg)', name: 'weight', type: 'number', required: true },
        { label: 'Height (cm)', name: 'height', required: true, type: 'number' },
        { label: 'Diagnosis', name: 'diagnosis', type: 'text', required: true },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Ensure age, weight, and height are integers
        if (name === 'age' || name === 'weight' || name === 'height') {
            setFormData({ ...formData, [name]: parseInt(value) || '' });
        } else {
            setFormData({ ...formData, [name]: value });
        }

        // Reset the error for the field as the user starts typing
        if (isSubmitted) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            if (unfoldedFields[fields.findIndex(f => f.name === field)] && !formData[field]) {
                newErrors[field] = true;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true); // Mark the form as submitted

        if (validateForm()) {
            // Find the first field that hasn't been unfolded yet
            const nextFieldIndex = unfoldedFields.findIndex((unfolded) => !unfolded);

            // If there's a field to unfold
            if (nextFieldIndex !== -1) {
                const newUnfoldedFields = [...unfoldedFields];
                newUnfoldedFields[nextFieldIndex] = true; // Unfold the next field
                setUnfoldedFields(newUnfoldedFields);
            } else {
                console.log('Patient Data:', formData); // If all fields are filled, log the data
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="create-patient-form">
            <h2>Create New Patient</h2>

            {fields.map((field, index) => (
                unfoldedFields[index] && ( // Only show fields that are unfolded
                    <div key={field.name}>
                        <label htmlFor={field.name} className="required">{field.label}:</label>
                        <input
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleInputChange}
                            className={errors[field.name] && isSubmitted ? 'error' : ''}
                            required={field.required}
                        />
                    </div>
                )
            ))}

            <div className="create-patient-button-container">
                <button type="submit" className="create-patient-submit-button">Save</button>
            </div>
        </form>
    );
};

export default CreatePatient;
