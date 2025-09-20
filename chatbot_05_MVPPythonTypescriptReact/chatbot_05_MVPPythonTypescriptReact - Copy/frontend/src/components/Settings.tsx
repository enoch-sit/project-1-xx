import React from 'react';
import { useChatSettings, type StreamingMode } from '../hooks/useChatSettings';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useChatSettings();

  if (!isOpen) return null;

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h3>Chat Settings</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="settings-content">
          <div className="setting-group">
            <label>Streaming Mode:</label>
            <select 
              value={settings.streamingMode} 
              onChange={(e) => updateSettings({ streamingMode: e.target.value as StreamingMode })}
            >
              <option value="instant">Instant (Real-time chunks)</option>
              <option value="typewriter">Typewriter (Character by character)</option>
            </select>
          </div>
          
          {settings.streamingMode === 'typewriter' && (
            <div className="setting-group">
              <label>Typewriter Speed:</label>
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={settings.typewriterSpeed}
                onChange={(e) => updateSettings({ typewriterSpeed: parseInt(e.target.value) })}
              />
              <span>{settings.typewriterSpeed}ms per character</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;