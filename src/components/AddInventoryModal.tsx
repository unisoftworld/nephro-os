import { useState, type FormEvent } from 'react';
import { X, CheckCircle2, Package } from 'lucide-react';

interface AddInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdded: (name: string) => void;
}

const CATEGORIES = ['Dialyzer', 'Bloodline', 'Medication', 'Solution', 'Catheter', 'Needle', 'Accessory', 'Other'];

export default function AddInventoryModal({ isOpen, onClose, onAdded }: AddInventoryModalProps) {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('Dialyzer');
  const [qty, setQty] = useState('');
  const [reorder, setReorder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [done, setDone] = useState(false);

  const reset = () => { setName(''); setSku(''); setCategory('Dialyzer'); setQty(''); setReorder(''); setExpiry(''); };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => {
      setDone(false);
      const n = name;
      reset();
      onAdded(n);
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-overlay w-full max-w-[440px] mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-900/[0.06]">
          <h2 className="text-15 font-semibold text-ink-900">Add Inventory Item</h2>
          <button onClick={onClose} className="p-1.5 rounded-6 text-ink-300 hover:text-ink-600 hover:bg-ink-900/[0.04] transition-all">
            <X size={16} />
          </button>
        </div>

        {done ? (
          <div className="flex flex-col items-center justify-center py-14 gap-3">
            <div className="w-12 h-12 rounded-full bg-stable-50 flex items-center justify-center">
              <CheckCircle2 size={22} className="text-stable-500" />
            </div>
            <p className="text-14 font-semibold text-ink-900">{name} added</p>
            <p className="text-12 text-ink-400">Inventory updated</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5">
            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">Item Name *</label>
                <input required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Fresenius F80NR Dialyzer"
                  className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">SKU *</label>
                  <input required value={sku} onChange={e => setSku(e.target.value)} placeholder="e.g. DZ-F80NR"
                    className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 data-mono transition-all" />
                </div>
                <div>
                  <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)}
                    className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 transition-all">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">Quantity *</label>
                  <input required type="number" min="0" value={qty} onChange={e => setQty(e.target.value)} placeholder="0"
                    className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 data-mono transition-all" />
                </div>
                <div>
                  <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">Reorder Level</label>
                  <input type="number" min="0" value={reorder} onChange={e => setReorder(e.target.value)} placeholder="0"
                    className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 data-mono transition-all" />
                </div>
                <div className="col-span-2">
                  <label className="block text-11 font-medium text-ink-500 uppercase tracking-[0.06em] mb-1.5">Expiry Date</label>
                  <input type="date" value={expiry} onChange={e => setExpiry(e.target.value)}
                    className="w-full h-9 px-3 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 data-mono transition-all" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-ink-900/[0.06]">
              <button type="button" onClick={onClose} className="h-9 px-4 rounded-8 text-13 font-medium text-ink-500 hover:bg-ink-900/[0.04] transition-all">Cancel</button>
              <button type="submit" className="h-9 px-4 rounded-8 bg-saline-500 text-white text-13 font-semibold hover:bg-saline-600 transition-all shadow-raised flex items-center gap-2">
                <Package size={13} />
                Add Item
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
