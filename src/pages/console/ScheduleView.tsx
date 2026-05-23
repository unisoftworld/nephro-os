import { useEffect, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { patients } from '@/data/mockData';
import {
  AlertTriangle, Calendar, CheckCircle2, ChevronLeft, ChevronRight,
  Filter, Plus, X,
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
const scheduleStorageKey = 'nephroos.schedule.v1';

interface ScheduleItem {
  id: string;
  chair: string;
  startSlot: number;
  duration: number;
  patient: string;
  code: string;
  initials: string;
  status: 'active' | 'completed' | 'scheduled';
}

type ScheduleFormState = {
  patientId: string;
  chair: string;
  startSlot: number;
  duration: number;
  status: ScheduleItem['status'];
};

type ScheduleBook = Record<string, ScheduleItem[]>;

const toScheduleDateKey = (date: Date) => {
  const localDate = new Date(date);
  localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
  return localDate.toISOString().slice(0, 10);
};

const initialScheduleItems: ScheduleItem[] = [
  { id: 'sch-001', chair: '01', startSlot: 3, duration: 4, patient: 'Ahmad Al-Rashid', code: 'P-4421', initials: 'AR', status: 'active' },
  { id: 'sch-002', chair: '02', startSlot: 3, duration: 4, patient: 'Fatima Al-Zahra', code: 'P-3309', initials: 'FZ', status: 'active' },
  { id: 'sch-003', chair: '03', startSlot: 4, duration: 4, patient: 'Khalid Bin Omar', code: 'P-5102', initials: 'KO', status: 'active' },
  { id: 'sch-004', chair: '04', startSlot: 2, duration: 4, patient: 'Maryam Hassan', code: 'P-2187', initials: 'MH', status: 'active' },
  { id: 'sch-005', chair: '05', startSlot: 4, duration: 4, patient: 'Yusuf Al-Mahmoud', code: 'P-4456', initials: 'YM', status: 'active' },
  { id: 'sch-006', chair: '06', startSlot: 5, duration: 4, patient: 'Nora Al-Saud', code: 'P-6734', initials: 'NS', status: 'active' },
  { id: 'sch-007', chair: '09', startSlot: 6, duration: 4, patient: 'Sami Al-Farsi', code: 'P-8921', initials: 'SF', status: 'scheduled' },
  { id: 'sch-008', chair: '10', startSlot: 6, duration: 4, patient: 'Laila Abdullah', code: 'P-3456', initials: 'LA', status: 'scheduled' },
  { id: 'sch-009', chair: '11', startSlot: 3, duration: 4, patient: 'Omar Bin Sulaiman', code: 'P-7789', initials: 'OS', status: 'active' },
  { id: 'sch-010', chair: '12', startSlot: 2, duration: 4, patient: 'Hana Al-Qasimi', code: 'P-2234', initials: 'HQ', status: 'active' },
];

const getInitialScheduleBook = (): ScheduleBook => {
  const todayKey = toScheduleDateKey(new Date());

  if (typeof window === 'undefined') {
    return { [todayKey]: initialScheduleItems };
  }

  try {
    const stored = window.localStorage.getItem(scheduleStorageKey);
    if (!stored) return { [todayKey]: initialScheduleItems };

    const parsed = JSON.parse(stored) as ScheduleBook;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return { [todayKey]: initialScheduleItems };
    }

    return parsed[todayKey]
      ? parsed
      : { [todayKey]: initialScheduleItems, ...parsed };
  } catch {
    return { [todayKey]: initialScheduleItems };
  }
};

export default function ScheduleView() {
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  const [scheduleBook, setScheduleBook] = useState<ScheduleBook>(() => getInitialScheduleBook());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<ScheduleFormState>({
    patientId: patients[0]?.id || '',
    chair: '07',
    startSlot: 8,
    duration: 4,
    status: 'scheduled',
  });
  const [formError, setFormError] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const selectedDateKey = toScheduleDateKey(selectedDate);
  const scheduleItems = scheduleBook[selectedDateKey] || [];

  const selectedPatient = patients.find((patient) => patient.id === form.patientId) || patients[0];
  const startLabel = timeSlots[form.startSlot];
  const endLabel = timeSlots[Math.min(form.startSlot + form.duration, timeSlots.length - 1)];
  const dateLabel = selectedDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  useEffect(() => {
    window.localStorage.setItem(scheduleStorageKey, JSON.stringify(scheduleBook));
  }, [scheduleBook]);

  const shiftSelectedDate = (days: number) => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + days);
    setSelectedDate(next);
  };

  const updateForm = <K extends keyof ScheduleFormState>(
    key: K,
    value: ScheduleFormState[K]
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
    setFormError('');
  };

  const hasChairConflict = (candidate: ScheduleFormState) => {
    const candidateStart = candidate.startSlot;
    const candidateEnd = candidate.startSlot + candidate.duration;
    return scheduleItems.some((item) => {
      if (item.chair !== candidate.chair) return false;
      const itemStart = item.startSlot;
      const itemEnd = item.startSlot + item.duration;
      return candidateStart < itemEnd && candidateEnd > itemStart;
    });
  };

  const handleCreateSchedule = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedPatient) {
      setFormError('Select a patient before scheduling.');
      return;
    }

    if (form.startSlot + form.duration > timeSlots.length) {
      setFormError('Session duration exceeds the available schedule window.');
      return;
    }

    if (hasChairConflict(form)) {
      setFormError(`Chair ${form.chair} already has a session during this time.`);
      return;
    }

    const item: ScheduleItem = {
      id: `sch-${Date.now()}`,
      chair: form.chair,
      startSlot: form.startSlot,
      duration: form.duration,
      patient: selectedPatient.name,
      code: selectedPatient.code,
      initials: selectedPatient.initials,
      status: form.status,
    };

    setScheduleBook((current) => ({
      ...current,
      [selectedDateKey]: [...(current[selectedDateKey] || []), item],
    }));
    setDialogOpen(false);
    setFormError('');
  };

  return (
    <div className="p-4 lg:p-6 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-20 font-semibold text-ink-900 tracking-[-0.02em] mb-1">Schedule</h1>
          <p className="text-12 text-ink-400">Chair allocation for {dateLabel}</p>
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
          <button
            onClick={() => setDialogOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-8 bg-saline-500 text-white text-13 font-medium hover:bg-saline-600 transition-colors shadow-raised"
          >
            <Plus size={14} />
            Schedule
          </button>
        </div>
      </div>

      {/* Date Navigation */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => shiftSelectedDate(-1)}
          className="p-1.5 rounded-6 hover:bg-ink-900/[0.04] text-ink-400"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex items-center gap-2 px-4 py-2 rounded-8 bg-white border border-ink-900/[0.06]">
          <Calendar size={14} className="text-ink-400" />
          <span className="text-13 font-medium text-ink-900">
            {selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
        <button
          onClick={() => shiftSelectedDate(1)}
          className="p-1.5 rounded-6 hover:bg-ink-900/[0.04] text-ink-400"
        >
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
              const items = scheduleItems
                .filter(item => item.chair === chair)
                .sort((a, b) => a.startSlot - b.startSlot);
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

      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 px-4 py-6 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-[560px] rounded-8 border border-ink-900/[0.08] bg-white shadow-overlay"
          >
            <div className="flex items-start justify-between border-b border-ink-900/[0.06] px-5 py-4">
              <div>
                <p className="eyebrow mb-1">Dialysis schedule</p>
                <h2 className="text-18 font-semibold tracking-[-0.02em] text-ink-900">
                  New session allocation
                </h2>
              </div>
              <button
                onClick={() => setDialogOpen(false)}
                className="rounded-6 p-1.5 text-ink-300 transition-colors hover:bg-ink-900/[0.04] hover:text-ink-600"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateSchedule} className="space-y-4 px-5 py-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1.5 sm:col-span-2">
                  <span className="text-11 font-medium uppercase tracking-[0.08em] text-ink-400">
                    Patient
                  </span>
                  <select
                    value={form.patientId}
                    onChange={(event) => updateForm('patientId', event.target.value)}
                    className="h-9 w-full rounded-8 border border-ink-900/[0.08] bg-white px-3 text-13 text-ink-900 outline-none transition-all focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20"
                  >
                    {patients.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name} - {patient.code}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1.5">
                  <span className="text-11 font-medium uppercase tracking-[0.08em] text-ink-400">
                    Chair
                  </span>
                  <select
                    value={form.chair}
                    onChange={(event) => updateForm('chair', event.target.value)}
                    className="h-9 w-full rounded-8 border border-ink-900/[0.08] bg-white px-3 text-13 text-ink-900 outline-none transition-all focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20"
                  >
                    {chairs.map((chair) => (
                      <option key={chair} value={chair}>
                        Chair {chair}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1.5">
                  <span className="text-11 font-medium uppercase tracking-[0.08em] text-ink-400">
                    Start
                  </span>
                  <select
                    value={form.startSlot}
                    onChange={(event) => updateForm('startSlot', Number(event.target.value))}
                    className="h-9 w-full rounded-8 border border-ink-900/[0.08] bg-white px-3 text-13 text-ink-900 outline-none transition-all focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20"
                  >
                    {timeSlots.slice(0, -1).map((slot, index) => (
                      <option key={slot} value={index}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1.5">
                  <span className="text-11 font-medium uppercase tracking-[0.08em] text-ink-400">
                    Duration
                  </span>
                  <select
                    value={form.duration}
                    onChange={(event) => updateForm('duration', Number(event.target.value))}
                    className="h-9 w-full rounded-8 border border-ink-900/[0.08] bg-white px-3 text-13 text-ink-900 outline-none transition-all focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20"
                  >
                    {[2, 3, 4, 5].map((duration) => (
                      <option key={duration} value={duration}>
                        {duration} hours
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1.5">
                  <span className="text-11 font-medium uppercase tracking-[0.08em] text-ink-400">
                    Status
                  </span>
                  <select
                    value={form.status}
                    onChange={(event) => updateForm('status', event.target.value as ScheduleItem['status'])}
                    className="h-9 w-full rounded-8 border border-ink-900/[0.08] bg-white px-3 text-13 text-ink-900 outline-none transition-all focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                  </select>
                </label>
              </div>

              <div className="rounded-8 border border-saline-200 bg-saline-50/60 p-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-saline-100 text-11 font-semibold text-saline-600">
                    {selectedPatient?.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-13 font-medium text-ink-900">
                      {selectedPatient?.name}
                    </p>
                    <p className="mt-0.5 text-11 text-ink-500">
                      Chair {form.chair} · {startLabel} - {endLabel} · {form.duration}h
                    </p>
                  </div>
                </div>
              </div>

              {formError && (
                <div className="flex items-start gap-2 rounded-8 border border-critical-500/15 bg-critical-50 p-3 text-12 text-critical-700">
                  <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 border-t border-ink-900/[0.06] pt-4">
                <button
                  type="button"
                  onClick={() => setDialogOpen(false)}
                  className="inline-flex h-8 items-center justify-center rounded-8 border border-ink-900/[0.08] bg-white px-4 text-13 font-medium text-ink-600 transition-all hover:bg-ink-900/[0.02]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex h-8 items-center justify-center gap-2 rounded-8 bg-saline-500 px-4 text-13 font-medium text-white shadow-raised transition-colors hover:bg-saline-600"
                >
                  <CheckCircle2 size={14} />
                  Create schedule
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
