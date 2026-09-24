import { 
  AlertOctagon, 
  Ship, 
  Flame, 
  DollarSign, 
  Clock, 
  Boxes, 
  TrendingUp, 
  Sparkles, 
  ChevronRight, 
  ArrowUpRight, 
  ShieldAlert, 
  Activity, 
  FileText,
  CheckCircle2,
  Video
} from 'lucide-react';
import type { Shipment, BusinessRisk, ViewMode } from '../../types/straitshift';
import { GlobalEnergyMap } from '../map/GlobalEnergyMap';

interface OverviewPageProps {
  shipments: Shipment[];
  risks: BusinessRisk[];
  onNavigate: (view: ViewMode) => void;
  onSelectShipment: (shipment: Shipment) => void;
  onRunSimulation: () => void;
  onGenerateAIPlan: () => void;
  onOpenVideoModal?: () => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  shipments,
  risks,
  onNavigate,
  onSelectShipment,
  onRunSimulation,
  onGenerateAIPlan,
  onOpenVideoModal
}) => {
  const atRiskCount = shipments.filter(s => s.risk === 'CRITICAL' || s.risk === 'HIGH').length;

  const timelineEvents = [
    { time: '06:14 UTC', title: 'Primary corridor disruption detected', desc: 'Strait of Hormuz transit halted by regional maritime authority.', type: 'alert' },
    { time: '07:30 UTC', title: '18 shipments flagged at critical risk', desc: 'Auto-scanned crude & LNG vessels in Persian Gulf loading zone.', type: 'ship' },
    { time: '08:15 UTC', title: 'Alternative route analysis completed', desc: 'Cape of Good Hope & East-West Pipeline models evaluated.', type: 'route' },
    { time: '09:00 UTC', title: 'AI Response Plan #4 generated', desc: 'Recommended 35% spot allocation shift to Atlantic Basin suppliers.', type: 'ai' }
  ];

  return (
    <div className="space-y-6">
      {/* Executive Disruption Banner */}
      <div className="bg-slate-900 border border-red-500/40 rounded-2xl p-5 shadow-2xl relative overflow-hidden bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900">
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-red-500/10 to-transparent pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-xl text-red-400 shrink-0">
              <AlertOctagon className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-500/10 px-2.5 py-0.5 rounded-full border border-red-500/30">
                  STATUS: CRITICAL
                </span>
                <span className="text-xs text-slate-400 font-mono">INCIDENT ID: #SOH-2026-09</span>
              </div>
              <h1 className="text-xl font-bold text-slate-100 mt-1">
                Strait of Hormuz Disruption — Business Impact
              </h1>
              <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Primary route unavailable — evaluating alternative supply corridors. 20.5M bbl/d global energy transit affected. Immediate action required for 18 exposed cargoes.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0 flex-wrap">
            {onOpenVideoModal && (
              <button
                onClick={onOpenVideoModal}
                className="px-3.5 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl text-xs font-bold border border-red-500/40 transition-colors flex items-center gap-1.5"
              >
                <Video className="w-4 h-4 text-red-400" />
                <span>2-Min Demo Video</span>
              </button>
            )}

            <button
              onClick={() => onNavigate('map')}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <span>Disruption Map</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('scenario')}
              className="px-3.5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-1.5"
            >
              <span>Scenario Planner</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 6 Executive KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* KPI 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Shipments at Risk</span>
            <Ship className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-100">{atRiskCount} <span className="text-xs text-slate-400 font-normal">/ 42</span></div>
            <div className="text-[11px] text-red-400 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>42.8% fleet exposed</span>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Energy Volume at Risk</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-100">14.2M <span className="text-xs text-slate-400 font-normal">bbls</span></div>
            <div className="text-[11px] text-amber-400 font-semibold mt-1">
              Crude & LNG in transit
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Est. Cost Impact</span>
            <DollarSign className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-100">+$48.5M</div>
            <div className="text-[11px] text-red-400 font-semibold mt-1">
              Freight & delay surge
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Avg Delivery Delay</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-100">+14.8 <span className="text-xs text-slate-400 font-normal">Days</span></div>
            <div className="text-[11px] text-amber-400 font-semibold mt-1">
              Via Cape reroute
            </div>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Inventory Coverage</span>
            <Boxes className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-100">21.4 <span className="text-xs text-slate-400 font-normal">Days</span></div>
            <div className="text-[11px] text-cyan-400 font-semibold mt-1">
              Destination hubs
            </div>
          </div>
        </div>

        {/* KPI 6 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Alt Supply Capacity</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-100">68.5%</div>
            <div className="text-[11px] text-emerald-400 font-semibold mt-1">
              Available across corridors
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Map + AI Assistant / What Changed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Global Energy Flow Map */}
        <div className="lg:col-span-2 space-y-4">
          <GlobalEnergyMap 
            shipments={shipments} 
            onSelectShipment={onSelectShipment} 
            compact={false}
          />
        </div>

        {/* Right Col: AI Decision Assistant + What Changed Timeline */}
        <div className="space-y-6">
          {/* AI Decision Assistant Panel */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/40 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
                <h3 className="text-sm font-bold text-slate-100 tracking-wide">
                  StraitShift Intelligence
                </h3>
              </div>
              <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full font-semibold">
                AI-assisted recommendation — Demo
              </span>
            </div>

            <div className="py-4 space-y-3">
              <p className="text-xs text-slate-200 leading-relaxed font-medium bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                “Based on current demo conditions, <span className="text-cyan-400 font-bold">18 shipments</span> are exposed to the disrupted corridor. Rerouting selected shipments through alternative corridors could reduce expected delivery disruption by <span className="text-emerald-400 font-bold">64%</span> and save <span className="text-emerald-400 font-bold">$18.4M</span> in stockout penalties.”
              </p>

              <div className="space-y-2 pt-1">
                <button
                  onClick={onGenerateAIPlan}
                  className="w-full py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Generate Response Plan</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={onRunSimulation}
                    className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs border border-slate-700 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Simulate Scenario</span>
                  </button>

                  <button
                    onClick={() => onNavigate('routes')}
                    className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs border border-slate-700 transition-colors flex items-center justify-center space-x-1"
                  >
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    <span>View Explanation</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* What Changed Activity Log */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  What Changed? (Simulated Activity)
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Real-time Feed</span>
            </div>

            <div className="space-y-3">
              {timelineEvents.map((evt, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200">{evt.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{evt.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{evt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Business Risks Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              Top Business Risks
            </h3>
          </div>
          <button 
            onClick={() => onNavigate('scenario')}
            className="text-xs text-cyan-400 hover:underline font-medium"
          >
            Mitigate via Scenario Engine →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {risks.map(risk => (
            <div 
              key={risk.id}
              className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    risk.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    risk.severity === 'HIGH' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-slate-800 text-slate-300'
                  }`}>
                    {risk.severity}
                  </span>
                  <span className="text-xs font-bold text-cyan-400 font-mono">{risk.metric}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-200 mb-1">{risk.title}</h4>
                <p className="text-[11px] text-slate-400 leading-tight line-clamp-3">
                  {risk.explanation}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between">
                <span>{risk.affectedDivision}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
