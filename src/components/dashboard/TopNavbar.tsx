import React, { useState } from 'react';
import { Menu, Bell, Sun, Moon, Search } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { CURRENT_USER, NOTIFICATIONS_DATA } from '../../data/dashboardDummyData';

interface TopNavbarProps {
  onMenuClick: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = NOTIFICATIONS_DATA.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 px-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div className="relative hidden sm:block w-64 lg:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search crops, diseases, recommendations..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all border-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="p-2.5 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>

        {/* Notifications Popover Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            className="relative p-2.5 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-stone-900" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 p-4 space-y-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
                <h4 className="text-sm font-bold text-stone-800 dark:text-stone-100">Notifications</h4>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
                  {unreadCount} Unread
                </span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {NOTIFICATIONS_DATA.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-xs space-y-1"
                  >
                    <div className="flex justify-between font-semibold text-stone-800 dark:text-stone-200">
                      <span>{item.title}</span>
                      <span className="text-[10px] text-stone-400 font-normal">{item.timestamp}</span>
                    </div>
                    <p className="text-stone-600 dark:text-stone-400">{item.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-stone-200 dark:bg-stone-800" />

        {/* User Mini Profile */}
        <div className="flex items-center gap-3">
          <img
            src={CURRENT_USER.avatarUrl}
            alt={CURRENT_USER.name}
            className="w-9 h-9 rounded-xl object-cover ring-2 ring-emerald-500/20"
          />
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-stone-800 dark:text-stone-100 leading-tight">
              {CURRENT_USER.name}
            </p>
            <p className="text-[10px] text-stone-500 dark:text-stone-400">{CURRENT_USER.location}</p>
          </div>
        </div>
      </div>
    </header>
  );
};