import React, { useState } from 'react';
import { 
  Anchor, 
  Bell, 
  Clock, 
  Play, 
  CheckCircle2, 
  AlertTriangle,
  HelpCircle,
  X,
  FileText,
  User as UserIcon,
  LogOut,
  LogIn,
  Video
} from 'lucide-react';
import type { ViewMode, NotificationItem, UserProfile } from '../../types/straitshift';

interface TopBarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  notifications: NotificationItem[];
  user: UserProfile | null;
  onOpenArchitecture: () => void;
  onOpenVideoModal: () => void;
  onStartTour: () => void;
  onLogout?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onNavigate,
  notifications,
  user,
  onOpenArchitecture,
  onOpenVideoModal,
  onStartTour,
  onLogout
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifList, setNotifList] = useState<NotificationItem[]>(notifications);
  const unreadCount = notifList.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifList(notifList.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Left section: Logo & Title */}
      <div className="flex items-center space-x-3">
        <div 
          onClick={() => onNavigate('overview')}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Anchor className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
              Strait<span className="text-cyan-400">Shift</span>
            </span>
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider hidden sm:block">
              Energy Continuity Control Tower
            </span>
          </div>
        </div>

        {/* Badges */}
        <div className="hidden md:flex items-center space-x-2 ml-4">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
            Demo Data
          </span>

          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1 text-slate-400">
            <Clock className="w-3 h-3 text-slate-400" />
            Live Sim: 2026-09-24 19:05 UTC
          </span>
        </div>
      </div>

      {/* Right section: Guided Tour, Architecture, Notifications, User */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* 2-Min Video Demo Button */}
        <button
          onClick={onOpenVideoModal}
          className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          title="Watch 2-Minute Executive Video Demo"
        >
          <Video className="w-3.5 h-3.5 text-red-400" />
          <span className="hidden sm:inline">2-Min Video</span>
        </button>

        {/* Platform Guided Tour Button */}
        <button
          onClick={onStartTour}
          className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          title="Run Platform Guided Flow"
        >
          <Play className="w-3.5 h-3.5 fill-cyan-400" />
          <span className="hidden sm:inline">Demo Flow Guide</span>
        </button>

        {/* Architecture Button */}
        <button
          onClick={onOpenArchitecture}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium flex items-center space-x-1.5 transition-colors"
          title="How StraitShift Works Architecture"
        >
          <FileText className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden md:inline">How It Works</span>
        </button>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-slate-300" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Drawer */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 p-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Bell className="w-4 h-4 text-cyan-400" />
                  <h4 className="font-semibold text-sm text-slate-100">Disruption Alerts</h4>
                </div>
                <div className="flex items-center space-x-2">
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllRead} 
                      className="text-xs text-cyan-400 hover:underline font-medium"
                    >
                      Mark read
                    </button>
                  )}
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="divide-y divide-slate-800/60 max-h-80 overflow-y-auto my-2">
                {notifList.map(n => (
                  <div key={n.id} className={`py-3 px-1 flex space-x-3 ${!n.read ? 'bg-slate-800/40 rounded-lg px-2' : ''}`}>
                    <div className="mt-0.5">
                      {n.type === 'alert' && <AlertTriangle className="w-4 h-4 text-red-400" />}
                      {n.type === 'update' && <HelpCircle className="w-4 h-4 text-cyan-400" />}
                      {n.type === 'action' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-200">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{n.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800 text-center">
                <button 
                  onClick={() => {
                    setShowNotifications(false);
                    onNavigate('recommendations');
                  }}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  View Action Center Recommendations →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <div 
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center space-x-2 pl-2 border-l border-slate-800 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 group-hover:border-cyan-500 flex items-center justify-center text-cyan-400 font-bold text-xs shadow-inner transition-colors">
              {user ? user.avatar : 'MV'}
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">
                {user ? user.name : 'Marcus Vance'}
              </span>
              <span className="text-[10px] text-slate-400 line-clamp-1 max-w-[130px]">
                {user ? user.role : 'VP Supply Risk & Operations'}
              </span>
            </div>
          </div>

          {/* User Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 py-2 text-xs">
              <div className="px-3 py-2 border-b border-slate-800 mb-1">
                <span className="font-bold text-slate-100 block">{user ? user.name : 'Marcus Vance'}</span>
                <span className="text-[10px] text-slate-400">{user ? user.email : 'm.vance@globalenergy.com'}</span>
              </div>

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  onNavigate('profile');
                }}
                className="w-full text-left px-3 py-2 hover:bg-slate-800 text-slate-200 flex items-center space-x-2 font-medium"
              >
                <UserIcon className="w-4 h-4 text-cyan-400" />
                <span>Profile & Settings</span>
              </button>

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  onNavigate('login');
                }}
                className="w-full text-left px-3 py-2 hover:bg-slate-800 text-slate-200 flex items-center space-x-2 font-medium"
              >
                <LogIn className="w-4 h-4 text-cyan-400" />
                <span>Sign In / Change Account</span>
              </button>

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  onNavigate('register');
                }}
                className="w-full text-left px-3 py-2 hover:bg-slate-800 text-slate-200 flex items-center space-x-2 font-medium"
              >
                <Anchor className="w-4 h-4 text-cyan-400" />
                <span>Register Corporate Account</span>
              </button>

              {onLogout && (
                <div className="pt-1 border-t border-slate-800 mt-1">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onLogout();
                      onNavigate('login');
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-red-950/30 text-red-400 flex items-center space-x-2 font-semibold"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
