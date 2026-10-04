import React from 'react';
import { BookOpen, ExternalLink, Bookmark, Check } from 'lucide-react';
import { KnowledgeMatch } from '../../../../types/ticket';

interface KnowledgeMatchesProps {
  matches: KnowledgeMatch[];
}

export const KnowledgeMatches: React.FC<KnowledgeMatchesProps> = ({ matches }) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopySnippet = (snippet: string, id: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getSourceBadge = (source: KnowledgeMatch['source']) => {
    switch (source) {
      case 'Internal Runbook':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'SOP Guideline':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Past Resolved Ticket':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Public Docs':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-purple-600" />
          <h4 className="text-xs font-bold text-slate-800">
            Matched Knowledge Base & Runbooks
          </h4>
        </div>
        <span className="text-[11px] text-slate-500">
          Ranked by semantic vector similarity
        </span>
      </div>

      {/* Items */}
      <div className="p-3 space-y-2.5">
        {matches.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-lg border border-slate-200 bg-white hover:border-purple-200 hover:shadow-2xs transition-all space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.2 rounded-full border ${getSourceBadge(
                      item.source
                    )}`}
                  >
                    {item.source}
                  </span>
                  <span className="text-[10px] text-slate-400">•</span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {item.category}
                  </span>
                </div>
                <h5 className="text-xs font-semibold text-slate-900 mt-1 hover:text-brand-600 transition-colors cursor-pointer flex items-center gap-1">
                  <span>{item.title}</span>
                  {item.url && <ExternalLink className="w-3 h-3 text-slate-400" />}
                </h5>
              </div>

              {/* Match Score Badge */}
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                {item.relevanceScore}% Match
              </span>
            </div>

            {/* Snippet */}
            <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-md border border-slate-100 leading-relaxed font-sans flex items-start justify-between gap-2">
              <p className="line-clamp-3 italic">"{item.snippet}"</p>
              <button
                onClick={() => handleCopySnippet(item.snippet, item.id)}
                className="text-slate-400 hover:text-slate-700 p-1 shrink-0"
                title="Copy excerpt"
              >
                {copiedId === item.id ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Bookmark className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
