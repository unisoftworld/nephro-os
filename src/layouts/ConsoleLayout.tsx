import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems, navAdminItems } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { DynamicIcon } from '@/components/Icons';
import SearchPalette from '@/components/SearchPalette';
import NotificationsPanel from '@/components/NotificationsPanel';
import {
  Search, Bell, HelpCircle, Menu, X, ChevronRight,
  LogOut,
} from 'lucide-react';

export default function ConsoleLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // '/' keyboard shortcut opens search palette
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/console/today') return currentPath === '/console' || currentPath === '/console/today';
    return currentPath.startsWith(path);
  };

  const renderNavItem = (item: typeof navItems[0]) => {
    const active = isActive(item.path);
    return (
      <button
        key={item.label}
        onClick={() => navigate(item.path)}
        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-8 text-13 font-medium transition-all duration-120 group relative ${
          active
            ? 'bg-saline-500/10 text-saline-600'
            : 'text-ink-400 hover:bg-ink-900/[0.04] hover:text-ink-600'
        }`}
        title={sidebarCollapsed ? item.label : undefined}
      >
        <DynamicIcon
          name={item.icon}
          size={16}
          className={active ? 'text-saline-500' : 'text-ink-300 group-hover:text-ink-500'}
        />
        {!sidebarCollapsed && (
          <>
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <span className={`min-w-[18px] h-[18px] px-1 rounded-full text-10 font-semibold flex items-center justify-center ${
                active ? 'bg-saline-500 text-white' : 'bg-critical-50 text-critical-600'
              }`}>
                {item.badge}
              </span>
            )}
          </>
        )}
        {sidebarCollapsed && item.badge && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-critical-500 text-white text-9 font-bold flex items-center justify-center">
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="min-h-[100dvh] bg-neutral-50 text-ink-900 font-sans flex">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink-900/40 z-40 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.aside
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ duration: 0.25,  }}
            className="fixed left-0 top-0 bottom-0 w-[260px] bg-white border-r border-ink-900/[0.06] z-50 lg:hidden flex flex-col"
          >
            <div className="p-4 border-b border-ink-900/[0.06]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img src="/assets/nephroos-mark-saline.svg" alt="" className="w-5 h-5" />
                  <span className="text-13 font-semibold text-ink-900">
                    Nephro<b className="text-saline-500">OS</b>
                  </span>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 rounded-6 hover:bg-ink-900/[0.04]"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-0.5">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-8 text-13 font-medium transition-all ${
                    isActive(item.path)
                      ? 'bg-saline-500/10 text-saline-600'
                      : 'text-ink-400 hover:bg-ink-900/[0.04] hover:text-ink-600'
                  }`}
                >
                  <DynamicIcon name={item.icon} size={16} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-critical-50 text-critical-600 text-10 font-semibold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
              <div className="pt-2 mt-2 border-t border-ink-900/[0.06]">
                {navAdminItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-8 text-13 font-medium transition-all ${
                      isActive(item.path)
                        ? 'bg-saline-500/10 text-saline-600'
                        : 'text-ink-400 hover:bg-ink-900/[0.04] hover:text-ink-600'
                    }`}
                  >
                    <DynamicIcon name={item.icon} size={16} />
                    <span className="flex-1 text-left">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="p-3 border-t border-ink-900/[0.06]">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-8 text-13 font-medium text-ink-400 hover:text-critical-600 hover:bg-critical-50 transition-all"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col h-screen sticky top-0 bg-white border-r border-ink-900/[0.06] transition-all duration-200 ${
          sidebarCollapsed ? 'w-16' : 'w-[230px]'
        }`}
      >
        {/* Brand */}
        <div className={`flex items-center h-[52px] border-b border-ink-900/[0.06] shrink-0 ${
          sidebarCollapsed ? 'justify-center px-2' : 'px-4'
        }`}>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 no-underline"
          >
            <img src="/assets/nephroos-mark-saline.svg" alt="" className="w-5 h-5" />
            {!sidebarCollapsed && (
              <span className="text-13 font-semibold text-ink-900">
                Nephro<b className="text-saline-500">OS</b>
              </span>
            )}
          </button>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {navItems.map(renderNavItem)}
          <div className="pt-2 mt-2 border-t border-ink-900/[0.06]">
            {navAdminItems.map(renderNavItem)}
          </div>
        </div>

        {/* Collapse button */}
        <div className="p-2 border-t border-ink-900/[0.06] shrink-0">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-8 text-ink-300 hover:text-ink-500 hover:bg-ink-900/[0.04] transition-all"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronRight size={14} className="rotate-180" />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TopBar */}
        <header
          className={`sticky top-0 z-30 h-[52px] shrink-0 transition-all duration-120 ${
            scrolled
              ? 'bg-neutral-50/85 backdrop-blur-xl border-b border-ink-900/[0.06]'
              : 'bg-neutral-50'
          }`}
        >
          <div className="flex items-center justify-between h-full px-4 lg:px-6">
            {/* Left */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-1.5 rounded-6 hover:bg-ink-900/[0.04]"
              >
                <Menu size={18} />
              </button>
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex items-center gap-2 h-8 px-3 rounded-8 border border-ink-900/[0.08] text-12 text-ink-300 hover:text-ink-500 hover:border-ink-900/[0.14] transition-all bg-white"
              >
                <Search size={13} />
                <span>Search patients, sessions...</span>
                <span className="ml-2 px-1.5 py-0.5 rounded-4 bg-ink-900/[0.04] text-ink-400 text-10 font-mono">
                  /
                </span>
              </button>
            </div>

            {/* Right */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setNotificationsOpen(v => !v)}
                className="relative p-2 rounded-8 text-ink-300 hover:text-ink-500 hover:bg-ink-900/[0.04] transition-all"
              >
                <Bell size={16} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-critical-500" />
              </button>
              <button className="hidden sm:flex p-2 rounded-8 text-ink-300 hover:text-ink-500 hover:bg-ink-900/[0.04] transition-all">
                <HelpCircle size={16} />
              </button>
              <div className="w-px h-5 bg-ink-900/[0.06] mx-1" />
              <button className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-8 hover:bg-ink-900/[0.04] transition-all">
                <div className="w-7 h-7 rounded-full bg-saline-100 flex items-center justify-center text-11 font-semibold text-saline-600">
                  {user?.initials ?? '??'}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-12 font-medium text-ink-800 leading-tight">
                    {user?.name ?? 'Unknown'}
                  </p>
                  <p className="text-10 text-ink-400 leading-tight">
                    {user?.branch ?? '—'}
                  </p>
                </div>
                <ChevronRight size={12} className="text-ink-300 -rotate-90 hidden md:block" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      <SearchPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <NotificationsPanel isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
    </div>
  );
}
