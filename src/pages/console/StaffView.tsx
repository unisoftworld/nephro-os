import { useState } from 'react';
import { motion } from 'framer-motion';
import { staffMembers, type StaffMember, type StaffRole } from '@/data/mockData';
import {
  Users, UserCheck, Stethoscope, Plus, Search,
  Phone, Mail, Clock, ChevronRight,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.04, duration: 0.3 },
  }),
};

const ROLE_LABELS: Record<StaffRole, string> = {
  nephrologist: 'Nephrologist',
  nurse: 'Nurse',
  'charge-nurse': 'Charge Nurse',
  tech: 'HD Technician',
  manager: 'Center Manager',
  billing: 'Billing Specialist',
};

const ROLE_COLORS: Record<StaffRole, string> = {
  nephrologist: 'bg-saline-50 text-saline-700',
  nurse: 'bg-stable-50 text-stable-700',
  'charge-nurse': 'bg-info-50 text-info-700',
  tech: 'bg-champagne-50 text-champagne-700',
  manager: 'bg-ink-900/[0.05] text-ink-600',
  billing: 'bg-advisory-50 text-advisory-700',
};

function StatusBadge({ status }: { status: StaffMember['status'] }) {
  if (status === 'on-duty') {
    return (
      <span className="inline-flex items-center gap-1.5 text-11 font-medium text-stable-700">
        <span className="w-1.5 h-1.5 rounded-full bg-stable-500 animate-pulse-live" />
        On duty
      </span>
    );
  }
  if (status === 'off-duty') {
    return (
      <span className="inline-flex items-center gap-1.5 text-11 font-medium text-ink-400">
        <span className="w-1.5 h-1.5 rounded-full bg-ink-300" />
        Off duty
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-11 font-medium text-advisory-600">
      <span className="w-1.5 h-1.5 rounded-full bg-advisory-400" />
      On leave
    </span>
  );
}

type FilterTab = 'all' | StaffRole;

const FILTER_TABS: Array<{ label: string; value: FilterTab }> = [
  { label: 'All', value: 'all' },
  { label: 'Doctors', value: 'nephrologist' },
  { label: 'Nurses', value: 'nurse' },
  { label: 'Charge Nurses', value: 'charge-nurse' },
  { label: 'Technicians', value: 'tech' },
  { label: 'Admin', value: 'manager' },
];

export default function StaffView() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<FilterTab>('all');

  const filtered = staffMembers.filter(s => {
    const matchesSearch = !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      ROLE_LABELS[s.role].toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'all' || s.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const onDutyCount = staffMembers.filter(s => s.status === 'on-duty').length;
  const doctorCount = staffMembers.filter(s => s.role === 'nephrologist').length;
  const nurseCount = staffMembers.filter(s => s.role === 'nurse' || s.role === 'charge-nurse').length;
  const totalSessionsToday = staffMembers.reduce((acc, s) => acc + (s.sessionsToday ?? 0), 0);

  return (
    <div className="p-4 lg:p-6 max-w-[1280px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-20 font-semibold text-ink-900 tracking-[-0.02em] mb-1">Staff</h1>
          <p className="text-12 text-ink-400">
            {staffMembers.length} team members · Riyadh Central
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-8 bg-saline-500 text-white text-13 font-medium hover:bg-saline-600 transition-colors shadow-raised self-start sm:self-auto">
          <Plus size={14} />
          Add Staff Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total Staff', value: staffMembers.length, icon: Users, color: 'text-ink-300' },
          { label: 'On Duty Now', value: onDutyCount, icon: UserCheck, color: 'text-stable-500' },
          { label: 'Nephrologists', value: doctorCount, icon: Stethoscope, color: 'text-saline-500' },
          { label: 'Nurses', value: nurseCount, icon: Users, color: 'text-info-500' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            variants={fadeUp as any}
            initial="hidden"
            animate="visible"
            className="nephro-card py-3 px-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <stat.icon size={13} className={stat.color} strokeWidth={1.5} />
              <span className="text-11 text-ink-400">{stat.label}</span>
            </div>
            <p className="text-24 font-semibold data-mono tracking-[-0.02em] text-ink-900">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
          <input
            type="text"
            placeholder="Search by name, role, or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 rounded-8 border border-ink-900/[0.08] bg-white text-13 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-1 p-1 rounded-8 bg-white border border-ink-900/[0.08] overflow-x-auto">
          {FILTER_TABS.map(tab => (
            <button
              key={tab.value}
              onClick={() => setRoleFilter(tab.value)}
              className={`px-3 py-1.5 rounded-6 text-12 font-medium whitespace-nowrap transition-all ${
                roleFilter === tab.value
                  ? 'bg-ink-900 text-white'
                  : 'text-ink-400 hover:text-ink-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Staff table */}
      <div className="nephro-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-900/[0.06]">
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3">Staff Member</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3 hidden sm:table-cell">Role</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3">Status</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3 hidden md:table-cell">Shift</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3 hidden lg:table-cell">Contact</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3 hidden lg:table-cell">Sessions Today</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((staff, i) => (
                <motion.tr
                  key={staff.id}
                  custom={i}
                  variants={fadeUp as any}
                  initial="hidden"
                  animate="visible"
                  className="border-b border-ink-900/[0.04] hover:bg-saline-50/[0.3] cursor-pointer transition-colors group"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-saline-100 flex items-center justify-center text-11 font-semibold text-saline-600 shrink-0">
                        {staff.initials}
                      </div>
                      <div>
                        <p className="text-13 font-medium text-ink-900">{staff.name}</p>
                        <p className="text-11 text-ink-400">{staff.department}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`inline-flex items-center h-[20px] px-[8px] rounded-pill text-11 font-medium ${ROLE_COLORS[staff.role]}`}>
                      {ROLE_LABELS[staff.role]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={staff.status} />
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex items-center gap-1.5 text-12 text-ink-500">
                      <Clock size={12} className="text-ink-300" />
                      <span className="data-mono">{staff.shift}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-11 text-ink-500">
                        <Mail size={11} className="text-ink-300 shrink-0" />
                        <span>{staff.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-11 text-ink-500">
                        <Phone size={11} className="text-ink-300 shrink-0" />
                        <span className="data-mono">{staff.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {staff.sessionsToday !== undefined ? (
                      <span className="data-mono text-13 font-semibold text-ink-900">
                        {staff.sessionsToday}
                        <span className="text-11 font-normal text-ink-400 ml-1">sessions</span>
                      </span>
                    ) : (
                      <span className="text-11 text-ink-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <ChevronRight size={14} className="text-ink-200 group-hover:text-ink-400 transition-colors ml-auto" />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Users size={24} className="text-ink-200 mx-auto mb-2" />
            <p className="text-13 text-ink-400">No staff members match your search</p>
          </div>
        )}
      </div>

      {/* Today's coverage summary */}
      <div className="mt-4 nephro-card">
        <h3 className="text-13 font-semibold text-ink-900 mb-3">Shift Coverage — Today</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {['Morning (07:00–15:00)', 'Afternoon (15:00–23:00)', 'Night (23:00–07:00)'].map((shift, i) => {
            const counts = [
              staffMembers.filter(s => s.shift.startsWith('07:00')).length,
              staffMembers.filter(s => s.shift.startsWith('15:00')).length,
              0,
            ];
            const pct = Math.round((counts[i] / staffMembers.length) * 100);
            return (
              <div key={shift}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-11 text-ink-500">{shift}</span>
                  <span className="text-11 data-mono font-medium text-ink-900">{counts[i]} staff</span>
                </div>
                <div className="h-1.5 bg-ink-900/[0.06] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${i === 0 ? 'bg-saline-400' : i === 1 ? 'bg-info-400' : 'bg-ink-200'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
