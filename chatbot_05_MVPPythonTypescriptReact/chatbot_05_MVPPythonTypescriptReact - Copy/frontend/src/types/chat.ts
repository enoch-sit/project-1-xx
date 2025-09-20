export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatRequest {
  messages: Message[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
  stream_options?: {
    include_usage: boolean;
  };
}

export interface StreamResponse {
  choices?: {
    delta?: {
      content?: string;
    };
  }[];
}