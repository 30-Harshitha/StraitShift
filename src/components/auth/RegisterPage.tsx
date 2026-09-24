import React, { useState } from 'react';
import { 
  Anchor, 
  Lock, 
  Mail, 
  User, 
  Building2, 
  Briefcase, 
  ArrowRight
} from 'lucide-react';
import type { ViewMode, UserProfile } from '../../types/straitshift';

interface RegisterPageProps {
  onNavigate: (view: ViewMode) => void;
  onRegisterSuccess: (user: UserProfile) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate, onRegisterSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [division, setDivision] = useState('Maritime Logistics & Energy Continuity');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = {
      id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name || 'Enterprise Director',
      email: email || 'user@company.com',
      company: company || 'Global Energy Corp',
      role: 'Energy Continuity Lead',
      division: division,
      avatar: (name || 'ED').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      apiKey: `sk_live_straitshift_${Math.random().toString(36).substring(2, 12)}`,
      mfaEnabled: true,
      emailAlerts: true,
      smsAlerts: false
    };
    onRegisterSuccess(newUser);
    onNavigate('overview');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 mb-2">
            <Anchor className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center justify-center gap-1.5">
            Register for Strait<span className="text-cyan-400">Shift</span>
          </h1>
          <p className="text-xs text-slate-400">
            Create an enterprise continuity account for your organization
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Work Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="s.jenkins@company.com"
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Company Name</label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="Global Energy Traders Inc."
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Division / Role</label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <select
                  value={division}
                  onChange={e => setDivision(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Maritime Logistics & Energy Continuity">Maritime Logistics</option>
                  <option value="Global Refining Operations">Refining Operations</option>
                  <option value="Chartering & Freight Trading">Chartering & Trading</option>
                  <option value="Enterprise Risk & Governance">Enterprise Risk</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-400 pt-1">
            <input
              type="checkbox"
              required
              checked={agreeTerms}
              onChange={e => setAgreeTerms(e.target.checked)}
              className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
            />
            <span>I agree to the Enterprise Master Terms & Data Protocol</span>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold rounded-xl text-xs shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center space-x-2"
          >
            <span>Create Corporate Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle Login */}
        <div className="pt-2 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>Already have an account? </span>
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="text-cyan-400 hover:underline font-bold"
          >
            Sign In Here
          </button>
        </div>
      </div>
    </div>
  );
};
