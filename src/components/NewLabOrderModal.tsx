import { useState, type FormEvent } from 'react';
import { X, CheckCircle2, FlaskConical } from 'lucide-react';
import { patients } from '@/data/mockData';

interface NewLabOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (patientName: string) => void;
}

const LAB_PANELS = [
  { id: 'cbc', label: 'CBC (Complete Blood Count)', includes: 'Hb, WBC, Platelets' },
  { id: 'lytes', label: 'Electrolytes Panel', includes: 'K+, Na+, Ca2+, PO4' },
  { id: 'renal', label: 'Renal Function', includes: 'Creatinine, BUN, Uric Acid' },
  { id: 'iron', label: 'Iron Studies', includes: 'Fe, Ferritin, TIBC, Sat%' },
  { id: 'ktv', label: 'Kt/V (URR)', includes: 'Adequacy assessment' },
  { id: 'pth', label: 'PTH + Bone Markers', includes: 'iPTH, Ca, PO4, ALP' },
];

const URGENCIES = ['Routine', 'Urgent', 'STAT'];

export default function NewLabOrderModal({ isOpen, onClose, onCreated }: NewLabOrderModalProps) {
  const [patientId, setPatientId] = useState('');
  const [selectedPanels, setSelectedPanels] = useState<string[]>([]);
  const [urgency, setUrgency] = useState('Routine');
  const [notes, setNotes] = useState('');
  const [done, setDone] = useState(false);

  const togglePanel = (id: string) =>
    setSelectedPanels(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
    const patient = patients.find(p => p.id === patientId);
    setTimeout(() => {
      setDone(false);
      setPatientId('');
      setSelectedPanels([]);
      setUrgency('Routine');
      setNotes('');
      onCreated(patient?.name ?? 'Patient');
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-overlay w-full max-w-lg mx-4 max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-900/[0.06] shrink-0">
          <h2 className="text-15 font-semibold text-ink-900">New Lab Order</h2>
          <button onClick={onClose} className="p-1.5 rounded-6 text-ink-300 hover:text-ink-600 hover:bg-ink-900/[0.04] transition-all">
            <X size={16} />
          </button>
        </div>

        {done ? (
          <div className="flex flex-col items-center justify-center py-14 gap-3">
            <div className="w-12 h-12 rounded-full bg-stable-50 flex items-center justify-center">
              <CheckCircle2 size={22} className="text-stable-500" />
            </div>
            <p className="text-14 font-semibold text-ink-900">Lab order submitted</p>
            <p className="text-12 text-ink-400">Results will be available within 24 hours</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto flex-1">
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">Patient *</label>
                  <select
                    required
                    value={patientId}
                    onChange={e => setPatientId(e.target.value)}
                    className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 transition-all"
                  >
                    <option value="">Select patient…</option>
                    {patients.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.code})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">Urgency</label>
                  <select
                    value={urgency}
                    onChange={e => setUrgency(e.target.value)}
                    className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 transition-all"
                  >
                    {URGENCIES.map(u => <option key={u}>{u}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-2">Lab Panels *</label>
                <div className="space-y-1.5">
                  {LAB_PANELS.map((panel) => (
                    <label
                      key={panel.id}
                      className={`flex items-center gap-3 p-3 rounded-8 border cursor-pointer transition-all ${
                        selectedPanels.includes(panel.id)
                          ? 'bg-saline-50 border-saline-300'
                          : 'border-ink-900/[0.08] hover:bg-ink-900/[0.02]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedPanels.includes(panel.id)}
                        onChange={() => togglePanel(panel.id)}
                        className="accent-saline-500 w-3.5 h-3.5 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-12 font-medium text-ink-900">{panel.label}</p>
                        <p className="text-10 text-ink-400">{panel.includes}</p>
                      </div>
                      {selectedPanels.includes(panel.id) && (
                        <FlaskConical size={13} className="text-saline-500 shrink-0" />
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">Clinical Notes</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Clinical indication or special instructions…"
                  rows={2}
                  className="w-full px-3 py-2 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 resize-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-ink-900/[0.06] shrink-0">
              <button type="button" onClick={onClose} className="h-9 px-4 rounded-8 text-13 font-medium text-ink-500 hover:bg-ink-900/[0.04] transition-all">
                Cancel
              </button>
              <button
                type="submit"
                disabled={selectedPanels.length === 0}
                className="h-9 px-4 rounded-8 bg-saline-500 text-white text-13 font-semibold hover:bg-saline-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-raised flex items-center gap-2"
              >
                <FlaskConical size={13} />
                Order {selectedPanels.length > 0 ? `(${selectedPanels.length})` : ''}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
