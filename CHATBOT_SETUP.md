# AI Chatbot Setup Guide

This guide will walk you through setting up the AI chatbot on your portfolio using Anthropic's Claude API.

## 🎯 What You've Got

Your portfolio now includes:
- ✅ **Floating chat button** - Bottom right corner of every page
- ✅ **Chat UI component** - Beautiful, responsive chat interface
- ✅ **Portfolio context** - The chatbot knows all about you, your work, and projects
- ✅ **API integration** - Ready to connect to Claude API

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Your Anthropic API Key

1. Go to [https://console.anthropic.com/](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to **API Keys** in the dashboard
4. Click **Create Key**
5. Copy your API key (starts with `sk-ant-...`)

**Pricing:** Claude API is very affordable. The chatbot uses Claude 3.5 Sonnet which costs:
- **$3 per million input tokens** (~750,000 words)
- **$15 per million output tokens** (~750,000 words)
- For a portfolio chatbot, expect **< $5/month** even with decent traffic

### Step 2: Add API Key to Your Project

1. In your project root, create a `.env` file (or rename `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your API key:
   ```
   REACT_APP_ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
   ```

3. **Important:** Make sure `.env` is in your `.gitignore` (it already should be)

### Step 3: Restart Your Development Server

```bash
npm start
```

That's it! The chatbot should now be live at the bottom right of your portfolio.

## 🧪 Testing the Chatbot

1. Look for the blue chat button in the bottom right corner
2. Click it to open the chat
3. Try these example questions:
   - "What projects has AJ worked on?"
   - "What are AJ's technical skills?"
   - "Tell me about AJ's experience"
   - "What makes AJ unique as a UX Engineer?"

## 📁 File Structure

Here's what was added to your project:

```
src/
├── components/
│   └── chat/
│       └── Chatbot.js          # Main chat UI component
├── data/
│   └── portfolioContext.js     # Your portfolio information for the AI
└── utils/
    └── chatAPI.js              # API integration (OpenAI, Claude, or custom backend)
```

## 🎨 Customization Options

### Update Portfolio Information

Edit `src/data/portfolioContext.js` to update what the chatbot knows about you:
- Work experience
- Projects
- Skills
- Professional philosophy

The chatbot will automatically use the updated information.

### Change Chat Appearance

Edit `src/components/chat/Chatbot.js`:
- Colors: Look for `var(--primary-color)` and `var(--accent-color)`
- Position: Change `bottom` and `right` values in `ChatContainer`
- Size: Adjust `width` and `height` in `ChatWindow`

### Switch to Different AI Model

In `src/utils/chatAPI.js`, you can change the model:

**Claude Models:**
- `claude-3-5-sonnet-20241022` (Current - best balance)
- `claude-3-opus-20240229` (Most capable, higher cost)
- `claude-3-haiku-20240307` (Fastest, lowest cost)

**Or Switch to OpenAI:**
1. Uncomment the OpenAI option in `sendChatMessage` function
2. Add `REACT_APP_OPENAI_API_KEY` to your `.env`

## 🔒 Security Best Practices

### ⚠️ Current Setup (Development Only)
The current setup calls the API directly from the browser. This is fine for:
- Development and testing
- Personal portfolios with low traffic
- Quick prototypes

**Warning:** Your API key is exposed in the browser's network requests.

### ✅ Production Setup (Recommended)

For production, create a backend API to keep your API key secure:

#### Option A: Simple Node.js Backend

1. Create `server.js`:
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { message, context } = req.body;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: context,
      messages: [{ role: 'user', content: message }]
    })
  });

  const data = await response.json();
  res.json({ response: data.content[0].text });
});

app.listen(3001, () => console.log('Server running on port 3001'));
```

2. In `src/utils/chatAPI.js`, uncomment the backend option

#### Option B: Firebase Functions

Deploy a Cloud Function to handle API calls securely.

#### Option C: Vercel/Netlify Serverless Functions

Use serverless functions to proxy your API requests.

## 💡 Advanced Features You Could Add

### 1. Conversation History
Store chat history in localStorage so conversations persist across page reloads.

### 2. Typing Indicators
The typing animation is already there! It shows while waiting for AI response.

### 3. Suggested Questions
The chatbot already shows 4 suggested questions when first opened. You can customize these in `Chatbot.js`.

### 4. Rate Limiting
Add rate limiting to prevent API abuse:
```javascript
// In chatAPI.js
const rateLimiter = {
  requests: [],
  limit: 10, // 10 messages per minute
  window: 60000 // 1 minute
};
```

### 5. Analytics
Track chatbot usage:
```javascript
// When a message is sent
gtag('event', 'chatbot_message', {
  message_length: message.length,
  timestamp: Date.now()
});
```

## 🐛 Troubleshooting

### Chatbot button doesn't appear
- Check browser console for errors
- Make sure `Chatbot` is imported in `App.js`
- Clear cache and refresh

### "API key not configured" error
- Verify `.env` file exists in project root
- Check the key name is exactly `REACT_APP_ANTHROPIC_API_KEY`
- Restart your dev server after adding the key

### Responses are slow
- Claude 3.5 Sonnet typically responds in 2-4 seconds
- For faster responses, switch to Claude 3 Haiku in `chatAPI.js`

### CORS errors
- This shouldn't happen with Anthropic API
- If using a backend, ensure CORS is configured

### Rate limit errors
- Anthropic has generous rate limits
- If hit, consider adding request queuing

## 📊 Monitoring Usage

Check your API usage at [https://console.anthropic.com/settings/usage](https://console.anthropic.com/settings/usage)

Set up billing alerts to avoid surprises!

## 🎉 You're All Set!

Your portfolio now has a smart AI assistant that can answer questions about your work 24/7. This is a great way to engage visitors and showcase your technical skills!

Need help? Check the comments in the code files or reach out!
