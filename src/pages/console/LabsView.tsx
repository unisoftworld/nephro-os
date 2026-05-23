import { useState } from 'react';
import { motion } from 'framer-motion';
import { patients } from '@/data/mockData';
import {
  FlaskConical, Plus, Search, Filter, ChevronRight, TrendingUp,
  TrendingDown, AlertTriangle, CheckCircle2, Activity,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import NewLabOrderModal from '@/components/NewLabOrderModal';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.04, duration: 0.35 },
  }),
};

const labResults = [
  { patient: 'Ahmad Al-Rashid', code: 'P-4421', initials: 'AR', test: 'Hb', value: 10.8, unit: 'g/dL', ref: '11-13', status: 'low', date: '2026-05-15' },
  { patient: 'Fatima Al-Zahra', code: 'P-3309', initials: 'FZ', test: 'Kt/V', value: 1.52, unit: '', ref: '>1.2', status: 'normal', date: '2026-05-15' },
  { patient: 'Khalid Bin Omar', code: 'P-5102', initials: 'KO', test: 'Creatinine', value: 6.2, unit: 'mg/dL', ref: '0.7-1.3', status: 'high', date: '2026-05-14' },
  { patient: 'Maryam Hassan', code: 'P-2187', initials: 'MH', test: 'K+', value: 5.3, unit: 'mEq/L', ref: '3.5-5.0', status: 'high', date: '2026-05-14' },
  { patient: 'Yusuf Al-Mahmoud', code: 'P-4456', initials: 'YM', test: 'Phosphate', value: 4.8, unit: 'mg/dL', ref: '2.5-4.5', status: 'high', date: '2026-05-13' },
  { patient: 'Nora Al-Saud', code: 'P-6734', initials: 'NS', test: 'URR', value: 72, unit: '%', ref: '>65', status: 'normal', date: '2026-05-13' },
];

const trendData = [
  { month: 'Jan', Hb: 10.2, KtV: 1.32 },
  { month: 'Feb', Hb: 10.5, KtV: 1.38 },
  { month: 'Mar', Hb: 10.8, KtV: 1.42 },
  { month: 'Apr', Hb: 11.0, KtV: 1.45 },
  { month: 'May', Hb: 10.8, KtV: 1.48 },
];

export default function LabsView() {
  const [filter, setFilter] = useState('all');
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderedFor, setOrderedFor] = useState<string | null>(null);

  return (
    <div className="p-4 lg:p-6 max-w-[1280px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-20 font-semibold text-ink-900 tracking-[-0.02em] mb-1">Laboratory Results</h1>
          <p className="text-12 text-ink-400">Lab orders, results, and trend monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-8 border border-ink-900/[0.08] text-13 font-medium text-ink-600 hover:bg-white bg-white transition-all">
            <Filter size={14} /> Filter
          </button>
          <button
            onClick={() => setOrderOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-8 bg-saline-500 text-white text-13 font-medium hover:bg-saline-600 transition-colors shadow-raised"
          >
            <Plus size={14} /> New Order
          </button>
        </div>
      </div>

      {/* Trend Chart */}
      <motion.div custom={0} variants={fadeUp as any} initial="hidden" animate="visible" className="nephro-card mb-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-13 font-semibold text-ink-900 uppercase tracking-[0.04em]">Key Trends (Center Average)</h3>
          <div className="flex items-center gap-3 text-11">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-saline-400" />Hb (g/dL)</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-champagne-400" />Kt/V</span>
          </div>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#5C6781' }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#5C6781' }} axisLine={false} tickLine={false} domain={[9, 12]} width={32} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#5C6781' }} axisLine={false} tickLine={false} domain={[1.2, 1.6]} width={32} />
              <Line yAxisId="left" type="monotone" dataKey="Hb" stroke="#128B92" strokeWidth={2} dot={{ r: 3, fill: '#128B92' }} />
              <Line yAxisId="right" type="monotone" dataKey="KtV" stroke="#A88842" strokeWidth={2} dot={{ r: 3, fill: '#A88842' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Results Table */}
      <motion.div custom={1} variants={fadeUp as any} initial="hidden" animate="visible" className="nephro-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-900/[0.06]">
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3">Patient</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3">Test</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3">Result</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3 hidden sm:table-cell">Reference</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3">Status</th>
                <th className="text-right text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {labResults.map((lab, i) => (
                <tr key={i} className="border-b border-ink-900/[0.04] hover:bg-saline-50/[0.3] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-saline-100 flex items-center justify-center text-9 font-semibold text-saline-600">{lab.initials}</div>
                      <div>
                        <p className="text-12 font-medium text-ink-900">{lab.patient}</p>
                        <p className="data-mono text-10 text-ink-400">{lab.code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-12 font-medium text-ink-700">{lab.test}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`data-mono text-13 font-medium ${
                      lab.status === 'normal' ? 'text-ink-900' :
                      lab.status === 'low' ? 'text-info-600' :
                      'text-critical-600'
                    }`}>
                      {lab.value} {lab.unit}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="data-mono text-11 text-ink-400">{lab.ref}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={lab.status === 'normal' ? 'badge-stable' : lab.status === 'low' ? 'badge-info' : 'badge-critical'}>
                      {lab.status === 'normal' ? <CheckCircle2 size={10} /> : lab.status === 'low' ? <TrendingDown size={10} /> : <TrendingUp size={10} />}
                      {lab.status.charAt(0).toUpperCase() + lab.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="data-mono text-11 text-ink-400">{lab.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {orderedFor && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-8 bg-stable-500 text-white shadow-overlay">
          <CheckCircle2 size={16} />
          <span className="text-13 font-medium">Lab order placed for {orderedFor}</span>
        </div>
      )}

      <NewLabOrderModal
        isOpen={orderOpen}
        onClose={() => setOrderOpen(false)}
        onCreated={(name) => {
          setOrderedFor(name);
          setTimeout(() => setOrderedFor(null), 3000);
        }}
      />
    </div>
  );
}
