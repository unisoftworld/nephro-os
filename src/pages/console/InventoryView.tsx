import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package, Plus, Search, Filter, AlertTriangle, CheckCircle2,
  ChevronRight, TrendingDown, Clock, Droplets, Syringe, Pill,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.04, duration: 0.35 },
  }),
};

const inventoryItems = [
  { sku: 'DZ-F80NR', name: 'Fresenius F80NR Dialyzer', category: 'Dialyzer', qty: 245, reorder: 50, expiry: '2027-03-15', status: 'ok', icon: Droplets },
  { sku: 'BL-STD', name: 'Standard Bloodline Set', category: 'Bloodline', qty: 189, reorder: 40, expiry: '2027-01-20', status: 'ok', icon: Droplets },
  { sku: 'HP-5000', name: 'Heparin Sodium 5000 IU', category: 'Medication', qty: 34, reorder: 20, expiry: '2026-08-10', status: 'low', icon: Syringe },
  { sku: 'SL-09', name: 'Normal Saline 0.9% 500mL', category: 'Solution', qty: 412, reorder: 100, expiry: '2026-12-01', status: 'ok', icon: Droplets },
  { sku: 'EPO-4K', name: 'Epoetin Alfa 4000 IU', category: 'Medication', qty: 18, reorder: 15, expiry: '2026-07-22', status: 'critical', icon: Pill },
  { sku: 'CT-IJ14', name: 'IJ Catheter 14Fr', category: 'Catheter', qty: 12, reorder: 5, expiry: '2027-05-30', status: 'ok', icon: Syringe },
  { sku: 'NG-21G', name: 'Needle 21G x 1", Arteriovenous', category: 'Needle', qty: 8, reorder: 20, expiry: '2027-02-14', status: 'low', icon: Syringe },
  { sku: 'TS-RB', name: 'Transducer Protector', category: 'Accessory', qty: 156, reorder: 30, expiry: '2028-01-01', status: 'ok', icon: Package },
];

export default function InventoryView() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = inventoryItems.filter(i =>
    !searchQuery || i.name.toLowerCase().includes(searchQuery.toLowerCase()) || i.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStock = inventoryItems.filter(i => i.status === 'low' || i.status === 'critical').length;

  return (
    <div className="p-4 lg:p-6 max-w-[1280px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-20 font-semibold text-ink-900 tracking-[-0.02em]">Inventory</h1>
            {lowStock > 0 && <span className="badge-critical">{lowStock} Low Stock</span>}
          </div>
          <p className="text-12 text-ink-400">{inventoryItems.length} items tracked across all categories</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-8 border border-ink-900/[0.08] text-13 font-medium text-ink-600 hover:bg-white bg-white transition-all">
            <Filter size={14} /> Filter
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-8 bg-saline-500 text-white text-13 font-medium hover:bg-saline-600 transition-colors shadow-raised">
            <Plus size={14} /> Add Item
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-5">
        <div className="relative max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-4 rounded-8 border border-ink-900/[0.08] bg-white text-13 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <motion.div custom={0} variants={fadeUp as any} initial="hidden" animate="visible" className="nephro-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-900/[0.06]">
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3">Item</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3 hidden sm:table-cell">SKU</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3">Category</th>
                <th className="text-right text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3">Qty</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3 hidden md:table-cell">Expiry</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <tr key={item.sku} className="border-b border-ink-900/[0.04] hover:bg-saline-50/[0.3] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-6 bg-ink-900/[0.04] flex items-center justify-center">
                        <item.icon size={13} className="text-ink-400" strokeWidth={1.5} />
                      </div>
                      <span className="text-12 font-medium text-ink-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="data-mono text-11 text-ink-400">{item.sku}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-11 text-ink-500">{item.category}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`data-mono text-13 font-medium ${item.status === 'critical' ? 'text-critical-600' : item.status === 'low' ? 'text-advisory-600' : 'text-ink-900'}`}>
                      {item.qty}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex items-center gap-1.5 text-11 text-ink-400">
                      <Clock size={10} />
                      <span className="data-mono">{item.expiry}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={item.status === 'ok' ? 'badge-stable' : item.status === 'low' ? 'badge-advisory' : 'badge-critical'}>
                      {item.status === 'ok' ? <CheckCircle2 size={10} /> : item.status === 'low' ? <TrendingDown size={10} /> : <AlertTriangle size={10} />}
                      {item.status === 'ok' ? 'OK' : item.status === 'low' ? 'Low' : 'Critical'}
                    </span>
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
