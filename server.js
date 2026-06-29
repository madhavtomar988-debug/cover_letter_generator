console.log("SERVER VERSION 999");
console.log("Server file started");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");
const app = express();   // <-- Pehle app banao

// Ab middleware
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
console.log(process.env.GEMINI_API_KEY);   
app.post("/generate", async (req, res) => {
    console.log("POST HIT");
    console.log(req.body);
    console.log("POST request received");
    try {
        const { name, role, company, skills } = req.body;

       const prompt = `
You are an expert HR recruiter.

Write a professional internship cover letter.

Candidate Name: ${name}
Target Role: ${role}
Target Company: ${company}
Skills: ${skills}

Instructions:
- Write only the cover letter.
- Address it as "Dear Hiring Manager,".
- Do not use placeholders like [Your Name], [Email], [Date], [Address], [Resume], [LinkedIn].
- Do not invent personal information.
- Do not mention resume attachment.
- Mention only the candidate name provided.
- Keep it between 180–250 words.
- Make it suitable for a student applying for an internship.
- Highlight the provided skills naturally.
- End with:

Sincerely,
${name}
`;

   const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
});

res.json({
    coverLetter: result.text,
});

  } catch (err) {
    console.log("========== ERROR ==========");
    console.error(err);
    console.log("Message:", err.message);

    res.status(500).json({
        error: err.message
    });
}

});
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

setInterval(() => {
    console.log("Server Alive");
}, 5000);