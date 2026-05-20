import { useParams, useNavigate } from 'react-router-dom';
import { chairSessions, timelineEvents } from '@/data/mockData';
import {
  ArrowLeft, Activity, Gauge, Droplets, Wind, Thermometer,
  Clock, User, Play, Pause, Square, AlertTriangle, CheckCircle2,
  FileText, Printer, ChevronRight,
} from 'lucide-react';

export default function SessionView() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find session or use first one as default
  const session = chairSessions.find(s => s.id === id) || chairSessions[0];

  return (
    <div className="p-4 lg:p-6 max-w-[1280px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-8 hover:bg-ink-900/[0.04] text-ink-400 hover:text-ink-600 transition-all"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-20 font-semibold text-ink-900 tracking-[-0.02em]">
              Session Monitor
            </h1>
            <span className={`badge-${
              session.status === 'active' ? 'stable' :
              session.status === 'critical' ? 'critical' :
              session.status === 'advisory' ? 'advisory' : 'info'
            }`}>
              {session.status === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-stable-500 animate-pulse-live" />}
              {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
            </span>
          </div>
          <p className="text-12 text-ink-400 data-mono">
            Chair {session.chairNumber} {session.patient && `— ${session.patient.code}`}
          </p>
        </div>
      </div>

      {session.patient && session.session ? (
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Main Panel */}
          <div className="lg:col-span-2 space-y-5">
            {/* Patient Quick Info */}
            <div className="nephro-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-saline-100 flex items-center justify-center text-16 font-semibold text-saline-600">
                  {session.patient.initials}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-16 font-semibold text-ink-900">
                      {session.patient.name}
                    </h2>
                    <span className="data-mono text-11 text-ink-400">{session.patient.code}</span>
                  </div>
                  <div className="flex items-center gap-3 text-12 text-ink-400 mt-1">
                    <span>{session.patient.age} years</span>
                    <span className="text-ink-200">|</span>
                    <span>{session.patient.gender === 'M' ? 'Male' : 'Female'}</span>
                    <span className="text-ink-200">|</span>
                    <span>{session.patient.accessType}</span>
                    <span className="text-ink-200">|</span>
                    <span>Dry weight: {session.patient.dryWeight} kg</span>
                  </div>
                </div>
                <div className="hidden sm:block text-right">
                  <p className="text-10 text-ink-400">Session</p>
                  <p className="text-18 data-mono font-semibold text-ink-900">#{session.patient.sessionCount + 1}</p>
                </div>
              </div>
            </div>

            {/* Vitals Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: 'Blood Pressure', value: session.session.bp, unit: 'mmHg', icon: Gauge, status: 'normal' },
                { label: 'Venous Pressure', value: `${session.session.vp}`, unit: 'mmHg', icon: Droplets, status: session.session.vp > 250 ? 'high' : 'normal' },
                { label: 'TMP', value: `${session.session.tmp}`, unit: 'mmHg', icon: Wind, status: session.session.tmp > 220 ? 'high' : 'normal' },
                { label: 'Blood Flow', value: `${session.session.bloodFlow}`, unit: 'mL/min', icon: Activity, status: 'normal' },
                { label: 'UF Goal', value: `${session.session.ufGoal}`, unit: 'L', icon: Droplets, status: 'normal' },
                { label: 'UF Actual', value: `${session.session.ufActual}`, unit: 'L', icon: Droplets, status: 'normal' },
              ].map((vital) => (
                <div key={vital.label} className="nephro-card">
                  <div className="flex items-center gap-2 mb-2">
                    <vital.icon size={14} className={`${
                      vital.status === 'high' ? 'text-critical-400' :
                      vital.status === 'low' ? 'text-info-400' :
                      'text-ink-300'
                    }`} strokeWidth={1.5} />
                    <span className="text-11 text-ink-400">{vital.label}</span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className={`text-24 font-semibold data-mono tracking-[-0.02em] ${
                      vital.status === 'high' ? 'text-critical-600' :
                      vital.status === 'low' ? 'text-info-600' :
                      'text-ink-900'
                    }`}>
                      {vital.value}
                    </span>
                    <span className="text-11 text-ink-400">{vital.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Session Parameters */}
            <div className="nephro-card">
              <h3 className="text-13 font-semibold text-ink-900 mb-4 uppercase tracking-[0.04em]">
                Session Parameters
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-10 text-ink-400 uppercase tracking-wider mb-1">Dialyzer</p>
                  <p className="text-13 font-medium text-ink-900">{session.session.dialyzer}</p>
                </div>
                <div>
                  <p className="text-10 text-ink-400 uppercase tracking-wider mb-1">Heparin</p>
                  <p className="text-13 font-medium text-ink-900">{session.session.heparin}</p>
                </div>
                <div>
                  <p className="text-10 text-ink-400 uppercase tracking-wider mb-1">Dialysate Flow</p>
                  <p className="text-13 font-medium data-mono text-ink-900">{session.session.dialysateFlow} mL/min</p>
                </div>
                <div>
                  <p className="text-10 text-ink-400 uppercase tracking-wider mb-1">Weight (pre)</p>
                  <p className="text-13 font-medium data-mono text-ink-900">{session.session.weightPre} kg</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="nephro-card">
              <h3 className="text-13 font-semibold text-ink-900 mb-4 uppercase tracking-[0.04em]">
                Session Timeline
              </h3>
              <div className="space-y-0">
                {timelineEvents.map((event, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-2 h-2 rounded-full ${
                        event.type === 'start' ? 'bg-saline-500' :
                        event.type === 'adv' ? 'bg-advisory-400' :
                        event.type === 'ok' ? 'bg-ink-300' :
                        'bg-ink-200'
                      }`} />
                      {i < timelineEvents.length - 1 && (
                        <div className="w-px h-8 bg-ink-900/[0.08]" />
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center gap-2">
                        <span className="data-mono text-10 text-ink-400">{event.time}</span>
                        {event.type === 'adv' && (
                          <span className="badge-advisory text-9 py-0 px-1.5">Advisory</span>
                        )}
                      </div>
                      <p className={`text-12 mt-0.5 ${
                        event.type === 'adv' ? 'text-advisory-600' : 'text-ink-600'
                      }`}>
                        {event.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-5">
            {/* Session Progress */}
            <div className="nephro-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-13 font-semibold text-ink-900">Progress</h3>
                <span className="data-mono text-12 text-ink-500">{session.session.elapsedPercent}%</span>
              </div>
              <div className="h-2 bg-ink-900/[0.06] rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-saline-400 rounded-full transition-all duration-500"
                  style={{ width: `${session.session.elapsedPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-11 text-ink-400">
                <div className="flex items-center gap-1.5">
                  <Clock size={11} />
                  <span>Started {session.session.startTime}</span>
                </div>
                <span className="data-mono">{session.session.elapsed}</span>
              </div>
            </div>

            {/* Session Controls */}
            <div className="nephro-card">
              <h3 className="text-13 font-semibold text-ink-900 mb-3">Controls</h3>
              <div className="grid grid-cols-3 gap-2">
                <button className="flex flex-col items-center gap-1.5 py-3 rounded-8 bg-saline-50 text-saline-600 hover:bg-saline-100 transition-colors">
                  <Play size={16} />
                  <span className="text-10 font-medium">Start</span>
                </button>
                <button className="flex flex-col items-center gap-1.5 py-3 rounded-8 bg-advisory-50 text-advisory-600 hover:bg-advisory-100 transition-colors">
                  <Pause size={16} />
                  <span className="text-10 font-medium">Pause</span>
                </button>
                <button className="flex flex-col items-center gap-1.5 py-3 rounded-8 bg-critical-50 text-critical-600 hover:bg-critical-100 transition-colors">
                  <Square size={16} />
                  <span className="text-10 font-medium">End</span>
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="nephro-card">
              <h3 className="text-13 font-semibold text-ink-900 mb-3">Actions</h3>
              <div className="space-y-1.5">
                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-6 text-12 text-ink-600 hover:bg-ink-900/[0.04] transition-colors text-left">
                  <Activity size={13} className="text-ink-300" />
                  Record Vitals
                </button>
                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-6 text-12 text-ink-600 hover:bg-ink-900/[0.04] transition-colors text-left">
                  <AlertTriangle size={13} className="text-ink-300" />
                  Log Complication
                </button>
                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-6 text-12 text-ink-600 hover:bg-ink-900/[0.04] transition-colors text-left">
                  <FileText size={13} className="text-ink-300" />
                  Add Note
                </button>
                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-6 text-12 text-ink-600 hover:bg-ink-900/[0.04] transition-colors text-left">
                  <Printer size={13} className="text-ink-300" />
                  Print Summary
                </button>
              </div>
            </div>

            {/* AI Suggestion */}
            <div className="ai-panel">
              <div className="flex items-center gap-2 mb-3">
                <Activity size={13} className="text-saline-300" />
                <span className="text-10 uppercase tracking-[0.08em] text-saline-300 font-medium">
                  AI Suggestion
                </span>
              </div>
              <p className="text-11 text-white/70 leading-relaxed mb-3">
                Consider extending session by 15 minutes. Current Kt/V estimate
                is 1.18 — target 1.40. UF rate within tolerance.
              </p>
              <div className="flex items-center gap-2 text-10">
                <span className="text-white/40">Confidence: 87%</span>
                <span className="text-white/20">|</span>
                <button className="text-saline-300 hover:text-saline-200 font-medium transition-colors">
                  Review
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="nephro-card py-20 text-center">
          <Activity size={32} className="text-ink-200 mx-auto mb-3" />
          <h3 className="text-16 font-semibold text-ink-900 mb-1">No active session</h3>
          <p className="text-13 text-ink-400">This chair is currently empty or the session hasn't started yet.</p>
        </div>
      )}
    </div>
  );
}
