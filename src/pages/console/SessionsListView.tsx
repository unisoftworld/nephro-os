import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { chairSessions } from '@/data/mockData';
import {
  Activity, Search, Filter, Plus, ChevronRight, Clock,
  CheckCircle2, AlertTriangle, AlertCircle, Calendar, Gauge,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.04, duration: 0.35 },
  }),
};

function StatusBadge({ status }: { status: string }) {
  const configs: Record<string, { text: string; class: string }> = {
    active: { text: 'Active', class: 'badge-stable' },
    scheduled: { text: 'Scheduled', class: 'badge-info' },
    advisory: { text: 'Advisory', class: 'badge-advisory' },
    critical: { text: 'Critical', class: 'badge-critical' },
    completed: { text: 'Completed', class: 'inline-flex items-center h-20 px-7 rounded-pill text-11 font-medium bg-ink-900/[0.04] text-ink-400' },
  };
  const c = configs[status] || configs.scheduled;
  return <span className={c.class}>{c.text}</span>;
}

export default function SessionsListView() {
  const navigate = useNavigate();

  const sessions = chairSessions.filter(s => s.status !== 'empty');

  return (
    <div className="p-4 lg:p-6 max-w-[1280px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-20 font-semibold text-ink-900 tracking-[-0.02em] mb-1">Sessions</h1>
          <p className="text-12 text-ink-400">{sessions.length} sessions today</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-8 border border-ink-900/[0.08] text-13 font-medium text-ink-600 hover:bg-white bg-white transition-all">
            <Filter size={14} /> Filter
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-8 bg-saline-500 text-white text-13 font-medium hover:bg-saline-600 transition-colors shadow-raised">
            <Plus size={14} /> New Session
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-5">
        <div className="relative max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
          <input
            type="text"
            placeholder="Search sessions by patient, chair, or status..."
            className="w-full h-9 pl-9 pr-4 rounded-8 border border-ink-900/[0.08] bg-white text-13 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 transition-all"
          />
        </div>
      </div>

      {/* Session Table */}
      <div className="nephro-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-900/[0.06]">
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3">Chair</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3">Patient</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3 hidden sm:table-cell">Status</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3 hidden md:table-cell">Vitals</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3 hidden lg:table-cell">Progress</th>
                <th className="text-right text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s, i) => (
                <motion.tr
                  key={s.id}
                  custom={i}
                  variants={fadeUp as any}
                  initial="hidden"
                  animate="visible"
                  onClick={() => navigate(`/console/sessions/${s.id}`)}
                  className="border-b border-ink-900/[0.04] hover:bg-saline-50/[0.3] cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3">
                    <span className="data-mono text-13 font-medium text-ink-900">Chair {s.chairNumber}</span>
                  </td>
                  <td className="px-4 py-3">
                    {s.patient ? (
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-saline-100 flex items-center justify-center text-9 font-semibold text-saline-600">
                          {s.patient.initials}
                        </div>
                        <div>
                          <p className="text-12 font-medium text-ink-900">{s.patient.name}</p>
                          <p className="data-mono text-10 text-ink-400">{s.patient.code}</p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-12 text-ink-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {s.session ? (
                      <div className="text-11 data-mono text-ink-500">
                        <span>BP {s.session.bp}</span>
                        <span className="text-ink-200 mx-1">|</span>
                        <span>VP {s.session.vp}</span>
                      </div>
                    ) : (
                      <span className="text-11 text-ink-300">Not started</span>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {s.session ? (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="data-mono text-10 text-ink-400">{s.session.elapsedPercent}%</span>
                          <span className="data-mono text-10 text-ink-300">{s.session.elapsed}</span>
                        </div>
                        <div className="h-1 bg-ink-900/[0.06] rounded-full overflow-hidden w-24">
                          <div
                            className="h-full bg-saline-400 rounded-full"
                            style={{ width: `${s.session.elapsedPercent}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <span className="text-10 text-ink-300">Scheduled</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="inline-flex items-center gap-1 text-11 text-saline-500 hover:text-saline-600 font-medium transition-colors">
                      Monitor
                      <ChevronRight size={12} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
