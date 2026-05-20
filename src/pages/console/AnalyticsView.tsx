import { motion } from 'framer-motion';
import {
  BarChart3, TrendingUp, Users, Activity, CheckCircle2,
  AlertTriangle, Clock, Droplets, CreditCard,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.04, duration: 0.35 },
  }),
};

const sessionData = [
  { day: 'Mon', sessions: 22, noShows: 1 },
  { day: 'Tue', sessions: 24, noShows: 0 },
  { day: 'Wed', sessions: 20, noShows: 2 },
  { day: 'Thu', sessions: 22, noShows: 1 },
  { day: 'Fri', sessions: 18, noShows: 0 },
  { day: 'Sat', sessions: 16, noShows: 3 },
  { day: 'Sun', sessions: 12, noShows: 1 },
];

const kpiTrend = [
  { month: 'Jan', ktv: 1.35, ufr: 10 },
  { month: 'Feb', ktv: 1.38, ufr: 8 },
  { month: 'Mar', ktv: 1.42, ufr: 6 },
  { month: 'Apr', ktv: 1.45, ufr: 5 },
  { month: 'May', ktv: 1.48, ufr: 4 },
];

const chairUtilData = [
  { name: 'Active', value: 75, color: '#128B92' },
  { name: 'Available', value: 15, color: '#ECEAE5' },
  { name: 'Maintenance', value: 10, color: '#B6BFD0' },
];

export default function AnalyticsView() {
  return (
    <div className="p-4 lg:p-6 max-w-[1280px] mx-auto">
      <div className="mb-6">
        <h1 className="text-20 font-semibold text-ink-900 tracking-[-0.02em] mb-1">Analytics</h1>
        <p className="text-12 text-ink-400">Center performance and clinical KPIs</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
        {[
          { label: 'Sessions Today', value: '22', icon: Activity, change: '+8%', up: true },
          { label: 'Attendance', value: '94.5%', icon: CheckCircle2, change: '+2.1%', up: true },
          { label: 'Avg Kt/V', value: '1.48', icon: TrendingUp, change: '+0.05', up: true },
          { label: 'No-Show Rate', value: '4.2%', icon: AlertTriangle, change: '-1.3%', up: true },
          { label: 'Chair Util.', value: '75%', icon: BarChart3, change: '+5%', up: true },
          { label: 'Revenue MTD', value: 'SAR 175K', icon: CreditCard, change: '+12%', up: true },
        ].map((stat, i) => (
          <motion.div key={stat.label} custom={i} variants={fadeUp as any} initial="hidden" animate="visible" className="nephro-card py-3 px-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon size={13} className="text-ink-300" strokeWidth={1.5} />
              <span className="text-10 text-ink-400">{stat.label}</span>
            </div>
            <p className="text-18 font-semibold data-mono tracking-[-0.02em] text-ink-900 mb-1">{stat.value}</p>
            <span className={`text-10 font-medium ${stat.up ? 'text-stable-500' : 'text-critical-500'}`}>
              {stat.change} vs last period
            </span>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <motion.div custom={6} variants={fadeUp as any} initial="hidden" animate="visible" className="nephro-card">
          <h3 className="text-13 font-semibold text-ink-900 uppercase tracking-[0.04em] mb-4">Weekly Sessions</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sessionData}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#5C6781' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#5C6781' }} axisLine={false} tickLine={false} />
                <Bar dataKey="sessions" fill="#128B92" radius={[4, 4, 0, 0]} />
                <Bar dataKey="noShows" fill="#B8324A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-11 text-ink-400"><span className="w-2 h-2 rounded-full bg-saline-400" />Sessions</span>
            <span className="flex items-center gap-1.5 text-11 text-ink-400"><span className="w-2 h-2 rounded-full bg-critical-400" />No-shows</span>
          </div>
        </motion.div>

        <motion.div custom={7} variants={fadeUp as any} initial="hidden" animate="visible" className="nephro-card">
          <h3 className="text-13 font-semibold text-ink-900 uppercase tracking-[0.04em] mb-4">Clinical KPI Trends</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={kpiTrend}>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#5C6781' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#5C6781' }} axisLine={false} tickLine={false} domain={[1.2, 1.6]} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#5C6781' }} axisLine={false} tickLine={false} />
                <Line yAxisId="left" type="monotone" dataKey="ktv" stroke="#128B92" strokeWidth={2} dot={{ r: 3, fill: '#128B92' }} />
                <Line yAxisId="right" type="monotone" dataKey="ufr" stroke="#B8324A" strokeWidth={2} dot={{ r: 3, fill: '#B8324A' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-11 text-ink-400"><span className="w-2 h-2 rounded-full bg-saline-400" />Avg Kt/V</span>
            <span className="flex items-center gap-1.5 text-11 text-ink-400"><span className="w-2 h-2 rounded-full bg-critical-400" />IDH Events</span>
          </div>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-5">
        <motion.div custom={8} variants={fadeUp as any} initial="hidden" animate="visible" className="nephro-card">
          <h3 className="text-13 font-semibold text-ink-900 uppercase tracking-[0.04em] mb-4">Chair Utilization</h3>
          <div className="h-40 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chairUtilData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" strokeWidth={0}>
                  {chairUtilData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-4">
            {chairUtilData.map((d) => (
              <span key={d.name} className="flex items-center gap-1.5 text-11 text-ink-400">
                <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />{d.name}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div custom={9} variants={fadeUp as any} initial="hidden" animate="visible" className="nephro-card lg:col-span-2">
          <h3 className="text-13 font-semibold text-ink-900 uppercase tracking-[0.04em] mb-4">Key Metrics Summary</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Avg Session Duration', value: '4h 05m', icon: Clock },
              { label: 'Avg UF Volume', value: '2.9 L', icon: Droplets },
              { label: 'Complication Rate', value: '2.1%', icon: AlertTriangle },
              { label: 'Patient Satisfaction', value: '4.8/5', icon: Users },
            ].map((m) => (
              <div key={m.label} className="p-3 rounded-8 bg-ink-900/[0.02]">
                <m.icon size={14} className="text-ink-300 mb-2" strokeWidth={1.5} />
                <p className="text-10 text-ink-400 mb-1">{m.label}</p>
                <p className="text-14 font-semibold data-mono text-ink-900">{m.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
