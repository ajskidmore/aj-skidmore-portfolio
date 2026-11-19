// LangChain-powered proxy server for Anthropic API
// This allows your React app to make API calls without CORS issues
// Features: Conversation memory, prompt templates, and context management

const express = require('express');
const cors = require('cors');
require('dotenv').config();

// LangChain imports
const { ChatAnthropic } = require('@langchain/anthropic');
const { ChatPromptTemplate, MessagesPlaceholder } = require('@langchain/core/prompts');
const { HumanMessage, AIMessage, SystemMessage } = require('@langchain/core/messages');

const app = express();
const PORT = 3001;

// Enable CORS for your React app (supports multiple ports)
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3002', 'http://localhost:3001'],
  credentials: true
}));

app.use(express.json());

// Store conversation histories by session ID (stores message arrays)
const conversationHistories = new Map();

// Initialize LangChain ChatAnthropic model
const initializeChatModel = () => {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('Anthropic API key not configured');
  }

  return new ChatAnthropic({
    anthropicApiKey: apiKey,
    modelName: 'claude-sonnet-4-6',
    temperature: 0.7,
    maxTokens: 1024,
  });
};

// Get or create conversation history for a session
const getConversationHistory = (sessionId) => {
  if (!conversationHistories.has(sessionId)) {
    conversationHistories.set(sessionId, []);
  }
  return conversationHistories.get(sessionId);
};

// Create chat prompt with conversation history
const createChatPrompt = (context) => {
  return ChatPromptTemplate.fromMessages([
    ['system', `You are A.J. Skidmore's AI portfolio assistant. Your role is to help visitors learn about A.J.'s work, skills, and experience in a friendly, conversational way.

Context about A.J. Skidmore:
${context}

Provide helpful, concise responses that showcase A.J.'s expertise. Use specific examples from the context when relevant.`],
    new MessagesPlaceholder('history'),
    ['human', '{input}']
  ]);
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'LangChain-powered proxy server is running' });
});

// LangChain-powered chat endpoint
app.post('/api/chat', async (req, res) => {
  const { message, context, sessionId = 'default' } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'Anthropic API key not configured',
      message: 'Please add ANTHROPIC_API_KEY to your .env file (server-side only; never use a REACT_APP_ name)'
    });
  }

  try {
    console.log('Processing request with LangChain...');
    console.log(`Session ID: ${sessionId}`);

    // Get conversation history for this session
    const history = getConversationHistory(sessionId);

    // Initialize the chat model
    const model = initializeChatModel();

    // Create the prompt template
    const prompt = createChatPrompt(context || 'No additional context provided.');

    // Create a chain by piping prompt to model
    const chain = prompt.pipe(model);

    // Invoke the chain with message and history
    const response = await chain.invoke({
      input: message,
      history: history
    });

    // Add the user message and AI response to history
    history.push(new HumanMessage(message));
    history.push(new AIMessage(response.content));

    console.log('LangChain response generated successfully');
    console.log(`Conversation history length: ${history.length} messages`);

    res.json({
      response: response.content
    });

  } catch (error) {
    console.error('LangChain error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Endpoint to clear conversation memory for a session
app.post('/api/chat/clear', async (req, res) => {
  const { sessionId = 'default' } = req.body;

  if (conversationHistories.has(sessionId)) {
    conversationHistories.delete(sessionId);
    console.log(`Cleared conversation memory for session: ${sessionId}`);
  }

  res.json({ success: true, message: 'Conversation memory cleared' });
});

app.listen(PORT, () => {
  console.log(`✅ Proxy server running on http://localhost:${PORT}`);
  console.log(`📡 Ready to proxy requests to Anthropic API`);
});
