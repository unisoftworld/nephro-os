import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { chairSessions, todayStats, insights } from '@/data/mockData';
import {
  Activity, Clock, Users, CheckCircle2, AlertTriangle, AlertCircle,
  Brain, ChevronRight, TrendingUp, Calendar, ArrowRight, Eye,
  Gauge, Droplets, Wind, Thermometer, Play, Pause, Square, RefreshCw,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.04, duration: 0.35 },
  }),
};

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'active':
      return (
        <span className="badge-stable">
          <span className="w-1.5 h-1.5 rounded-full bg-stable-500 animate-pulse-live" />
          Active
        </span>
      );
    case 'scheduled':
      return (
        <span className="badge-info">
          <Clock size={10} />
          Scheduled
        </span>
      );
    case 'advisory':
      return (
        <span className="badge-advisory">
          <AlertTriangle size={10} />
          Advisory
        </span>
      );
    case 'critical':
      return (
        <span className="badge-critical">
          <AlertCircle size={10} />
          Critical
        </span>
      );
    case 'empty':
      return (
        <span className="inline-flex items-center h-20 px-7 rounded-pill text-11 font-medium bg-ink-900/[0.04] text-ink-300">
          Empty
        </span>
      );
    default:
      return null;
  }
}

function ChairCard({ session }: { session: typeof chairSessions[0] }) {
  const navigate = useNavigate();

  if (session.status === 'empty') {
    return (
      <div className="nephro-card min-h-[260px] flex flex-col items-center justify-center gap-3 border-dashed border-ink-900/[0.08]">
        <div className="w-10 h-10 rounded-full bg-ink-900/[0.03] flex items-center justify-center">
          <span className="text-12 font-medium text-ink-200 data-mono">{session.chairNumber}</span>
        </div>
        <span className="text-11 text-ink-300">Chair {session.chairNumber} — Available</span>
      </div>
    );
  }

  return (
    <motion.div
      custom={parseInt(session.chairNumber)}
      variants={fadeUp as any}
      initial="hidden"
      animate="visible"
      className={`nephro-card min-h-[260px] flex flex-col relative overflow-hidden ${
        session.status === 'critical'
          ? 'border-critical/20 bg-critical-50/[0.2]'
          : session.status === 'advisory'
          ? 'border-advisory/20 bg-advisory-50/[0.15]'
          : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-12 font-semibold data-mono text-ink-900">
            Chair {session.chairNumber}
          </span>
          <StatusBadge status={session.status} />
        </div>
        {session.session && (
          <span className="text-11 data-mono text-ink-300">{session.session.elapsed}</span>
        )}
      </div>

      {/* Patient */}
      {session.patient && (
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-saline-100 flex items-center justify-center text-11 font-semibold text-saline-600 shrink-0">
            {session.patient.initials}
          </div>
          <div className="min-w-0">
            <p className="text-13 font-medium text-ink-900 truncate">
              {session.patient.name}
            </p>
            <div className="flex items-center gap-2 text-11 text-ink-400 data-mono">
              <span>{session.patient.code}</span>
              <span className="text-ink-200">|</span>
              <span>{session.patient.age}y {session.patient.gender}</span>
            </div>
          </div>
        </div>
      )}

      {/* Vitals */}
      {session.session && (
        <>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="flex items-center gap-2 text-11">
              <Gauge size={12} className="text-ink-300 shrink-0" />
              <span className="text-ink-400">BP</span>
              <span className="data-mono font-medium text-ink-900 ml-auto">{session.session.bp}</span>
            </div>
            <div className="flex items-center gap-2 text-11">
              <Droplets size={12} className="text-ink-300 shrink-0" />
              <span className="text-ink-400">VP</span>
              <span className="data-mono font-medium text-ink-900 ml-auto">{session.session.vp} <span className="text-ink-400">mmHg</span></span>
            </div>
            <div className="flex items-center gap-2 text-11">
              <Wind size={12} className="text-ink-300 shrink-0" />
              <span className="text-ink-400">TMP</span>
              <span className="data-mono font-medium text-ink-900 ml-auto">{session.session.tmp}</span>
            </div>
            <div className="flex items-center gap-2 text-11">
              <Activity size={12} className="text-ink-300 shrink-0" />
              <span className="text-ink-400">BF</span>
              <span className="data-mono font-medium text-ink-900 ml-auto">{session.session.bloodFlow} <span className="text-ink-400">mL/min</span></span>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-10 text-ink-400">Session progress</span>
              <span className="text-10 data-mono text-ink-500">{session.session.elapsedPercent}%</span>
            </div>
            <div className="h-1.5 bg-ink-900/[0.06] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  session.status === 'critical'
                    ? 'bg-critical-400'
                    : session.status === 'advisory'
                    ? 'bg-advisory-400'
                    : 'bg-saline-400'
                }`}
                style={{ width: `${session.session.elapsedPercent}%` }}
              />
            </div>
          </div>
        </>
      )}

      {/* Scheduled patients */}
      {session.status === 'scheduled' && session.patient && (
        <div className="mt-4 flex-1 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-11 text-ink-400">
              <Droplets size={11} />
              <span>Access: {session.patient.accessType}</span>
            </div>
            <div className="flex items-center gap-2 text-11 text-ink-400">
              <Activity size={11} />
              <span>Dry weight: {session.patient.dryWeight} kg</span>
            </div>
            <div className="flex items-center gap-2 text-11 text-ink-400">
              <Calendar size={11} />
              <span>Session #{session.patient.sessionCount + 1}</span>
            </div>
          </div>
          <button
            onClick={() => navigate(`/console/sessions/${session.id}`)}
            className="mt-3 w-full inline-flex items-center justify-center gap-1.5 h-7 rounded-6 bg-saline-500 text-white text-11 font-medium hover:bg-saline-600 transition-colors"
          >
            <Play size={11} />
            Start Session
          </button>
        </div>
      )}

      {/* Alert */}
      {session.alert && (
        <div className={`mt-3 p-2.5 rounded-6 text-11 leading-relaxed ${
          session.alert.type === 'critical'
            ? 'bg-critical-50 text-critical-600 border border-critical/10'
            : 'bg-advisory-50 text-advisory-600 border border-advisory/10'
        }`}>
          {session.alert.message}
        </div>
      )}
    </motion.div>
  );
}

export default function TodayView() {
  const navigate = useNavigate();

  const activeSessions = chairSessions.filter(s => s.status === 'active' || s.status === 'critical' || s.status === 'advisory');
  const scheduledSessions = chairSessions.filter(s => s.status === 'scheduled');
  const emptyChairs = chairSessions.filter(s => s.status === 'empty');

  return (
    <div className="p-4 lg:p-6 max-w-[1440px] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-20 font-semibold text-ink-900 tracking-[-0.02em]">
              Today — Chair Board
            </h1>
            <span className="live-indicator" />
          </div>
          <p className="text-12 text-ink-400">
            Riyadh Central — {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-8 border border-ink-900/[0.08] text-13 font-medium text-ink-600 hover:bg-white hover:border-ink-900/[0.14] transition-all bg-white">
            <Calendar size={14} />
            Schedule
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-8 bg-saline-500 text-white text-13 font-medium hover:bg-saline-600 transition-colors shadow-raised">
            <Activity size={14} />
            New Session
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
        {[
          { label: 'Total chairs', value: todayStats.totalChairs.toString(), icon: Activity, neutral: true },
          { label: 'Active', value: todayStats.active.toString(), icon: Activity, active: true },
          { label: 'Scheduled', value: todayStats.scheduled.toString(), icon: Clock, info: true },
          { label: 'Completed', value: todayStats.completed.toString(), icon: CheckCircle2, stable: true },
          { label: 'Alerts', value: `${todayStats.criticalAlerts + todayStats.advisoryAlerts}`, icon: AlertTriangle, alert: true },
          { label: 'On time', value: `${todayStats.onTime}%`, icon: TrendingUp, neutral: true },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            variants={fadeUp as any}
            initial="hidden"
            animate="visible"
            className="nephro-card py-3 px-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <stat.icon size={13} className={`${
                stat.active ? 'text-saline-500' :
                stat.stable ? 'text-stable-500' :
                stat.alert ? 'text-critical-500' :
                stat.info ? 'text-info-500' :
                'text-ink-300'
              }`} strokeWidth={1.5} />
              <span className="text-11 text-ink-400">{stat.label}</span>
            </div>
            <p className={`text-24 font-semibold data-mono tracking-[-0.02em] ${
              stat.alert ? 'text-critical-600' : 'text-ink-900'
            }`}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Active Sessions */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-13 font-semibold text-ink-900 uppercase tracking-[0.04em]">
            Active Sessions
          </h2>
          <span className="text-11 text-ink-400 data-mono">{activeSessions.length} chairs</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {activeSessions.map((session) => (
            <ChairCard key={session.id} session={session} />
          ))}
        </div>
      </div>

      {/* Scheduled + Empty */}
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        {/* Scheduled */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-13 font-semibold text-ink-900 uppercase tracking-[0.04em]">
              Upcoming
            </h2>
            <span className="text-11 text-ink-400 data-mono">{scheduledSessions.length} patients</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {scheduledSessions.map((session) => (
              <ChairCard key={session.id} session={session} />
            ))}
          </div>
        </div>

        {/* AI Insights Panel */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-13 font-semibold text-ink-900 uppercase tracking-[0.04em]">
              AI Insights
            </h2>
            <span className="text-11 text-ink-400 data-mono">{insights.length} alerts</span>
          </div>
          <div className="ai-panel">
            <div className="flex items-center gap-2 mb-4">
              <Brain size={14} className="text-saline-300" />
              <span className="text-12 uppercase tracking-[0.08em] text-saline-300 font-medium">
                Intelligence Layer
              </span>
            </div>
            <div className="space-y-2.5">
              {insights.map((insight) => (
                <div
                  key={insight.id}
                  className={`p-3 rounded-6 border ${
                    insight.type === 'critical'
                      ? 'bg-critical/10 border-critical/20'
                      : insight.type === 'advisory'
                      ? 'bg-advisory/10 border-advisory/20'
                      : insight.type === 'stable'
                      ? 'bg-stable/10 border-stable/20'
                      : 'bg-white/[0.04] border-white/[0.06]'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      insight.type === 'critical' ? 'bg-critical/20' :
                      insight.type === 'advisory' ? 'bg-advisory/20' :
                      insight.type === 'stable' ? 'bg-stable/20' :
                      'bg-info/20'
                    }`}>
                      {insight.type === 'critical' ? (
                        <AlertTriangle size={10} className="text-critical-400" />
                      ) : insight.type === 'advisory' ? (
                        <TrendingUp size={10} className="text-advisory-400" />
                      ) : insight.type === 'stable' ? (
                        <CheckCircle2 size={10} className="text-stable-400" />
                      ) : (
                        <Activity size={10} className="text-info-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className={`text-11 font-medium mb-0.5 ${
                        insight.type === 'critical' ? 'text-critical-300' :
                        insight.type === 'advisory' ? 'text-advisory-300' :
                        insight.type === 'stable' ? 'text-stable-300' :
                        'text-info-300'
                      }`}>
                        {insight.title}
                      </p>
                      <p className="text-10 text-white/40 leading-relaxed">
                        {insight.description}
                      </p>
                      {insight.action && (
                        <button className="mt-1.5 inline-flex items-center gap-1 text-10 font-medium text-saline-300 hover:text-saline-200 transition-colors">
                          {insight.action}
                          <ChevronRight size={10} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
