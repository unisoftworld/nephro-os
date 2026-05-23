import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { patients, type Patient } from '@/data/mockData';
import AddPatientModal from '@/components/AddPatientModal';
import {
  Search, Filter, Plus, ChevronRight, Users, Activity,
  Droplets, Phone, AlertTriangle, CheckCircle2, Clock,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.04, duration: 0.35 },
  }),
};

function StatusDot({ status }: { status: string }) {
  switch (status) {
    case 'active': return <span className="w-2 h-2 rounded-full bg-stable-500" />;
    case 'hold': return <span className="w-2 h-2 rounded-full bg-advisory-500" />;
    case 'transferred': return <span className="w-2 h-2 rounded-full bg-ink-300" />;
    default: return <span className="w-2 h-2 rounded-full bg-ink-300" />;
  }
}

export default function PatientsView() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [addOpen, setAddOpen] = useState(false);
  const [addedName, setAddedName] = useState<string | null>(null);

  const filteredPatients = patients.filter(p => {
    const matchesSearch = !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeCount = patients.filter(p => p.status === 'active').length;
  const holdCount = patients.filter(p => p.status === 'hold').length;

  return (
    <div className="p-4 lg:p-6 max-w-[1280px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-20 font-semibold text-ink-900 tracking-[-0.02em] mb-1">
            Patients
          </h1>
          <p className="text-12 text-ink-400">
            {patients.length} patients across all branches
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-8 border border-ink-900/[0.08] text-13 font-medium text-ink-600 hover:bg-white bg-white transition-all">
            <Filter size={14} />
            Filter
          </button>
          <button
            onClick={() => setAddOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-8 bg-saline-500 text-white text-13 font-medium hover:bg-saline-600 transition-colors shadow-raised"
          >
            <Plus size={14} />
            Add Patient
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total Patients', value: patients.length.toString(), icon: Users },
          { label: 'Active', value: activeCount.toString(), icon: CheckCircle2, accent: 'stable' },
          { label: 'On Hold', value: holdCount.toString(), icon: Clock, accent: 'advisory' },
          { label: 'Sessions Today', value: '22', icon: Activity, accent: 'saline' },
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
              <stat.icon size={13} className={
                stat.accent === 'stable' ? 'text-stable-500' :
                stat.accent === 'advisory' ? 'text-advisory-500' :
                stat.accent === 'saline' ? 'text-saline-500' :
                'text-ink-300'
              } strokeWidth={1.5} />
              <span className="text-11 text-ink-400">{stat.label}</span>
            </div>
            <p className="text-24 font-semibold data-mono tracking-[-0.02em] text-ink-900">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
          <input
            type="text"
            placeholder="Search by name, patient code, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-4 rounded-8 border border-ink-900/[0.08] bg-white text-13 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-saline-400 focus:ring-1 focus:ring-saline-400/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-1 p-1 rounded-8 bg-white border border-ink-900/[0.08]">
          {[
            { label: 'All', value: 'all' },
            { label: 'Active', value: 'active' },
            { label: 'Hold', value: 'hold' },
          ].map(f => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`px-3 py-1.5 rounded-6 text-12 font-medium transition-all ${
                statusFilter === f.value
                  ? 'bg-ink-900 text-white'
                  : 'text-ink-400 hover:text-ink-600'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Patient Table */}
      <div className="nephro-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-900/[0.06]">
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3">Patient</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3 hidden sm:table-cell">Code</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3 hidden md:table-cell">Access</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3 hidden lg:table-cell">Schedule</th>
                <th className="text-left text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3">Status</th>
                <th className="text-right text-10 uppercase tracking-[0.08em] text-ink-400 font-medium px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient, i) => (
                <motion.tr
                  key={patient.id}
                  custom={i}
                  variants={fadeUp as any}
                  initial="hidden"
                  animate="visible"
                  onClick={() => navigate(`/console/patients/${patient.id}`)}
                  className="border-b border-ink-900/[0.04] hover:bg-saline-50/[0.3] cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-saline-100 flex items-center justify-center text-11 font-semibold text-saline-600 shrink-0">
                        {patient.initials}
                      </div>
                      <div>
                        <p className="text-13 font-medium text-ink-900">{patient.name}</p>
                        <p className="text-11 text-ink-400">{patient.age}y {patient.gender === 'M' ? 'Male' : 'Female'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="data-mono text-12 text-ink-500">{patient.code}</span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <Droplets size={12} className="text-ink-300" />
                      <span className="text-12 text-ink-600">{patient.accessType}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="text-12 text-ink-600">
                      <span>{patient.frequency}</span>
                      <span className="text-ink-300 mx-1">|</span>
                      <span className="data-mono">Next: {patient.nextSession}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <StatusDot status={patient.status} />
                      <span className="text-11 text-ink-500 capitalize">{patient.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="inline-flex items-center gap-1 text-11 text-saline-500 hover:text-saline-600 font-medium transition-colors">
                      View
                      <ChevronRight size={12} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredPatients.length === 0 && (
          <div className="py-16 text-center">
            <Search size={24} className="text-ink-200 mx-auto mb-2" />
            <p className="text-13 text-ink-400">No patients found matching your search</p>
          </div>
        )}
      </div>

      {/* Success toast */}
      {addedName && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-8 bg-stable-500 text-white shadow-overlay animate-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 size={16} />
          <span className="text-13 font-medium">{addedName} added successfully</span>
        </div>
      )}

      <AddPatientModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onAdded={(name) => {
          setAddOpen(false);
          setAddedName(name);
          setTimeout(() => setAddedName(null), 3000);
        }}
      />
    </div>
  );
}
