import React, { useState, useEffect } from 'react';
import {
  Send,
  Lock,
  Sparkles,
  Paperclip,
  Code,
  Bold,
  Italic,
  Link2,
} from 'lucide-react';
import { useTickets } from '../../../context/TicketContext';
import { Button } from '../../common/Button';

interface MessageComposerProps {
  ticketId: string;
}

export const MessageComposer: React.FC<MessageComposerProps> = ({ ticketId }) => {
  const {
    selectedTicket,
    addMessage,
    draftInComposer,
    setDraftInComposer,
  } = useTickets();

  const [isInternalNote, setIsInternalNote] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (draftInComposer) {
      setContent(draftInComposer);
    }
  }, [draftInComposer]);

  const handleInsertAiDraft = () => {
    if (selectedTicket?.aiInvestigation?.draftReply) {
      const draft = `${selectedTicket.aiInvestigation.draftReply.greeting}\n\n${selectedTicket.aiInvestigation.draftReply.body}\n\nBest regards,\nAlex Rivera\nSupport Escalations`;
      setContent(draft);
      setIsInternalNote(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    addMessage(ticketId, content, isInternalNote);
    setContent('');
    setDraftInComposer('');
  };

  const draftReplyMeta = selectedTicket?.aiInvestigation?.draftReply;

  return (
    <div
      className={`border-t p-4 transition-colors ${
        isInternalNote
          ? 'bg-amber-50/50 border-amber-200'
          : 'bg-white border-slate-200'
      }`}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Top Controls: Mode Switch & AI Draft Trigger */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setIsInternalNote(false)}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                !isInternalNote
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Public Customer Reply
            </button>
            <button
              type="button"
              onClick={() => setIsInternalNote(true)}
              className={`px-3 py-1 rounded-md font-medium flex items-center gap-1.5 transition-all ${
                isInternalNote
                  ? 'bg-amber-500 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Lock className="w-3 h-3" />
              <span>Internal Staff Note</span>
            </button>
          </div>

          {/* AI Draft Quick Insert Button */}
          {draftReplyMeta && !isInternalNote && (
            <button
              type="button"
              onClick={handleInsertAiDraft}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 shadow-2xs transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Insert AI Investigation Draft</span>
              <span className="text-[10px] bg-purple-200/70 text-purple-800 px-1 rounded font-semibold">
                {draftReplyMeta.tone}
              </span>
            </button>
          )}
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder={
              isInternalNote
                ? 'Add an internal note visible only to your teammates and engineering...'
                : 'Write your response to the customer (or click "Insert AI Investigation Draft" above)...'
            }
            className={`w-full p-3 text-xs rounded-xl border focus:outline-none transition-all resize-y ${
              isInternalNote
                ? 'bg-amber-50/40 border-amber-300 text-amber-950 placeholder-amber-700/50 focus:ring-2 focus:ring-amber-500/20'
                : 'bg-slate-50 focus:bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500'
            }`}
          />
        </div>

        {/* Bottom Toolbar & Submit Button */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1 text-slate-400">
            <button
              type="button"
              className="p-1.5 hover:text-slate-700 hover:bg-slate-100 rounded"
              title="Attach File"
            >
              <Paperclip className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="p-1.5 hover:text-slate-700 hover:bg-slate-100 rounded"
              title="Bold"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="p-1.5 hover:text-slate-700 hover:bg-slate-100 rounded"
              title="Italic"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="p-1.5 hover:text-slate-700 hover:bg-slate-100 rounded"
              title="Code block"
            >
              <Code className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="p-1.5 hover:text-slate-700 hover:bg-slate-100 rounded"
              title="Insert Link"
            >
              <Link2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">
              Press Enter + ⌘ to send
            </span>
            <Button
              type="submit"
              variant={isInternalNote ? 'secondary' : 'primary'}
              size="sm"
              icon={
                isInternalNote ? (
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )
              }
              disabled={!content.trim()}
              className={
                isInternalNote
                  ? 'bg-amber-500 hover:bg-amber-600 text-white border-transparent'
                  : ''
              }
            >
              {isInternalNote ? 'Save Internal Note' : 'Send Reply'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
