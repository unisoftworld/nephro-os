import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { patients, insights } from '@/data/mockData';
import {
  ArrowLeft, Activity, Droplets, Calendar, Phone, Mail,
  FileText, TrendingUp, AlertTriangle, CheckCircle2, Brain,
  Weight, HeartPulse, FlaskConical, CreditCard, ChevronRight,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.04, duration: 0.35 },
  }),
};

export default function PatientDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const patient = patients.find(p => p.id === id) || patients[0];
  const patientInsights = insights.filter(i => i.patientCode === patient.code);

  // Mock lab data for charts
  const labTrends = [
    { name: 'Hb', value: 10.8, unit: 'g/dL', range: '11-13', status: 'low', history: [10.2, 10.5, 10.8, 11.0, 10.8] },
    { name: 'Kt/V', value: 1.48, unit: '', range: '>1.2', status: 'normal', history: [1.35, 1.42, 1.45, 1.50, 1.48] },
    { name: 'Creatinine', value: 6.2, unit: 'mg/dL', range: '0.7-1.3', status: 'high', history: [7.1, 6.8, 6.5, 6.3, 6.2] },
    { name: 'K+', value: 4.8, unit: 'mEq/L', range: '3.5-5.0', status: 'normal', history: [5.2, 4.9, 5.1, 4.7, 4.8] },
  ];

  return (
    <div className="p-4 lg:p-6 max-w-[1280px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/console/patients')}
          className="p-2 rounded-8 hover:bg-ink-900/[0.04] text-ink-400 hover:text-ink-600 transition-all"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-20 font-semibold text-ink-900 tracking-[-0.02em]">
              {patient.name}
            </h1>
            <span className="badge-stable">Active</span>
          </div>
          <p className="text-12 text-ink-400 data-mono">{patient.code} — {patient.branch}</p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-8 border border-ink-900/[0.08] text-13 font-medium text-ink-600 hover:bg-white bg-white transition-all">
            <FileText size={14} />
            Notes
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-8 bg-saline-500 text-white text-13 font-medium hover:bg-saline-600 transition-colors shadow-raised">
            <Activity size={14} />
            New Session
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Left Column */}
        <div className="space-y-5">
          {/* Profile Card */}
          <motion.div
            custom={0}
            variants={fadeUp as any}
            initial="hidden"
            animate="visible"
            className="nephro-card"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-saline-100 flex items-center justify-center text-18 font-semibold text-saline-600">
                {patient.initials}
              </div>
              <div>
                <h2 className="text-16 font-semibold text-ink-900">{patient.name}</h2>
                <p className="text-12 text-ink-400">{patient.age} years • {patient.gender === 'M' ? 'Male' : 'Female'}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <Phone size={13} className="text-ink-300" />
                <span className="text-12 text-ink-600">{patient.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CreditCard size={13} className="text-ink-300" />
                <span className="data-mono text-12 text-ink-600">{patient.nationalId}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Droplets size={13} className="text-ink-300" />
                <span className="text-12 text-ink-600">{patient.accessType} — since {patient.accessDate}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Weight size={13} className="text-ink-300" />
                <span className="text-12 text-ink-600">Dry weight: <span className="data-mono font-medium">{patient.dryWeight} kg</span></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Activity size={13} className="text-ink-300" />
                <span className="text-12 text-ink-600">{patient.dialysisType} — {patient.frequency}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CreditCard size={13} className="text-ink-300" />
                <span className="text-12 text-ink-600">Insurance: {patient.insurance}</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-ink-900/[0.06]">
              <p className="text-10 uppercase tracking-[0.08em] text-ink-400 font-medium mb-2">Emergency Contact</p>
              <p className="text-12 text-ink-600">{patient.emergencyContact}</p>
            </div>

            {patient.allergies !== 'None' && (
              <div className="mt-3 p-3 rounded-6 bg-critical-50 border border-critical-500/10">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={12} className="text-critical-500" />
                  <span className="text-11 font-medium text-critical-600">Allergy: {patient.allergies}</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            custom={1}
            variants={fadeUp as any}
            initial="hidden"
            animate="visible"
            className="nephro-card"
          >
            <h3 className="text-13 font-semibold text-ink-900 mb-3 uppercase tracking-[0.04em]">Quick Actions</h3>
            <div className="space-y-1">
              {[
                { label: 'Start New Session', icon: Activity, accent: true },
                { label: 'View Lab Results', icon: FlaskConical },
                { label: 'Vascular Access Record', icon: Droplets },
                { label: 'Clinical Notes', icon: FileText },
                { label: 'Billing History', icon: CreditCard },
              ].map((action) => (
                <button
                  key={action.label}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-8 text-12 font-medium transition-all text-left ${
                    action.accent
                      ? 'bg-saline-50 text-saline-600 hover:bg-saline-100'
                      : 'text-ink-600 hover:bg-ink-900/[0.04]'
                  }`}
                >
                  <action.icon size={14} className={action.accent ? 'text-saline-500' : 'text-ink-300'} />
                  <span className="flex-1">{action.label}</span>
                  <ChevronRight size={12} className="text-ink-300" />
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Middle Column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Lab Trends */}
          <motion.div
            custom={2}
            variants={fadeUp as any}
            initial="hidden"
            animate="visible"
            className="nephro-card"
          >
            <h3 className="text-13 font-semibold text-ink-900 mb-4 uppercase tracking-[0.04em]">
              Recent Lab Results
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {labTrends.map((lab) => (
                <div key={lab.name} className="p-4 rounded-8 bg-ink-900/[0.02]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-11 text-ink-400">{lab.name}</span>
                    <span className={`text-9 px-1.5 py-0.5 rounded-pill font-medium ${
                      lab.status === 'normal' ? 'bg-stable-50 text-stable-600' :
                      lab.status === 'low' ? 'bg-info-50 text-info-600' :
                      'bg-critical-50 text-critical-600'
                    }`}>
                      {lab.status === 'normal' ? 'Normal' : lab.status === 'low' ? 'Low' : 'High'}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className={`text-24 font-semibold data-mono tracking-[-0.02em] ${
                      lab.status === 'normal' ? 'text-ink-900' :
                      lab.status === 'low' ? 'text-info-600' :
                      'text-critical-600'
                    }`}>
                      {lab.value}
                    </span>
                    <span className="text-11 text-ink-400">{lab.unit}</span>
                  </div>
                  {/* Mini trend line */}
                  <div className="flex items-end gap-1 h-6">
                    {lab.history.map((val, i) => {
                      const max = Math.max(...lab.history);
                      const min = Math.min(...lab.history);
                      const range = max - min || 1;
                      const height = ((val - min) / range) * 100;
                      return (
                        <div
                          key={i}
                          className={`flex-1 rounded-sm ${
                            lab.status === 'normal' ? 'bg-saline-200' :
                            lab.status === 'low' ? 'bg-info-200' :
                            'bg-critical-200'
                          }`}
                          style={{ height: `${Math.max(15, height)}%` }}
                        />
                      );
                    })}
                  </div>
                  <p className="text-10 text-ink-400 mt-1.5">Ref: {lab.range}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Session History */}
          <motion.div
            custom={3}
            variants={fadeUp as any}
            initial="hidden"
            animate="visible"
            className="nephro-card"
          >
            <h3 className="text-13 font-semibold text-ink-900 mb-4 uppercase tracking-[0.04em]">
              Recent Sessions
            </h3>
            <div className="space-y-2">
              {[
                { date: '2026-05-17', time: '09:00', duration: '4h 12m', uf: 3.2, bp: '128/82', weight: '72.4', status: 'completed' },
                { date: '2026-05-15', time: '09:00', duration: '4h 05m', uf: 3.0, bp: '132/85', weight: '72.6', status: 'completed' },
                { date: '2026-05-13', time: '09:00', duration: '4h 18m', uf: 3.4, bp: '126/80', weight: '72.8', status: 'completed' },
                { date: '2026-05-10', time: '09:00', duration: '3h 55m', uf: 2.8, bp: '135/88', weight: '72.2', status: 'completed' },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-8 hover:bg-ink-900/[0.02] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-stable-50 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={14} className="text-stable-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="data-mono text-12 font-medium text-ink-900">{s.date}</span>
                      <span className="text-11 text-ink-400">{s.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-11 text-ink-400 mt-0.5">
                      <span>{s.duration}</span>
                      <span>UF: {s.uf}L</span>
                      <span>BP: {s.bp}</span>
                    </div>
                  </div>
                  <span className="data-mono text-12 text-ink-500">{s.weight} kg</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Insights for this patient */}
          {patientInsights.length > 0 && (
            <motion.div
              custom={4}
              variants={fadeUp as any}
              initial="hidden"
              animate="visible"
            >
              <div className="ai-panel">
                <div className="flex items-center gap-2 mb-4">
                  <Brain size={14} className="text-saline-300" />
                  <span className="text-12 uppercase tracking-[0.08em] text-saline-300 font-medium">
                    AI Insights for {patient.name}
                  </span>
                </div>
                <div className="space-y-2.5">
                  {patientInsights.map((insight) => (
                    <div
                      key={insight.id}
                      className={`p-3 rounded-6 border ${
                        insight.type === 'critical'
                          ? 'bg-critical-500/10 border-critical-500/20'
                          : insight.type === 'advisory'
                          ? 'bg-advisory-500/10 border-advisory-500/20'
                          : 'bg-stable-500/10 border-stable-500/20'
                      }`}
                    >
                      <p className={`text-11 font-medium mb-1 ${
                        insight.type === 'critical' ? 'text-critical-200' :
                        insight.type === 'advisory' ? 'text-advisory-200' :
                        'text-stable-200'
                      }`}>
                        {insight.title}
                      </p>
                      <p className="text-10 text-white/40 leading-relaxed">
                        {insight.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Empty state if no insights */}
          {patientInsights.length === 0 && (
            <motion.div
              custom={4}
              variants={fadeUp as any}
              initial="hidden"
              animate="visible"
              className="nephro-card py-10 text-center"
            >
              <Brain size={24} className="text-ink-200 mx-auto mb-2" />
              <p className="text-13 text-ink-400">No AI insights for this patient yet</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
