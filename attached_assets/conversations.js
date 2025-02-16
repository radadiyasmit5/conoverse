const express = require('express');
const router = express.Router();

// For demo, we use an in-memory store
let conversations = [];

// GET all conversations
router.get('/', (req, res) => {
    res.json({ conversations });
});

// GET conversation by _id
router.get('/:id', (req, res) => {
    const conversation = conversations.find(c => c._id === req.params.id);
    if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
    }
    res.json({ messages: conversation.messages });
});

// POST create a new conversation
router.post('/', (req, res) => {
    const { messages } = req.body;
    const conversation = {
        _id: Date.now().toString(),
        messages,
        title: messages && messages.length > 0 ? messages[0].content.substring(0, 20) : 'Untitled Conversation'
    };
    conversations.push(conversation);
    res.status(201).json({ conversation });
});

// PUT update a conversation
router.put('/:id', (req, res) => {
    const { messages } = req.body;
    let conversation = conversations.find(c => c._id === req.params.id);
    if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
    }
    conversation.messages = messages;
    res.json({ conversation });
});

// DELETE conversation
router.delete('/:id', (req, res) => {
    conversations = conversations.filter(c => c._id !== req.params.id);
    res.json({ message: 'Conversation deleted' });
});

// POST archive conversation (dummy implementation)
router.post('/:id/archive', (req, res) => {
    // For demo, simply return success
    res.json({ message: 'Conversation archived' });
});

module.exports = router;
