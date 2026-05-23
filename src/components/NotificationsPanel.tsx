import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { insights } from '@/data/mockData';
import { X, AlertTriangle, TrendingUp, CheckCircle2, Activity, Bell } from 'lucide-react';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const TYPE_CONFIG = {
  critical: {
    icon: AlertTriangle,
    iconClass: 'text-critical-500',
    bgClass: 'bg-critical-50',
    borderClass: 'border-critical-500/10',
    labelClass: 'text-critical-700',
    label: 'Critical',
  },
  advisory: {
    icon: TrendingUp,
    iconClass: 'text-advisory-500',
    bgClass: 'bg-advisory-50',
    borderClass: 'border-advisory-500/10',
    labelClass: 'text-advisory-700',
    label: 'Advisory',
  },
  stable: {
    icon: CheckCircle2,
    iconClass: 'text-stable-500',
    bgClass: 'bg-stable-50',
    borderClass: 'border-stable-500/10',
    labelClass: 'text-stable-700',
    label: 'Stable',
  },
  info: {
    icon: Activity,
    iconClass: 'text-info-500',
    bgClass: 'bg-info-50',
    borderClass: 'border-info-500/10',
    labelClass: 'text-info-700',
    label: 'Info',
  },
} as const;

export default function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const visible = insights.filter(i => !dismissed.has(i.id));
  const dismissAll = () => setDismissed(new Set(insights.map(i => i.id)));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="fixed left-3 right-3 top-[56px] z-50 max-h-[calc(100dvh-72px)] rounded-8 border border-ink-900/[0.06] bg-white shadow-overlay flex flex-col overflow-hidden sm:left-auto sm:right-4 sm:w-[380px] sm:max-h-[520px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-ink-900/[0.06]">
              <div className="flex items-center gap-2">
                <Bell size={14} className="text-ink-400" />
                <h3 className="text-13 font-semibold text-ink-900">Notifications</h3>
                {visible.length > 0 && (
                  <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-critical-50 text-critical-600 text-10 font-semibold flex items-center justify-center">
                    {visible.length}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {visible.length > 0 && (
                  <button
                    onClick={dismissAll}
                    className="text-11 text-ink-400 hover:text-ink-600 transition-colors"
                  >
                    Dismiss all
                  </button>
                )}
                <button onClick={onClose} className="p-1 rounded-6 text-ink-300 hover:text-ink-600 transition-colors">
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="overflow-y-auto flex-1">
              {visible.length === 0 ? (
                <div className="py-14 flex flex-col items-center gap-2">
                  <CheckCircle2 size={24} className="text-ink-200" />
                  <p className="text-13 font-medium text-ink-400">All caught up</p>
                  <p className="text-11 text-ink-300">No active notifications</p>
                </div>
              ) : (
                <div className="p-2 space-y-1.5">
                  {visible.map(insight => {
                    const cfg = TYPE_CONFIG[insight.type];
                    const Icon = cfg.icon;
                    return (
                      <div
                        key={insight.id}
                        className={`flex gap-3 p-3 rounded-8 border ${cfg.bgClass} ${cfg.borderClass}`}
                      >
                        <div className={`w-6 h-6 rounded-full ${cfg.bgClass} border ${cfg.borderClass} flex items-center justify-center shrink-0 mt-0.5`}>
                          <Icon size={12} className={cfg.iconClass} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className={`inline-flex items-center h-[16px] px-[6px] rounded-pill text-9 font-semibold uppercase tracking-[0.06em] mb-1 ${cfg.bgClass} ${cfg.labelClass}`}>
                                {cfg.label}
                              </span>
                              <p className="text-12 font-medium text-ink-900 leading-snug">{insight.title}</p>
                              <p className="text-11 text-ink-500 mt-0.5 leading-relaxed">{insight.description}</p>
                              {insight.action && (
                                <button className={`mt-1 text-11 font-medium ${cfg.iconClass} hover:opacity-80 transition-opacity`}>
                                  {insight.action} →
                                </button>
                              )}
                            </div>
                            <button
                              onClick={() => setDismissed(p => new Set([...p, insight.id]))}
                              className="p-0.5 rounded-4 text-ink-300 hover:text-ink-600 hover:bg-ink-900/[0.04] transition-colors shrink-0 mt-0.5"
                            >
                              <X size={11} />
                            </button>
                          </div>
                          <p className="text-10 text-ink-300 data-mono mt-1.5">{insight.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
