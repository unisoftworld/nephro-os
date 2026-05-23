import { useState, type FormEvent } from 'react';
import { patients } from '@/data/mockData';
import { X, CheckCircle2, FileText } from 'lucide-react';

interface NewInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (invoiceId: string) => void;
}

const BASE_SESSION_FEE = 1600;
const VAT_RATE = 0.15;

const PAYMENT_METHODS = ['Insurance', 'ClickPay', 'Cash', 'Bank Transfer'];

export default function NewInvoiceModal({ isOpen, onClose, onCreated }: NewInvoiceModalProps) {
  const [patientId, setPatientId] = useState('');
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);
  const [includeMeds, setIncludeMeds] = useState(false);
  const [includeSupplies, setIncludeSupplies] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Insurance');
  const [done, setDone] = useState(false);

  const subtotal = BASE_SESSION_FEE + (includeMeds ? 180 : 0) + (includeSupplies ? 67.5 : 0);
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;
  const formatSAR = (v: number) => `SAR ${v.toLocaleString('en', { minimumFractionDigits: 2 })}`;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const invoiceId = `INV-2026-${(Math.floor(Math.random() * 900) + 100).toString().padStart(4, '0')}`;
    setDone(true);
    setTimeout(() => {
      setDone(false);
      setPatientId('');
      setIncludeMeds(false);
      setIncludeSupplies(false);
      onCreated(invoiceId);
      onClose();
    }, 1400);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-overlay w-full max-w-[480px] mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-900/[0.06]">
          <h2 className="text-15 font-semibold text-ink-900">New Invoice</h2>
          <button onClick={onClose} className="p-1.5 rounded-6 text-ink-300 hover:text-ink-600 hover:bg-ink-900/[0.04] transition-all">
            <X size={16} />
          </button>
        </div>

        {done ? (
          <div className="flex flex-col items-center justify-center py-14 gap-3">
            <div className="w-12 h-12 rounded-full bg-stable-50 flex items-center justify-center">
              <CheckCircle2 size={22} className="text-stable-500" />
            </div>
            <p className="text-14 font-semibold text-ink-900">Invoice created</p>
            <p className="text-12 text-ink-400">Ready for processing</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5">
            <div className="space-y-4 mb-5">
              <div>
                <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">Patient *</label>
                <select required value={patientId} onChange={e => setPatientId(e.target.value)}
                  className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 transition-all">
                  <option value="">Select patient…</option>
                  {patients.map(p => <option key={p.id} value={p.id}>{p.name} ({p.code})</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">Session Date</label>
                  <input type="date" value={sessionDate} onChange={e => setSessionDate(e.target.value)}
                    className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 data-mono transition-all" />
                </div>
                <div>
                  <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">Payment Method</label>
                  <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}
                    className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 transition-all">
                    {PAYMENT_METHODS.map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
              </div>

              {/* Line items */}
              <div>
                <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-2">Services</label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-3 py-2.5 rounded-8 bg-ink-900/[0.02] border border-ink-900/[0.06]">
                    <span className="text-12 text-ink-700">Hemodialysis Session (4h)</span>
                    <span className="data-mono text-12 font-medium text-ink-900">{formatSAR(BASE_SESSION_FEE)}</span>
                  </div>
                  <label className={`flex items-center justify-between px-3 py-2.5 rounded-8 border cursor-pointer transition-colors ${includeMeds ? 'bg-saline-50 border-saline-400/20' : 'bg-white border-ink-900/[0.06] hover:bg-ink-900/[0.02]'}`}>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={includeMeds} onChange={e => setIncludeMeds(e.target.checked)} className="rounded accent-saline-500" />
                      <span className="text-12 text-ink-700">Medications (Heparin + EPO)</span>
                    </div>
                    <span className="data-mono text-12 font-medium text-ink-900">SAR 180.00</span>
                  </label>
                  <label className={`flex items-center justify-between px-3 py-2.5 rounded-8 border cursor-pointer transition-colors ${includeSupplies ? 'bg-saline-50 border-saline-400/20' : 'bg-white border-ink-900/[0.06] hover:bg-ink-900/[0.02]'}`}>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={includeSupplies} onChange={e => setIncludeSupplies(e.target.checked)} className="rounded accent-saline-500" />
                      <span className="text-12 text-ink-700">Dialyzer + Supplies</span>
                    </div>
                    <span className="data-mono text-12 font-medium text-ink-900">SAR 67.50</span>
                  </label>
                </div>
              </div>

              {/* Summary */}
              <div className="rounded-8 bg-ink-900/[0.02] border border-ink-900/[0.06] divide-y divide-ink-900/[0.04]">
                <div className="flex justify-between px-3 py-2 text-12">
                  <span className="text-ink-500">Subtotal</span>
                  <span className="data-mono text-ink-900 font-medium">{formatSAR(subtotal)}</span>
                </div>
                <div className="flex justify-between px-3 py-2 text-12">
                  <span className="text-ink-500">VAT (15%)</span>
                  <span className="data-mono text-ink-900">{formatSAR(vat)}</span>
                </div>
                <div className="flex justify-between px-3 py-2 text-13">
                  <span className="font-semibold text-ink-900">Total</span>
                  <span className="data-mono font-semibold text-ink-900">{formatSAR(total)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-ink-900/[0.06]">
              <button type="button" onClick={onClose} className="h-9 px-4 rounded-8 text-13 font-medium text-ink-500 hover:bg-ink-900/[0.04] transition-all">Cancel</button>
              <button type="submit" className="h-9 px-4 rounded-8 bg-saline-500 text-white text-13 font-semibold hover:bg-saline-600 transition-all shadow-raised flex items-center gap-2">
                <FileText size={13} />
                Create Invoice
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
