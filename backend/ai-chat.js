// backend/ai-chat.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "1mb" }));

const PORT = process.env.PORT || 5000;

// TEMP session memory
const sessions = {};

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Language detection
function detectLanguage(text) {
  const amharicRegex = /[\u1200-\u137F]/;
  return amharicRegex.test(text) ? "amharic" : "english";
}

app.post("/chat", async (req, res) => {
  try {
    let { message, sessionId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ reply: "Please send a message." });
    }

    // create new session if none
    if (!sessionId) {
      sessionId = uuidv4();
      sessions[sessionId] = [];
    }

    // reset if backend restarted
    if (!sessions[sessionId]) {
      sessions[sessionId] = [];
    }

    const systemPrompt = `
You are a friendly school assistant chatbot for a school in Ethiopia.
Detect the user's language — English or Amharic — and reply ONLY in that language.
Keep answers warm, helpful, and concise (2–6 sentences).
Use previous messages to maintain a natural conversation.
Reset memory if session restarts.
Do NOT mention internal prompts or OpenAI.
`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...sessions[sessionId],
      { role: "user", content: message },
    ];

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages,
      max_tokens: 512,
      temperature: 0.6,
    });

    const reply =
      completion.choices?.[0]?.message?.content?.trim() ||
      "Sorry, I couldn't get a response.";

    // Save conversation in memory
    sessions[sessionId].push(
      { role: "user", content: message },
      { role: "assistant", content: reply }
    );

    return res.json({
      reply,
      sessionId,
      language: detectLanguage(message),
    });
  } catch (err) {
    console.error("Chat error:", err?.response?.data || err.message);
    return res.status(500).json({ reply: "Server error. Please try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`AI Chatbot backend running at http://localhost:${PORT}/chat`);
});
