import React from 'react';
// import Navigation from './Router/Router.jsx';
// import Navbar from "./components/NavBar.jsx";
// import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreatePatient from './components/Create-New-Patient.jsx';
import InfoDisplay from './components/Info-Display.jsx';
import SearchPage from './components/Search-Portal.jsx';
import './App.css';
const App = () => {
    return (

       
        <Router>
        <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/info-display" element={<InfoDisplay />} />
            <Route path = "/create-patient" element={<CreatePatient/>}></Route>
        </Routes>
    </Router>
);
    //     <div className="App">
    //         {/* <Navbar /> */}
    //         <CreatePatient />
    //         <h1>Patient Information System</h1>
    //         {/* <Navigation /> */}
    //     </div>
    // );
};

export default App;

