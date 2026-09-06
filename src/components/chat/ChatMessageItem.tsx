import React, { useState } from 'react';
import { Bot, User, Copy, Check, Image as ImageIcon } from 'lucide-react';
import type { ChatMessage } from '../../types/chat';

interface ChatMessageItemProps {
  message: ChatMessage;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * Helper to render lightweight formatting (bold, headers, bullet points, inline code)
   */
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Headers
      if (line.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-base font-bold my-2 text-slate-900 dark:text-slate-100">
            {line.replace('### ', '')}
          </h3>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-lg font-bold my-2 text-slate-900 dark:text-slate-100">
            {line.replace('## ', '')}
          </h2>
        );
      }

      // Bullet points
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const itemText = line.trim().substring(2);
        return (
          <li key={idx} className="ml-4 list-disc my-1">
            {formatBoldText(itemText)}
          </li>
        );
      }

      // Numbered lists
      if (/^\d+\.\s/.test(line.trim())) {
        return (
          <div key={idx} className="ml-2 my-1 font-medium">
            {formatBoldText(line)}
          </div>
        );
      }

      // Empty line spacer
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="my-1 leading-relaxed">
          {formatBoldText(line)}
        </p>
      );
    });
  };

  const formatBoldText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-emerald-900 dark:text-emerald-200">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className={`flex gap-3 my-4 ${isUser ? 'flex-row-reverse' : 'flex-row'} group`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${
          isUser
            ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
            : 'bg-emerald-600 text-white'
        }`}
      >
        {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </div>

      {/* Bubble Content Wrapper */}
      <div className={`max-w-[82%] sm:max-w-[75%] space-y-2`}>
        {/* Attachments preview if user uploaded an image */}
        {message.attachments && message.attachments.length > 0 && (
          <div className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {message.attachments.map((att) => (
              <div key={att.id} className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 max-w-xs shadow-sm">
                <img src={att.url} alt={att.name} className="object-cover max-h-48 w-full" />
                <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" />
                  Image
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Text Card */}
        <div
          className={`relative px-4 py-3 rounded-2xl shadow-sm text-sm ${
            isUser
              ? 'bg-emerald-600 text-white rounded-tr-sm'
              : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 rounded-tl-sm'
          }`}
        >
          <div className="text-wrap break-words">{renderFormattedContent(message.content)}</div>

          {/* Bottom Actions Row */}
          <div
            className={`mt-2 flex items-center justify-between gap-4 text-[11px] opacity-70 ${
              isUser ? 'text-emerald-100' : 'text-slate-400'
            }`}
          >
            <span>{message.timestamp}</span>

            {!isUser && (
              <button
                onClick={handleCopy}
                className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors flex items-center gap-1 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
                title="Copy message"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-500" />
                    <span className="text-emerald-500 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};