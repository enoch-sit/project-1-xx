const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Handle proxy base path
const BASE_PATH = process.env.BASE_PATH || '';

// Middleware
app.use(cors());
app.use(express.json());

// Configure static file serving based on base path
if (BASE_PATH) {
    app.use(BASE_PATH, express.static('public')); // Serve static files with base path
} else {
    app.use(express.static('public')); // Default behavior
}

// EDUHK AI API configuration
const EDUHK_API_URL = 'https://aai02.eduhk.hk/openai/deployments/gpt-4o-mini/chat/completions';
const API_KEY = process.env.EDUHK_API_KEY;

// Validate API key on startup
if (!API_KEY) {
    console.error('Error: EDUHK_API_KEY environment variable is required');
    process.exit(1);
}

// Serve the frontend
const indexRoute = BASE_PATH ? BASE_PATH + '/' : '/';
app.get(indexRoute, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint  
const healthRoute = BASE_PATH ? BASE_PATH + '/api/health' : '/api/health';
app.get(healthRoute, (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Chat endpoint
const chatRoute = BASE_PATH ? BASE_PATH + '/api/chat' : '/api/chat';
app.post(chatRoute, async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({
                error: 'Message is required and must be a string'
            });
        }

        // Prepare the request to EDUHK AI API
        const aiRequest = {
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful AI assistant. Provide clear, concise, and friendly responses.'
                },
                {
                    role: 'user',
                    content: message
                }
            ],
            model: 'gpt-4o-mini',
            temperature: 0.7,
            max_tokens: 1000,
            stream: false
        };

        // Make request to EDUHK AI API
        const aiResponse = await axios.post(EDUHK_API_URL, aiRequest, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': API_KEY
            },
            timeout: 30000 // 30 second timeout
        });

        // Extract the AI response
        const aiMessage = aiResponse.data.choices[0].message.content;
        const usage = aiResponse.data.usage;

        res.json({
            response: aiMessage,
            usage: usage,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Chat API Error:', error.response?.data || error.message);
        
        if (error.response?.status === 401) {
            res.status(401).json({
                error: 'Authentication failed. Please check your API key.'
            });
        } else if (error.response?.status === 400) {
            res.status(400).json({
                error: 'Bad request to AI service.'
            });
        } else if (error.code === 'ECONNABORTED') {
            res.status(504).json({
                error: 'Request timeout. Please try again.'
            });
        } else {
            res.status(500).json({
                error: 'Internal server error. Please try again later.'
            });
        }
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Chatbot MVP server running on http://localhost:${PORT}`);
    console.log(`📋 Health check: http://localhost:${PORT}${healthRoute}`);
    if (BASE_PATH) {
        console.log(`🔗 Base path configured: ${BASE_PATH}`);
        console.log(`🌐 Frontend will be available at: https://yourserver.com${BASE_PATH}/`);
    }
});