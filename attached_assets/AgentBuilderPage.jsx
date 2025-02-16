import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  padding: 2rem;
  background: #f0f0f0;
`;

const Form = styled.form`
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const Input = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  height: 80px;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: #343541;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const DAGPlaceholder = styled.div`
  background: #ddd;
  height: 300px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
`;

function AgentBuilderPage({ user }) {
    const [prompt, setPrompt] = useState('');
    const [agent, setAgent] = useState(null);

    const handleCreateAgent = async (e) => {
        e.preventDefault();
        try {
            // Call backend to create agent (dummy endpoint)
            const res = await fetch('http://localhost:5001/api/agents', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });
            const data = await res.json();
            setAgent(data.agent);
        } catch (error) {
            console.error('Agent creation error:', error);
        }
    };

    return (
        <Container>
            <h2>Agent Builder</h2>
            <Form onSubmit={handleCreateAgent}>
                <label>Create an AI Agent</label>
                <Input
                    placeholder="Enter your natural language description..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    required
                />
                <Button type="submit">Create Agent</Button>
            </Form>
            {agent ? (
                <div>
                    <h3>Agent Created!</h3>
                    <p>Prompt: {agent.prompt}</p>
                    <DAGPlaceholder>
                        {/* Placeholder for DAG visualization */}
                        DAG Visualization Placeholder
                    </DAGPlaceholder>
                </div>
            ) : (
                <p>No agent created yet.</p>
            )}
        </Container>
    );
}

export default AgentBuilderPage;
