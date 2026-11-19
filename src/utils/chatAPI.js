// Chat API utilities
// This file handles API calls to your chosen LLM provider

// API keys must never be used in this file: anything in a REACT_APP_* variable is
// copied into the public JavaScript bundle. The Anthropic key lives only on the
// server (functions/.env as ANTHROPIC_API_KEY), and the browser talks to that backend.

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
