import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import InfoDisplay from './components/Info-Display.jsx';
import SearchPage from './components/Search-Portal.jsx';
import CreatePatient from './components/Create-New-Patient.jsx';
import NavBar from './components/NavBar.jsx';
import WelcomePage from './components/Welcome-Page.jsx'; // Import your welcome page
import TransitionWrapper from './components/TransitionWrapper.jsx';

import './App.css';

const App = () => {
    const location = useLocation(); // Get the current path

    // Conditionally render the NavBar if the current path is not "/welcome"
    const showNavBar = location.pathname !== '/';

    return (
        <div className="App">
            {showNavBar && ( // Conditionally render NavBar
                <div className='navbar'>
                    <NavBar />
                </div>
            )}
            <TransitionWrapper>
                <Routes>
                    <Route path="/" element={<WelcomePage />} /> {/* Welcome Page */}
                    <Route path="/searchPage" element={<SearchPage />} />
                    <Route path="/info-display" element={<InfoDisplay />} />
                    <Route path="/create-patient" element={<CreatePatient />} />
                </Routes>
            </TransitionWrapper>
        </div>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
