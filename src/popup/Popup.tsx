import React, { useState } from 'react';
import { callAI } from '../utils/api';
import { QUICK_RISK_PROMPT } from '../utils/prompts';

const Popup: React.FC = () => {
  const [clause, setClause] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!clause.trim()) return;
    setLoading(true);
    setResult('');
    try {
      const res = await callAI(QUICK_RISK_PROMPT, clause.trim());
      setResult(res);
    } catch (e: any) {
      setResult('Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const openSidePanel = () => {
    chrome.runtime.sendMessage({ action: 'openSidePanel' });
  };

  return (
    <div className="w-[380px] min-h-[480px] bg-surface p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-500 flex items-center justify-center text-xl font-bold text-white">
          C
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">ClauseGuard</h1>
          <p className="text-xs text-slate-400">Contract Risk Intelligence</p>
        </div>
        <button
          onClick={openSidePanel}
          className="ml-auto text-xs bg-surface-light hover:bg-surface-lighter text-rose-400 px-3 py-1.5 rounded-lg transition-colors"
        >
          Full Panel
        </button>
      </div>

      {/* Input */}
      <div className="mb-3">
        <label className="text-xs text-slate-400 mb-1 block">Paste Contract Clause</label>
        <textarea
          value={clause}
          onChange={(e) => setClause(e.target.value)}
          placeholder='e.g., "The Company reserves the right to terminate this agreement at any time without notice..."'
          className="w-full bg-surface-light border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 resize-none focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30 transition-all"
          rows={4}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); analyze(); } }}
        />
      </div>

      <button
        onClick={analyze}
        disabled={loading || !clause.trim()}
        className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-all pulse-red text-sm"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            Scanning Risk...
          </span>
        ) : 'Scan Risk'}
      </button>

      {/* Result */}
      {result && (
        <div className="mt-3 flex-1 bg-surface-light rounded-lg p-3 border border-slate-700 overflow-y-auto max-h-[240px]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            <span className="text-xs font-medium text-rose-400">Risk Assessment</span>
          </div>
          <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{result}</div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {['Full Analysis', 'Risk Scores', 'Compare'].map((label) => (
          <button
            key={label}
            onClick={openSidePanel}
            className="text-[10px] bg-surface-light hover:bg-surface-lighter text-slate-400 hover:text-rose-400 py-2 rounded-lg transition-colors border border-slate-700/50"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-3 pt-2 border-t border-slate-800 text-center">
        <span className="text-[10px] text-slate-600">Powered by ClauseGuard Engine</span>
      </div>
    </div>
  );
};

export default Popup;
