# Chatbot MVP - EDUHK AI API Integration

A minimal chatbot MVP that connects a frontend to the EDUHK AI API through a FastAPI backend with streaming support.

## Architecture

- **Frontend**: HTML/CSS/JavaScript with streaming response handling
- **Backend**: FastAPI with async streaming proxy to EDUHK API
- **API**: RESTful API with API key authentication

## Features

- 🔐 API key authentication (stored locally in browser)
- 🔄 Real-time streaming responses from EDUHK AI API
- 💬 Clean chat interface with conversation history
- 🚀 FastAPI backend with proper CORS configuration
- ⚡ Direct streaming proxy (no response buffering)

## Prerequisites

- Python 3.8 or higher
- A valid EDUHK API key

## Quick Start

### 1. Configure Environment Variables

**Option A: Using .env file (Recommended)**
```cmd
# Copy the example environment file
copy .env.example .env

# Edit .env and add your EDUHK API key
# EDUHK_API_KEY=your_actual_api_key_here
```

**Option B: Set environment variables directly**
```cmd
# Windows
set EDUHK_API_KEY=your_actual_api_key_here

# Linux/Mac
export EDUHK_API_KEY=your_actual_api_key_here
```

### 2. Install Dependencies

```cmd
pip install -r requirements.txt
```

### 3. Start the Backend Server

```cmd
python main.py
```

The backend will start on `http://localhost:8000`

### 4. Open the Frontend

Open `index.html` in your web browser, or serve it through a simple HTTP server:

```cmd
# Python 3
python -m http.server 3000

# Then visit http://localhost:3000
```

### 5. Start Chatting

- If you set `EDUHK_API_KEY` in your environment, you can start chatting immediately!
- If not, enter your EDUHK API key in the frontend interface

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