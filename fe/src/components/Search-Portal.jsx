import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Search-Portal.css';
import NavBar from './NavBar.jsx'


const SearchPage = () => {
    
    const [name, setName] = useState('');

    return (
        <div className="container">
            {/* <div className='navbar'>
            <NavBar />
            </div> */}
            
            <label htmlFor="name-input" className="title">Patient's Name:</label>
            <input
                type="text"
                id="name-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-box"
                placeholder="Enter name"
            />
            <Link to="/info-display" state={{ name }} className="Search-Portal-Buttons">
                <button className="search-portal-search-button">Search</button>
            </Link>
            <Link to="/create-patient" className="Search-Portal-Buttons">
                <button className="create-patient-button">Create new patient</button>
            </Link>
        </div>
    );
};

export default SearchPage;
