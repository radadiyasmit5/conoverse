const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// In-memory user store for demo purposes
const users = [];

// Signup endpoint
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: Date.now().toString(), username, password: hashedPassword };
    users.push(user);
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
    res.status(201).json({ user: { id: user.id, username: user.username }, token });
});

// Login endpoint
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
    res.json({ user: { id: user.id, username: user.username }, token });
});

module.exports = router;
