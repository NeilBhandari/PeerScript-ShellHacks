// src/GoogleAI.mjs
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = 'AIzaSyDVupFlMi5hfzkL_a28cTeuCBnAeXtt8IU'; // Hardcoded API key

if (!apiKey) {
    throw new Error('API_KEY is not set');
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function generateContent(prompt) {
    try {

        const result = await model.generateContent(prompt);
        console.log(result);
        return result;
    } catch (error) {
        throw new Error(`GoogleGenerativeAI Error: ${error.message}`);
    }
}
