import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreatePatient from './components/Create-New-Patient.jsx';
import InfoDisplay from './components/Info-Display.jsx';
import SearchPage from './components/Search-Portal.jsx';
import NavBar from './components/NavBar.jsx';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <div className='navbar'>
                    <NavBar />
                </div>
                <Routes>
                    <Route path="/" element={<SearchPage />} />
                    <Route path="/info-display" element={<InfoDisplay />} />
                    <Route path="/create-patient" element={<CreatePatient />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
