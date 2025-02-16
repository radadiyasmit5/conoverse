const express = require('express');
const OpenAI = require('openai'); // Using latest package with default export style in v4
const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

router.post('/', async (req, res) => {
    try {
        const { prompt, model } = req.body;
        const completion = await openai.chat.completions.create({
            model: model || 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
        });

        res.json({
            response: completion.choices[0].message.content,
        });
    } catch (error) {
        console.error('OpenAI Error:', error);
        res.status(500).json({
            error: 'Error processing request',
            details: error.message,
        });
    }
});

module.exports = router;
