# Starting Your Portfolio with Chatbot

## Quick Start (2 Terminals Required)

You need to run **TWO servers** for the chatbot to work:
1. **React app** (port 3000) - Your portfolio website
2. **Proxy server** (port 3001) - Handles API calls to avoid CORS issues

### Terminal 1: Start the Proxy Server

```bash
npm run proxy
```

You should see:
```
✅ Proxy server running on http://localhost:3001
📡 Ready to proxy requests to Anthropic API
```

### Terminal 2: Start the React App

```bash
npm start
```

Your browser will open to `http://localhost:3000`

## ✅ Testing the Chatbot

1. Look for the **blue chat button** in the bottom right corner
2. Click it to open the chat
3. Try these questions:
   - "What projects has AJ worked on?"
   - "What are AJ's technical skills?"
   - "Tell me about the Eudo project"

## 🐛 Troubleshooting

### Chatbot says "I'm having trouble connecting"

**Check Terminal 1 (Proxy Server):**
- Is the proxy server running?
- Do you see "Proxy server running on http://localhost:3001"?
- If not, run `npm run proxy` in a new terminal

**Check the Browser Console (F12):**
- Look for error messages
- Should see "Proxying request..." logs in Terminal 1

### Port 3001 already in use

Stop any other processes using port 3001:
```bash
# Find the process
lsof -i :3001

# Kill it (replace PID with the actual number)
kill -9 PID
```

## 📝 How It Works

```
Browser (React App)  →  Proxy Server  →  Anthropic API
    localhost:3000    →  localhost:3001  →  api.anthropic.com
```

The proxy server:
- Receives requests from your React app
- Adds your API key securely
- Forwards to Anthropic API
- Returns the response to your app

This avoids CORS issues that happen when browsers try to call external APIs directly.

## 🚀 For Production

For production deployment, you have several options:

1. **Vercel/Netlify Serverless Functions** (Recommended)
2. **Deploy proxy server separately** (Heroku, Railway, etc.)
3. **Use a backend you already have**

See `CHATBOT_SETUP.md` for production deployment details.

## 💡 Quick Commands Reference

```bash
# Start proxy server (Terminal 1)
npm run proxy

# Start React app (Terminal 2)
npm start

# Build for production
npm run build
```

That's it! Both servers need to be running for the chatbot to work. 🎉
