import type { ChatRequest, Message, StreamResponse } from '../types/chat';

// Use proxy in development, direct backend URL in production
const BACKEND_URL = import.meta.env.DEV ? '/api' : 'http://localhost:8000';

export class ChatService {
  static async sendMessage(
    messages: Message[],
    onStreamUpdate: (content: string) => void
  ): Promise<string> {
    const requestBody: ChatRequest = {
      messages,
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 1000,
      stream: true,
      stream_options: {
        include_usage: true
      }
    };

    try {
      const response = await fetch(`${BACKEND_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ 
          detail: `HTTP ${response.status}: ${response.statusText}` 
        }));
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`);
      }

      if (!response.body) {
        throw new Error('No response body received from server');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';
      let pendingChunk = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          pendingChunk += chunk;
          
          // Process complete lines
          const lines = pendingChunk.split('\n');
          pendingChunk = lines.pop() || ''; // Keep incomplete line for next iteration

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();
              if (data === '[DONE]') {
                break;
              }

              try {
                const parsed: StreamResponse = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content;
                if (delta) {
                  fullResponse += delta;
                  // Call update for each chunk received
                  onStreamUpdate(fullResponse);
                  
                  // Add small delay for typewriter effect (optional)
                  if (delta.length > 1) {
                    await new Promise(resolve => setTimeout(resolve, 10));
                  }
                }
              } catch (e) {
                // Skip invalid JSON lines
                continue;
              }
            }
          }
        }
        
        // Process any remaining chunk
        if (pendingChunk) {
          const lines = pendingChunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();
              if (data === '[DONE]') {
                break;
              }
              try {
                const parsed: StreamResponse = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content;
                if (delta) {
                  fullResponse += delta;
                  onStreamUpdate(fullResponse);
                }
              } catch (e) {
                continue;
              }
            }
          }
        }
        
      } finally {
        reader.releaseLock();
      }

      return fullResponse;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Unable to connect to the backend server. Please ensure the backend is running on http://localhost:8000');
      }
      throw error;
    }
  }

  // Alternative method with character-by-character streaming
  static async sendMessageWithTypewriter(
    messages: Message[],
    onStreamUpdate: (content: string) => void,
    typewriterSpeed: number = 30 // milliseconds per character
  ): Promise<string> {
    const requestBody: ChatRequest = {
      messages,
      model: "gpt-4o-mini", 
      temperature: 0.7,
      max_tokens: 1000,
      stream: true,
      stream_options: {
        include_usage: true
      }
    };

    try {
      const response = await fetch(`${BACKEND_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ 
          detail: `HTTP ${response.status}: ${response.statusText}` 
        }));
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`);
      }

      if (!response.body) {
        throw new Error('No response body received from server');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';
      let displayedResponse = '';
      let pendingChunk = '';

      // Start typewriter effect
      const typewriterInterval = setInterval(() => {
        if (displayedResponse.length < fullResponse.length) {
          displayedResponse = fullResponse.substring(0, displayedResponse.length + 1);
          onStreamUpdate(displayedResponse);
        }
      }, typewriterSpeed);

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          pendingChunk += chunk;
          
          const lines = pendingChunk.split('\n');
          pendingChunk = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();
              if (data === '[DONE]') {
                break;
              }

              try {
                const parsed: StreamResponse = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content;
                if (delta) {
                  fullResponse += delta;
                }
              } catch (e) {
                continue;
              }
            }
          }
        }
        
        // Wait for typewriter to finish
        while (displayedResponse.length < fullResponse.length) {
          await new Promise(resolve => setTimeout(resolve, typewriterSpeed));
        }
        
        clearInterval(typewriterInterval);
        onStreamUpdate(fullResponse);
        
      } finally {
        clearInterval(typewriterInterval);
        reader.releaseLock();
      }

      return fullResponse;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Unable to connect to the backend server. Please ensure the backend is running on http://localhost:8000');
      }
      throw error;
    }
  }
}