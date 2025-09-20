import React from 'react';

interface TypingIndicatorProps {
  show: boolean;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ show }) => {
  return (
    <div className={`typing-indicator ${show ? 'show' : ''}`}>
      <div className="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default TypingIndicator;