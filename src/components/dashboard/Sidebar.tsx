import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Bot,
  ScanLine,
  CloudSun,
  BookOpen,
  Sprout,
  User,
  Settings,
  History,
  LogOut,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuGroupOne = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Chat', path: '/dashboard/chat', icon: Bot },
    { name: 'Disease Scanner', path: '/dashboard/disease', icon: ScanLine },
    { name: 'Weather', path: '/dashboard/weather', icon: CloudSun },
    { name: 'Crop Guide', path: '/dashboard/crop-guide', icon: BookOpen },
    { name: 'Fertilizer Advisory', path: '/dashboard/fertilizer', icon: Sprout },
  ];

  const menuGroupTwo = [
    { name: 'History', path: '/dashboard/history', icon: History },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
      isActive
        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-semibold'
        : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-emerald-600 dark:hover:text-emerald-400'
    }`;

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-stone-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-stone-100 dark:border-stone-800">
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600">
              KrishiBondhu<span className="text-emerald-500">.AI</span>
            </span>
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-8rem)]">
            <div>
              <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2">
                Core Advisory
              </p>
              <nav className="space-y-1">
                {menuGroupOne.map((item) => (
                  <NavLink key={item.path} to={item.path} end={item.path === '/dashboard'} onClick={onClose} className={linkStyle}>
                    <item.icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </nav>
            </div>

            <div>
              <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2">
                Account & Records
              </p>
              <nav className="space-y-1">
                {menuGroupTwo.map((item) => (
                  <NavLink key={item.path} to={item.path} onClick={onClose} className={linkStyle}>
                    <item.icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Footer / Sign Out */}
        <div className="p-4 border-t border-stone-100 dark:border-stone-800">
          <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};