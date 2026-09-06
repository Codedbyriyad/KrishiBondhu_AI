export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatAttachment {
  id: string;
  url: string;
  name: string;
  type: 'image';
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  attachments?: ChatAttachment[];
}

export interface ChatSession {
  id: string;
  title: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export interface SuggestedPrompt {
  id: string;
  category: 'Crop Care' | 'Fertilizer' | 'Disease' | 'Weather';
  title: string;
  prompt: string;
}

// ==========================================
// FastAPI Request/Response DTOs (Future Integration)
// ==========================================

export interface FastAPIChatRequest {
  session_id: string;
  message: string;
  image_base64?: string | null;
  history?: Array<{
    role: string;
    content: string;
  }>;
}

export interface FastAPIChatResponse {
  id: string;
  session_id: string;
  reply: string;
  created_at: string;
  metadata?: {
    model: string;
    tokens_used?: number;
  };
}