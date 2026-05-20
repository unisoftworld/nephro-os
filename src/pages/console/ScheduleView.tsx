import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, ChevronLeft, ChevronRight, Plus, Clock,
  Users, Activity, Filter,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.04, duration: 0.35 },
  }),
};

const timeSlots = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
const chairs = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

interface ScheduleItem {
  chair: string;
  startSlot: number;
  duration: number;
  patient: string;
  code: string;
  initials: string;
  status: 'active' | 'completed' | 'scheduled';
}

const scheduleItems: ScheduleItem[] = [
  { chair: '01', startSlot: 3, duration: 4, patient: 'Ahmad Al-Rashid', code: 'P-4421', initials: 'AR', status: 'active' },
  { chair: '02', startSlot: 3, duration: 4, patient: 'Fatima Al-Zahra', code: 'P-3309', initials: 'FZ', status: 'active' },
  { chair: '03', startSlot: 4, duration: 4, patient: 'Khalid Bin Omar', code: 'P-5102', initials: 'KO', status: 'active' },
  { chair: '04', startSlot: 2, duration: 4, patient: 'Maryam Hassan', code: 'P-2187', initials: 'MH', status: 'active' },
  { chair: '05', startSlot: 4, duration: 4, patient: 'Yusuf Al-Mahmoud', code: 'P-4456', initials: 'YM', status: 'active' },
  { chair: '06', startSlot: 5, duration: 4, patient: 'Nora Al-Saud', code: 'P-6734', initials: 'NS', status: 'active' },
  { chair: '09', startSlot: 6, duration: 4, patient: 'Sami Al-Farsi', code: 'P-8921', initials: 'SF', status: 'scheduled' },
  { chair: '10', startSlot: 6, duration: 4, patient: 'Laila Abdullah', code: 'P-3456', initials: 'LA', status: 'scheduled' },
  { chair: '11', startSlot: 3, duration: 4, patient: 'Omar Bin Sulaiman', code: 'P-7789', initials: 'OS', status: 'active' },
  { chair: '12', startSlot: 2, duration: 4, patient: 'Hana Al-Qasimi', code: 'P-2234', initials: 'HQ', status: 'active' },
];

export default function ScheduleView() {
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');

  return (
    <div className="p-4 lg:p-6 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-20 font-semibold text-ink-900 tracking-[-0.02em] mb-1">Schedule</h1>
          <p className="text-12 text-ink-400">Chair allocation for {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-8 bg-white border border-ink-900/[0.06]">
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1.5 rounded-6 text-12 font-medium transition-all ${viewMode === 'day' ? 'bg-ink-900 text-white' : 'text-ink-400 hover:text-ink-600'}`}
            >
              Day
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-6 text-12 font-medium transition-all ${viewMode === 'week' ? 'bg-ink-900 text-white' : 'text-ink-400 hover:text-ink-600'}`}
            >
              Week
            </button>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-8 border border-ink-900/[0.08] text-13 font-medium text-ink-600 hover:bg-white bg-white transition-all">
            <Filter size={14} />
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-8 bg-saline-500 text-white text-13 font-medium hover:bg-saline-600 transition-colors shadow-raised">
            <Plus size={14} />
            Schedule
          </button>
        </div>
      </div>

      {/* Date Navigation */}
      <div className="flex items-center gap-3 mb-6">
        <button className="p-1.5 rounded-6 hover:bg-ink-900/[0.04] text-ink-400">
          <ChevronLeft size={16} />
        </button>
        <div className="flex items-center gap-2 px-4 py-2 rounded-8 bg-white border border-ink-900/[0.06]">
          <Calendar size={14} className="text-ink-400" />
          <span className="text-13 font-medium text-ink-900">May 18, 2026</span>
        </div>
        <button className="p-1.5 rounded-6 hover:bg-ink-900/[0.04] text-ink-400">
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Gantt Chart */}
      <motion.div
        custom={0}
        variants={fadeUp as any}
        initial="hidden"
        animate="visible"
        className="nephro-card overflow-hidden p-0"
      >
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Time Header */}
            <div className="grid" style={{ gridTemplateColumns: `64px repeat(${timeSlots.length}, 1fr)` }}>
              <div className="px-3 py-2 border-b border-r border-ink-900/[0.06] bg-ink-900/[0.02]">
                <span className="text-9 uppercase tracking-wider text-ink-400 font-medium">Chair</span>
              </div>
              {timeSlots.map((slot) => (
                <div key={slot} className="px-1 py-2 border-b border-r border-ink-900/[0.06] text-center">
                  <span className="data-mono text-9 text-ink-400">{slot}</span>
                </div>
              ))}
            </div>

            {/* Chair Rows */}
            {chairs.map((chair) => {
              const items = scheduleItems.filter(item => item.chair === chair);
              return (
                <div
                  key={chair}
                  className="grid border-b border-ink-900/[0.04] hover:bg-saline-50/[0.15] transition-colors"
                  style={{ gridTemplateColumns: `64px repeat(${timeSlots.length}, 1fr)` }}
                >
                  <div className="px-3 py-3 border-r border-ink-900/[0.06] flex items-center">
                    <span className="data-mono text-12 font-medium text-ink-500">{chair}</span>
                  </div>
                  {timeSlots.map((_, slotIdx) => {
                    const item = items.find(i => slotIdx >= i.startSlot && slotIdx < i.startSlot + i.duration);
                    if (item && slotIdx === item.startSlot) {
                      return (
                        <div
                          key={slotIdx}
                          className={`py-1 px-1 border-r border-ink-900/[0.04] ${
                            item.status === 'active'
                              ? 'bg-saline-50'
                              : item.status === 'completed'
                              ? 'bg-ink-900/[0.02]'
                              : 'bg-advisory-50/[0.3]'
                          }`}
                          style={{ gridColumn: `span ${item.duration}` }}
                        >
                          <div className={`h-full rounded-6 px-2 py-1.5 ${
                            item.status === 'active'
                              ? 'bg-saline-100/[0.5] border border-saline-200'
                              : item.status === 'completed'
                              ? 'bg-ink-900/[0.03] border border-ink-900/[0.06]'
                              : 'bg-advisory-50 border border-advisory-100'
                          }`}>
                            <div className="flex items-center gap-1.5">
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center text-9 font-semibold ${
                                item.status === 'active'
                                  ? 'bg-saline-200 text-saline-600'
                                  : item.status === 'completed'
                                  ? 'bg-ink-200 text-ink-500'
                                  : 'bg-advisory-200 text-advisory-600'
                              }`}>
                                {item.initials}
                              </div>
                              <span className="text-9 text-ink-600 truncate font-medium">{item.patient.split(' ')[0]}</span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    if (item && slotIdx > item.startSlot && slotIdx < item.startSlot + item.duration) {
                      return null;
                    }
                    return (
                      <div key={slotIdx} className="py-3 border-r border-ink-900/[0.04]" />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mt-4">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-saline-200 border border-saline-300" />
          <span className="text-11 text-ink-400">Active</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-advisory-50 border border-advisory-100" />
          <span className="text-11 text-ink-400">Scheduled</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-ink-900/[0.03] border border-ink-900/[0.06]" />
          <span className="text-11 text-ink-400">Completed</span>
        </div>
      </div>
    </div>
  );
}
