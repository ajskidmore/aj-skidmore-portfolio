// Chat API utilities
// This file handles API calls to your chosen LLM provider

/**
 * OPTION 1: OpenAI GPT API
 *
 * To use OpenAI:
 * 1. Get API key from https://platform.openai.com/api-keys
 * 2. Add REACT_APP_OPENAI_API_KEY to your .env file
 * 3. Use the sendMessageToOpenAI function below
 */
export const sendMessageToOpenAI = async (message, context) => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OpenAI API key not configured. Add REACT_APP_OPENAI_API_KEY to your .env file');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // or 'gpt-4' for better quality but higher cost
        messages: [
          {
            role: 'system',
            content: context
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'OpenAI API request failed');
    }

    const data = await response.json();
    return {
      response: data.choices[0].message.content,
      success: true
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return {
      response: "I'm having trouble connecting right now. Please try again or reach out through the contact form!",
      success: false,
      error: error.message
    };
  }
};

/**
 * OPTION 2: Anthropic Claude API
 *
 * To use Claude:
 * 1. Get API key from https://console.anthropic.com/
 * 2. Add REACT_APP_ANTHROPIC_API_KEY to your .env file
 * 3. Use the sendMessageToClaude function below
 */
export const sendMessageToClaude = async (message, context) => {
  const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;

  console.log('API Key exists:', !!apiKey);
  console.log('API Key starts with:', apiKey?.substring(0, 15));

  if (!apiKey) {
    throw new Error('Anthropic API key not configured. Add REACT_APP_ANTHROPIC_API_KEY to your .env file');
  }

  try {
    console.log('Sending request to Anthropic API...');

    // TEMPORARY FIX: Using a simple approach that works in development
    // For production, you should use a backend API (see CHATBOT_SETUP.md)
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: context,
        messages: [
          {
            role: 'user',
            content: message
          }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Anthropic API Error Response:', error);
      throw new Error(error.error?.message || 'Anthropic API request failed');
    }

    const data = await response.json();
    console.log('Anthropic API Success!');
    return {
      response: data.content[0].text,
      success: true
    };
  } catch (error) {
    console.error('Anthropic API Error:', error);
    console.error('Error details:', error.message);
    return {
      response: "I'm having trouble connecting right now. Please try again or reach out through the contact form!",
      success: false,
      error: error.message
    };
  }
};

/**
 * OPTION 3: Server-Side API (Recommended for Production)
 *
 * For production, you should create a backend API endpoint to keep your API keys secure.
 * This prevents exposing your API keys in the frontend code.
 *
 * Example backend endpoint (Node.js/Express):
 *
 * app.post('/api/chat', async (req, res) => {
 *   const { message, context } = req.body;
 *
 *   // Call OpenAI or Claude from your backend
 *   const response = await fetch('https://api.openai.com/v1/chat/completions', {
 *     method: 'POST',
 *     headers: {
 *       'Content-Type': 'application/json',
 *       'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
 *     },
 *     body: JSON.stringify({
 *       model: 'gpt-4o-mini',
 *       messages: [
 *         { role: 'system', content: context },
 *         { role: 'user', content: message }
 *       ]
 *     })
 *   });
 *
 *   const data = await response.json();
 *   res.json({ response: data.choices[0].message.content });
 * });
 */
export const sendMessageToBackend = async (message, context, sessionId = 'default') => {
  try {
    // Use environment variable for API URL, fallback to localhost for development
    const API_URL = process.env.REACT_APP_CHAT_API_URL || 'http://localhost:3001/api/chat';

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        context,
        sessionId  // LangChain will use this to maintain conversation memory
      })
    });

    if (!response.ok) {
      throw new Error('Backend API request failed');
    }

    const data = await response.json();
    return {
      response: data.response,
      success: true
    };
  } catch (error) {
    console.error('Backend API Error:', error);
    return {
      response: "I'm having trouble connecting right now. Please try again or reach out through the contact form!",
      success: false,
      error: error.message
    };
  }
};

/**
 * Clear conversation memory for a session
 */
export const clearConversationMemory = async (sessionId = 'default') => {
  try {
    const CLEAR_API_URL = process.env.REACT_APP_CLEAR_CHAT_API_URL || 'http://localhost:3001/api/chat/clear';

    const response = await fetch(CLEAR_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId })
    });

    if (!response.ok) {
      throw new Error('Failed to clear conversation memory');
    }

    return await response.json();
  } catch (error) {
    console.error('Clear memory error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Main function to send messages with LangChain support
 * Uses backend proxy (local or Firebase Functions) with LangChain conversation memory
 */
export const sendChatMessage = async (message, context, sessionId = 'default') => {
  // Always use backend with LangChain (works in both development and production)
  // Development: Uses local proxy server (http://localhost:3001)
  // Production: Uses Firebase Functions (set via REACT_APP_CHAT_API_URL)
  return await sendMessageToBackend(message, context, sessionId);
};
