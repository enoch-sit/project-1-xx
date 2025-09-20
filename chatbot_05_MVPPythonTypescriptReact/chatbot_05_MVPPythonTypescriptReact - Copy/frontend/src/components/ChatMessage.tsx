import React from 'react';
import MarkdownMessage from './MarkdownMessage';
import type { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isStreaming = false }) => {
  const isAssistantMessage = message.role === 'assistant';
  
  return (
    <div className={`message ${message.role}`}>
      <div className="message-content">
        {isAssistantMessage ? (
          <>
            <MarkdownMessage content={message.content} />
            {isStreaming && <span className="streaming-cursor">|</span>}
          </>
        ) : (
          <>
            {message.content}
            {isStreaming && <span className="streaming-cursor">|</span>}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;