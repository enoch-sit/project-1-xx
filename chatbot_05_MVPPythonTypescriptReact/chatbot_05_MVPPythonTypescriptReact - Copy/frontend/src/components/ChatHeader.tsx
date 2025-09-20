import React from 'react';

interface ChatHeaderProps {
  onSettingsClick: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onSettingsClick }) => {
  return (
    <div className="chat-header">
      <h1>🤖 Chatbot MVP</h1>
      <p>Connect to EDUHK AI API</p>
      <div className="api-key-status">✅ API key configured via backend</div>
      <button className="settings-btn" onClick={onSettingsClick} title="Settings">
        ⚙️
      </button>
    </div>
  );
};

export default ChatHeader;