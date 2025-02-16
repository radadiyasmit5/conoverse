const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
    {
        id: Number,
        content: String,
        isUser: Boolean,
        timestamp: { type: Date, default: Date.now }
    },
    { _id: false }
);

const ConversationSchema = new mongoose.Schema(
    {
        title: { type: String, default: 'Untitled Conversation' },
        messages: [MessageSchema],
        archived: { type: Boolean, default: false }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Conversation', ConversationSchema);
