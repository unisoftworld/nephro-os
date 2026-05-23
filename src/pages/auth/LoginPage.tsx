import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Activity, AlertCircle, ArrowLeft, ChevronRight } from 'lucide-react';

const DEMO_ACCOUNTS = [
  { email: 'dr.abdullah@nephroos.com', password: 'doctor123', role: 'Nephrologist' },
  { email: 'nurse.ahmed@nephroos.com', password: 'nurse123', role: 'Nurse' },
  { email: 'admin@nephroos.com', password: 'admin123', role: 'Admin' },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);
    if (result.success) {
      navigate('/console');
    } else {
      setError(result.error ?? 'Login failed.');
    }
  };

  const fillDemo = (acc: typeof DEMO_ACCOUNTS[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setError('');
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[520px] flex-col bg-ink-900 text-white relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute -left-24 -top-24 w-96 h-96 rounded-full bg-saline-500/[0.12] blur-3xl pointer-events-none" />
        <div className="absolute right-0 bottom-0 w-64 h-64 rounded-full bg-saline-400/[0.08] blur-2xl pointer-events-none" />

        <div className="relative z-10 p-10 flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-16">
            <div className="w-8 h-8 rounded-8 bg-saline-500 flex items-center justify-center">
              <Activity size={16} className="text-white" strokeWidth={2} />
            </div>
            <span className="text-16 font-semibold tracking-[-0.01em]">
              Nephro<span className="text-saline-400">OS</span>
            </span>
          </div>

          {/* Headline */}
          <div className="mb-10">
            <h1 className="text-30 font-semibold leading-[1.15] tracking-[-0.025em] mb-4">
              Clinical intelligence<br />
              for renal care teams.
            </h1>
            <p className="text-14 text-white/50 leading-relaxed max-w-[340px]">
              Real-time session monitoring, AI-assisted insights, and integrated workflows for dialysis centers.
            </p>
          </div>

          {/* Feature list */}
          <div className="space-y-4 mb-auto">
            {[
              { label: 'Live chair board', desc: 'Monitor all sessions at a glance' },
              { label: 'AI clinical insights', desc: 'Proactive alerts before complications arise' },
              { label: 'Integrated scheduling', desc: 'Patients, staff, and chairs in one view' },
              { label: 'Session documentation', desc: 'Vitals, medications, and notes auto-logged' },
            ].map((f) => (
              <div key={f.label} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-saline-500/20 border border-saline-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <ChevronRight size={10} className="text-saline-400" />
                </div>
                <div>
                  <p className="text-13 font-medium text-white/90">{f.label}</p>
                  <p className="text-11 text-white/40">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <p className="text-11 text-white/25 mt-10">
            © {new Date().getFullYear()} NephroOS — HIPAA & MOH compliant
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[400px]">
          <Link
            to="/"
            className="mb-7 inline-flex items-center gap-2 rounded-8 border border-ink-900/[0.08] bg-white px-3 py-2 text-12 font-medium text-ink-500 no-underline transition-all hover:border-saline-300 hover:bg-saline-50 hover:text-saline-700"
          >
            <ArrowLeft size={13} />
            Back to website
          </Link>

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-7 h-7 rounded-6 bg-saline-500 flex items-center justify-center">
              <Activity size={14} className="text-white" strokeWidth={2} />
            </div>
            <span className="text-15 font-semibold">
              Nephro<span className="text-saline-500">OS</span>
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-24 font-semibold text-ink-900 tracking-[-0.02em] mb-1.5">
              Sign in to your center
            </h2>
            <p className="text-13 text-ink-400">
              Use your staff credentials to access the console.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-12 font-medium text-ink-600 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@nephroos.com"
                autoComplete="email"
                className="w-full h-10 px-3.5 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-saline-400 focus:ring-2 focus:ring-saline-400/15 transition-all"
              />
            </div>

            <div>
              <label className="block text-12 font-medium text-ink-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full h-10 pl-3.5 pr-10 rounded-8 border border-ink-900/[0.10] bg-white text-13 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-saline-400 focus:ring-2 focus:ring-saline-400/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-300 hover:text-ink-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2.5 p-3 rounded-8 bg-critical-50 border border-critical-500/10">
                <AlertCircle size={14} className="text-critical-500 shrink-0 mt-0.5" />
                <p className="text-12 text-critical-600 leading-relaxed">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 rounded-8 bg-saline-500 text-white text-13 font-semibold hover:bg-saline-600 active:bg-saline-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-raised flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Signing in…
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-7 p-4 rounded-8 bg-white border border-ink-900/[0.07]">
            <p className="text-11 font-semibold text-ink-400 uppercase tracking-[0.06em] mb-3">
              Demo Credentials
            </p>
            <div className="space-y-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => fillDemo(acc)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-6 hover:bg-saline-50 transition-colors text-left group"
                >
                  <div>
                    <p className="text-12 font-medium text-ink-700 group-hover:text-saline-700 transition-colors">
                      {acc.role}
                    </p>
                    <p className="text-11 text-ink-400 data-mono">{acc.email}</p>
                  </div>
                  <ChevronRight size={12} className="text-ink-300 group-hover:text-saline-400 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          <p className="text-11 text-ink-300 text-center mt-6">
            NephroOS Clinical Console · v0.1 Beta
          </p>
        </div>
      </div>
    </div>
  );
}
