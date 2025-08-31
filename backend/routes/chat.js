require("dotenv").config();
const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST ruta za Chatbot
router.post("/", async (req, res) => {
  const { question } = req.body;

  if (!question)
    return res.status(400).json({ answer: "Pitanje je obavezno." });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Ti si kuvarski asistent koji pomaže korisnicima oko recepata i kuvanja.",
        },
        { role: "user", content: question },
      ],
    });

    const answer = response.choices[0].message.content;
    res.json({ answer });
  } catch (err) {
    console.error("OpenAI API error:", err);
    res.status(500).json({ answer: "Došlo je do greške. Pokušaj ponovo." });
  }
});

module.exports = router;
