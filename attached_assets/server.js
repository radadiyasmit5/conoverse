require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors());

// Mount routes
const chatRoutes = require('./routes/chat');
const authRoutes = require('./routes/auth');
const agentRoutes = require('./routes/agents');
const conversationRoutes = require('./routes/conversations');

app.use('/api/chat', chatRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/conversations', conversationRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
