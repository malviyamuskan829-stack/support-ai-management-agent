import React, { useState } from 'react';
import {
  Activity,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  ChevronDown,
  ChevronUp,
  Terminal,
} from 'lucide-react';
import { InvestigationLog } from '../../../../types/ticket';

interface InvestigationLogsProps {
  logs: InvestigationLog[];
}

export const InvestigationLogs: React.FC<InvestigationLogsProps> = ({ logs }) => {
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedLogId(expandedLogId === id ? null : id);
  };

  const getStatusIcon = (status: InvestigationLog['status']) => {
    switch (status) {
      case 'error':
        return <XCircle className="w-4 h-4 text-rose-500 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />;
      case 'info':
      default:
        return <Info className="w-4 h-4 text-blue-500 shrink-0" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-600" />
          <h4 className="text-xs font-bold text-slate-800">
            Company Data & System Telemetry Logs
          </h4>
        </div>
        <span className="text-[11px] text-slate-500 font-mono">
          {logs.length} sources probed
        </span>
      </div>

      {/* Log Entries */}
      <div className="divide-y divide-slate-100">
        {logs.map((log) => {
          const isExpanded = expandedLogId === log.id;
          return (
            <div key={log.id} className="p-3.5 hover:bg-slate-50/60 transition-colors">
              <div
                onClick={() => toggleExpand(log.id)}
                className="cursor-pointer flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-2.5">
                  {getStatusIcon(log.status)}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-900">
                        {log.title}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded border border-slate-200">
                        {log.source}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {log.details}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-slate-400 font-mono">
                    {log.timestamp}
                  </span>
                  {log.rawSnippet && (
                    <button className="text-slate-400 hover:text-slate-600">
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Raw Telemetry Snippet Modal/Accordion */}
              {isExpanded && log.rawSnippet && (
                <div className="mt-3 p-3 bg-slate-900 rounded-lg text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1.5 pb-1 border-b border-slate-800 text-[10px]">
                    <Terminal className="w-3 h-3 text-emerald-400" />
                    <span>Raw Event Payload Snippet</span>
                  </div>
                  <pre className="whitespace-pre-wrap">{log.rawSnippet}</pre>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
