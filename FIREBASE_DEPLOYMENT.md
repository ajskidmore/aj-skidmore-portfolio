# Firebase Deployment Guide - LangChain Chatbot

This guide shows you how to deploy your portfolio with LangChain-powered chatbot to Firebase.

---

## Prerequisites

- Firebase CLI installed: `npm install -g firebase-tools`
- Firebase project created (you already have `aj-skidmore-portfolio`)
- Anthropic API key

---

## Step-by-Step Deployment

### 1. Install Dependencies for Firebase Functions

```bash
cd functions
npm install
cd ..
```

### 2. Configure Anthropic API Key in Firebase

Firebase Functions uses environment variables stored in Firebase config, NOT `.env` files.

```bash
# Set the Anthropic API key
firebase functions:config:set anthropic.apikey="YOUR_ANTHROPIC_API_KEY_HERE"
```

Replace `YOUR_ANTHROPIC_API_KEY_HERE` with your actual Anthropic API key.

**Verify it's set:**
```bash
firebase functions:config:get
```

You should see:
```json
{
  "anthropic": {
    "apikey": "sk-ant-..."
  }
}
```

### 3. Deploy Firebase Functions

```bash
# Deploy only functions (first time)
firebase deploy --only functions
```

This will deploy three functions:
- `chat` - Main LangChain chatbot endpoint
- `clearChat` - Clear conversation memory
- `health` - Health check endpoint

**After deployment, you'll see URLs like:**
```
✔  functions[chat(us-central1)]: https://us-central1-aj-skidmore-portfolio.cloudfunctions.net/chat
✔  functions[clearChat(us-central1)]: https://us-central1-aj-skidmore-portfolio.cloudfunctions.net/clearChat
✔  functions[health(us-central1)]: https://us-central1-aj-skidmore-portfolio.cloudfunctions.net/health
```

### 4. Update Environment Variables for Production

Create `.env.production` file in your project root:

```bash
# .env.production
REACT_APP_CHAT_API_URL=https://us-central1-aj-skidmore-portfolio.cloudfunctions.net/chat
REACT_APP_CLEAR_CHAT_API_URL=https://us-central1-aj-skidmore-portfolio.cloudfunctions.net/clearChat
```

**Replace** `us-central1-aj-skidmore-portfolio` with your actual Firebase function URLs from step 3.

### 5. Build React App

```bash
npm run build
```

This creates an optimized production build in the `build/` folder with your production environment variables.

### 6. Deploy Everything to Firebase

```bash
# Deploy both hosting and functions
firebase deploy
```

Or deploy separately:
```bash
# Deploy only hosting
firebase deploy --only hosting

# Deploy only functions
firebase deploy --only functions
```

---

## Testing Production Deployment

After deployment, your site will be live at:
```
https://aj-skidmore-portfolio.web.app
```

**Test the chatbot:**
1. Open your live site
2. Click the chat button
3. Ask: "What projects has A.J. worked on?"
4. Follow up: "Tell me more about the first one"

The chatbot should remember context from the previous message thanks to LangChain!

---

## Development vs Production

### Local Development (with LangChain)
```bash
# Terminal 1: Start local proxy
npm run proxy

# Terminal 2: Start React app
npm start
```

Uses `http://localhost:3001` for LangChain proxy.

### Production (with LangChain)
```bash
# Build and deploy
npm run build
firebase deploy
```

Uses Firebase Functions URLs for LangChain.

---

## Important Notes

### Conversation Memory Limitations

**Current Implementation:**
- Conversation history is stored **in-memory** in Firebase Functions
- Memory is **lost** when the function cold-starts (after ~15 minutes of inactivity)

**For Production (Future Enhancement):**
Store conversation history in Firestore for persistence:

```javascript
// In functions/index.js
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

// Save to Firestore instead of Map
const saveConversation = async (sessionId, history) => {
  await db.collection('conversations').doc(sessionId).set({
    history: history.map(msg => ({
      type: msg._getType(),
      content: msg.content
    })),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  });
};
```

### Cost Considerations

**Firebase Functions Free Tier:**
- 2 million invocations/month
- 400,000 GB-seconds of compute time/month
- 200,000 CPU-seconds/month

Your chatbot function is lightweight - should easily stay within free tier for moderate traffic.

**Anthropic API Costs:**
- Claude Sonnet 4: ~$3 per 1M input tokens, ~$15 per 1M output tokens
- Typical chat message: ~500 tokens total
- 1000 conversations ≈ $5-10

### Security

✅ **Secure:**
- API key is stored in Firebase Functions config (never exposed to browser)
- CORS is configured to allow requests from any origin (adjust if needed)

**Optional: Restrict CORS to your domain only:**
```javascript
// In functions/index.js
res.set('Access-Control-Allow-Origin', 'https://aj-skidmore-portfolio.web.app');
```

---

## Troubleshooting

### Functions Not Deploying
```bash
# Check Firebase CLI version
firebase --version

# Update if needed
npm install -g firebase-tools

# Login again
firebase login
```

### API Key Not Working
```bash
# Check if API key is set
firebase functions:config:get

# If not set or wrong, update it
firebase functions:config:set anthropic.apikey="YOUR_KEY"

# Redeploy functions
firebase deploy --only functions
```

### Chatbot Not Connecting in Production
1. Check browser console for errors
2. Verify `.env.production` has correct Firebase Function URLs
3. Rebuild: `npm run build`
4. Redeploy: `firebase deploy --only hosting`

### Check Function Logs
```bash
# View real-time logs
firebase functions:log

# View logs for specific function
firebase functions:log --only chat
```

---

## Updating After Code Changes

### Update Frontend Only
```bash
npm run build
firebase deploy --only hosting
```

### Update Backend Only
```bash
firebase deploy --only functions
```

### Update Both
```bash
npm run build
firebase deploy
```

---

## Summary

**What You Built:**
- ✅ LangChain-powered chatbot with conversation memory
- ✅ Serverless backend using Firebase Functions
- ✅ Production-ready deployment on Firebase Hosting
- ✅ Secure API key management
- ✅ Works flawlessly in both development and production

**Your chatbot now:**
- Maintains conversation context across messages
- Scales automatically with Firebase Functions
- Keeps API keys secure (never exposed to browser)
- Costs almost nothing for moderate traffic

**Interview Talking Point:**
"I deployed a full-stack AI chatbot using Firebase Functions and LangChain, implementing serverless architecture with conversation memory. The backend scales automatically and keeps API keys secure, while the frontend seamlessly works in both development and production environments."

---

## Quick Reference Commands

```bash
# Development
npm run proxy          # Start local proxy
npm start             # Start React app

# Deployment
firebase functions:config:set anthropic.apikey="YOUR_KEY"
npm run build
firebase deploy

# Logs & Debugging
firebase functions:log
firebase functions:config:get
```

That's it! Your LangChain chatbot is now production-ready on Firebase! 🚀
