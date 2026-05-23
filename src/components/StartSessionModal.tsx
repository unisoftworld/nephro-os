import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { chairSessions, patients } from '@/data/mockData';
import { X, Play, CheckCircle2 } from 'lucide-react';

interface StartSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedChairId?: string;
  preselectedPatientId?: string;
}

const DIALYZERS = [
  'Fresenius F80NR',
  'Fresenius F70NR',
  'Fresenius F60NR',
  'B.Braun Diacap Pro',
  'Nipro Elisio-21H',
  'Gambro Polyflux 210H',
];

const HEPARIN_PROTOCOLS = ['Standard', 'Low dose', 'Minimal', 'Heparin-free', 'Citrate'];

export default function StartSessionModal({
  isOpen, onClose, preselectedChairId, preselectedPatientId,
}: StartSessionModalProps) {
  const navigate = useNavigate();

  const availableChairs = chairSessions.filter(s => s.status === 'empty' || s.status === 'scheduled');
  const preChair = preselectedChairId ? chairSessions.find(s => s.id === preselectedChairId) : null;

  const [chairId, setChairId] = useState(preselectedChairId ?? (availableChairs[0]?.id ?? ''));
  const [patientId, setPatientId] = useState(preselectedPatientId ?? '');
  const [weightPre, setWeightPre] = useState('');
  const [dialyzer, setDialyzer] = useState(DIALYZERS[0]);
  const [heparin, setHeparin] = useState('Standard');
  const [ufGoal, setUfGoal] = useState('');
  const [bloodFlow, setBloodFlow] = useState('300');
  const [duration, setDuration] = useState('4');
  const [done, setDone] = useState(false);

  const selectedChair = chairSessions.find(s => s.id === chairId);
  const selectedPatient = patients.find(p => p.id === patientId) ??
    (selectedChair?.patient ? patients.find(p => p.id === selectedChair.patient!.id) : undefined);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => {
      setDone(false);
      onClose();
      // Navigate to first active session as demo
      const target = chairSessions.find(s => s.status === 'active');
      if (target) navigate(`/console/sessions/${target.id}`);
    }, 1500);
  };

  const handleClose = () => {
    setDone(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white rounded-lg shadow-overlay w-full max-w-lg mx-4 overflow-hidden max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-900/[0.06] shrink-0">
          <div>
            <h2 className="text-15 font-semibold text-ink-900">Start New Session</h2>
            <p className="text-11 text-ink-400 mt-0.5">Configure parameters before starting</p>
          </div>
          <button onClick={handleClose} className="p-1.5 rounded-6 text-ink-300 hover:text-ink-600 hover:bg-ink-900/[0.04] transition-all">
            <X size={16} />
          </button>
        </div>

        {done ? (
          <div className="flex flex-col items-center justify-center py-14 gap-3">
            <div className="w-12 h-12 rounded-full bg-stable-50 flex items-center justify-center">
              <CheckCircle2 size={22} className="text-stable-500" />
            </div>
            <p className="text-14 font-semibold text-ink-900">Session started</p>
            <p className="text-12 text-ink-400">Redirecting to session monitor…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto flex-1">
            <div className="p-5 space-y-4">
              {/* Chair + Patient */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">
                    Chair *
                  </label>
                  <select
                    required
                    value={chairId}
                    onChange={e => setChairId(e.target.value)}
                    className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 transition-all"
                  >
                    {availableChairs.map(c => (
                      <option key={c.id} value={c.id}>
                        Chair {c.chairNumber}{c.patient ? ` — ${c.patient.name}` : ' — Available'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">
                    Patient *
                  </label>
                  <select
                    required
                    value={patientId}
                    onChange={e => setPatientId(e.target.value)}
                    className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 transition-all"
                  >
                    <option value="">Select patient…</option>
                    {patients.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Patient info chip */}
              {selectedPatient && (
                <div className="flex items-center gap-3 p-3 rounded-8 bg-saline-50 border border-saline-400/20">
                  <div className="w-8 h-8 rounded-full bg-saline-100 flex items-center justify-center text-11 font-semibold text-saline-600 shrink-0">
                    {selectedPatient.initials}
                  </div>
                  <div className="text-12">
                    <p className="font-medium text-ink-900">{selectedPatient.name}</p>
                    <p className="text-ink-400">
                      {selectedPatient.code} · Dry weight: {selectedPatient.dryWeight} kg · {selectedPatient.accessType}
                    </p>
                  </div>
                </div>
              )}

              <div className="border-t border-ink-900/[0.06] pt-4">
                <p className="text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-3">Session Parameters</p>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-11 font-medium text-ink-500 mb-1.5">Pre-session Weight (kg) *</label>
                    <input
                      required type="number" step="0.1"
                      value={weightPre} onChange={e => setWeightPre(e.target.value)}
                      placeholder={selectedPatient ? `Dry: ${selectedPatient.dryWeight}` : 'e.g. 75.5'}
                      className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 data-mono transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-11 font-medium text-ink-500 mb-1.5">UF Goal (L) *</label>
                    <input
                      required type="number" step="0.1"
                      value={ufGoal} onChange={e => setUfGoal(e.target.value)}
                      placeholder="e.g. 3.0"
                      className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 data-mono transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-11 font-medium text-ink-500 mb-1.5">Blood Flow (mL/min)</label>
                    <input
                      type="number"
                      value={bloodFlow} onChange={e => setBloodFlow(e.target.value)}
                      className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 data-mono transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-11 font-medium text-ink-500 mb-1.5">Duration (hours)</label>
                    <select
                      value={duration} onChange={e => setDuration(e.target.value)}
                      className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 transition-all"
                    >
                      {['3', '3.5', '4', '4.5', '5'].map(h => (
                        <option key={h} value={h}>{h} hours</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-11 font-medium text-ink-500 mb-1.5">Dialyzer</label>
                    <select
                      value={dialyzer} onChange={e => setDialyzer(e.target.value)}
                      className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 transition-all"
                    >
                      {DIALYZERS.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-11 font-medium text-ink-500 mb-1.5">Heparin Protocol</label>
                    <select
                      value={heparin} onChange={e => setHeparin(e.target.value)}
                      className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 transition-all"
                    >
                      {HEPARIN_PROTOCOLS.map(h => <option key={h}>{h}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-ink-900/[0.06] shrink-0">
              <button type="button" onClick={handleClose} className="h-9 px-4 rounded-8 text-13 font-medium text-ink-500 hover:bg-ink-900/[0.04] transition-all">
                Cancel
              </button>
              <button type="submit" className="h-9 px-5 rounded-8 bg-saline-500 text-white text-13 font-semibold hover:bg-saline-600 transition-all shadow-raised flex items-center gap-2">
                <Play size={13} />
                Start Session
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
