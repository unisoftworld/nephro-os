import { motion } from 'framer-motion';
import { patients } from '@/data/mockData';
import {
  HeartPulse, Plus, Search, Filter, ChevronRight, Droplets,
  AlertTriangle, CheckCircle2, Clock, Activity,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.04, duration: 0.35 },
  }),
};

const accessRecords = [
  { patient: 'Ahmad Al-Rashid', code: 'P-4421', initials: 'AR', type: 'AV Fistula', location: 'L. Radiocephalic', created: '2023-03-15', flow: 920, diameter: 5.2, maturity: 'Mature', status: 'stable' },
  { patient: 'Fatima Al-Zahra', code: 'P-3309', initials: 'FZ', type: 'AV Graft', location: 'R. Brachiocephalic', created: '2022-08-20', flow: 780, diameter: 6.0, maturity: 'Mature', status: 'advisory' },
  { patient: 'Khalid Bin Omar', code: 'P-5102', initials: 'KO', type: 'Catheter', location: 'IJ', created: '2026-01-10', flow: 350, diameter: null, maturity: 'N/A', status: 'critical' },
  { patient: 'Yusuf Al-Mahmoud', code: 'P-4456', initials: 'YM', type: 'AV Fistula', location: 'L. Brachiobasilic', created: '2024-01-22', flow: 650, diameter: 4.1, maturity: 'Maturing', status: 'stable' },
  { patient: 'Nora Al-Saud', code: 'P-6734', initials: 'NS', type: 'AV Fistula', location: 'L. Radiocephalic', created: '2024-06-15', flow: 820, diameter: 4.8, maturity: 'Mature', status: 'stable' },
];

export default function VascularView() {
  return (
    <div className="p-4 lg:p-6 max-w-[1280px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-20 font-semibold text-ink-900 tracking-[-0.02em]">Vascular Access</h1>
            <span className="badge-brand">12 Active</span>
          </div>
          <p className="text-12 text-ink-400">AV fistulas, grafts, and catheter management</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-8 border border-ink-900/[0.08] text-13 font-medium text-ink-600 hover:bg-white bg-white transition-all">
            <Search size={14} /> Search
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-8 bg-saline-500 text-white text-13 font-medium hover:bg-saline-600 transition-colors shadow-raised">
            <Plus size={14} /> New Access
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'AV Fistulas', value: '8', icon: HeartPulse, color: 'text-saline-500' },
          { label: 'AV Grafts', value: '2', icon: Droplets, color: 'text-advisory-500' },
          { label: 'Catheters', value: '2', icon: Activity, color: 'text-critical-500' },
          { label: 'Due for Doppler', value: '3', icon: Clock, color: 'text-info-500' },
        ].map((stat, i) => (
          <motion.div key={stat.label} custom={i} variants={fadeUp as any} initial="hidden" animate="visible" className="nephro-card py-3 px-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon size={13} className={stat.color} strokeWidth={1.5} />
              <span className="text-11 text-ink-400">{stat.label}</span>
            </div>
            <p className="text-24 font-semibold data-mono tracking-[-0.02em] text-ink-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Access Table */}
      <motion.div custom={4} variants={fadeUp as any} initial="hidden" animate="visible" className="nephro-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-900/[0.06]">
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3">Patient</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3">Access Type</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3 hidden md:table-cell">Flow</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3 hidden lg:table-cell">Maturity</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3">Status</th>
                <th className="text-right text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {accessRecords.map((record, i) => (
                <tr key={record.code} className="border-b border-ink-900/[0.04] hover:bg-saline-50/[0.3] cursor-pointer transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-saline-100 flex items-center justify-center text-9 font-semibold text-saline-600">{record.initials}</div>
                      <div>
                        <p className="text-12 font-medium text-ink-900">{record.patient}</p>
                        <p className="data-mono text-10 text-ink-400">{record.code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-12 font-medium text-ink-700">{record.type}</p>
                      <p className="text-10 text-ink-400">{record.location}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="data-mono text-12 text-ink-600">{record.flow ? `${record.flow} mL/min` : 'N/A'}</span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className={`text-11 font-medium ${record.maturity === 'Mature' ? 'text-stable-600' : record.maturity === 'Maturing' ? 'text-advisory-600' : 'text-ink-400'}`}>
                      {record.maturity}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={record.status === 'stable' ? 'badge-stable' : record.status === 'advisory' ? 'badge-advisory' : 'badge-critical'}>
                      {record.status === 'stable' ? <CheckCircle2 size={10} /> : record.status === 'advisory' ? <AlertTriangle size={10} /> : <Activity size={10} />}
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <ChevronRight size={14} className="text-ink-300 inline" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
