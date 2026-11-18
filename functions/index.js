// Firebase Cloud Functions with LangChain for AI Chatbot
// This provides serverless backend for your portfolio chatbot

require('dotenv').config();
const functions = require('firebase-functions');
const { ChatAnthropic } = require('@langchain/anthropic');
const { ChatPromptTemplate, MessagesPlaceholder } = require('@langchain/core/prompts');
const { HumanMessage, AIMessage } = require('@langchain/core/messages');

// In-memory conversation storage (resets when function cold-starts)
// For production, consider using Firestore for persistent storage
const conversationHistories = new Map();

// Initialize LangChain ChatAnthropic model
const initializeChatModel = (apiKey) => {
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

// Main chat endpoint - LangChain-powered with conversation memory
exports.chat = functions.https.onRequest(async (req, res) => {
  // Set CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { message, context, sessionId = 'default' } = req.body;

  if (!message) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  // Get API key from environment variable (modern approach)
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.error('Anthropic API key not configured');
    res.status(500).json({
      error: 'API key not configured',
      message: 'Please set ANTHROPIC_API_KEY environment variable'
    });
    return;
  }

  try {
    console.log('Processing LangChain request...');
    console.log(`Session ID: ${sessionId}`);

    // Get conversation history for this session
    const history = getConversationHistory(sessionId);

    // Initialize the chat model
    const model = initializeChatModel(apiKey);

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

    res.status(200).json({
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

// Clear conversation memory endpoint
exports.clearChat = functions.https.onRequest(async (req, res) => {
  // Set CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  const { sessionId = 'default' } = req.body;

  if (conversationHistories.has(sessionId)) {
    conversationHistories.delete(sessionId);
    console.log(`Cleared conversation memory for session: ${sessionId}`);
  }

  res.status(200).json({
    success: true,
    message: 'Conversation memory cleared'
  });
});

// Health check endpoint
exports.health = functions.https.onRequest((req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Firebase Functions with LangChain is running'
  });
});
