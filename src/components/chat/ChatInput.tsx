import React, { useState, useRef, type KeyboardEvent } from 'react';
import { Send, Image as ImageIcon, Mic, X, Sparkles } from 'lucide-react';
import type { ChatAttachment } from '../../types/chat';

interface ChatInputProps {
  onSendMessage: (text: string, attachments?: ChatAttachment[]) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');
  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if ((!text.trim() && attachments.length === 0) || isLoading) return;
    onSendMessage(text, attachments);
    setText('');
    setAttachments([]);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Image Upload Handler (UI Only preview)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const newAttachment: ChatAttachment = {
      id: `att_${Date.now()}`,
      url: URL.createObjectURL(file),
      name: file.name,
      type: 'image',
    };

    setAttachments((prev) => [...prev, newAttachment]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  // Voice Input Handler (UI Only visual toggle)
  const toggleVoiceInput = () => {
    setIsRecording(!isRecording);
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  return (
    <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 sm:p-4">
      <div className="max-w-4xl mx-auto space-y-2">
        {/* Attachment Preview Bar */}
        {attachments.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {attachments.map((att) => (
              <div
                key={att.id}
                className="relative group bg-slate-100 dark:bg-slate-800 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-2 shrink-0"
              >
                <img src={att.url} alt={att.name} className="w-10 h-10 object-cover rounded" />
                <span className="text-xs max-w-[120px] truncate text-slate-700 dark:text-slate-300">
                  {att.name}
                </span>
                <button
                  onClick={() => removeAttachment(att.id)}
                  className="text-slate-400 hover:text-red-500 p-1 rounded-full transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Voice Input Active Banner */}
        {isRecording && (
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 rounded-lg p-2.5 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 animate-pulse">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span>Listening... Speak clearly about your farming query</span>
            </div>
            <button
              onClick={toggleVoiceInput}
              className="text-emerald-700 font-medium hover:underline"
            >
              Stop
            </button>
          </div>
        )}

        {/* Main Input Box */}
        <div className="relative bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-2xl focus-within:ring-2 focus-within:ring-emerald-500/50 focus-within:border-emerald-500 transition-all flex items-end p-1.5 sm:p-2">
          {/* File Upload Button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors shrink-0"
            title="Upload Crop/Leaf Image"
          >
            <ImageIcon className="w-5 h-5" />
          </button>

          {/* Voice Input UI Button */}
          <button
            type="button"
            onClick={toggleVoiceInput}
            className={`p-2 rounded-xl transition-colors shrink-0 ${
              isRecording
                ? 'text-red-600 bg-red-100 dark:bg-red-950/50'
                : 'text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 hover:bg-slate-200/60 dark:hover:bg-slate-700'
            }`}
            title="Voice Input"
          >
            <Mic className="w-5 h-5" />
          </button>

          {/* Text Area */}
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextareaInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask about crops, diseases, fertilizer, weather..."
            rows={1}
            className="w-full bg-transparent border-0 focus:ring-0 text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm resize-none py-2 px-2 max-h-32"
          />

          {/* Send Button */}
          <button
            type="button"
            onClick={handleSend}
            disabled={(!text.trim() && attachments.length === 0) || isLoading}
            className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white rounded-xl shadow-sm transition-all shrink-0 ml-1 flex items-center justify-center"
          >
            {isLoading ? (
              <Sparkles className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>

        <p className="text-[11px] text-center text-slate-400 dark:text-slate-500">
          AgriAI provides recommendations. Verify critical treatment plans with local agricultural extensions.
        </p>
      </div>
    </div>
  );
};