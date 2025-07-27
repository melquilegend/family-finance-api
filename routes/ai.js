const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

// Initialize OpenAI with your backend environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/ai/ask
router.post('/ask', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful financial assistant. Provide actionable and relevant advice.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const responseText = completion.choices?.[0]?.message?.content;
    res.json({ answer: responseText || 'No response received' });
  } catch (error) {
    console.error('[OpenAI Error]', error);
    res.status(500).json({ error: 'Failed to get response from OpenAI' });
  }
});

module.exports = router;
