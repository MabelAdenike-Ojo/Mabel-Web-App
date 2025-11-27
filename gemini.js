// Load environment variables
require('dotenv').config();

// Import the Google Gemini SDK
const { GoogleGenAI } = require('@google/genai');

// Load your API key from .env
const apiKey = process.env.GOOGLE_API_KEY;

// Initialize the AI client
const ai = new GoogleGenAI({ apiKey });

// Function to send a question to Gemini AI
async function askAI(question) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",  // the model you tested in Python
      contents: question,
    });

    console.log("AI Response:", response.text);
    return response.text;

  } catch (error) {
    console.error("Error calling AI:", error.message);
  }
}

// Example usage
askAI("Hello AI, how are you?");