//const express = require("express");
//const app = express();

//app.listen(3000, () =>console.log("Node JS web app now running on port 3000"));
/** const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the "public" directory in the main folder
app.use(express.static(path.join(__dirname, '..', 'public')));

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('<h1>Welcome to My Web App!</h1><p>This is a simple Node.js and Express app running on localhost:3000.</p>');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
 **/
// src/App.mjs

// src/App.mjs

// src/App.js

// src/App.js

// src/App.mjs
// src/App.mjs
// src/App.mjs
// src/App.mjs
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import * as googleAI from './GoogleAI.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/generate', async (req, res) => {
    const { prompt } = req.body;
    try {
        const result = await googleAI.generateContent(prompt);
        res.json({ response: result.response.text() }); // Adjust based on actual response structure
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
