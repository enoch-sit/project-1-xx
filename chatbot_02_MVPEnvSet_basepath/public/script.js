class ChatBot {
    constructor() {
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.chatHistory = document.getElementById('chatHistory');
        this.status = document.getElementById('status');
        
        // Determine base path for API calls
        this.basePath = this.getBasePath();
        
        this.init();
    }

    getBasePath() {
        // Get the base path from current URL
        // If served from /chatbot02/, this will be '/chatbot02'
        // If served from root /, this will be ''
        const path = window.location.pathname;
        if (path === '/' || path === '') {
            return '';
        }
        // Remove trailing slash and return
        return path.replace(/\/$/, '');
    }

    init() {
        // Check server health on load
        this.checkServerHealth();
        
        // Event listeners
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Auto-resize text input
        this.messageInput.addEventListener('input', () => {
            this.messageInput.style.height = 'auto';
            this.messageInput.style.height = this.messageInput.scrollHeight + 'px';
        });
    }

    async checkServerHealth() {
        try {
            const response = await fetch(`${this.basePath}/api/health`);
            if (response.ok) {
                this.setStatus('Ready to chat!', 'success');
                this.enableInput();
            } else {
                throw new Error('Server health check failed');
            }
        } catch (error) {
            console.error('Health check failed:', error);
            this.setStatus('Server unavailable. Please try again later.', 'error');
        }
    }

    setStatus(message, type = 'info') {
        this.status.textContent = message;
        this.status.className = `status ${type}`;
    }

    enableInput() {
        this.messageInput.disabled = false;
        this.sendButton.disabled = false;
        this.messageInput.focus();
    }

    disableInput() {
        this.messageInput.disabled = true;
        this.sendButton.disabled = true;
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        
        if (!message) {
            this.messageInput.focus();
            return;
        }

        // Add user message to chat
        this.addMessage(message, 'user');
        
        // Clear input and show loading
        this.messageInput.value = '';
        this.messageInput.style.height = 'auto';
        this.showLoading(true);
        this.disableInput();

        try {
            const response = await fetch(`${this.basePath}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            const data = await response.json();

            if (response.ok) {
                // Add bot response to chat
                this.addMessage(data.response, 'bot');
                this.setStatus(`Ready to chat! (${data.usage.total_tokens} tokens used)`, 'success');
            } else {
                throw new Error(data.error || 'Failed to get response');
            }
        } catch (error) {
            console.error('Chat error:', error);
            this.addMessage('Sorry, I encountered an error. Please try again.', 'bot', true);
            this.setStatus('Error occurred. Please try again.', 'error');
        } finally {
            this.showLoading(false);
            this.enableInput();
            this.messageInput.focus();
        }
    }

    addMessage(content, sender, isError = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message ${isError ? 'error-message' : ''}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'user' ? '👤' : '🤖';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const textP = document.createElement('p');
        textP.textContent = content;
        
        contentDiv.appendChild(textP);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(contentDiv);
        
        this.chatHistory.appendChild(messageDiv);
        
        // Scroll to bottom
        this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
    }

    showLoading(show) {
        const sendText = this.sendButton.querySelector('.send-text');
        const loadingText = this.sendButton.querySelector('.loading-text');
        
        if (show) {
            sendText.style.display = 'none';
            loadingText.style.display = 'inline';
            this.setStatus('Thinking...', 'loading');
        } else {
            sendText.style.display = 'inline';
            loadingText.style.display = 'none';
        }
    }
}

// Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ChatBot();
});