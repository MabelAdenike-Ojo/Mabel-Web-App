const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const genAI = new GoogleGenerativeAI("AIzaSyCSnxO0rsgK8FOvaZFS_tKd6pPayIZxBOc");

app.post("/ask", async (req, res) => {
  console.log("POST /ask hit");  
  console.log("Request body:", req.body);

  try {
    const userQuestion = req.body.question;
    console.log("Question:", userQuestion);

    // Use a valid, supported Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    console.log("Calling Gemini API...");
    const response = await model.generateContent(userQuestion);

    const answer = response.response.text();
    console.log("Gemini response:", answer);

    res.json({ answer });
  } catch (error) {
    console.error("FULL ERROR:", error);
    res.status(500).json({ answer: "Server error. Check terminal." });
  }
});

const PORT = 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});