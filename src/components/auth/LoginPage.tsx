import React, { useState } from 'react';
import { 
  Anchor, 
  Lock, 
  Mail, 
  ArrowRight, 
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react';
import type { ViewMode, UserProfile } from '../../types/straitshift';

interface LoginPageProps {
  onNavigate: (view: ViewMode) => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('m.vance@globalenergy.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const defaultUser: UserProfile = {
    id: 'USR-8042',
    name: 'Cmdr. Marcus Vance',
    email: email || 'm.vance@globalenergy.com',
    company: 'Global Energy Operations Corp',
    role: 'VP Supply Chain & Risk Strategy',
    division: 'Maritime Logistics & Energy Continuity',
    avatar: 'MV',
    apiKey: 'sk_live_straitshift_89f0a214b7',
    mfaEnabled: true,
    emailAlerts: true,
    smsAlerts: true
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(defaultUser);
    onNavigate('overview');
  };

  const handleDemoLogin = (roleName: string, userEmail: string) => {
    const demoUser: UserProfile = {
      ...defaultUser,
      name: roleName === 'VP' ? 'Cmdr. Marcus Vance' : 'Dr. Elena Rostova',
      role: roleName === 'VP' ? 'VP Supply Chain & Risk Strategy' : 'Chief Operating Officer',
      email: userEmail
    };
    onLoginSuccess(demoUser);
    onNavigate('overview');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 mb-2">
            <Anchor className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center justify-center gap-1.5">
            Strait<span className="text-cyan-400">Shift</span>
          </h1>
          <p className="text-xs text-slate-400">
            Sign in to access your Energy Continuity Control Tower
          </p>
        </div>

        {/* Demo Quick Logins */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block text-center flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" /> Demo Quick Sign-In
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('VP', 'm.vance@globalenergy.com')}
              className="py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-cyan-300 rounded-lg text-[11px] font-semibold border border-slate-700 transition-colors"
            >
              VP Supply Chain
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('COO', 'e.rostova@globalenergy.com')}
              className="py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-cyan-300 rounded-lg text-[11px] font-semibold border border-slate-700 transition-colors"
            >
              Chief Ops Officer
            </button>
          </div>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Work Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Demo password reset instructions sent."); }} className="text-[11px] text-cyan-400 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl pl-9 pr-9 py-2.5 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
              />
              <span>Remember this device</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold rounded-xl text-xs shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center space-x-2"
          >
            <span>Sign In to Control Tower</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle Register */}
        <div className="pt-2 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>Don't have an enterprise account? </span>
          <button
            type="button"
            onClick={() => onNavigate('register')}
            className="text-cyan-400 hover:underline font-bold"
          >
            Register Corporate Account
          </button>
        </div>
      </div>
    </div>
  );
};
