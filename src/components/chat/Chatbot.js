import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { ThemeContext } from '../../contexts/ThemeContext';
import { portfolioContext } from '../../data/portfolioContext';
import { sendChatMessage } from '../../utils/chatAPI';

const ChatContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
`;

const ChatButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-fill), var(--accent-fill));
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(59, 130, 246, 0.5);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ChatWindow = styled(motion.div)`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 380px;
  height: 550px;
  background-color: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 768px) {
    width: calc(100vw - 2rem);
    height: calc(100vh - 140px);
    right: -1rem;
  }
`;

const ChatHeader = styled.div`
  padding: 1.25rem;
  background: linear-gradient(135deg, var(--primary-fill), var(--accent-fill));
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatTitle = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
  }

  span {
    font-size: 0.85rem;
    opacity: 0.9;
    margin-top: 0.25rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 1.25rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--primary-fill);
    border-radius: 3px;
  }
`;

const Message = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
  gap: 0.25rem;
`;

const MessageBubble = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 12px;
  max-width: ${props => props.$isUser ? '75%' : '90%'};
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
  background-color: ${props => props.$isUser
    ? 'var(--primary-color)'
    : props.isLight ? '#f0f4f8' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.$isUser
    ? 'white'
    : 'var(--text-color)'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  font-size: 0.9rem;

  /* Markdown styling for AI messages */
  ${props => !props.$isUser && `
    p {
      margin: 0.5rem 0;
      line-height: 1.5;
      font-size: 0.9rem;

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    strong {
      font-weight: 600;
      color: var(--primary-color);
    }

    em {
      font-style: italic;
    }

    h1, h2, h3, h4, h5, h6 {
      margin: 0.75rem 0 0.5rem 0;
      font-weight: 600;
      color: var(--secondary-color);
      line-height: 1.3;

      &:first-child {
        margin-top: 0;
      }
    }

    h1 {
      font-size: 1.05rem;
    }

    h2 {
      font-size: 1rem;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 0.25rem;
    }

    h3 {
      font-size: 0.95rem;
    }

    ul, ol {
      margin: 0.5rem 0;
      padding-left: 1.5rem;

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    li {
      margin: 0.3rem 0;
      line-height: 1.5;
      font-size: 0.9rem;
    }

    code {
      background-color: ${props.isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)'};
      padding: 0.125rem 0.25rem;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      font-size: 0.85em;
    }

    pre {
      background-color: ${props.isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)'};
      padding: 0.5rem;
      border-radius: 6px;
      overflow-x: auto;
      margin: 0.5rem 0;

      code {
        background-color: transparent;
        padding: 0;
      }
    }

    hr {
      border: none;
      border-top: 1px solid var(--border-color);
      margin: 0.75rem 0;
    }

    blockquote {
      border-left: 3px solid var(--primary-color);
      padding-left: 0.75rem;
      margin: 0.5rem 0;
      font-style: italic;
      opacity: 0.9;
    }

    a {
      color: var(--primary-color);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  `}
`;

const MessageTime = styled.span`
  font-size: 0.7rem;
  color: var(--text-color);
  opacity: 0.6;
  padding: 0 0.5rem;
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: ${props => props.isLight ? '#f0f4f8' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 12px;
  max-width: 80px;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--primary-fill);
    animation: typing 1.4s infinite;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }

  @keyframes typing {
    0%, 60%, 100% {
      transform: translateY(0);
      opacity: 0.7;
    }
    30% {
      transform: translateY(-10px);
      opacity: 1;
    }
  }
`;

const InputContainer = styled.div`
  padding: 1rem;
  border-top: 1px solid ${props => props.isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.1)'};
  display: flex;
  gap: 0.75rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 8px;
  background-color: ${props => props.isLight ? '#f8fafc' : 'rgba(255, 255, 255, 0.05)'};
  color: var(--text-color);
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: var(--primary-color);
  }

  &::placeholder {
    color: var(--text-color);
    opacity: 0.5;
  }
`;

const SendButton = styled.button`
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, var(--primary-fill), var(--accent-fill));
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  min-width: 50px;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuggestedQuestions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const SuggestedQuestion = styled.button`
  padding: 0.5rem 0.75rem;
  background-color: ${props => props.isLight ? '#f0f4f8' : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${props => props.isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 8px;
  color: var(--text-color);
  font-size: 0.85rem;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--primary-fill);
    color: white;
    border-color: var(--primary-color);
  }
`;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { isLight } = useContext(ThemeContext);

  // Generate a unique session ID for this chat session (persists across browser refreshes)
  const sessionId = useRef(
    localStorage.getItem('chatSessionId') ||
    `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
  );

  // Save session ID to localStorage
  useEffect(() => {
    localStorage.setItem('chatSessionId', sessionId.current);
  }, []);

  const suggestedQuestions = [
    "What projects has A.J. worked on?",
    "What are A.J.'s technical skills?",
    "Tell me about A.J.'s experience",
    "What makes A.J. unique as a UX Engineer?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Only scroll when user sends a message, not when AI replies
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].isUser) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message when chat opens for the first time
      setMessages([{
        text: "Hi! I'm A.J.'s AI portfolio assistant. Ask me anything about his work, skills, or experience!",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  }, [isOpen]);

  const sendMessage = async (messageText = input) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = {
      text: messageText,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call the chat API with LangChain support (includes sessionId for conversation memory)
      const data = await sendChatMessage(messageText, portfolioContext, sessionId.current);

      const botMessage = {
        text: data.response,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        text: "Sorry, I'm having trouble connecting. Please make sure the API is set up correctly!",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <ChatContainer>
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <ChatHeader>
              <ChatTitle>
                <h3>Chat with A.J.'s AI Assistant</h3>
                <span>Ask me anything!</span>
              </ChatTitle>
              <CloseButton onClick={() => setIsOpen(false)}>
                <FaTimes />
              </CloseButton>
            </ChatHeader>

            <MessagesContainer>
              {messages.map((message, index) => (
                <Message
                  key={index}
                  $isUser={message.isUser}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <MessageBubble $isUser={message.isUser} isLight={isLight}>
                    {message.isUser ? (
                      message.text
                    ) : (
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    )}
                  </MessageBubble>
                  <MessageTime>{message.timestamp}</MessageTime>
                </Message>
              ))}

              {messages.length === 1 && !isLoading && (
                <SuggestedQuestions>
                  {suggestedQuestions.map((question, index) => (
                    <SuggestedQuestion
                      key={index}
                      isLight={isLight}
                      onClick={() => sendMessage(question)}
                    >
                      {question}
                    </SuggestedQuestion>
                  ))}
                </SuggestedQuestions>
              )}

              {isLoading && (
                <Message $isUser={false}>
                  <TypingIndicator isLight={isLight}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </TypingIndicator>
                </Message>
              )}
              <div ref={messagesEndRef} />
            </MessagesContainer>

            <InputContainer isLight={isLight}>
              <Input
                isLight={isLight}
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <SendButton onClick={() => sendMessage()} disabled={isLoading || !input.trim()}>
                <FaPaperPlane />
              </SendButton>
            </InputContainer>
          </ChatWindow>
        )}
      </AnimatePresence>

      <ChatButton
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <FaTimes /> : <FaComments />}
      </ChatButton>
    </ChatContainer>
  );
};

export default Chatbot;
