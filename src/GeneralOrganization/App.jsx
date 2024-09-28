import React from 'react';
import Navigation from '../Router/Router.jsx';
import Navbar from "../NavBar/NavBar.jsx";
import './App.css';

const App = () => {
    return (
        <div className="App">
            <Navbar />
            <h1>Patient Information System</h1>
            <Navigation />
        </div>
    );
};

export default App;
