import { GoogleGenerativeAI } from "@google/generative-ai";

console.log("GoogleGenerativeAI module imported successfully.");
const apiKey = 'AIzaSyDVupFlMi5hfzkL_a28cTeuCBnAeXtt8IU'; // Hardcoded API key

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Write a short hello message to my teammates Megane and Victoria.";

(async () => {
    try {
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
    } catch (error) {
        console.error("Error generating content:", error);
    }
})();
