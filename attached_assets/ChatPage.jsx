import React from 'react';
import ChatWindow from '../components/ChatWindow';

function ChatPage({ user }) {
    return (
        <div style={{ flex: 1 }}>
            <ChatWindow user={user} />
        </div>
    );
}

export default ChatPage;
