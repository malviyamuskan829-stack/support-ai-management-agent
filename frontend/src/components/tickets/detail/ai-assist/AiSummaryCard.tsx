import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Fingerprint,
  Copy,
  Check,
} from 'lucide-react';
import { AiInvestigationReport } from '../../../../types/ticket';
import { getSentimentBadgeConfig } from '../../../../utils/formatters';

interface AiSummaryCardProps {
  investigation: AiInvestigationReport;
}

export const AiSummaryCard: React.FC<AiSummaryCardProps> = ({ investigation }) => {
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  const sentimentConfig = getSentimentBadgeConfig(investigation.sentiment);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-purple-200/90 shadow-xs overflow-hidden">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50/50 to-white px-4 py-3 border-b border-purple-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-600 text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>AI Autonomous Root-Cause Analysis</span>
              <span className="text-[10px] bg-purple-100 text-purple-700 font-semibold px-1.5 py-0.2 rounded border border-purple-200">
                v2.4
              </span>
            </h4>
            <p className="text-[11px] text-slate-500">
              Scanned telemetry, logs, and identity audit streams
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full border border-purple-200 shadow-2xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-xs font-bold text-purple-950">
            {investigation.confidenceScore}%
          </span>
          <span className="text-[10px] text-slate-500 font-medium">Confidence</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Root Cause Box */}
        <div className="p-3.5 rounded-lg bg-purple-950 text-purple-100 border border-purple-800 space-y-1.5 shadow-xs">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-purple-300">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Identified Root Cause</span>
          </div>
          <p className="text-xs text-white leading-relaxed font-sans font-normal">
            {investigation.rootCauseAnalysis}
          </p>
        </div>

        {/* Sentiment Analysis Meter */}
        <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <span>Customer Sentiment & Urgency</span>
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${sentimentConfig.bg} ${sentimentConfig.text} ${sentimentConfig.border}`}
            >
              {sentimentConfig.label} ({investigation.sentiment.score}/100)
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${sentimentConfig.barColor}`}
              style={{ width: `${investigation.sentiment.score}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-600 italic">
            "{investigation.sentiment.summary}"
          </p>

          {/* Drivers */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {investigation.sentiment.drivers.map((driver, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-white text-slate-600 px-2 py-0.5 rounded border border-slate-200"
              >
                • {driver}
              </span>
            ))}
          </div>
        </div>

        {/* Extracted Key Entities & Technical Markers */}
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1">
            <Fingerprint className="w-3.5 h-3.5 text-slate-400" />
            <span>Extracted Entities & Telemetry Tokens</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {investigation.extractedEntities.map((entity, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs hover:border-purple-300 transition-colors"
              >
                <div className="min-w-0 pr-2">
                  <div className="text-[10px] text-slate-400 uppercase font-medium">
                    {entity.label}
                  </div>
                  <div className="font-mono text-xs font-semibold text-slate-800 truncate" title={entity.value}>
                    {entity.value}
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(entity.value, `ent-${i}`)}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200 shrink-0"
                  title="Copy value"
                >
                  {copiedKey === `ent-${i}` ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
