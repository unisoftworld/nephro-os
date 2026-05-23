import { useState, type FormEvent } from 'react';
import { X, User, CheckCircle2, ChevronRight } from 'lucide-react';

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdded: (name: string) => void;
}

interface Form {
  name: string;
  nationalId: string;
  dob: string;
  gender: string;
  phone: string;
  emergencyContact: string;
  ckdStage: string;
  dialysisType: string;
  frequency: string;
  accessType: string;
  dryWeight: string;
  insurance: string;
}

const EMPTY: Form = {
  name: '', nationalId: '', dob: '', gender: '',
  phone: '', emergencyContact: '', ckdStage: '5',
  dialysisType: 'Hemodialysis', frequency: '3x/week',
  accessType: '', dryWeight: '', insurance: '',
};

export default function AddPatientModal({ isOpen, onClose, onAdded }: AddPatientModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<Form>(EMPTY);
  const [done, setDone] = useState(false);

  const set = (field: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(v => ({ ...v, [field]: e.target.value }));

  const handleNext = (e: FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => {
      setDone(false);
      setStep(1);
      setForm(EMPTY);
      onAdded(form.name);
      onClose();
    }, 1400);
  };

  const handleClose = () => {
    setStep(1);
    setForm(EMPTY);
    setDone(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white rounded-lg shadow-overlay w-full max-w-[520px] mx-4 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-900/[0.06]">
          <div>
            <h2 className="text-15 font-semibold text-ink-900">Add New Patient</h2>
            <div className="flex items-center gap-1.5 mt-1">
              {[1, 2].map(s => (
                <div key={s} className="flex items-center gap-1.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-10 font-semibold transition-colors ${
                    s === step ? 'bg-saline-500 text-white' :
                    s < step ? 'bg-stable-100 text-stable-600' :
                    'bg-ink-900/[0.06] text-ink-400'
                  }`}>
                    {s < step ? '✓' : s}
                  </div>
                  <span className={`text-10 ${s === step ? 'text-ink-600 font-medium' : 'text-ink-300'}`}>
                    {s === 1 ? 'Demographics' : 'Clinical'}
                  </span>
                  {s < 2 && <ChevronRight size={10} className="text-ink-200" />}
                </div>
              ))}
            </div>
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
            <p className="text-14 font-semibold text-ink-900">{form.name} added</p>
            <p className="text-12 text-ink-400">Patient record created successfully</p>
          </div>
        ) : step === 1 ? (
          <form onSubmit={handleNext} className="p-5">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="col-span-2">
                <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">Full Name *</label>
                <input required value={form.name} onChange={set('name')} placeholder="e.g. Ahmad Al-Rashid"
                  className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 transition-all" />
              </div>
              <div>
                <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">National ID *</label>
                <input required value={form.nationalId} onChange={set('nationalId')} placeholder="10xxxxxxxxx"
                  className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 data-mono transition-all" />
              </div>
              <div>
                <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">Date of Birth *</label>
                <input required type="date" value={form.dob} onChange={set('dob')}
                  className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 data-mono transition-all" />
              </div>
              <div>
                <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">Gender *</label>
                <select required value={form.gender} onChange={set('gender')}
                  className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 transition-all">
                  <option value="">Select…</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">Phone *</label>
                <input required value={form.phone} onChange={set('phone')} placeholder="+966 5x xxx xxxx"
                  className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 data-mono transition-all" />
              </div>
              <div className="col-span-2">
                <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">Emergency Contact</label>
                <input value={form.emergencyContact} onChange={set('emergencyContact')} placeholder="e.g. Son: +966 55 xxx xxxx"
                  className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 transition-all" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-ink-900/[0.06]">
              <button type="button" onClick={handleClose} className="h-9 px-4 rounded-8 text-13 font-medium text-ink-500 hover:bg-ink-900/[0.04] transition-all">Cancel</button>
              <button type="submit" className="h-9 px-4 rounded-8 bg-saline-500 text-white text-13 font-semibold hover:bg-saline-600 transition-all shadow-raised flex items-center gap-2">
                Next <ChevronRight size={13} />
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="p-5">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">CKD Stage</label>
                <select value={form.ckdStage} onChange={set('ckdStage')}
                  className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 transition-all">
                  {[3, 4, 5].map(s => <option key={s} value={s}>Stage {s}{s === 5 ? ' (ESRD)' : ''}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">Dialysis Type</label>
                <select value={form.dialysisType} onChange={set('dialysisType')}
                  className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 transition-all">
                  <option>Hemodialysis</option>
                  <option>Peritoneal Dialysis</option>
                  <option>Home HD</option>
                </select>
              </div>
              <div>
                <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">Frequency</label>
                <select value={form.frequency} onChange={set('frequency')}
                  className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 transition-all">
                  <option>3x/week</option>
                  <option>2x/week</option>
                  <option>Daily</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">Dry Weight (kg) *</label>
                <input required type="number" step="0.1" value={form.dryWeight} onChange={set('dryWeight')} placeholder="e.g. 72.5"
                  className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 data-mono transition-all" />
              </div>
              <div className="col-span-2">
                <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">Access Type *</label>
                <select required value={form.accessType} onChange={set('accessType')}
                  className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 transition-all">
                  <option value="">Select access type…</option>
                  <option>AV Fistula — L. arm</option>
                  <option>AV Fistula — R. arm</option>
                  <option>AV Graft — L. arm</option>
                  <option>AV Graft — R. arm</option>
                  <option>Catheter — IJ</option>
                  <option>Catheter — Femoral</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">Insurance Provider</label>
                <select value={form.insurance} onChange={set('insurance')}
                  className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 transition-all">
                  <option value="">None / Self-pay</option>
                  <option>Bupa Arabia</option>
                  <option>Tawuniya</option>
                  <option>MedGulf</option>
                  <option>Malath</option>
                  <option>GIG Gulf</option>
                  <option>Saudi COOP</option>
                </select>
              </div>
            </div>
            <div className="flex justify-between gap-2 pt-3 border-t border-ink-900/[0.06]">
              <button type="button" onClick={() => setStep(1)} className="h-9 px-4 rounded-8 text-13 font-medium text-ink-500 hover:bg-ink-900/[0.04] transition-all">Back</button>
              <button type="submit" className="h-9 px-4 rounded-8 bg-saline-500 text-white text-13 font-semibold hover:bg-saline-600 transition-all shadow-raised flex items-center gap-2">
                <User size={13} />
                Create Patient
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
