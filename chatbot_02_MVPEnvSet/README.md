# Chatbot MVP

A simple chatbot application using the EDUHK AIDCEC AI API with a clean web interface.

## Features

- 🤖 Clean, responsive chat interface
- 🔄 Real-time conversation with AI
- 📱 Mobile-friendly design
- ⚡ Fast API responses
- 🛡️ Error handling and status indicators
- 🎨 Modern gradient UI design

## Architecture

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js + Express
- **AI Service**: EDUHK AIDCEC AI API (GPT-4o-mini)

## Why This Is Called a "Full-Stack" Application

You might wonder why we call this a "full-stack" application when it seems like just a simple chatbot. Here's the explanation:

### What Makes It Full-Stack?

**Full-stack** means the application has both **frontend** and **backend** components working together:

#### 🎨 **Frontend (Client-Side)**

- **Files**: `public/index.html`, `public/style.css`, `public/script.js`
- **What it does**: Provides the user interface (the chat window you see)
- **Technologies**: HTML for structure, CSS for styling, JavaScript for interactivity
- **Runs on**: Your web browser

#### ⚙️ **Backend (Server-Side)**

- **Files**: `server.js`, `package.json`
- **What it does**:
  - Serves the frontend files to your browser
  - Handles API requests (like when you send a chat message)
  - Communicates with the EDUHK AI service
  - Processes and returns responses
- **Technologies**: Node.js with Express framework
- **Runs on**: Your computer (as a server)

### How They Work Together

```
Your Browser (Frontend)  ←→  Express Server (Backend)  ←→  EDUHK AI API
     │                           │                           │
   - Shows chat UI            - Serves HTML/CSS/JS         - Processes AI requests
   - Sends messages           - Handles /api/chat          - Returns AI responses
   - Displays responses       - Manages API keys securely   - GPT-4o-mini model
```

### Why Not Just Frontend?

You might think: "Why not just put everything in the browser?" Here's why we need a backend:

1. **API Key Security**: The EDUHK API key must be kept secret. If we put it in frontend code, anyone could see it and steal it.

2. **CORS Protection**: The EDUHK API doesn't allow direct browser requests (CORS policy). The backend acts as a "middleman."

3. **Request Processing**: The backend can validate, process, and format requests before sending them to the AI service.

4. **Error Handling**: The server provides better error handling and logging.

### Single Server Setup

This application uses a **simplified full-stack architecture**:

- **One server** (`server.js`) handles both frontend serving AND backend API
- **One command** (`npm start`) runs the entire application
- **One URL** (`http://localhost:3000`) accesses everything

This is different from more complex setups where you might run the frontend and backend on separate servers.

## How to Run Backend and Frontend

This is a **full-stack application** where the Express server serves both the API endpoints (backend) and the frontend files from a single server.

### Prerequisites

- **Node.js** (version 14 or higher) - [Download from nodejs.org](https://nodejs.org/)
- **EDUHK AIDCEC AI API key** (required for the chatbot to work)

### Step-by-Step Setup Instructions

#### 1. Navigate to Project Directory

Open your terminal/command prompt and navigate to the project folder:

```cmd
cd <to your project folder>\chatbotMVPEnvSet
```

#### 2. Install Dependencies

Install all required Node.js packages:

```cmd
npm install
```

This will install Express, CORS, Axios, and other dependencies listed in `package.json`.

#### 3. Set Up Environment Variables

Create your environment configuration file:

```cmd
copy .env.example .env
```

Then edit the `.env` file and add your EDUHK API key:

```env
EDUHK_API_KEY=your_actual_api_key_here
PORT=3000
```

⚠️ **Important**: Never commit your `.env` file to version control - it contains sensitive information!

#### 4. Start the Application

**Production Mode:**

```cmd
npm start
```

**Development Mode** (recommended for development - auto-restarts on file changes):

```cmd
npm run dev
```

#### 5. Access the Application

1. Open your web browser
2. Navigate to: <http://localhost:3000>
3. The frontend will load automatically!
4. Wait for the status to show "Ready to chat!" before sending messages

### What Happens When You Run It

- **Backend Server**: Starts on port 3000 (or your specified PORT)
- **Frontend Serving**: Static files from `public/` folder are automatically served
- **API Endpoints**: Available at `/api/health` and `/api/chat`
- **Single Access Point**: Everything runs from `http://localhost:3000`

## API Architecture & Security

### Is This a RESTful API?

**Yes, this follows RESTful principles:**

- ✅ **HTTP Methods**: Uses appropriate HTTP verbs (`GET` for health check, `POST` for chat)
- ✅ **Resource-based URLs**: `/api/health`, `/api/chat`
- ✅ **Stateless**: Each request contains all necessary information
- ✅ **JSON Communication**: Uses JSON for request/response bodies
- ✅ **HTTP Status Codes**: Returns proper status codes (200, 400, 401, 500, etc.)

### Frontend-Backend Authentication

**Important**: There is **NO authentication** between frontend and backend in this application. Here's why:

#### Current Security Model:
```
Frontend (Browser) → Backend (Express) → EDUHK AI API
     │                    │                   │
  No Auth Required    API Key Required    Authenticated
```

1. **Frontend → Backend**: No authentication needed because:
   - Both run on the same domain (`localhost:3000`)
   - Frontend is served BY the backend server
   - It's a single-user application running locally
   - No sensitive data is exposed to frontend

2. **Backend → EDUHK API**: Authentication required:
   - Uses API key in request headers: `'api-key': API_KEY`
   - API key stored securely in `.env` file
   - Never exposed to frontend/browser

### CORS (Cross-Origin Resource Sharing) Policy

**⚠️ SECURITY WARNING**: The current CORS configuration has a major security vulnerability!

```javascript
app.use(cors()); // ❌ DANGEROUS: Allows ALL origins, methods, and headers
```

#### Current Risk:

**YES, anyone can access your API!** With `cors()` without restrictions:

- ✅ Any website can call `http://localhost:3000/api/chat`
- ✅ Any JavaScript on any domain can make requests to your backend
- ✅ If you deploy this to a public server, the entire internet can use your API
- ✅ Anyone can use YOUR API key quota and make you pay for their requests

#### Example Attack Scenario:

```javascript
// From any malicious website, someone could run:
fetch('http://localhost:3000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Hello from evil-site.com!' })
})
.then(r => r.json())
.then(data => console.log('Stole API response:', data));
```

#### Why CORS is Needed (But Should Be Restricted):

Even though frontend and backend run on the same port, JavaScript makes requests to `/api/*` endpoints, which browsers treat as potential cross-origin requests.

#### 🔒 **SECURE CORS Configuration:**

Replace the current CORS setup with:

```javascript
// For local development only
app.use(cors({
  origin: 'http://localhost:3000',  // Only allow your own frontend
  methods: ['GET', 'POST'],         // Only allow specific methods
  credentials: false                // No cookies needed
}));
```

#### 🌍 **Production-Ready CORS:**

```javascript
app.use(cors({
  origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));
```

#### 🛡️ **Additional Security Measures Needed:**

1. **Rate Limiting**: Prevent API abuse
2. **API Keys for Users**: Don't share your master EDUHK key
3. **Request Validation**: Stricter input checking
4. **Authentication**: Add user login system
5. **Network Security**: Use firewalls, VPN, or private networks

### Security Features

1. **API Key Protection**: 
   - EDUHK API key never exposed to frontend
   - Stored in environment variables
   - Server validates key on startup

2. **Input Validation**:
   - Validates message format in `/api/chat`
   - Checks for required fields
   - Type checking for message content

3. **Error Handling**:
   - Doesn't expose internal server details
   - Returns generic error messages to frontend
   - Logs detailed errors on server side

4. **Request Limits**:
   - 30-second timeout on AI API requests
   - JSON body parsing with built-in limits

### Request Flow Example

```
1. User types message in browser
2. Frontend JavaScript sends POST to /api/chat
3. Express server receives request (no auth check)
4. Server validates message format
5. Server adds API key and forwards to EDUHK API
6. EDUHK API authenticates with API key
7. AI response flows back through server to frontend
```

### Verification Steps

✅ **Server Started Successfully**: You should see:

```console
🚀 Chatbot MVP server running on http://localhost:3000
📋 Health check: http://localhost:3000/api/health
```

✅ **Health Check**: Visit `http://localhost:3000/api/health` - should return:

```json
{"status":"OK","timestamp":"..."}
```

✅ **Frontend Loaded**: The chat interface appears with "Ready to chat!" status

✅ **Chat Working**: You can send messages and receive AI responses

## API Endpoints

### Frontend

- `GET /` - Serves the chat interface

### Backend API

- `GET /api/health` - Health check endpoint
- `POST /api/chat` - Chat with AI

  ```json
  {
    "message": "Your message here"
  }
  ```

## Project Structure

```text
chatbotMVP/
├── public/
│   ├── index.html      # Main chat interface
│   ├── style.css       # UI styling
│   └── script.js       # Frontend JavaScript
├── server.js           # Express server
├── package.json        # Dependencies
├── .env.example        # Environment template
└── README.md          # This file
```

## Configuration

The application can be configured through environment variables:

- `EDUHK_API_KEY` - Your EDUHK AIDCEC AI API key (required)
- `PORT` - Server port (default: 3000)

## Usage

1. Open the application in your web browser
2. Wait for the "Ready to chat!" status
3. Type your message in the input field
4. Press Enter or click Send
5. View the AI response in the chat history

## Troubleshooting

### Common Issues

**"Server unavailable" message:**

- Check if the server is running (`npm start`)
- Verify the server is accessible on the correct port

**"Authentication failed" error:**

- Verify your `EDUHK_API_KEY` is correct in the `.env` file
- Ensure the API key is valid and active

**"Request timeout" error:**

- Check your internet connection
- The EDUHK API service might be temporarily unavailable

### Development

For development mode with automatic restart:

```cmd
npm run dev
```

### Logs

Server logs will show:

- API requests and responses
- Error details
- Server startup information

## Security Notes

- Never commit your `.env` file to version control
- Keep your API key secure and don't share it
- The frontend makes requests to your backend only, not directly to EDUHK API

## License

MIT License - feel free to use and modify as needed.

## Support

For issues related to:

- **EDUHK API**: Contact EDUHK AIDCEC support
- **This application**: Check the troubleshooting section above
