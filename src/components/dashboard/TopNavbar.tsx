import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, Sun, Moon, Search, CloudRain, ScanLine, Sprout, CheckCheck } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { CURRENT_USER, NOTIFICATIONS_DATA } from '../../data/dashboardDummyData';

interface TopNavbarProps {
  onMenuClick: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'weather':
        return <CloudRain className="w-4 h-4 text-sky-500" />;
      case 'disease':
        return <ScanLine className="w-4 h-4 text-amber-500" />;
      default:
        return <Sprout className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 px-4 sm:px-6 flex items-center justify-between">
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
            placeholder="ফসলের রোগ, সার নির্দেশিকা ও আবহাওয়া অনুসন্ধান..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50 transition-all border-none"
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

        {/* Notifications Popover Toggle & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            className="relative p-2.5 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-stone-900 animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown Popup */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 md:w-96 bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200/90 dark:border-stone-800 p-4 space-y-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2.5 border-b border-stone-100 dark:border-stone-800">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">নোটিফিকেশন</h4>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full">
                      {unreadCount} টি পড়া হয়নি
                    </span>
                  )}
                </div>

                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>পড়া চিহ্নিত করুন</span>
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-xl transition-all text-xs space-y-1 border ${
                      !item.read
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-800/60'
                        : 'bg-stone-50 dark:bg-stone-800/40 border-stone-200/40 dark:border-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 font-bold text-stone-900 dark:text-stone-100">
                      <div className="flex items-center gap-1.5">
                        {getNotificationIcon(item.type)}
                        <span>{item.title}</span>
                      </div>
                      <span className="text-[10px] text-stone-400 font-normal shrink-0">{item.timestamp}</span>
                    </div>

                    <p className="text-stone-600 dark:text-stone-300 text-[11px] leading-relaxed pl-5">
                      {item.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-stone-200 dark:bg-stone-800" />

        {/* User Mini Profile Badge */}
        <div className="flex items-center gap-2.5">
          <img
            src={CURRENT_USER.avatarUrl}
            alt={CURRENT_USER.name}
            className="w-9 h-9 rounded-xl object-cover ring-2 ring-emerald-500/30"
          />
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-stone-900 dark:text-stone-100 leading-tight">
              {CURRENT_USER.name}
            </p>
            <p className="text-[10px] font-medium text-stone-500 dark:text-stone-400">রাজশাহী, বাংলাদেশ</p>
          </div>
        </div>
      </div>
    </header>
  );
};