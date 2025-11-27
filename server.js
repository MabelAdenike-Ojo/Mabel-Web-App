require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const {GoogleGenerativeAI} = require("@google/generative-ai")

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Initialize the Gemini client correctly
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 
  "gemini-2.5-flash-lite" });

// Test route
app.get("/", (req, res) => {
  res.send("Server is working ✅");
});

// Endpoint for questions
app.post("/ask", async (req, res) => {
  try {
    const question = req.body.question;

    const result = await model.generateContent(question);
    const response = await result.response;
    const answer = response.text();

    res.json({ answer });

  } catch (error) {
    console.error("AI Error:", error);
    res.json({ answer: "No response from AI." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});