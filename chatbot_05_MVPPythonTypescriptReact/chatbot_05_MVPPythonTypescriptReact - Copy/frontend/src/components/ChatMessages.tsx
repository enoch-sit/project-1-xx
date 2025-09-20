import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import type { Message } from '../types/chat';

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  isStreaming?: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isTyping, isStreaming = false }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isStreaming]);

  return (
    <div className="chat-messages">
      {messages.map((message, index) => {
        const isLastAssistantMessage = index === messages.length - 1 && message.role === 'assistant';
        return (
          <ChatMessage 
            key={index} 
            message={message} 
            isStreaming={isStreaming && isLastAssistantMessage}
          />
        );
      })}
      <TypingIndicator show={isTyping} />
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;