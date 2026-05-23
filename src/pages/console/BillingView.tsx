import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus, Filter, TrendingUp,
  CheckCircle2, Clock, AlertTriangle, FileText,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import NewInvoiceModal from '@/components/NewInvoiceModal';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.04, duration: 0.35 },
  }),
};

const revenueData = [
  { month: 'Jan', revenue: 145000 },
  { month: 'Feb', revenue: 152000 },
  { month: 'Mar', revenue: 168000 },
  { month: 'Apr', revenue: 161000 },
  { month: 'May', revenue: 175000 },
];

const invoices = [
  { id: 'INV-2026-0542', patient: 'Ahmad Al-Rashid', code: 'P-4421', amount: 1847.50, vat: 277.13, total: 2124.63, status: 'paid', date: '2026-05-17', method: 'ClickPay' },
  { id: 'INV-2026-0541', patient: 'Fatima Al-Zahra', code: 'P-3309', amount: 1847.50, vat: 277.13, total: 2124.63, status: 'pending', date: '2026-05-17', method: 'Insurance' },
  { id: 'INV-2026-0540', patient: 'Khalid Bin Omar', code: 'P-5102', amount: 1847.50, vat: 277.13, total: 2124.63, status: 'paid', date: '2026-05-16', method: 'Cash' },
  { id: 'INV-2026-0539', patient: 'Maryam Hassan', code: 'P-2187', amount: 1847.50, vat: 277.13, total: 2124.63, status: 'overdue', date: '2026-05-14', method: 'Insurance' },
  { id: 'INV-2026-0538', patient: 'Yusuf Al-Mahmoud', code: 'P-4456', amount: 1847.50, vat: 277.13, total: 2124.63, status: 'paid', date: '2026-05-14', method: 'ClickPay' },
];

const formatSAR = (v: number) => `SAR ${v.toLocaleString('en', { minimumFractionDigits: 2 })}`;

export default function BillingView() {
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [createdId, setCreatedId] = useState<string | null>(null);

  return (
    <div className="p-4 lg:p-6 max-w-[1280px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-20 font-semibold text-ink-900 tracking-[-0.02em] mb-1">Billing</h1>
          <p className="text-12 text-ink-400">Invoices, payments, and insurance claims</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-8 border border-ink-900/[0.08] text-13 font-medium text-ink-600 hover:bg-white bg-white transition-all">
            <Filter size={14} /> Filter
          </button>
          <button
            onClick={() => setInvoiceOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-8 bg-saline-500 text-white text-13 font-medium hover:bg-saline-600 transition-colors shadow-raised"
          >
            <Plus size={14} /> New Invoice
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total Revenue (MTD)', value: formatSAR(175000), icon: TrendingUp },
          { label: 'Paid', value: formatSAR(142500), icon: CheckCircle2 },
          { label: 'Pending', value: formatSAR(21250), icon: Clock },
          { label: 'Overdue', value: formatSAR(11250), icon: AlertTriangle },
        ].map((stat, i) => (
          <motion.div key={stat.label} custom={i} variants={fadeUp as any} initial="hidden" animate="visible" className="nephro-card py-3 px-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon size={13} className="text-ink-300" strokeWidth={1.5} />
              <span className="text-11 text-ink-400">{stat.label}</span>
            </div>
            <p className="text-16 font-semibold data-mono tracking-[-0.01em] text-ink-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <motion.div custom={4} variants={fadeUp as any} initial="hidden" animate="visible" className="nephro-card mb-5">
        <h3 className="text-13 font-semibold text-ink-900 uppercase tracking-[0.04em] mb-4">Monthly Revenue</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#5C6781' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#5C6781' }} axisLine={false} tickLine={false} tickFormatter={(v) => `SAR ${(v / 1000).toFixed(0)}K`} />
              <Bar dataKey="revenue" fill="#128B92" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Invoice Table */}
      <motion.div custom={5} variants={fadeUp as any} initial="hidden" animate="visible" className="nephro-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-900/[0.06]">
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3">Invoice</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3">Patient</th>
                <th className="text-right text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3">Amount</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3 hidden sm:table-cell">Status</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3 hidden md:table-cell">Method</th>
                <th className="text-right text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, i) => (
                <tr key={inv.id} className="border-b border-ink-900/[0.04] hover:bg-saline-50/[0.3] transition-colors cursor-pointer">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText size={13} className="text-ink-300" />
                      <span className="data-mono text-12 font-medium text-ink-900">{inv.id}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-12 font-medium text-ink-900">{inv.patient}</p>
                      <p className="data-mono text-10 text-ink-400">{inv.code}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <p className="data-mono text-13 font-medium text-ink-900">{formatSAR(inv.total)}</p>
                    <p className="data-mono text-10 text-ink-400">incl. VAT {formatSAR(inv.vat)}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={inv.status === 'paid' ? 'badge-stable' : inv.status === 'pending' ? 'badge-info' : 'badge-critical'}>
                      {inv.status === 'paid' ? <CheckCircle2 size={10} /> : inv.status === 'pending' ? <Clock size={10} /> : <AlertTriangle size={10} />}
                      {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-11 text-ink-500">{inv.method}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="data-mono text-11 text-ink-400">{inv.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {createdId && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-8 bg-stable-500 text-white shadow-overlay">
          <CheckCircle2 size={16} />
          <span className="text-13 font-medium">{createdId} created</span>
        </div>
      )}

      <NewInvoiceModal
        isOpen={invoiceOpen}
        onClose={() => setInvoiceOpen(false)}
        onCreated={(id) => {
          setCreatedId(id);
          setTimeout(() => setCreatedId(null), 3000);
        }}
      />
    </div>
  );
}
