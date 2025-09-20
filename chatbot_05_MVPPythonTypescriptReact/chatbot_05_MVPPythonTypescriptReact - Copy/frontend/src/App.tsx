import React, { useState, useCallback } from 'react';
import ChatHeader from './components/ChatHeader';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import Settings from './components/Settings';
import { ChatService } from './services/chatService';
import { useChatSettings } from './hooks/useChatSettings';
import type { Message } from './types/chat';
import './styles/chat.css';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { settings } = useChatSettings();

  const handleSendMessage = useCallback(async (content: string) => {
    if (isLoading) return;

    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setIsTyping(true);
    setIsStreaming(false);

    try {
      const conversationHistory = [...messages, userMessage];
      
      // Choose streaming method based on settings
      const streamingMethod = settings.streamingMode === 'typewriter' 
        ? ChatService.sendMessageWithTypewriter
        : ChatService.sendMessage;
      
      const streamingArgs = settings.streamingMode === 'typewriter' 
        ? [conversationHistory, (streamedContent: string) => {
            setIsTyping(false);
            setIsStreaming(true);
            updateAssistantMessage(streamedContent);
          }, settings.typewriterSpeed]
        : [conversationHistory, (streamedContent: string) => {
            setIsTyping(false);
            setIsStreaming(true);
            updateAssistantMessage(streamedContent);
          }];
      
      // @ts-ignore - Dynamic method call
      const fullResponse = await streamingMethod(...streamingArgs);

      // Ensure final response is set
      if (fullResponse) {
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage && lastMessage.role === 'assistant') {
            lastMessage.content = fullResponse;
          } else {
            newMessages.push({ role: 'assistant', content: fullResponse });
          }
          return newMessages;
        });
      }

    } catch (error) {
      setIsTyping(false);
      setIsStreaming(false);
      
      const errorMessage: Message = {
        role: 'system',
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
      setMessages(prev => [...prev, errorMessage]);
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
      setIsStreaming(false);
    }
  }, [messages, isLoading, settings]);

  const updateAssistantMessage = (streamedContent: string) => {
    setMessages(prev => {
      const newMessages = [...prev];
      const lastMessage = newMessages[newMessages.length - 1];
      
      if (lastMessage && lastMessage.role === 'assistant') {
        lastMessage.content = streamedContent;
      } else {
        newMessages.push({ role: 'assistant', content: streamedContent });
      }
      return newMessages;
    });
  };

  return (
    <div className="chat-container">
      <ChatHeader onSettingsClick={() => setShowSettings(true)} />
      <ChatMessages messages={messages} isTyping={isTyping} isStreaming={isStreaming} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      <Settings isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
};

export default App;
