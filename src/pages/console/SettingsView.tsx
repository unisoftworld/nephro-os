import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings, Users, Building2, Shield, Bell, Globe,
  CreditCard, Database, ChevronRight, CheckCircle2,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.04, duration: 0.35 },
  }),
};

const settingSections = [
  {
    title: 'Organization',
    icon: Building2,
    items: [
      { label: 'Center Profile', desc: 'Name, address, license, contact details', active: true },
      { label: 'Branches', desc: 'Manage multiple locations', active: false },
      { label: 'Departments', desc: 'Dialysis, vascular, lab, admin', active: false },
    ],
  },
  {
    title: 'Users & Permissions',
    icon: Users,
    items: [
      { label: 'Staff Accounts', desc: '12 active users', active: true },
      { label: 'Roles & Permissions', desc: 'Doctor, Nurse, Manager, Billing', active: false },
      { label: 'Access Log', desc: 'View login history', active: false },
    ],
  },
  {
    title: 'Security',
    icon: Shield,
    items: [
      { label: 'Authentication', desc: 'MFA, password policy, session timeout', active: true },
      { label: 'Audit Logs', desc: 'Track all system changes', active: false },
      { label: 'Data Retention', desc: 'Configure retention policies', active: false },
    ],
  },
  {
    title: 'Notifications',
    icon: Bell,
    items: [
      { label: 'Alert Rules', desc: 'Configure critical thresholds', active: true },
      { label: 'Email Settings', desc: 'SMTP configuration', active: false },
      { label: 'SMS Alerts', desc: 'Phone number for emergency alerts', active: false },
    ],
  },
  {
    title: 'Regional',
    icon: Globe,
    items: [
      { label: 'Language', desc: 'English', active: true },
      { label: 'Date & Time', desc: 'Saudi Arabia (UTC+3)', active: false },
      { label: 'Currency & VAT', desc: 'SAR, 15% VAT', active: false },
    ],
  },
  {
    title: 'Integrations',
    icon: Database,
    items: [
      { label: 'NPHIES', desc: 'FHIR R4 — Connected', active: true, connected: true },
      { label: 'ClickPay', desc: 'Payment gateway', active: false },
      { label: 'Aramex', desc: 'Logistics & delivery', active: false },
    ],
  },
  {
    title: 'Billing',
    icon: CreditCard,
    items: [
      { label: 'Subscription', desc: 'Professional Plan', active: true },
      { label: 'Invoices', desc: 'View billing history', active: false },
      { label: 'Usage', desc: 'Check AI query limits', active: false },
    ],
  },
];

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState('Organization');

  const activeSection = settingSections.find(s => s.title === activeTab) || settingSections[0];

  return (
    <div className="p-4 lg:p-6 max-w-[1280px] mx-auto">
      <div className="mb-6">
        <h1 className="text-20 font-semibold text-ink-900 tracking-[-0.02em] mb-1">Settings</h1>
        <p className="text-12 text-ink-400">Configure your center preferences</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-5">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="nephro-card p-2 space-y-0.5">
            {settingSections.map((section) => (
              <button
                key={section.title}
                onClick={() => setActiveTab(section.title)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-8 text-12 font-medium transition-all text-left ${
                  activeTab === section.title
                    ? 'bg-saline-500/10 text-saline-600'
                    : 'text-ink-400 hover:bg-ink-900/[0.04] hover:text-ink-600'
                }`}
              >
                <section.icon size={15} className={activeTab === section.title ? 'text-saline-500' : 'text-ink-300'} strokeWidth={1.5} />
                <span>{section.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="lg:col-span-3"
        >
          <div className="nephro-card mb-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-8 bg-saline-50 flex items-center justify-center">
                <activeSection.icon size={18} className="text-saline-500" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-16 font-semibold text-ink-900">{activeSection.title}</h2>
                <p className="text-12 text-ink-400">Manage {activeSection.title.toLowerCase()} settings</p>
              </div>
            </div>

            <div className="space-y-2">
              {activeSection.items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between p-3 rounded-8 hover:bg-ink-900/[0.02] cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-6 bg-ink-900/[0.03] flex items-center justify-center group-hover:bg-saline-50 transition-colors">
                      {item.connected ? (
                        <CheckCircle2 size={14} className="text-stable-500" />
                      ) : (
                        <ChevronRight size={14} className="text-ink-300 group-hover:text-saline-500 transition-colors" />
                      )}
                    </div>
                    <div>
                      <p className="text-13 font-medium text-ink-900">{item.label}</p>
                      <p className="text-11 text-ink-400">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-ink-300 group-hover:text-ink-500 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
