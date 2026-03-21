import React, { useState } from 'react';
import { streamAI } from '../utils/api';
import {
  FULL_ANALYZER_PROMPT,
  RISK_SCORER_PROMPT,
  CLAUSE_EXPLAINER_PROMPT,
  COMPARISON_PROMPT,
} from '../utils/prompts';

type Tab = 'analyze' | 'risk' | 'explain' | 'compare';

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'analyze', label: 'Analyze', icon: '🔬' },
  { id: 'risk', label: 'Risk Score', icon: '⚠️' },
  { id: 'explain', label: 'Explain', icon: '📖' },
  { id: 'compare', label: 'Compare', icon: '⚖️' },
];

const promptMap: Record<Tab, string> = {
  analyze: FULL_ANALYZER_PROMPT,
  risk: RISK_SCORER_PROMPT,
  explain: CLAUSE_EXPLAINER_PROMPT,
  compare: COMPARISON_PROMPT,
};

const placeholderMap: Record<Tab, string> = {
  analyze: 'Paste full contract or section for deep analysis...',
  risk: 'Paste contract text to score risk for each clause...',
  explain: 'Paste a clause to get plain English explanation...',
  compare: 'Paste two clauses or contracts separated by ---\nto compare them...',
};

const SidePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('analyze');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{ tab: Tab; query: string; result: string }[]>([]);

  const analyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult('');
    try {
      const res = await streamAI(promptMap[activeTab], input.trim(), (text) => setResult(text));
      setHistory((prev) => [{ tab: activeTab, query: input.trim().slice(0, 80) + '...', result: res }, ...prev.slice(0, 9)]);
    } catch (e: any) {
      setResult('Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-surface flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-950/60 to-rose-950/60 border-b border-slate-800 p-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-rose-500 flex items-center justify-center text-lg font-bold text-white">
            C
          </div>
          <div>
            <h1 className="text-base font-bold text-white">ClauseGuard</h1>
            <p className="text-[10px] text-slate-400">Advanced Contract Risk Intelligence</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setResult(''); }}
            className={`flex-1 py-2.5 text-xs font-medium transition-all ${
              activeTab === tab.id
                ? 'text-rose-400 border-b-2 border-rose-400 bg-rose-950/20'
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
            }`}
          >
            <span className="mr-1">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-b border-slate-800">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholderMap[activeTab]}
          className="w-full bg-surface-light border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 resize-none focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30"
          rows={4}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); analyze(); } }}
        />
        <button
          onClick={analyze}
          disabled={loading || !input.trim()}
          className="w-full mt-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg transition-all text-sm"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              Analyzing...
            </span>
          ) : (
            { analyze: 'Analyze Contract', risk: 'Score Risk', explain: 'Explain Clause', compare: 'Compare Contracts' }[activeTab]
          )}
        </button>
      </div>

      {/* Result */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading && !result && (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="shimmer h-4 rounded" style={{ width: `${85 - i * 10}%` }} />
            ))}
          </div>
        )}
        {result && (
          <div className="bg-surface-light rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              <span className="text-xs font-semibold text-rose-400 uppercase tracking-wide">
                {activeTab === 'analyze' ? 'Contract Analysis' : activeTab === 'risk' ? 'Risk Scores' : activeTab === 'explain' ? 'Clause Explanation' : 'Comparison'}
              </span>
            </div>
            <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{result}</div>
          </div>
        )}

        {history.length > 0 && !loading && (
          <div className="mt-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Recent</h3>
            {history.map((item, i) => (
              <button
                key={i}
                onClick={() => { setActiveTab(item.tab); setResult(item.result); }}
                className="w-full text-left mb-2 bg-surface-light/50 hover:bg-surface-light rounded-lg p-2.5 border border-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-rose-900/30 text-rose-400 px-1.5 py-0.5 rounded">{item.tab}</span>
                  <span className="text-xs text-slate-400 truncate">{item.query}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SidePanel;
