import { useState, type FormEvent } from 'react';
import { Activity, X, CheckCircle2 } from 'lucide-react';

interface VitalsEntry {
  systolic: string;
  diastolic: string;
  vp: string;
  tmp: string;
  bloodFlow: string;
  hr: string;
  temp: string;
  notes: string;
}

interface VitalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  chairNumber: string;
  patientName: string;
  onSubmit: (entry: { time: string; type: string; text: string }) => void;
}

const EMPTY: VitalsEntry = {
  systolic: '', diastolic: '', vp: '', tmp: '',
  bloodFlow: '', hr: '', temp: '', notes: '',
};

export default function VitalsModal({ isOpen, onClose, chairNumber, patientName, onSubmit }: VitalsModalProps) {
  const [values, setValues] = useState<VitalsEntry>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof VitalsEntry) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues(v => ({ ...v, [field]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const bp = values.systolic && values.diastolic ? `${values.systolic}/${values.diastolic}` : null;
    const parts: string[] = [];
    if (bp) parts.push(`BP ${bp} mmHg`);
    if (values.vp) parts.push(`VP ${values.vp} mmHg`);
    if (values.hr) parts.push(`HR ${values.hr} bpm`);
    if (values.temp) parts.push(`Temp ${values.temp} °C`);
    if (values.bloodFlow) parts.push(`BF ${values.bloodFlow} mL/min`);
    if (values.notes) parts.push(values.notes);

    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    onSubmit({ time, type: 'ok', text: `Vitals recorded — ${parts.join(', ')}` });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setValues(EMPTY);
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-overlay w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-900/[0.06]">
          <div>
            <h2 className="text-15 font-semibold text-ink-900">Record Vitals</h2>
            <p className="text-11 text-ink-400 mt-0.5">
              Chair {chairNumber} — {patientName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-6 text-ink-300 hover:text-ink-600 hover:bg-ink-900/[0.04] transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="w-12 h-12 rounded-full bg-stable-50 flex items-center justify-center">
              <CheckCircle2 size={22} className="text-stable-500" />
            </div>
            <p className="text-14 font-semibold text-ink-900">Vitals recorded</p>
            <p className="text-12 text-ink-400">Added to session timeline</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5">
            {/* Blood Pressure */}
            <div className="mb-4">
              <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-2">
                Blood Pressure (mmHg)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Systolic"
                  value={values.systolic}
                  onChange={set('systolic')}
                  className="flex-1 h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 data-mono transition-all"
                />
                <span className="text-ink-300 font-medium">/</span>
                <input
                  type="number"
                  placeholder="Diastolic"
                  value={values.diastolic}
                  onChange={set('diastolic')}
                  className="flex-1 h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 data-mono transition-all"
                />
              </div>
            </div>

            {/* 2-column grid for other vitals */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: 'Venous Pressure', unit: 'mmHg', field: 'vp' as keyof VitalsEntry, placeholder: '142' },
                { label: 'TMP', unit: 'mmHg', field: 'tmp' as keyof VitalsEntry, placeholder: '185' },
                { label: 'Blood Flow', unit: 'mL/min', field: 'bloodFlow' as keyof VitalsEntry, placeholder: '320' },
                { label: 'Heart Rate', unit: 'bpm', field: 'hr' as keyof VitalsEntry, placeholder: '72' },
                { label: 'Temperature', unit: '°C', field: 'temp' as keyof VitalsEntry, placeholder: '36.8' },
              ].map(f => (
                <div key={f.field}>
                  <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">
                    {f.label}
                    <span className="ml-1 text-ink-300 normal-case tracking-normal">{f.unit}</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    placeholder={f.placeholder}
                    value={values[f.field]}
                    onChange={set(f.field)}
                    className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 data-mono transition-all"
                  />
                </div>
              ))}
            </div>

            {/* Notes */}
            <div className="mb-5">
              <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">
                Clinical Notes <span className="text-ink-300 normal-case tracking-normal">(optional)</span>
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Patient reported mild cramping, adjusted UF rate..."
                value={values.notes}
                onChange={set('notes')}
                className="w-full px-3 py-2 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 transition-all resize-none"
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-ink-900/[0.06]">
              <button
                type="button"
                onClick={onClose}
                className="h-9 px-4 rounded-8 text-13 font-medium text-ink-500 hover:bg-ink-900/[0.04] transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-9 px-4 rounded-8 bg-saline-500 text-white text-13 font-semibold hover:bg-saline-600 transition-all shadow-raised flex items-center gap-2"
              >
                <Activity size={13} />
                Save Vitals
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
