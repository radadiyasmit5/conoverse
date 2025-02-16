import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from 'styled-components';
import { FiSend, FiPlus, FiChevronDown, FiTrash2, FiArchive, FiGlobe, FiUpload } from 'react-icons/fi';

// ================= Styled Components =================
const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #343541;
  font-family: 'Segoe UI', sans-serif;
`;

const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #2a2d35;
  position: relative;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

const MessageWrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: ${({ $isUser }) => ($isUser ? '#343541' : '#444654')};
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const MessageAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background: ${({ $isUser }) => ($isUser ? '#10a37f' : '#ececf1')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $isUser }) => ($isUser ? '#fff' : '#000')};
  flex-shrink: 0;
`;

const InputArea = styled.div`
  padding: 1rem;
  background: #40414f;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const TextareaContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 1rem 4rem 1rem 1rem;
  background: #40414f;
  border: 1px solid #565869;
  border-radius: 8px;
  color: #ececf1;
  font-size: 1rem;
  line-height: 1.5;
  resize: none;
  min-height: 44px;
`;

const SendButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${({ disabled }) => (disabled ? '#6b6c7b' : '#ececf1')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const ExtraOptions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 0.5rem;
`;

const OptionButton = styled.button`
  background: ${({ active }) => (active ? '#10a37f' : '#343541')};
  border: none;
  padding: 5px 8px;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #202123;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #40414f;
`;

const ModelDropdownContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
`;

const FileInput = styled.input`
  display: none;
`;

// ================= ChatWindow Component =================
const ChatWindow = ({ user }) => {
    // Local UI states
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [selectedModel, setSelectedModel] = useState('gpt-4');
    const [isLoading, setIsLoading] = useState(false);

    // Extra options states
    const [enableWeb, setEnableWeb] = useState(false);
    const [enableDrive, setEnableDrive] = useState(false);

    // Conversation history state
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);

    // Models for selection
    const models = [
        { id: 'gpt-4', name: 'GPT-4' },
        { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
        { id: 'claude-2', name: 'Claude 2' },
    ];

    // Define API base URLs (backend on port 5001)
    const chatApiUrl = process.env.REACT_APP_CHAT_URL || 'http://localhost:5001/api/chat';
    const convApiUrl = process.env.REACT_APP_CONV_URL || 'http://localhost:5001/api/conversations';

    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    // Scroll to bottom when messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Fetch conversations when component mounts
    useEffect(() => {
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        try {
            const response = await axios.get(convApiUrl);
            setConversations(response.data.conversations);
        } catch (error) {
            console.error('Error fetching conversations:', error);
        }
    };

    const handleConversationSelect = async (conversation) => {
        console.log(conversation._id);
        setSelectedConversation(conversation);
        try {
            const response = await axios.get(`${convApiUrl}/${conversation._id}`);
            setMessages(response.data.messages);
        } catch (error) {
            console.error('Error fetching conversation messages:', error);
        }
    };

    const handleDeleteConversation = async (conversationId, e) => {
        e.stopPropagation();
        try {
            await axios.delete(`${convApiUrl}/${conversationId}`);
            fetchConversations();
            if (selectedConversation && selectedConversation._id === conversationId) {
                setSelectedConversation(null);
                setMessages([]);
            }
        } catch (error) {
            console.error('Error deleting conversation:', error);
        }
    };

    const handleArchiveConversation = async (conversationId, e) => {
        e.stopPropagation();
        try {
            await axios.post(`${convApiUrl}/${conversationId}/archive`);
            fetchConversations();
        } catch (error) {
            console.error('Error archiving conversation:', error);
        }
    };

    const handleNewChat = () => {
        setSelectedConversation(null);
        setMessages([]);
    };

    const handleSubmit = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = {
            id: Date.now(),
            content: input,
            isUser: true,
        };

        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const response = await axios.post(chatApiUrl, {
                prompt: input,
                model: selectedModel,
                web: enableWeb,
                drive: enableDrive,
            });
            const botMessage = {
                id: Date.now() + 1,
                content: response.data.response || 'No response from AI',
                isUser: false,
            };
            const updatedMessages = [...newMessages, botMessage];
            setMessages(updatedMessages);

            if (!selectedConversation) {
                const convResponse = await axios.post(convApiUrl, { messages: updatedMessages });
                setSelectedConversation(convResponse.data.conversation);
            } else {
                await axios.put(`${convApiUrl}/${selectedConversation._id}`, { messages: updatedMessages });
            }
            fetchConversations();
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Dummy implementation: just log the file name
            console.log('File uploaded:', file.name);
            // Here you can integrate with your backend/Google Drive API
        }
    };

    return (
        <Container>
            <ChatArea>
                <TopBar>
                    <ModelDropdownContainer>
                        <label>Model:</label>
                        <ModelDropdown
                            value={selectedModel}
                            onChange={(e) => setSelectedModel(e.target.value)}
                        >
                            {models.map((model) => (
                                <option key={model.id} value={model.id}>
                                    {model.name}
                                </option>
                            ))}
                        </ModelDropdown>
                    </ModelDropdownContainer>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <OptionButton
                            type="button"
                            active={enableWeb}
                            onClick={() => setEnableWeb((prev) => !prev)}
                        >
                            <FiGlobe /> Web
                        </OptionButton>
                        <OptionButton
                            type="button"
                            active={enableDrive}
                            onClick={() => setEnableDrive((prev) => !prev)}
                        >
                            <FiUpload /> Drive
                        </OptionButton>
                        <OptionButton
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                        >
                            <FiUpload /> Upload File
                        </OptionButton>
                        <FileInput type="file" ref={fileInputRef} onChange={handleFileUpload} />
                    </div>
                </TopBar>
                <MessagesContainer>
                    {messages.map((message) => (
                        <MessageWrapper key={message.id} $isUser={message.isUser}>
                            <MessageAvatar $isUser={message.isUser}>
                                {message.isUser ? 'Y' : 'GPT'}
                            </MessageAvatar>
                            <div
                                style={{
                                    color: '#ececf1',
                                    whiteSpace: 'pre-wrap',
                                    width: 'calc(100% - 60px)',
                                    maxWidth: '800px',
                                    margin: '0 auto',
                                }}
                            >
                                <ReactMarkdown
                                    components={{
                                        code({ node, inline, className, children, ...props }) {
                                            const match = /language-(\w+)/.exec(className || '');
                                            return !inline && match ? (
                                                <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
                                                    {String(children).replace(/\n$/, '')}
                                                </SyntaxHighlighter>
                                            ) : (
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                            );
                                        },
                                    }}
                                >
                                    {message.content}
                                </ReactMarkdown>
                            </div>
                        </MessageWrapper>
                    ))}
                    {isLoading && (
                        <MessageWrapper $isUser={false}>
                            <MessageAvatar $isUser={false}>GPT</MessageAvatar>
                            <div
                                style={{
                                    color: '#ececf1',
                                    width: 'calc(100% - 60px)',
                                    maxWidth: '800px',
                                    margin: '0 auto',
                                    textAlign: 'left',
                                }}
                            >
                                <div className="typing-indicator">
                                    <div className="dot" />
                                    <div className="dot" />
                                    <div className="dot" />
                                </div>
                            </div>
                        </MessageWrapper>
                    )}
                    <div ref={messagesEndRef} />
                </MessagesContainer>

                <InputArea>
                    <TextareaContainer>
                        <StyledTextarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit();
                                }
                            }}
                            placeholder="Send a message..."
                            disabled={isLoading}
                        />
                        <SendButton
                            onClick={handleSubmit}
                            disabled={isLoading || !input.trim()}
                        >
                            <FiSend size={20} />
                        </SendButton>
                    </TextareaContainer>
                </InputArea>
            </ChatArea>
        </Container>
    );
};

export default ChatWindow;
