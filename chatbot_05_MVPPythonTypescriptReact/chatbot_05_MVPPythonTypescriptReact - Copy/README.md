# Chatbot MVP - React TypeScript with Real-Time Streaming

A professional chatbot application built with React TypeScript frontend, FastAPI Python backend, featuring real-time streaming responses, markdown rendering, and Docker deployment.

## 🏗️ Project Evolution: From Vanilla HTML to React TypeScript

This project demonstrates a complete transformation from a simple HTML/JavaScript chatbot to a professional React TypeScript application with advanced features.

### Architecture

- **Frontend**: React TypeScript with Vite, real-time streaming, markdown rendering
- **Backend**: FastAPI with async streaming proxy to EDUHK AI API  
- **Deployment**: Docker containerization with docker-compose
- **Features**: Chunk-by-chunk streaming, typewriter effects, settings panel

## 🤖 How This Project Was Built Using AI Prompting

This section documents the **step-by-step prompting methodology** used to build this entire application, serving as a guide for teaching AI-assisted development.

### Phase 1: Initial Assessment and Planning

#### Prompt 1: Project Analysis
```
"can you make the frontend into typescript react, you may use vite if you want"
```

**AI Response Strategy:**
- Analyzed existing vanilla HTML/JS structure
- Created a comprehensive todo list with 6 major tasks
- Identified all components needed for conversion
- Set up proper project planning with task tracking

**Key Learning**: Start with a clear, concise request and let AI break it down into manageable steps.

#### Prompt 2: Continuation and Iteration
```
"Continue: 'Continue to iterate?'"
```

**AI Response Strategy:**
- AI proactively checked for errors and issues
- Identified and fixed backend compatibility problems (uvicorn debug parameter)
- Tested both backend and frontend integration
- Demonstrated continuous improvement mindset

**Key Learning**: Use continuation prompts to let AI self-check and iterate on solutions.

### Phase 2: Technical Problem Solving

#### Prompt 3: Specific Issue Resolution
```
"can you fix the loading (with a half display text box) and allow the streaming display in the frontend?"
```

**AI Response Strategy:**
- Identified specific UI/UX issues with streaming display
- Implemented proper state management for loading/typing/streaming states
- Added visual feedback with blinking cursor animation
- Created seamless transitions between different display states

**Key Learning**: Be specific about problems you observe - describe the exact behavior you want to change.

#### Prompt 4: Environment and Deployment Setup
```
"I need to do streaming chunk by chunk display on the ui before that I want to docker compose build up -d"
```

**AI Response Strategy:**
- Prioritized Docker setup before frontend improvements
- Fixed streaming implementation in backend (critical bug discovery)
- Implemented true real-time streaming vs fake chunking
- Rebuilt and redeployed containers properly

**Key Learning**: Mention prerequisites and dependencies - AI will handle setup in logical order.

### Phase 3: Feature Enhancement

#### Prompt 5: Feature Addition Request
```
"can you also install markdown reader for each message?"
```

**AI Response Strategy:**
- Installed appropriate npm packages (react-markdown, remark-gfm, rehype-highlight)
- Created dedicated MarkdownMessage component with TypeScript types
- Added comprehensive CSS styles for all markdown elements
- Integrated markdown rendering only for AI responses (user messages stay plain text)

**Key Learning**: Feature requests can be simple - AI will handle implementation details, package selection, and integration.

#### Prompt 6: Technical Clarification
```
"great can you look into the server code and tell me is the chunk directly yield out without waiting the complete streaming"
```

**AI Response Strategy:**
- Performed detailed code analysis of the backend streaming implementation
- Discovered critical flaw: fake streaming instead of real streaming
- Completely rewrote the streaming logic using `httpx.stream()` and `aiter_text()`
- Provided detailed explanation of the problem and solution

**Key Learning**: Ask AI to analyze and explain existing code - it can spot issues you might miss.

#### Prompt 7: Process Documentation Request
```
"I am teaching how to use prompt to code can you write down step by step on how I prompt you in the readme?"
```

**AI Response Strategy:**
- Self-reflectively analyzed the entire conversation history
- Documented each prompting technique with examples
- Organized information into educational phases and learning points
- Created actionable guidance for teaching others

**Key Learning**: AI can reflect on its own process and create educational content from the interaction history.

### 🎯 Prompting Best Practices Demonstrated

#### 1. **Progressive Complexity**
- Start simple: "make the frontend into typescript react"
- Add specifics: "fix the loading and streaming display" 
- Request analysis: "look into the server code and tell me..."

#### 2. **Context Preservation**
- AI maintained context across multiple interactions
- Referenced previous decisions and implementations
- Built upon existing code structure consistently

#### 3. **Problem-Solution Cycle**
- Identify issues: "half display text box"
- Request solutions: "fix the loading"
- Verify results: "look into the server code"

#### 4. **Iterative Refinement**
- "Continue to iterate?" - Let AI self-check
- Continuous improvement without explicit requests
- AI proactively fixed compatibility issues

#### 5. **Specific Technical Requests**
- "docker compose build up -d" - Exact commands
- "markdown reader for each message" - Specific features
- "chunk by chunk streaming" - Technical requirements

### 📚 Teaching Prompting Strategies

#### For Students Learning AI-Assisted Development:

1. **Start with the End Goal**
   ```
   "Convert this vanilla HTML app to React TypeScript with Vite"
   ```
   - Clear, high-level objective
   - Let AI break it down into steps

2. **Be Specific About Problems**
   ```
   "The loading shows a half-displayed text box before streaming starts"
   ```
   - Describe exactly what you observe
   - Explain the desired behavior

3. **Ask for Analysis**
   ```
   "Look into the server code and check if streaming is real-time"
   ```
   - Request code review and explanation
   - Let AI spot issues you might miss

4. **Request Documentation**
   ```
   "Document the prompting process for teaching others"
   ```
   - AI can self-reflect and create educational content
   - Generate examples from actual interaction history

5. **Use Continuation Prompts**
   ```
   "Continue to iterate?"
   ```
   - Allow AI to self-check and improve
   - Encourage proactive problem-solving

#### Common Prompting Patterns:

- **Discovery**: "What would be the best approach to..."
- **Implementation**: "Can you implement X feature with Y requirements"
- **Analysis**: "Look into the code and tell me if..."
- **Debugging**: "Fix the issue where X happens instead of Y"
- **Documentation**: "Explain how this works" or "Document the process"

### 🎓 Educational Outcomes

Students following this prompting methodology learned:

1. **Project Planning**: How AI breaks complex tasks into manageable steps
2. **Problem Identification**: How to describe issues specifically for AI to solve
3. **Code Quality**: How AI can identify and fix technical problems
4. **Best Practices**: How AI applies industry standards automatically
5. **Documentation**: How AI can create comprehensive project documentation

This project serves as a complete example of AI-assisted full-stack development, from initial concept to production-ready application with proper documentation and deployment configuration.

## ✨ Features

- 🔐 **API Key Authentication** - Secure backend configuration with EDUHK API
- 🔄 **Real-Time Streaming** - True chunk-by-chunk streaming (fixed implementation)
- ⚡ **React TypeScript** - Modern frontend with proper type safety
- 🎨 **Markdown Rendering** - Rich text display with syntax highlighting
- 📱 **Responsive Design** - Clean, modern chat interface
- ⚙️ **Customizable Streaming** - Instant mode vs typewriter effect
- 🐳 **Docker Ready** - Containerized deployment with docker-compose
- 🎯 **Component Architecture** - Reusable React components with hooks
- 💾 **Persistent Settings** - User preferences saved to localStorage
- 🔍 **Error Handling** - Comprehensive error management and user feedback

## Features

- 🔐 API key authentication (stored locally in browser)
- 🔄 Real-time streaming responses from EDUHK AI API
- 💬 Clean chat interface with conversation history
- 🚀 FastAPI backend with proper CORS configuration
- ⚡ Direct streaming proxy (no response buffering)

## 🚀 Quick Start

### 1. Clone and Navigate to Project

```cmd
git clone <repository-url>
cd chatbot_05_MVPPythonTypescriptReact
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```cmd
# Copy the example environment file
copy .env.example .env

# Edit .env and add your EDUHK API key
EDUHK_API_KEY=your_actual_api_key_here
```

### 3. Start with Docker (Recommended)

```cmd
# Build and start all services
docker-compose up --build -d

# Backend will be available at http://localhost:8000
# Check logs: docker-compose logs chatbot-backend
```

### 4. Start Frontend Development Server

```cmd
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Frontend will be available at http://localhost:5173
```

### 5. Alternative: Manual Setup

**Backend:**
```cmd
# Install Python dependencies
pip install -r requirements.txt

# Start FastAPI server
python main.py
```

**Frontend:**
```cmd
# In frontend directory
cd frontend
npm install
npm run dev
```

### 6. Start Chatting!

- Open `http://localhost:5173` in your browser
- The backend should be running on `http://localhost:8000`
- Click the ⚙️ settings button to customize streaming behavior
- Test markdown features by asking for code examples or formatted text

## API Endpoints

### Backend Endpoints

#### `GET /`
- **Description**: Root endpoint with API information
- **Response**: API version and status

#### `GET /health`
- **Description**: Health check endpoint
- **Response**: Service health status

#### `POST /chat/completions`
- **Description**: Chat completions proxy endpoint
- **Headers**: 
  - `X-API-Key`: Your EDUHK API key
  - `Content-Type`: application/json
- **Body**: Chat completion request (see EDUHK API documentation)
- **Response**: Streaming response directly from EDUHK API

### Request Format

```json
{
  "messages": [
    {
      "role": "user",
      "content": "Hello, how are you?"
    }
  ],
  "model": "gpt-4o-mini",
  "temperature": 0.7,
  "max_tokens": 1000,
  "stream": true,
  "stream_options": {
    "include_usage": true
  }
}
```

## Configuration

### Environment Variables

The application supports the following environment variables:

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `EDUHK_API_KEY` | Your EDUHK API key | None | No* |
| `EDUHK_API_URL` | EDUHK API endpoint | Default EDUHK URL | No |
| `APP_HOST` | Server host | `0.0.0.0` | No |
| `APP_PORT` | Server port | `8000` | No |
| `APP_DEBUG` | Debug mode | `False` | No |

*Note: Either `EDUHK_API_KEY` environment variable OR `X-API-Key` header must be provided.

### API Key Priority

1. **X-API-Key Header** (highest priority) - Per-request API key
2. **EDUHK_API_KEY Environment Variable** - Default API key for all requests

This allows flexible deployment:
- **Development**: Set `EDUHK_API_KEY` in `.env` for convenience
- **Multi-tenant**: Use `X-API-Key` headers for different users
- **Production**: Set environment variables in your deployment system

### Backend Configuration

The backend is configured in `main.py`:

- **EDUHK API URL**: `https://aai02.eduhk.hk/openai/deployments/gpt-4o-mini/chat/completions`
- **CORS**: Enabled for all origins (configure for production)
- **Timeout**: 300 seconds for long responses
- **Port**: 8000 (configurable)

### Frontend Configuration

The frontend is configured in `index.html`:

- **Backend URL**: `http://localhost:8000`
- **API Key Storage**: Local storage in browser
- **Streaming**: Real-time response display

## File Structure

```
chatbot_04_MVPPython/
├── main.py                 # FastAPI backend server
├── index.html              # Frontend chat interface
├── requirements.txt        # Python dependencies
├── README.md              # This file
└── EDUHK_AIDCEC_AI_API_DOCUMENTATION.md  # API reference
```

## Development

### Running in Development Mode

1. **Backend with auto-reload**:
   ```cmd
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **Frontend with live server**:
   - Use VS Code Live Server extension, or
   - Use any HTTP server of your choice

### Customization

#### Backend Customization
- Modify `main.py` to add authentication, logging, or additional endpoints
- Update CORS configuration for production deployment
- Add rate limiting or request validation

#### Frontend Customization
- Modify `index.html` to change the UI design
- Add features like file upload, conversation export, or user settings
- Integrate with authentication systems

## Deployment

### Production Considerations

1. **Security**:
   - Configure CORS for specific origins only
   - Add request rate limiting
   - Implement proper API key validation
   - Use HTTPS in production

2. **Performance**:
   - Add connection pooling for HTTPX client
   - Implement request queuing for high traffic
   - Add caching for repeated requests

3. **Monitoring**:
   - Add logging for requests and errors
   - Implement health check endpoints
   - Monitor API usage and costs

### Docker Deployment

#### Option 1: Using Docker Compose (Recommended)

```cmd
# Build and run with docker-compose
docker-compose up --build

# Run in background
docker-compose up -d --build

# Stop the services
docker-compose down
```

#### Option 2: Using Docker directly

```cmd
# Build the image
docker build -t chatbot-backend .

# Run the container
docker run -p 8000:8000 --name chatbot-backend chatbot-backend

# Run in background
docker run -d -p 8000:8000 --name chatbot-backend chatbot-backend
```

#### Docker Files Included

- `Dockerfile` - Multi-stage build with security best practices
- `.dockerignore` - Optimized build context
- `docker-compose.yml` - Easy deployment configuration

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Ensure the frontend is accessing the correct backend URL
   - Check CORS configuration in `main.py`

2. **API Key Issues**:
   - Verify the API key is valid and has proper permissions
   - Check that the key is being sent in the `X-API-Key` header

3. **Streaming Issues**:
   - Ensure the browser supports Server-Sent Events
   - Check network connectivity to EDUHK API

4. **Connection Timeout**:
   - Increase timeout values in the backend configuration
   - Check EDUHK API service availability

### Debug Mode

To enable debug logging in the backend:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

## API Reference

For detailed API documentation, see `EDUHK_AIDCEC_AI_API_DOCUMENTATION.md`.

## License

This project is provided as-is for educational and development purposes.

## Support

For issues related to:
- **EDUHK API**: Contact EDUHK support
- **This MVP**: Check the troubleshooting section or review the code
- **FastAPI**: See [FastAPI documentation](https://fastapi.tiangolo.com/)
- **JavaScript Fetch API**: See [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)