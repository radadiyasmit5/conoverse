import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { MessageContainer } from './styles';

const Message = ({ message }) => {
    return (
        <MessageContainer isUser={message.sender === 'user'}>
            <img
                src={message.sender === 'user' ? '/assets/user-icon.svg' : '/assets/bot-icon.svg'}
                alt={message.sender}
                className="avatar"
            />
            <div className="content">
                <div className="header">
                    <span className="sender">{message.sender}</span>
                    <span className="timestamp">{message.timestamp}</span>
                </div>
                <ReactMarkdown
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    style={vscDarkPlus}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        }
                    }}
                >
                    {message.content}
                </ReactMarkdown>
            </div>
        </MessageContainer>
    );
};

export default Message;