import React from 'react';
import '../styles/Welcome-Page.css';
import { Link } from 'react-router-dom';
import logo2 from "../assets/logo2.jpg";

const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <div className="left-side">
        <h1 className="header">WELCOME!</h1> {/* Add a header here */}
        <Link to="/searchPage" className='Right-Button'>
          <button className="Welcome-Page-Buttons">Patient Search</button>      
        </Link>   

        <Link to="/create-patient" className='Left-Button'>
          <button className="Welcome-Page-Buttons">Add Patient</button>            
        </Link> 
      </div>
      
      <div className="right-side">
        <img 
          src={logo2}
          alt="Healthcare Prescription Safety" 
          className="healthcare-image"
        />
      </div>
    </div>
  );
};

export default WelcomePage;
