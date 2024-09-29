// src/App.js

import React from 'react';

import UpdatedReportDisplay from './components/UpdatedReportDisplay';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import InfoDisplay from './components/Info-Display.jsx';
import SearchPage from './components/Search-Portal.jsx';
import CreatePatient from './components/Create-New-Patient.jsx';
import NavBar from './components/NavBar.jsx';
import TransitionWrapper from './components/TransitionWrapper.jsx'; // Import the TransitionWrapper

import './App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <div className='navbar'>
                    <NavBar />
                </div>
                <TransitionWrapper>
                    <Routes>
                        <Route path="/" element={<SearchPage />} />
                        <Route path="/info-display" element={<InfoDisplay />} />
                        <Route path="/create-patient" element={<CreatePatient />} />
                        <Route path="/updated-report" element={<UpdatedReportDisplay />} />
                    </Routes>
                </TransitionWrapper>
            </div>
        </Router>
    );
};

export default App;
