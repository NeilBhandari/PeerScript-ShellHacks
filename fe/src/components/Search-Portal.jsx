import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, UserPlus } from 'lucide-react';
import '../styles/Search-Portal.css';

const SearchPage = () => {
  /*My code*/
  const [name, setName] = useState('');
  const [error, setError] = useState(false); // State to handle error display
  const [isSubmitted, setIsSubmitted] = useState(false); // Tracks if search has been clicked
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Mark that the user clicked search

    if (!name.trim()) { // Check if the name input is empty
      setError(true); // Show error message if empty
    } else {
      setError(false); // Clear error if valid input is provided
      navigate('/info-display', { state: { name } }); // Redirect to info-display page
    }
  };

  return (
    <div className="search-page-container">
      <div className="search-box">
        <h1 className="search-title">Patient Search</h1>
        <div className="input-container">
          <label htmlFor="name-input" className="input-label">
            Patient's Name:
            <span className="required-asterisk">*</span> {/* Asterisk for required field */}
          </label>
          <input
            type="text"
            id="name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`input-field ${error && isSubmitted ? 'error' : ''}`} // Apply 'error' class only after submission
            placeholder="Enter name"
            required
          />
          {error && isSubmitted && <p className="error-text">Patient's name is required!</p>} {/* Error message only after submit */}
        </div>
        <div className="button-group">
          <button onClick={handleSearch} className="search-button">
            <span>Search</span>
            <ArrowRight className="icon-right" size={18} />
          </button>
          <Link to="/create-patient" className="Search-Portal-Buttons">
            <button className="create-button">
              <span>Create new patient</span>
              <UserPlus className="icon-right" size={18} />
            </button>
          </Link>
        </div>

        {searchResults && formatReport(searchResults)} {/* Call the formatReport function with the search results */}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default SearchPage;
