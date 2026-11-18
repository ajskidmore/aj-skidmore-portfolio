# Verifying LangChain Implementation in Production

## Quick Console Test

Open your live site: https://aj-skidmore-portfolio.web.app

### Method 1: Check Network Requests

1. Open browser DevTools (F12 or Right-click → Inspect)
2. Go to **Network** tab
3. Open the chatbot and send a message
4. Look for the request to: `https://us-central1-aj-skidmore-portfolio.cloudfunctions.net/chat`
5. Click on the request and check the **Response** tab
6. You'll see the AI response with markdown formatting

### Method 2: Test Conversation Memory (Proves LangChain is Working)

In the browser console, paste this code:

```javascript
// Test 1: Send first message
const sessionId = `test-${Date.now()}`;
fetch('https://us-central1-aj-skidmore-portfolio.cloudfunctions.net/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: "What projects has A.J. worked on?",
    context: "A.J. has worked on Eudo, eFilmHub, and LP Wealth Group.",
    sessionId: sessionId
  })
})
.then(r => r.json())
.then(data => {
  console.log('First Response:', data.response);

  // Test 2: Send follow-up (tests conversation memory)
  return fetch('https://us-central1-aj-skidmore-portfolio.cloudfunctions.net/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: "Tell me more about the first one",
      context: "A.J. has worked on Eudo, eFilmHub, and LP Wealth Group.",
      sessionId: sessionId
    })
  });
})
.then(r => r.json())
.then(data => {
  console.log('Follow-up Response:', data.response);
  console.log('✅ If this response mentions Eudo specifically, LangChain memory is working!');
});
```

### Method 3: Check Firebase Function Logs

From your terminal:

```bash
cd "/Users/a.j.skidmore/Downloads/Portfolio Stuff/Portfolio/ajskidmore"
firebase functions:log
```

Look for these log entries:
- `Processing LangChain request...`
- `Session ID: [session-id]`
- `LangChain response generated successfully`
- `Conversation history length: X messages` (increases with each message in the session)

### What Proves LangChain is Working?

✅ **Conversation Memory**: When you ask "Tell me more about the first one" and the AI correctly understands "the first one" refers to Eudo from the previous message

✅ **Session IDs in Logs**: Firebase logs show session IDs and conversation history length increasing

✅ **Formatted Responses**: AI responses use markdown with headers, lists, and formatting

## Backend Implementation Details

### Firebase Function ([functions/index.js](functions/index.js))

```javascript
// LangChain imports
const { ChatAnthropic } = require('@langchain/anthropic');
const { ChatPromptTemplate, MessagesPlaceholder } = require('@langchain/core/prompts');
const { HumanMessage, AIMessage } = require('@langchain/core/messages');

// In-memory conversation storage
const conversationHistories = new Map();

// Get or create conversation history for session
const getConversationHistory = (sessionId) => {
  if (!conversationHistories.has(sessionId)) {
    conversationHistories.set(sessionId, []);
  }
  return conversationHistories.get(sessionId);
};

// In the chat endpoint:
const history = getConversationHistory(sessionId);
const model = initializeChatModel(apiKey);
const prompt = createChatPrompt(context);
const chain = prompt.pipe(model);

const response = await chain.invoke({
  input: message,
  history: history
});

// Store messages in history
history.push(new HumanMessage(message));
history.push(new AIMessage(response.content));
```

### Frontend Implementation ([src/components/chat/Chatbot.js](src/components/chat/Chatbot.js))

```javascript
// Generate unique session ID (persists across refreshes)
const sessionId = useRef(
  localStorage.getItem('chatSessionId') ||
  `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
);

// Save to localStorage
useEffect(() => {
  localStorage.setItem('chatSessionId', sessionId.current);
}, []);

// Send messages with session ID
const data = await sendChatMessage(messageText, portfolioContext, sessionId.current);
```

## Why This Implementation is Interview-Worthy

1. **LangChain Framework**: Shows knowledge of modern AI frameworks beyond raw API calls
2. **Conversation Memory**: Implements MessagesPlaceholder and conversation history
3. **Session Management**: Uses localStorage for persistent sessions across page refreshes
4. **Serverless Architecture**: Firebase Functions with environment variables
5. **Full-Stack**: React frontend → Firebase Function → LangChain → Claude API
6. **Production-Ready**: Deployed and working on live site

## Talking Points for Interviews

**"I implemented a chatbot using LangChain and Claude AI with conversation memory..."**

- Used ChatAnthropic model with ChatPromptTemplate
- Implemented conversation history using MessagesPlaceholder
- Session-based memory storage (could be extended to Firestore for persistence)
- Built custom proxy using Firebase Functions for secure API key management
- Frontend uses React with session IDs stored in localStorage

**"The interesting challenge was maintaining conversation context..."**

- Used LangChain's message history pattern (HumanMessage, AIMessage)
- Session IDs ensure each user gets their own conversation thread
- In-memory storage (resets on cold starts) - noted Firestore as production enhancement
- Follow-up questions work because history is passed to each LangChain invoke

**"I deployed it as a serverless function on Firebase..."**

- Firebase Functions with Node.js 20
- Environment variables for API keys using .env
- CORS configuration for cross-origin requests
- Production URL: https://aj-skidmore-portfolio.web.app
