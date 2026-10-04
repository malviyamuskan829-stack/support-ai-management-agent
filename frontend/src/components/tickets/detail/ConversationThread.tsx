import React from 'react';
import { Lock, Paperclip, Shield } from 'lucide-react';
import { TicketMessage } from '../../../types/ticket';
import { Avatar } from '../../common/Avatar';

interface ConversationThreadProps {
  messages: TicketMessage[];
}

export const ConversationThread: React.FC<ConversationThreadProps> = ({ messages }) => {
  return (
    <div className="space-y-4 p-5">
      {messages.map((msg) => {
        // System Event Message
        if (msg.senderType === 'system') {
          return (
            <div
              key={msg.id}
              className="flex items-center justify-center gap-2 py-2 text-xs text-slate-500"
            >
              <div className="h-px bg-slate-200 flex-1" />
              <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
                <Shield className="w-3 h-3 text-slate-500" />
                <span className="font-semibold text-slate-700">{msg.senderName}:</span>
                <span>{msg.content}</span>
                <span className="text-slate-400 text-[10px]">({msg.timestamp})</span>
              </div>
              <div className="h-px bg-slate-200 flex-1" />
            </div>
          );
        }

        // Internal Note
        if (msg.isInternalNote) {
          return (
            <div
              key={msg.id}
              className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 shadow-2xs space-y-2 relative"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-md bg-amber-200 text-amber-800">
                    <Lock className="w-3 h-3" />
                  </div>
                  <span className="text-xs font-bold text-amber-900">
                    Internal Staff Note
                  </span>
                  <span className="text-xs text-amber-700 font-medium">
                    • By {msg.senderName}
                  </span>
                </div>
                <span className="text-[11px] text-amber-700">{msg.timestamp}</span>
              </div>

              <p className="text-xs text-amber-900 leading-relaxed font-sans whitespace-pre-wrap">
                {msg.content}
              </p>
            </div>
          );
        }

        // Customer or Agent Message
        const isAgent = msg.senderType === 'agent';

        return (
          <div
            key={msg.id}
            className={`flex gap-3 text-left ${isAgent ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <Avatar
              name={msg.senderName}
              src={msg.senderAvatar}
              size="md"
            />

            <div
              className={`max-w-[85%] rounded-2xl p-4 text-xs shadow-2xs space-y-1.5 ${
                isAgent
                  ? 'bg-brand-600 text-white rounded-tr-none shadow-brand-600/10'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
              }`}
            >
              <div
                className={`flex items-center justify-between gap-4 text-[11px] ${
                  isAgent ? 'text-brand-100' : 'text-slate-500'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-current">
                    {msg.senderName}
                  </span>
                  {isAgent && (
                    <span className="text-[10px] bg-white/20 px-1 rounded text-white font-medium">
                      Agent
                    </span>
                  )}
                </div>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`leading-relaxed whitespace-pre-wrap ${
                  isAgent ? 'text-white' : 'text-slate-800'
                }`}
              >
                {msg.content}
              </div>

              {msg.attachments && msg.attachments.length > 0 && (
                <div className="pt-2 border-t border-white/20 mt-2 space-y-1">
                  {msg.attachments.map((att, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 text-[11px] opacity-90 underline cursor-pointer"
                    >
                      <Paperclip className="w-3 h-3" />
                      <span>{att.name} ({att.size})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
