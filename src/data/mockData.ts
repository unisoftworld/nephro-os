// Mock data for NephroOS Console Demo

export interface ChairSession {
  id: string;
  chairId: string;
  chairNumber: string;
  status: 'empty' | 'scheduled' | 'active' | 'advisory' | 'critical' | 'completed';
  patient?: {
    id: string;
    code: string;
    name: string;
    initials: string;
    age: number;
    gender: string;
    accessType: string;
    dryWeight: number;
    sessionCount: number;
  };
  session?: {
    startTime: string;
    elapsed: string;
    elapsedPercent: number;
    bp: string;
    vp: number;
    tmp: number;
    ufGoal: number;
    ufActual: number;
    bloodFlow: number;
    dialysateFlow: number;
    weightPre: number;
    weightPost?: number;
    dialyzer: string;
    heparin: string;
  };
  alert?: {
    type: 'advisory' | 'critical';
    message: string;
  };
}

export const todayStats = {
  totalChairs: 24,
  active: 18,
  scheduled: 4,
  completed: 12,
  criticalAlerts: 1,
  advisoryAlerts: 2,
  onTime: 94,
};

export const chairSessions: ChairSession[] = [
  {
    id: 's-001',
    chairId: 'c-01',
    chairNumber: '01',
    status: 'active',
    patient: {
      id: 'p-4421',
      code: 'P-4421',
      name: 'Ahmad Al-Rashid',
      initials: 'AR',
      age: 58,
      gender: 'M',
      accessType: 'AV Fistula — L. arm',
      dryWeight: 72.4,
      sessionCount: 187,
    },
    session: {
      startTime: '09:00',
      elapsed: '3h 24m',
      elapsedPercent: 85,
      bp: '128/82',
      vp: 142,
      tmp: 185.2,
      ufGoal: 3.2,
      ufActual: 2.8,
      bloodFlow: 320,
      dialysateFlow: 500,
      weightPre: 75.6,
      dialyzer: 'Fresenius F80NR',
      heparin: 'Standard',
    },
  },
  {
    id: 's-002',
    chairId: 'c-02',
    chairNumber: '02',
    status: 'active',
    patient: {
      id: 'p-3309',
      code: 'P-3309',
      name: 'Fatima Al-Zahra',
      initials: 'FZ',
      age: 64,
      gender: 'F',
      accessType: 'AV Graft — R. arm',
      dryWeight: 61.0,
      sessionCount: 243,
    },
    session: {
      startTime: '09:15',
      elapsed: '3h 09m',
      elapsedPercent: 79,
      bp: '118/76',
      vp: 128,
      tmp: 162.0,
      ufGoal: 2.8,
      ufActual: 2.5,
      bloodFlow: 300,
      dialysateFlow: 500,
      weightPre: 63.8,
      dialyzer: 'Fresenius F70NR',
      heparin: 'Low dose',
    },
  },
  {
    id: 's-003',
    chairId: 'c-03',
    chairNumber: '03',
    status: 'active',
    patient: {
      id: 'p-5102',
      code: 'P-5102',
      name: 'Khalid Bin Omar',
      initials: 'KO',
      age: 45,
      gender: 'M',
      accessType: 'Catheter — IJ',
      dryWeight: 82.0,
      sessionCount: 56,
    },
    session: {
      startTime: '10:00',
      elapsed: '2h 24m',
      elapsedPercent: 60,
      bp: '135/88',
      vp: 156,
      tmp: 195.5,
      ufGoal: 4.0,
      ufActual: 2.9,
      bloodFlow: 350,
      dialysateFlow: 500,
      weightPre: 86.0,
      dialyzer: 'B.Braun Diacap Pro',
      heparin: 'Standard',
    },
  },
  {
    id: 's-004',
    chairId: 'c-04',
    chairNumber: '04',
    status: 'critical',
    patient: {
      id: 'p-2187',
      code: 'P-2187',
      name: 'Maryam Hassan',
      initials: 'MH',
      age: 71,
      gender: 'F',
      accessType: 'AV Fistula — R. arm',
      dryWeight: 58.5,
      sessionCount: 312,
    },
    session: {
      startTime: '08:30',
      elapsed: '4h 02m',
      elapsedPercent: 100,
      bp: '92/58',
      vp: 280,
      tmp: 245.0,
      ufGoal: 2.5,
      ufActual: 2.5,
      bloodFlow: 250,
      dialysateFlow: 500,
      weightPre: 61.0,
      dialyzer: 'Fresenius F80NR',
      heparin: 'Minimal',
    },
    alert: {
      type: 'critical',
      message: 'BP trending low. Venous pressure alarm.',
    },
  },
  {
    id: 's-005',
    chairId: 'c-05',
    chairNumber: '05',
    status: 'advisory',
    patient: {
      id: 'p-4456',
      code: 'P-4456',
      name: 'Yusuf Al-Mahmoud',
      initials: 'YM',
      age: 52,
      gender: 'M',
      accessType: 'AV Fistula — L. arm',
      dryWeight: 78.0,
      sessionCount: 98,
    },
    session: {
      startTime: '10:30',
      elapsed: '1h 54m',
      elapsedPercent: 48,
      bp: '142/95',
      vp: 182,
      tmp: 210.3,
      ufGoal: 3.5,
      ufActual: 1.8,
      bloodFlow: 300,
      dialysateFlow: 500,
      weightPre: 81.5,
      dialyzer: 'Nipro Elisio-21H',
      heparin: 'Standard',
    },
    alert: {
      type: 'advisory',
      message: 'BP elevated. UF rate under target.',
    },
  },
  {
    id: 's-006',
    chairId: 'c-06',
    chairNumber: '06',
    status: 'active',
    patient: {
      id: 'p-6734',
      code: 'P-6734',
      name: 'Nora Al-Saud',
      initials: 'NS',
      age: 39,
      gender: 'F',
      accessType: 'AV Fistula — L. arm',
      dryWeight: 55.0,
      sessionCount: 76,
    },
    session: {
      startTime: '11:00',
      elapsed: '1h 24m',
      elapsedPercent: 35,
      bp: '122/78',
      vp: 118,
      tmp: 148.5,
      ufGoal: 2.0,
      ufActual: 0.9,
      bloodFlow: 300,
      dialysateFlow: 500,
      weightPre: 57.0,
      dialyzer: 'Fresenius F60NR',
      heparin: 'Standard',
    },
  },
  {
    id: 's-007',
    chairId: 'c-07',
    chairNumber: '07',
    status: 'empty',
  },
  {
    id: 's-008',
    chairId: 'c-08',
    chairNumber: '08',
    status: 'empty',
  },
  {
    id: 's-009',
    chairId: 'c-09',
    chairNumber: '09',
    status: 'scheduled',
    patient: {
      id: 'p-8921',
      code: 'P-8921',
      name: 'Sami Al-Farsi',
      initials: 'SF',
      age: 66,
      gender: 'M',
      accessType: 'AV Graft — L. arm',
      dryWeight: 70.0,
      sessionCount: 156,
    },
  },
  {
    id: 's-010',
    chairId: 'c-10',
    chairNumber: '10',
    status: 'scheduled',
    patient: {
      id: 'p-3456',
      code: 'P-3456',
      name: 'Laila Abdullah',
      initials: 'LA',
      age: 55,
      gender: 'F',
      accessType: 'AV Fistula — R. arm',
      dryWeight: 63.0,
      sessionCount: 201,
    },
  },
  {
    id: 's-011',
    chairId: 'c-11',
    chairNumber: '11',
    status: 'active',
    patient: {
      id: 'p-7789',
      code: 'P-7789',
      name: 'Omar Bin Sulaiman',
      initials: 'OS',
      age: 48,
      gender: 'M',
      accessType: 'AV Fistula — R. arm',
      dryWeight: 85.0,
      sessionCount: 134,
    },
    session: {
      startTime: '09:30',
      elapsed: '2h 54m',
      elapsedPercent: 73,
      bp: '130/84',
      vp: 135,
      tmp: 172.8,
      ufGoal: 3.8,
      ufActual: 3.1,
      bloodFlow: 340,
      dialysateFlow: 500,
      weightPre: 88.8,
      dialyzer: 'Fresenius F80NR',
      heparin: 'Standard',
    },
  },
  {
    id: 's-012',
    chairId: 'c-12',
    chairNumber: '12',
    status: 'active',
    patient: {
      id: 'p-2234',
      code: 'P-2234',
      name: 'Hana Al-Qasimi',
      initials: 'HQ',
      age: 62,
      gender: 'F',
      accessType: 'AV Fistula — L. arm',
      dryWeight: 60.0,
      sessionCount: 289,
    },
    session: {
      startTime: '08:45',
      elapsed: '3h 39m',
      elapsedPercent: 91,
      bp: '126/80',
      vp: 125,
      tmp: 158.4,
      ufGoal: 2.6,
      ufActual: 2.4,
      bloodFlow: 310,
      dialysateFlow: 500,
      weightPre: 62.6,
      dialyzer: 'Fresenius F70NR',
      heparin: 'Standard',
    },
  },
];

export interface Patient {
  id: string;
  code: string;
  name: string;
  initials: string;
  age: number;
  gender: string;
  nationalId: string;
  phone: string;
  ckdStage: number;
  dialysisType: string;
  frequency: string;
  dryWeight: number;
  accessType: string;
  accessDate: string;
  lastSession: string;
  nextSession: string;
  status: 'active' | 'hold' | 'transferred';
  allergies: string;
  emergencyContact: string;
  insurance: string;
  branch: string;
}

export const patients: Patient[] = [
  {
    id: 'p-4421',
    code: 'P-4421',
    name: 'Ahmad Al-Rashid',
    initials: 'AR',
    age: 58,
    gender: 'M',
    nationalId: '108*********',
    phone: '+966 55 123 4567',
    ckdStage: 5,
    dialysisType: 'Hemodialysis',
    frequency: '3x/week',
    dryWeight: 72.4,
    accessType: 'AV Fistula',
    accessDate: '2023-03-15',
    lastSession: '2026-05-16',
    nextSession: '2026-05-18',
    status: 'active',
    allergies: 'None',
    emergencyContact: 'Wife: +966 55 987 6543',
    insurance: 'Bupa Arabia',
    branch: 'Riyadh Central',
  },
  {
    id: 'p-3309',
    code: 'P-3309',
    name: 'Fatima Al-Zahra',
    initials: 'FZ',
    age: 64,
    gender: 'F',
    nationalId: '112*********',
    phone: '+966 50 234 5678',
    ckdStage: 5,
    dialysisType: 'Hemodialysis',
    frequency: '3x/week',
    dryWeight: 61.0,
    accessType: 'AV Graft',
    accessDate: '2022-08-20',
    lastSession: '2026-05-17',
    nextSession: '2026-05-19',
    status: 'active',
    allergies: 'Penicillin',
    emergencyContact: 'Son: +966 55 876 5432',
    insurance: 'Tawuniya',
    branch: 'Riyadh Central',
  },
  {
    id: 'p-5102',
    code: 'P-5102',
    name: 'Khalid Bin Omar',
    initials: 'KO',
    age: 45,
    gender: 'M',
    nationalId: '105*********',
    phone: '+966 54 345 6789',
    ckdStage: 5,
    dialysisType: 'Hemodialysis',
    frequency: '3x/week',
    dryWeight: 82.0,
    accessType: 'Catheter',
    accessDate: '2026-01-10',
    lastSession: '2026-05-17',
    nextSession: '2026-05-19',
    status: 'active',
    allergies: 'Iodine',
    emergencyContact: 'Brother: +966 55 765 4321',
    insurance: 'MedGulf',
    branch: 'Riyadh Central',
  },
  {
    id: 'p-2187',
    code: 'P-2187',
    name: 'Maryam Hassan',
    initials: 'MH',
    age: 71,
    gender: 'F',
    nationalId: '115*********',
    phone: '+966 56 456 7890',
    ckdStage: 5,
    dialysisType: 'Hemodialysis',
    frequency: '3x/week',
    dryWeight: 58.5,
    accessType: 'AV Fistula',
    accessDate: '2021-06-05',
    lastSession: '2026-05-17',
    nextSession: '2026-05-19',
    status: 'active',
    allergies: 'NSAIDs',
    emergencyContact: 'Daughter: +966 55 654 3210',
    insurance: 'Bupa Arabia',
    branch: 'Riyadh Central',
  },
  {
    id: 'p-4456',
    code: 'P-4456',
    name: 'Yusuf Al-Mahmoud',
    initials: 'YM',
    age: 52,
    gender: 'M',
    nationalId: '109*********',
    phone: '+966 55 567 8901',
    ckdStage: 5,
    dialysisType: 'Hemodialysis',
    frequency: '3x/week',
    dryWeight: 78.0,
    accessType: 'AV Fistula',
    accessDate: '2024-01-22',
    lastSession: '2026-05-16',
    nextSession: '2026-05-18',
    status: 'active',
    allergies: 'None',
    emergencyContact: 'Wife: +966 55 543 2109',
    insurance: 'Malath',
    branch: 'Riyadh Central',
  },
  {
    id: 'p-6734',
    code: 'P-6734',
    name: 'Nora Al-Saud',
    initials: 'NS',
    age: 39,
    gender: 'F',
    nationalId: '103*********',
    phone: '+966 50 678 9012',
    ckdStage: 5,
    dialysisType: 'Hemodialysis',
    frequency: '3x/week',
    dryWeight: 55.0,
    accessType: 'AV Fistula',
    accessDate: '2024-06-15',
    lastSession: '2026-05-17',
    nextSession: '2026-05-19',
    status: 'active',
    allergies: 'Shellfish',
    emergencyContact: 'Father: +966 55 432 1098',
    insurance: 'Tawuniya',
    branch: 'Riyadh Central',
  },
  {
    id: 'p-8921',
    code: 'P-8921',
    name: 'Sami Al-Farsi',
    initials: 'SF',
    age: 66,
    gender: 'M',
    nationalId: '113*********',
    phone: '+966 54 789 0123',
    ckdStage: 5,
    dialysisType: 'Hemodialysis',
    frequency: '2x/week',
    dryWeight: 70.0,
    accessType: 'AV Graft',
    accessDate: '2023-09-10',
    lastSession: '2026-05-15',
    nextSession: '2026-05-18',
    status: 'active',
    allergies: 'Latex',
    emergencyContact: 'Son: +966 55 321 0987',
    insurance: 'Bupa Arabia',
    branch: 'Riyadh Central',
  },
  {
    id: 'p-3456',
    code: 'P-3456',
    name: 'Laila Abdullah',
    initials: 'LA',
    age: 55,
    gender: 'F',
    nationalId: '110*********',
    phone: '+966 56 890 1234',
    ckdStage: 5,
    dialysisType: 'Hemodialysis',
    frequency: '3x/week',
    dryWeight: 63.0,
    accessType: 'AV Fistula',
    accessDate: '2022-04-18',
    lastSession: '2026-05-17',
    nextSession: '2026-05-19',
    status: 'active',
    allergies: 'None',
    emergencyContact: 'Husband: +966 55 210 9876',
    insurance: 'MedGulf',
    branch: 'Riyadh Central',
  },
];

export interface Insight {
  id: string;
  type: 'stable' | 'advisory' | 'critical' | 'info';
  title: string;
  description: string;
  patientCode?: string;
  chairId?: string;
  time: string;
  action?: string;
}

export const insights: Insight[] = [
  {
    id: 'i-001',
    type: 'critical',
    title: 'Intradialytic hypotension risk — Chair 04',
    description: 'Patient P-2187 has trended toward post-session systolic < 90 in 4 of the last 5 sessions. Consider sodium profile review and reduced UF rate.',
    patientCode: 'P-2187',
    chairId: '04',
    time: '14:28',
    action: 'Review in chart',
  },
  {
    id: 'i-002',
    type: 'advisory',
    title: 'UF goal may be aggressive — Chair 05',
    description: 'Patient P-4456 current UF rate is 1.2 L/h. Previous session tolerated 0.9 L/h. Consider staged ultrafiltration.',
    patientCode: 'P-4456',
    chairId: '05',
    time: '14:22',
    action: 'Adjust UF',
  },
  {
    id: 'i-003',
    type: 'info',
    title: 'Access maturity follow-up due',
    description: 'Patient P-6734 AV fistula (created 2024-06-15) is due for 6-month Doppler surveillance. Last flow: 820 mL/min.',
    patientCode: 'P-6734',
    time: '14:15',
    action: 'Schedule Doppler',
  },
  {
    id: 'i-004',
    type: 'stable',
    title: 'Kt/V target achieved — Chair 02',
    description: 'Patient P-3309 spKt/V 1.52 this session. 12-session average: 1.48. Adequate dialysis maintained.',
    patientCode: 'P-3309',
    chairId: '02',
    time: '14:10',
  },
  {
    id: 'i-005',
    type: 'advisory',
    title: 'Heparin dose review recommended',
    description: 'Patient P-5102 catheter access shows increased clotting tendency. Consider citrate anticoagulation protocol.',
    patientCode: 'P-5102',
    time: '13:55',
    action: 'Review protocol',
  },
];

export const timelineEvents = [
  { time: '14:32', type: 'ok', text: 'Vitals recorded — BP 128/82, VP 142 mmHg' },
  { time: '14:30', type: 'ok', text: 'UF rate adjusted to 0.8 L/h' },
  { time: '14:00', type: 'ok', text: 'Mid-session vitals — BP 132/85, HR 72' },
  { time: '13:30', type: 'ok', text: 'Heparin bolus administered — 2000 IU' },
  { time: '13:00', type: 'ok', text: 'Blood flow increased to 320 mL/min' },
  { time: '12:30', type: 'adv', text: 'Advisory: BP trending lower than baseline' },
  { time: '12:00', type: 'ok', text: 'Access check — bruit + thrill confirmed' },
  { time: '11:00', type: 'ok', text: 'Machine alarm — air detector, resolved' },
  { time: '10:00', type: 'ok', text: 'Patient weight: 75.6 kg (pre)' },
  { time: '09:30', type: 'ok', text: 'Pre-session checklist complete — all passed' },
  { time: '09:15', type: 'ok', text: 'Patient checked in — P-4421' },
  { time: '09:00', type: 'start', text: 'Session started — Chair 01' },
];

export const navItems = [
  { label: 'Today', icon: 'LayoutDashboard', path: '/console/today', badge: 3 },
  { label: 'Sessions', icon: 'Activity', path: '/console/sessions' },
  { label: 'Patients', icon: 'Users', path: '/console/patients' },
  { label: 'Schedule', icon: 'Calendar', path: '/console/schedule' },
  { label: 'Vascular', icon: 'HeartPulse', path: '/console/vascular' },
  { label: 'Labs', icon: 'FlaskConical', path: '/console/labs' },
  { label: 'Inventory', icon: 'Package', path: '/console/inventory' },
  { label: 'Billing', icon: 'Receipt', path: '/console/billing' },
  { label: 'Insights', icon: 'Brain', path: '/console/insights', badge: 5 },
  { label: 'Analytics', icon: 'BarChart3', path: '/console/analytics' },
];

export const navAdminItems = [
  { label: 'Staff', icon: 'UsersRound', path: '/console/staff' },
  { label: 'Settings', icon: 'Settings', path: '/console/settings' },
];

export type StaffRole = 'nephrologist' | 'nurse' | 'charge-nurse' | 'tech' | 'manager' | 'billing';
export type StaffStatus = 'on-duty' | 'off-duty' | 'on-leave';

export interface StaffMember {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  role: StaffRole;
  status: StaffStatus;
  shift: string;
  department: string;
  joinDate: string;
  licenseNo?: string;
  sessionsToday?: number;
}

export const staffMembers: StaffMember[] = [
  {
    id: 'st-001',
    name: 'Dr. Abdullah Al-Rashidi',
    initials: 'AR',
    email: 'dr.abdullah@nephroos.com',
    phone: '+966 55 100 1001',
    role: 'nephrologist',
    status: 'on-duty',
    shift: '07:00 – 15:00',
    department: 'Nephrology',
    joinDate: '2022-01-15',
    licenseNo: 'SCF-NP-4421',
  },
  {
    id: 'st-002',
    name: 'Dr. Lina Al-Zubair',
    initials: 'LZ',
    email: 'dr.lina@nephroos.com',
    phone: '+966 55 100 1002',
    role: 'nephrologist',
    status: 'off-duty',
    shift: '15:00 – 23:00',
    department: 'Nephrology',
    joinDate: '2023-03-01',
    licenseNo: 'SCF-NP-5510',
  },
  {
    id: 'st-003',
    name: 'Nurse Ahmed Karim',
    initials: 'AK',
    email: 'nurse.ahmed@nephroos.com',
    phone: '+966 55 200 2001',
    role: 'charge-nurse',
    status: 'on-duty',
    shift: '07:00 – 15:00',
    department: 'Dialysis Unit',
    joinDate: '2021-06-10',
    sessionsToday: 8,
  },
  {
    id: 'st-004',
    name: 'Reem Al-Dosari',
    initials: 'RD',
    email: 'reem@nephroos.com',
    phone: '+966 55 200 2002',
    role: 'nurse',
    status: 'on-duty',
    shift: '07:00 – 15:00',
    department: 'Dialysis Unit',
    joinDate: '2022-09-20',
    sessionsToday: 5,
  },
  {
    id: 'st-005',
    name: 'Tariq Al-Harbi',
    initials: 'TH',
    email: 'tariq@nephroos.com',
    phone: '+966 55 200 2003',
    role: 'nurse',
    status: 'on-duty',
    shift: '07:00 – 15:00',
    department: 'Dialysis Unit',
    joinDate: '2023-01-05',
    sessionsToday: 5,
  },
  {
    id: 'st-006',
    name: 'Mona Al-Shehri',
    initials: 'MS',
    email: 'mona@nephroos.com',
    phone: '+966 55 200 2004',
    role: 'nurse',
    status: 'on-leave',
    shift: '15:00 – 23:00',
    department: 'Dialysis Unit',
    joinDate: '2022-04-18',
  },
  {
    id: 'st-007',
    name: 'Fahad Al-Qahtani',
    initials: 'FQ',
    email: 'fahad@nephroos.com',
    phone: '+966 55 300 3001',
    role: 'tech',
    status: 'on-duty',
    shift: '07:00 – 15:00',
    department: 'Technical Services',
    joinDate: '2023-07-12',
  },
  {
    id: 'st-008',
    name: 'Hessa Al-Mansouri',
    initials: 'HM',
    email: 'manager@nephroos.com',
    phone: '+966 55 400 4001',
    role: 'manager',
    status: 'on-duty',
    shift: '07:00 – 15:00',
    department: 'Administration',
    joinDate: '2020-11-01',
  },
  {
    id: 'st-009',
    name: 'Sarah Al-Ahmadi',
    initials: 'SA',
    email: 'admin@nephroos.com',
    phone: '+966 55 400 4002',
    role: 'billing',
    status: 'on-duty',
    shift: '08:00 – 16:00',
    department: 'Finance',
    joinDate: '2021-02-20',
  },
];
