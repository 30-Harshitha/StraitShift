import React, { useState } from 'react';
import { 
  User, 
  Key, 
  ShieldCheck, 
  Bell, 
  CheckCircle2, 
  Copy, 
  LogOut, 
  Save, 
  RefreshCw
} from 'lucide-react';
import type { UserProfile, ViewMode } from '../../types/straitshift';

interface ProfilePageProps {
  user: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
  onLogout: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  onUpdateUser,
  onLogout,
  onNavigate
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [company, setCompany] = useState(user.company);
  const [role, setRole] = useState(user.role);
  const [division, setDivision] = useState(user.division);
  const [mfaEnabled, setMfaEnabled] = useState(user.mfaEnabled);
  const [emailAlerts, setEmailAlerts] = useState(user.emailAlerts);
  const [smsAlerts, setSmsAlerts] = useState(user.smsAlerts);
  const [apiKey, setApiKey] = useState(user.apiKey);
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...user,
      name,
      email,
      company,
      role,
      division,
      mfaEnabled,
      emailAlerts,
      smsAlerts,
      apiKey
    };
    onUpdateUser(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerateKey = () => {
    const newKey = `sk_live_straitshift_${Math.random().toString(36).substring(2, 14)}`;
    setApiKey(newKey);
    handleCopyKey();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Profile Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 border border-cyan-400/30 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-cyan-500/20">
            {user.avatar || 'MV'}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-slate-100">{user.name}</h1>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                Active Session
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{user.role} • {user.company}</p>
            <p className="text-[11px] text-cyan-400 font-mono mt-0.5">ID: {user.id}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('overview')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
          >
            Back to Control Tower
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-bold border border-red-500/30 transition-colors flex items-center space-x-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Profile Form & Settings */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Personal Details */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-cyan-400" /> Executive Account Profile
            </h2>
            {isSaved && (
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Saved Successfully
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Work Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Company / Entity</label>
              <input
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Title / Role</label>
              <input
                type="text"
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="font-semibold text-slate-300">Operating Division</label>
              <input
                type="text"
                value={division}
                onChange={e => setDivision(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* API Key Management */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Key className="w-4 h-4 text-cyan-400" /> Enterprise API Access Token
            </h3>
            <p className="text-[11px] text-slate-400">
              Use this bearer token to authenticate automated ERP data ingestion pipelines.
            </p>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={apiKey}
                className="flex-1 bg-slate-950 border border-slate-800 text-cyan-400 font-mono text-xs rounded-xl px-3 py-2.5 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCopyKey}
                className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                type="button"
                onClick={handleRegenerateKey}
                className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Regenerate</span>
              </button>
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              type="submit"
              className="py-2.5 px-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </div>

        {/* Right Col: Security & Notification Controls */}
        <div className="space-y-6">
          {/* Security & Access */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-xl">
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" /> Security & Authentication
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div>
                  <span className="font-semibold text-slate-200 block">Multi-Factor Auth (MFA)</span>
                  <span className="text-[10px] text-slate-400">Hardware token / Authenticator</span>
                </div>
                <input
                  type="checkbox"
                  checked={mfaEnabled}
                  onChange={e => setMfaEnabled(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
                />
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Role Clearance</span>
                <span className="font-bold text-cyan-300 block">Tier-1 Energy Continuity Access</span>
                <span className="text-[10px] text-slate-400">Authorized for Scenario Simulation & Executive Reroute Directives</span>
              </div>
            </div>
          </div>

          {/* Crisis Alert Preferences */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-xl">
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
              <Bell className="w-4 h-4 text-cyan-400" /> Disruption Alert Subscriptions
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div>
                  <span className="font-semibold text-slate-200 block">Email Crisis Alerts</span>
                  <span className="text-[10px] text-slate-400">Immediate SOH blockage notifications</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={e => setEmailAlerts(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div>
                  <span className="font-semibold text-slate-200 block">SMS Urgent Dispatch</span>
                  <span className="text-[10px] text-slate-400">SMS alerts for exposed cargoes</span>
                </div>
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={e => setSmsAlerts(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
