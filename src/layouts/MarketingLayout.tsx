import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function MarketingLayout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Product', href: '/#features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Docs', href: '#docs' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-[100dvh] bg-neutral-25 text-ink-900 font-sans">
      {/* Navigation */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'bg-neutral-25/85 backdrop-blur-xl border-b border-ink-900/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-2.5 no-underline">
              <img
                src="/assets/nephroos-mark-saline.svg"
                alt="NephroOS"
                className="w-6 h-6"
              />
              <span className="text-16 font-semibold text-ink-900 tracking-[-0.01em]">
                Nephro<b className="text-saline-500 font-semibold">OS</b>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="px-3 py-1.5 rounded-8 text-13 font-medium text-ink-400 hover:text-ink-900 hover:bg-ink-900/[0.04] transition-all duration-120 no-underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/console"
                className="px-4 py-2 rounded-8 text-13 font-medium text-ink-400 hover:text-ink-900 transition-colors no-underline"
              >
                Sign in
              </Link>
              <Link
                to="/console"
                className="px-4 py-2 rounded-8 bg-saline-500 text-white text-13 font-medium hover:bg-saline-600 transition-colors shadow-raised no-underline"
              >
                Try Console
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-8 text-ink-400 hover:bg-ink-900/[0.04]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-ink-900/[0.06]">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="px-3 py-2.5 rounded-8 text-14 font-medium text-ink-400 hover:text-ink-900 hover:bg-ink-900/[0.04] no-underline"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-3 pt-3 border-t border-ink-900/[0.06] flex flex-col gap-2">
                  <Link
                    to="/console"
                    className="px-3 py-2.5 rounded-8 text-14 font-medium text-ink-400 text-center no-underline"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/console"
                    className="px-4 py-2.5 rounded-8 bg-saline-500 text-white text-14 font-medium text-center no-underline"
                  >
                    Try Console
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
