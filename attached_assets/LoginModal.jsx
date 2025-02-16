import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  width: 300px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  background: #343541;
  color: #fff;
  border: none;
  cursor: pointer;
`;

function LoginModal({ onClose, onLogin }) {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Use an environment variable or default to port 5001
    const authApiUrl = process.env.REACT_APP_AUTH_URL || 'http://localhost:5001/api/auth';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isLogin ? `${authApiUrl}/login` : `${authApiUrl}/signup`;
            const res = await axios.post(endpoint, { username, password });
            onLogin(res.data.user);
            onClose();
        } catch (error) {
            console.error('Auth Error:', error.response?.data || error.message);
            alert('Authentication failed');
        }
    };

    return (
        <ModalOverlay>
            <ModalContent>
                <h3>{isLogin ? 'Login' : 'Sign Up'}</h3>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit">{isLogin ? 'Login' : 'Sign Up'}</Button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '1rem', cursor: 'pointer' }} onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                </p>
            </ModalContent>
        </ModalOverlay>
    );
}

export default LoginModal;
