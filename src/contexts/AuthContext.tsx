import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type UserRole = 'admin' | 'nephrologist' | 'nurse' | 'charge-nurse' | 'manager' | 'billing';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  branch: string;
  initials: string;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const DEMO_USERS: Array<User & { password: string }> = [
  {
    id: 'u-001',
    name: 'Dr. Abdullah Al-Rashidi',
    initials: 'AR',
    email: 'dr.abdullah@nephroos.com',
    password: 'doctor123',
    role: 'nephrologist',
    branch: 'Riyadh Central',
  },
  {
    id: 'u-002',
    name: 'Nurse Ahmed Karim',
    initials: 'AK',
    email: 'nurse.ahmed@nephroos.com',
    password: 'nurse123',
    role: 'nurse',
    branch: 'Riyadh Central',
  },
  {
    id: 'u-003',
    name: 'Sarah Al-Ahmadi',
    initials: 'SA',
    email: 'admin@nephroos.com',
    password: 'admin123',
    role: 'admin',
    branch: 'Riyadh Central',
  },
  {
    id: 'u-004',
    name: 'Hessa Al-Mansouri',
    initials: 'HM',
    email: 'manager@nephroos.com',
    password: 'manager123',
    role: 'manager',
    branch: 'Riyadh Central',
  },
];

const STORAGE_KEY = 'nephroos_auth_user';

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise(r => setTimeout(r, 700));
    const match = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!match) {
      return { success: false, error: 'Invalid email or password. Check the demo credentials below.' };
    }
    const { password: _pw, ...userData } = match;
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
