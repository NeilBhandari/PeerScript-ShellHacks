import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from '../components/Search-Portal';
import InfoDisplay from '../components/Info-Display';
import CreatePatient from '../components/Create-New-Patient';
function Navigation() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/info-display" element={<InfoDisplay />} />
                <Route path = "/create-patient" element={<CreatePatient/>}></Route>
            </Routes>
        </Router>
    );
}

export default Navigation;
