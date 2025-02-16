import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import ChatPage from './pages/ChatPage';
import AgentBuilderPage from './pages/AgentBuilderPage';
import Sidebar from './components/Sidebar';
import LoginModal from './components/LoginModal';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

function App() {
    // Authentication state (for demo, using local state)
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(!user);

    return (
        <Router>
            <AppContainer>
                <Sidebar user={user} onLogout={() => { setUser(null); setShowLogin(true); }} />
                <Routes>
                    <Route path="/" element={<ChatPage user={user} />} />
                    <Route path="/agent" element={<AgentBuilderPage user={user} />} />
                </Routes>
                {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={setUser} />}
            </AppContainer>
        </Router>
    );
}

export default App;
