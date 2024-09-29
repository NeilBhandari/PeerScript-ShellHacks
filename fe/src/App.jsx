// src/App.js

import React from 'react';

import UpdatedReportDisplay from './components/UpdatedReportDisplay';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';

import InfoDisplay from './components/Info-Display.jsx';
import SearchPage from './components/Search-Portal.jsx';
import CreatePatient from './components/Create-New-Patient.jsx';
import NavBar from './components/NavBar.jsx';
import TransitionWrapper from './components/TransitionWrapper.jsx'; // Import the TransitionWrapper

import './App.css';
import WelcomePage from "./components/Welcome-Page.jsx";

const App = () => {
    const location = useLocation();
    const showNavBar = location.pathname !== '/';
    return (
            <div className="App">
                {showNavBar && (
                    <div className='navbar'>
                        <NavBar/>
                    </div>
                )}
                <TransitionWrapper>
                    <Routes>
                        <Route path="/" element={<WelcomePage />} />
                        <Route path="/info-display" element={<InfoDisplay />} />
                        <Route path="/create-patient" element={<CreatePatient />} />
                        <Route path ="/searchPage" element={<SearchPage />} />
                        <Route path="/updated-report-display" element={<UpdatedReportDisplay />} />
                    </Routes>
                </TransitionWrapper>
            </div>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
)
export default AppWrapper;
