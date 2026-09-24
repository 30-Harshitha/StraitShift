import { 
  LayoutDashboard, 
  MapPin, 
  Ship, 
  GitFork, 
  Boxes, 
  Sliders, 
  CheckSquare, 
  FileSpreadsheet,
  Info,
  ChevronRight,
  User
} from 'lucide-react';
import type { ViewMode } from '../../types/straitshift';

interface SidebarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  pendingRecCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  pendingRecCount
}) => {
  const navItems: { id: ViewMode; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'map', label: 'Disruption Map', icon: <MapPin className="w-4 h-4" /> },
    { id: 'shipments', label: 'Shipments', icon: <Ship className="w-4 h-4" />, badge: '18 Risk' },
    { id: 'routes', label: 'Alternative Routes', icon: <GitFork className="w-4 h-4" /> },
    { id: 'supply', label: 'Supply Sources', icon: <Boxes className="w-4 h-4" /> },
    { id: 'scenario', label: 'Scenario Planner', icon: <Sliders className="w-4 h-4" /> },
    { id: 'recommendations', label: 'Recommendations', icon: <CheckSquare className="w-4 h-4" />, badge: pendingRecCount },
    { id: 'reports', label: 'Reports', icon: <FileSpreadsheet className="w-4 h-4" /> },
    { id: 'architecture', label: 'How It Works', icon: <Info className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile & Account', icon: <User className="w-4 h-4" /> }
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between hidden md:flex shrink-0">
      <div className="py-4 px-3 space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Control Center Navigation
        </div>

        {navItems.map(item => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive 
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm' 
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-slate-100 border border-transparent'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>

              {item.badge !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive 
                    ? 'bg-cyan-500/30 text-cyan-200' 
                    : typeof item.badge === 'number' && item.badge > 0
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Disruption Corridor Status Quick Widget */}
      <div className="p-3 m-3 rounded-xl bg-slate-950/80 border border-red-500/30">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-bold uppercase text-red-400 tracking-wide flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            Strait Status
          </span>
          <span className="text-[10px] bg-red-950 text-red-300 px-1.5 py-0.5 rounded font-mono font-bold">
            CLOSED
          </span>
        </div>
        <p className="text-[11px] text-slate-300 font-medium leading-tight">
          Strait of Hormuz is unavailable. Evaluated alternative corridors active.
        </p>
        <button
          onClick={() => onNavigate('scenario')}
          className="mt-2.5 w-full py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-md text-[11px] font-semibold flex items-center justify-center gap-1 border border-slate-700 transition-colors"
        >
          <span>Run 30-Day Sim</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </aside>
  );
};
