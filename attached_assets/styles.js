import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const dotFlashing = keyframes`
  0% { background-color: #888; }
  50%, 100% { background-color: rgba(136, 136, 136, 0.2); }
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ModelSelector = styled.select`
  padding: 12px;
  margin: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  font-size: 14px;
  width: 200px;
  align-self: flex-end;
`;

export const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: white;
  margin: 0 16px;
  border-radius: 8px;
  scroll-behavior: smooth;
`;

export const MessageBubble = styled.div(({ isUser }) => ({
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
    animation: `${fadeIn} 0.3s ease`,
    flexDirection: isUser ? 'row-reverse' : 'row',
    '& .avatar': {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        flexShrink: 0
    },
    '& .content': {
        maxWidth: '70%',
        background: isUser ? '#007bff' : '#f1f3f5',
        color: isUser ? 'white' : 'black',
        borderRadius: '12px',
        padding: '12px 16px',
        position: 'relative',
        '& .header': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
            fontSize: '0.8em',
            opacity: 0.8
        },
        '& .message-content': {
            lineHeight: 1.6,
            '& pre': {
                background: '#1e1e1e !important',
                borderRadius: '8px',
                padding: '12px !important',
                margin: '8px 0 !important'
            },
            '& code': {
                fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace'
            }
        }
    }
}));

export const InputContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 20px;
  border-top: 1px solid #e0e0e0;
  background: white;
  margin: 16px;
  border-radius: 8px;

  textarea {
    flex: 1;
    padding: 12px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    resize: none;
    font-family: inherit;
    font-size: 16px;
    line-height: 1.5;
    min-height: 48px;
    max-height: 200px;
    transition: all 0.2s;

    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
  }
`;

export const SendButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;

  &:hover {
    background: #0056b3;
  }

  &:disabled {
    background: #e0e0e0;
    cursor: not-allowed;
  }

  svg {
    width: 24px;
    height: 24px;
  }

  .spinner {
    width: 24px;
    height: 24px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  color: #666;
  font-size: 0.9em;

  .dot-flashing {
    position: relative;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #888;
    animation: ${dotFlashing} 1s infinite linear alternate;
    animation-delay: 0.5s;

    &::before, &::after {
      content: '';
      display: inline-block;
      position: absolute;
      top: 0;
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background-color: #888;
      animation: ${dotFlashing} 1s infinite alternate;
    }

    &::before {
      left: -15px;
      animation-delay: 0s;
    }

    &::after {
      left: 15px;
      animation-delay: 1s;
    }
  }
`;