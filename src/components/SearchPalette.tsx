import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { patients, chairSessions } from '@/data/mockData';
import { Search, X, Users, Activity, ArrowRight } from 'lucide-react';

interface SearchPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Result {
  id: string;
  label: string;
  sub: string;
  path: string;
  type: 'patient' | 'session';
}

function buildResults(query: string): Result[] {
  const q = query.toLowerCase();
  if (!q) return [];

  const patientResults: Result[] = patients
    .filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.phone.includes(q)
    )
    .slice(0, 5)
    .map(p => ({
      id: p.id,
      label: p.name,
      sub: `${p.code} · ${p.age}y ${p.gender === 'M' ? 'Male' : 'Female'} · ${p.accessType}`,
      path: `/console/patients/${p.id}`,
      type: 'patient',
    }));

  const sessionResults: Result[] = chairSessions
    .filter(s =>
      s.patient &&
      (s.patient.name.toLowerCase().includes(q) ||
       s.patient.code.toLowerCase().includes(q) ||
       `chair ${s.chairNumber}`.includes(q))
    )
    .slice(0, 3)
    .map(s => ({
      id: s.id,
      label: `Chair ${s.chairNumber} — ${s.patient!.name}`,
      sub: `${s.patient!.code} · ${s.status.charAt(0).toUpperCase() + s.status.slice(1)}`,
      path: `/console/sessions/${s.id}`,
      type: 'session',
    }));

  return [...patientResults, ...sessionResults];
}

const RECENT: Result[] = [
  { id: 'p-4421', label: 'Ahmad Al-Rashid', sub: 'P-4421 · Active session', path: '/console/patients/p-4421', type: 'patient' },
  { id: 'p-2187', label: 'Maryam Hassan', sub: 'P-2187 · Chair 04 — Critical', path: '/console/patients/p-2187', type: 'patient' },
  { id: 's-001', label: 'Chair 01 — Ahmad Al-Rashid', sub: 'Session in progress · 85%', path: '/console/sessions/s-001', type: 'session' },
];

export default function SearchPalette({ isOpen, onClose }: SearchPaletteProps) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);

  const results = query ? buildResults(query) : RECENT;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setActiveIdx(0);
    }
  }, [isOpen]);

  // Global "/" shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && !isOpen && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        // This is handled by ConsoleLayout toggling isOpen
      }
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[activeIdx]) {
      go(results[activeIdx].path);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const go = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-[560px] mx-4 bg-white rounded-lg shadow-overlay overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-ink-900/[0.06]">
          <Search size={16} className="text-ink-300 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setActiveIdx(0); }}
            onKeyDown={handleKeyDown}
            placeholder="Search patients, sessions, chairs..."
            className="flex-1 text-14 text-ink-900 placeholder:text-ink-300 bg-transparent focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-ink-300 hover:text-ink-500 transition-colors">
              <X size={14} />
            </button>
          )}
          <kbd className="hidden sm:flex items-center h-5 px-1.5 rounded-4 bg-ink-900/[0.04] text-10 text-ink-400 font-mono">esc</kbd>
        </div>

        {/* Results */}
        <div className="max-h-[360px] overflow-y-auto">
          {results.length === 0 && query ? (
            <div className="py-12 text-center">
              <Search size={20} className="text-ink-200 mx-auto mb-2" />
              <p className="text-13 text-ink-400">No results for "{query}"</p>
            </div>
          ) : (
            <>
              {!query && (
                <p className="px-4 pt-3 pb-1.5 text-10 uppercase tracking-[0.08em] font-medium text-ink-400">
                  Recent
                </p>
              )}
              {query && results.some(r => r.type === 'patient') && (
                <p className="px-4 pt-3 pb-1 text-10 uppercase tracking-[0.08em] font-medium text-ink-400">
                  Patients
                </p>
              )}
              {results.map((result, i) => {
                const showSessionHeader = query && result.type === 'session' &&
                  (i === 0 || results[i - 1].type !== 'session');
                return (
                  <>
                    {showSessionHeader && (
                      <p key={`h-${i}`} className="px-4 pt-3 pb-1 text-10 uppercase tracking-[0.08em] font-medium text-ink-400">
                        Active Sessions
                      </p>
                    )}
                    <button
                      key={result.id}
                      onClick={() => go(result.path)}
                      onMouseEnter={() => setActiveIdx(i)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                        activeIdx === i ? 'bg-saline-50' : 'hover:bg-ink-900/[0.02]'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                        result.type === 'patient' ? 'bg-saline-100' : 'bg-stable-50'
                      }`}>
                        {result.type === 'patient'
                          ? <Users size={13} className="text-saline-500" />
                          : <Activity size={13} className="text-stable-500" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-13 font-medium text-ink-900 truncate">{result.label}</p>
                        <p className="text-11 text-ink-400 truncate">{result.sub}</p>
                      </div>
                      <ArrowRight size={13} className={`shrink-0 transition-colors ${
                        activeIdx === i ? 'text-saline-400' : 'text-ink-200'
                      }`} />
                    </button>
                  </>
                );
              })}
            </>
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center gap-3 px-4 py-2.5 border-t border-ink-900/[0.06] bg-ink-900/[0.01]">
          <span className="text-10 text-ink-300 flex items-center gap-1">
            <kbd className="px-1 py-0.5 rounded-4 bg-ink-900/[0.06] font-mono text-9">↑↓</kbd>
            navigate
          </span>
          <span className="text-10 text-ink-300 flex items-center gap-1">
            <kbd className="px-1 py-0.5 rounded-4 bg-ink-900/[0.06] font-mono text-9">↵</kbd>
            open
          </span>
          <span className="text-10 text-ink-300 flex items-center gap-1">
            <kbd className="px-1 py-0.5 rounded-4 bg-ink-900/[0.06] font-mono text-9">/</kbd>
            toggle
          </span>
        </div>
      </div>
    </div>
  );
}
