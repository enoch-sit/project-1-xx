import { useState, useEffect } from 'react';

export type StreamingMode = 'instant' | 'typewriter';

export interface ChatSettings {
  streamingMode: StreamingMode;
  typewriterSpeed: number; // milliseconds per character
}

const DEFAULT_SETTINGS: ChatSettings = {
  streamingMode: 'instant',
  typewriterSpeed: 30
};

export const useChatSettings = () => {
  const [settings, setSettings] = useState<ChatSettings>(() => {
    const saved = localStorage.getItem('chatSettings');
    return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('chatSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<ChatSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return { settings, updateSettings };
};