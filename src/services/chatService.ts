import type { ChatMessage, FastAPIChatRequest, FastAPIChatResponse } from '../types/chat';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
const USE_MOCK_API = true; // Set to false when FastAPI server is running

const DUMMY_RESPONSES: Record<string, string> = {
  default: `Based on your crop parameters and regional weather patterns, I recommend ensuring adequate soil moisture before applying nitrogen-rich fertilizers. 

Here are the key action steps:
1. **Soil Testing**: Verify pH levels are between 6.0 and 7.2.
2. **Irrigation**: Water heavily 24 hours prior to fertilizer application.
3. **Application Rate**: Apply **45 kg/hectare** of Urea during early morning hours to limit volatilization.

Let me know if you would like me to analyze a plant leaf image or pull recent weather forecasts!`,
  disease: `The symptoms described resemble **Early Blight (*Alternaria solani*)**.

### Recommended Treatment:
- **Fungicide**: Apply Copper-based spray every **7–10 days**.
- **Cultural Control**: Remove infected lower leaves and maintain row spacing for airflow.
- **Irrigation**: Use drip irrigation instead of overhead sprinklers to keep foliage dry.`,
  fertilizer: `For optimal yield this season, balanced **NPK 14-35-14** is highly recommended at planting, followed by a top-dressing of **Urea (46% N)** at 30 days post-germination.`,
};

export class ChatService {
  /**
   * Sends a message to the AI Assistant.
   * Prepares payload for FastAPI POST /chat endpoint.
   */
  static async sendMessage(
    sessionId: string,
    messageText: string,
    attachments?: { base64?: string }[],
    historyMessages: ChatMessage[] = []
  ): Promise<FastAPIChatResponse> {
    if (USE_MOCK_API) {
      // Simulate network latency (1.2 seconds)
      await new Promise((resolve) => setTimeout(resolve, 1200));

      let replyContent = DUMMY_RESPONSES.default;
      const lower = messageText.toLowerCase();

      if (lower.includes('disease') || lower.includes('spot') || lower.includes('fungus')) {
        replyContent = DUMMY_RESPONSES.disease;
      } else if (lower.includes('fertilizer') || lower.includes('npk') || lower.includes('urea')) {
        replyContent = DUMMY_RESPONSES.fertilizer;
      }

      return {
        id: `msg_${Date.now()}`,
        session_id: sessionId,
        reply: replyContent,
        created_at: new Date().toISOString(),
        metadata: {
          model: 'AgriLLM-v2.5',
          tokens_used: 184,
        },
      };
    }

    // ==========================================
    // Real FastAPI Fetch Call
    // ==========================================
    const payload: FastAPIChatRequest = {
      session_id: sessionId,
      message: messageText,
      image_base64: attachments?.[0]?.base64 || null,
      history: historyMessages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    };

    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return await response.json();
  }
}