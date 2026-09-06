import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Mic,
  Bot,
  User,
  Image as ImageIcon,
  Loader2,
  Sparkles,
  X,
} from 'lucide-react';

import type { ChatMessage } from '../../types/dashboard';
import { AgricultureService } from '../../services/api';
import { HistoryService } from '../../services/historyService';

const QUICK_SUGGESTIONS = [
  '🌾 Aman paddy pest control in Rajshahi',
  '🧪 Best NPK ratio for potato farming',
  '🦠 Paddy leaf blast treatment',
];

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: 'Salam! I am your KrishiBondhu AI advisor. Ask me anything in English or Bangla about your crops, pests, or soil.',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
  ]);

  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Voice Recognition Handler
  const handleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice input is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = 'bn-BD';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;

      setInput((prev) =>
        prev ? `${prev} ${transcript}` : transcript
      );
    };

    recognition.start();
  };

  // Image Upload Handler
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  // Send Message
  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() && !selectedImage) return;

    const currentImg = selectedImage;
    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      sender: 'user',
      text: textToSend,
      image: currentImg || undefined,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMsg]);

    setInput('');
    setSelectedImage(null);
    setIsTyping(true);

    try {
      const data = await AgricultureService.chat(textToSend, currentImg || undefined);

      const aiReply: ChatMessage = {
        id: `ai_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        sender: 'assistant',
        text: data.reply || data.response || 'কৃষিবন্ধু এআই থেকে পরামর্শ পাওয়া গেছে।',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, aiReply]);

      try {
        HistoryService.addChatHistory(textToSend, aiReply.text);
      } catch (e) {
        console.warn('Failed to save chat to history:', e);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);

      const errorMessage: ChatMessage = {
        id: `err_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        sender: 'assistant',
        text: 'আসনুন, আমি কৃষিবন্ধু এআই সহকারী। আপনার যেকোনো ফসলের রোগ, সার বা জমি তৈরি সম্পর্কিত প্রশ্ন লিখে পাঠান।',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Form Submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    sendMessage(input);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 overflow-hidden shadow-sm">
      
      {/* Header */}
      <div className="p-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-900">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-sm">
            <Bot className="w-5 h-5" />
          </div>

          <div>
            <h2 className="text-sm font-bold text-stone-800 dark:text-stone-100">
              Agro-AI Assistant
            </h2>

            <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Ready for English & Bangla
            </p>
          </div>
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user'
                ? 'flex-row-reverse'
                : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900'
                  : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
              }`}
            >
              {msg.sender === 'user' ? (
                <User className="w-4 h-4" />
              ) : (
                <Bot className="w-4 h-4" />
              )}
            </div>

            {/* Message Bubble */}
            <div
              className={`max-w-[80%] sm:max-w-[70%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-tl-xs'
              }`}
            >
              {/* Uploaded Image */}
              {msg.image && (
                <img
                  src={msg.image}
                  alt="Uploaded crop"
                  className="max-w-full h-32 object-cover rounded-xl mb-2 border border-emerald-500/20"
                />
              )}

              <p>{msg.text}</p>

              <span className="text-[9px] opacity-70 block mt-1 text-right">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>

            <div className="bg-stone-100 dark:bg-stone-800 p-3.5 rounded-2xl rounded-tl-xs flex items-center gap-1.5">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />

              <span className="text-xs text-stone-500 dark:text-stone-400">
                Analyzing query...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      {messages.length < 3 && !isTyping && (
        <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />

          {QUICK_SUGGESTIONS.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => sendMessage(suggestion)}
              className="text-[11px] whitespace-nowrap bg-stone-100 hover:bg-emerald-50 dark:bg-stone-800 dark:hover:bg-emerald-950/40 text-stone-600 dark:text-stone-300 hover:text-emerald-700 dark:hover:text-emerald-300 px-3 py-1.5 rounded-full transition-colors border border-stone-200/50 dark:border-stone-700/50"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Image Preview */}
      {selectedImage && (
        <div className="px-4 py-2 bg-stone-50 dark:bg-stone-800/50 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={selectedImage}
              alt="Preview"
              className="w-10 h-10 object-cover rounded-lg border border-stone-200 dark:border-stone-700"
            />

            <span className="text-xs text-stone-600 dark:text-stone-300">
              Image attached
            </span>
          </div>

          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="p-1 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Input Bar */}
      <form
        onSubmit={handleFormSubmit}
        className="p-3 border-t border-stone-100 dark:border-stone-800 flex items-center gap-2"
      >
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Image Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Upload leaf or crop image"
          className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-emerald-600 transition-colors"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        {/* Voice Button */}
        <button
          type="button"
          onClick={handleVoiceInput}
          aria-label="Voice input"
          className={`p-2.5 rounded-xl transition-colors ${
            isListening
              ? 'bg-rose-500 text-white animate-pulse'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-emerald-600'
          }`}
        >
          <Mic className="w-4 h-4" />
        </button>

        {/* Text Input */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask in English or বাংলা..."
          className="flex-1 bg-stone-100 dark:bg-stone-800 text-xs text-stone-800 dark:text-stone-100 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!input.trim() && !selectedImage}
          className="p-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 transition-colors shadow-xs"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};