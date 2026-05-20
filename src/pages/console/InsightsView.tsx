import { motion } from 'framer-motion';
import { insights } from '@/data/mockData';
import {
  Brain, TrendingUp, AlertTriangle, AlertCircle,
  CheckCircle2, Activity, Clock, ChevronRight, Filter,
  BarChart3, Zap, Shield, Eye,
} from 'lucide-react';
import { useState } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.04, duration: 0.35 },
  }),
};

function InsightCard({ insight, index }: { insight: typeof insights[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  const typeConfig = {
    stable: { icon: CheckCircle2, color: 'text-stable-500', bg: 'bg-stable-50', border: 'border-stable/15', label: 'Stable' },
    advisory: { icon: TrendingUp, color: 'text-advisory-500', bg: 'bg-advisory-50', border: 'border-advisory/15', label: 'Advisory' },
    critical: { icon: AlertTriangle, color: 'text-critical-500', bg: 'bg-critical-50', border: 'border-critical/15', label: 'Critical' },
    info: { icon: Activity, color: 'text-info-500', bg: 'bg-info-50', border: 'border-info/15', label: 'Info' },
  };

  const config = typeConfig[insight.type];
  const Icon = config.icon;

  return (
    <motion.div
      custom={index}
      variants={fadeUp as any}
      initial="hidden"
      animate="visible"
      className={`nephro-card ${config.bg} border ${config.border} cursor-pointer transition-all hover:shadow-raised`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-8 flex items-center justify-center shrink-0 ${config.bg}`}>
          <Icon size={18} className={config.color} strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`badge-${insight.type === 'stable' ? 'stable' : insight.type === 'advisory' ? 'advisory' : insight.type === 'critical' ? 'critical' : 'info'}`}>
              {insight.type === 'stable' && <CheckCircle2 size={10} />}
              {insight.type === 'advisory' && <TrendingUp size={10} />}
              {insight.type === 'critical' && <AlertTriangle size={10} />}
              {insight.type === 'info' && <Activity size={10} />}
              {config.label}
            </span>
            {insight.patientCode && (
              <span className="data-mono text-11 text-ink-400">{insight.patientCode}</span>
            )}
            {insight.chairId && (
              <span className="data-mono text-11 text-ink-400">Chair {insight.chairId}</span>
            )}
            <span className="text-10 text-ink-300 ml-auto data-mono flex items-center gap-1">
              <Clock size={9} />
              {insight.time}
            </span>
          </div>
          <h3 className="text-13 font-semibold text-ink-900 mb-1.5">
            {insight.title}
          </h3>
          <p className={`text-12 text-ink-500 leading-relaxed ${expanded ? '' : 'line-clamp-2'}`}>
            {insight.description}
          </p>
          {expanded && (
            <div className="mt-4 pt-3 border-t border-ink-900/[0.06]">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-11 text-ink-400">
                  <Shield size={11} />
                  <span>AI confidence: 87%</span>
                </div>
                <div className="flex items-center gap-1.5 text-11 text-ink-400">
                  <Eye size={11} />
                  <span>Requires doctor review</span>
                </div>
              </div>
              {insight.action && (
                <button className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-8 bg-saline-500 text-white text-12 font-medium hover:bg-saline-600 transition-colors shadow-raised">
                  {insight.action}
                  <ChevronRight size={12} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function InsightsView() {
  const [filter, setFilter] = useState<string>('all');

  const filteredInsights = filter === 'all'
    ? insights
    : insights.filter(i => i.type === filter);

  const counts = {
    all: insights.length,
    critical: insights.filter(i => i.type === 'critical').length,
    advisory: insights.filter(i => i.type === 'advisory').length,
    stable: insights.filter(i => i.type === 'stable').length,
    info: insights.filter(i => i.type === 'info').length,
  };

  return (
    <div className="p-4 lg:p-6 max-w-[960px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-20 font-semibold text-ink-900 tracking-[-0.02em]">
              AI Insights
            </h1>
            <Brain size={18} className="text-saline-500" />
          </div>
          <p className="text-12 text-ink-400">
            AI-generated clinical intelligence for your center
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge-brand">
            <Zap size={10} />
            AI Active
          </span>
          <span className="text-11 text-ink-400 data-mono">{counts.critical} critical</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-8 bg-white border border-ink-900/[0.06] mb-6 overflow-x-auto">
        {([
          { label: 'All', value: 'all', count: counts.all },
          { label: 'Critical', value: 'critical', count: counts.critical },
          { label: 'Advisory', value: 'advisory', count: counts.advisory },
          { label: 'Stable', value: 'stable', count: counts.stable },
          { label: 'Info', value: 'info', count: counts.info },
        ] as const).map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-6 text-12 font-medium whitespace-nowrap transition-all ${
              filter === f.value
                ? 'bg-ink-900 text-white'
                : 'text-ink-400 hover:text-ink-600 hover:bg-ink-900/[0.04]'
            }`}
          >
            {f.label}
            <span className={`data-mono text-10 ${filter === f.value ? 'text-white/60' : 'text-ink-300'}`}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Insights List */}
      <div className="space-y-3">
        {filteredInsights.map((insight, i) => (
          <InsightCard key={insight.id} insight={insight} index={i} />
        ))}
      </div>

      {filteredInsights.length === 0 && (
        <div className="nephro-card py-16 text-center">
          <Brain size={32} className="text-ink-200 mx-auto mb-3" />
          <p className="text-13 text-ink-400">No insights match the selected filter</p>
        </div>
      )}
    </div>
  );
}
