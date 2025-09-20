# Chatbot 02 MVP - Nginx Proxy Compatible Version

This is an updated version of the Chatbot 02 MVP that supports deployment behind nginx reverse proxy with custom paths.

## Key Features Added for Proxy Support

### 1. Dynamic Base Path Handling
- **Environment Variable**: `BASE_PATH` configures the proxy path
- **Server Routes**: All routes are dynamically prefixed with the base path
- **Static Files**: Served correctly under the proxy path

### 2. Frontend JavaScript Updates
- **Dynamic API Calls**: Frontend automatically detects the current path and uses it for API calls
- **Path Detection**: Works whether deployed at root (`/`) or subpath (`/chatbot02/`)

## Configuration

### Environment Variables (.env)
```bash
# EDUHK AI API Key - REQUIRED
EDUHK_API_KEY=your_api_key_here

# Server Port
PORT=3001

# Base path for nginx reverse proxy (leave empty for root deployment)
# Examples:
# BASE_PATH=/chatbot02  (for https://yourserver.com/chatbot02/)
# BASE_PATH=            (for https://yourserver.com/ - root deployment)
BASE_PATH=
```

## Deployment Scenarios

### Scenario 1: Root Deployment (Original Behavior)
```bash
# .env configuration
BASE_PATH=

# Nginx configuration
location / {
    proxy_pass http://127.0.0.1:3001;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

# Access: https://yourserver.com/
```

### Scenario 2: Subpath Deployment (Proxy Path)
```bash
# .env configuration  
BASE_PATH=/chatbot02

# Nginx configuration
location /chatbot02/ {
    proxy_pass http://127.0.0.1:3001/chatbot02/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}

# Handle redirect for missing trailing slash
location /chatbot02 {
    return 301 /chatbot02/;
}

# Access: https://yourserver.com/chatbot02/
```

## How It Works

### Server-Side Changes (server.js)
1. **Base Path Detection**: Reads `BASE_PATH` from environment variables
2. **Dynamic Routes**: All routes (`/`, `/api/health`, `/api/chat`) are prefixed with the base path
3. **Static File Serving**: Express static middleware serves files under the correct path
4. **Logging**: Shows configured base path and expected URLs on startup

### Frontend Changes (script.js)
1. **Path Detection**: `getBasePath()` function determines current URL path
2. **Dynamic API Calls**: All fetch requests use the detected base path
3. **Automatic Adaptation**: Works in both root and subpath deployments without changes

## Testing

### Local Testing
```bash
# Install dependencies
npm install

# Test root deployment
BASE_PATH= npm start
# Visit: http://localhost:3001/

# Test subpath deployment  
BASE_PATH=/chatbot02 npm start
# Visit: http://localhost:3001/chatbot02/
```

### Production Testing
```bash
# With nginx proxy at root
# Visit: https://yourserver.com/

# With nginx proxy at subpath
# Visit: https://yourserver.com/chatbot02/
```

## Differences from Original

| Feature | Original | Proxy-Compatible |
|---------|----------|------------------|
| Static Files | `app.use(express.static('public'))` | `app.use(BASE_PATH, express.static('public'))` |
| Root Route | `app.get('/', ...)` | `app.get(BASE_PATH + '/', ...)` |  
| API Routes | `app.get('/api/health', ...)` | `app.get(BASE_PATH + '/api/health', ...)` |
| Frontend API | `fetch('/api/chat', ...)` | `fetch('${this.basePath}/api/chat', ...)` |
| Configuration | Static paths | Dynamic `BASE_PATH` environment variable |

## Troubleshooting

### Common Issues

1. **404 Not Found**: Check that `BASE_PATH` matches nginx location block
2. **API Calls Fail**: Ensure frontend is detecting the correct base path
3. **Static Files 404**: Verify nginx is proxying to the correct backend URL
4. **CORS Issues**: Add proper CORS headers for your domain

### Debug Commands
```bash
# Check what routes are registered
console.log('Routes configured with BASE_PATH:', BASE_PATH)

# Test API endpoints directly
curl https://yourserver.com/chatbot02/api/health
curl -X POST https://yourserver.com/chatbot02/api/chat -H "Content-Type: application/json" -d '{"message":"test"}'
```