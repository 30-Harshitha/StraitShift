import { 
  X, 
  Ship, 
  Clock, 
  DollarSign, 
  ShieldAlert, 
  GitFork, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import type { Shipment } from '../../types/straitshift';

interface ShipmentDetailDrawerProps {
  shipment: Shipment | null;
  onClose: () => void;
  onExecuteReroute: (shipmentId: string) => void;
}

export const ShipmentDetailDrawer: React.FC<ShipmentDetailDrawerProps> = ({
  shipment,
  onClose,
  onExecuteReroute
}) => {
  if (!shipment) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-slate-950/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-xl bg-slate-900 border-l border-slate-800 shadow-2xl h-full flex flex-col justify-between overflow-y-auto">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Ship className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-slate-100">{shipment.vesselName}</h2>
                <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                  {shipment.id}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {shipment.commodity} • Cargo Value: ${ (shipment.cargoValue / 1000000).toFixed(1) }M
              </p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* Risk & Status Alert */}
          <div className={`p-4 rounded-xl border flex items-center justify-between ${
            shipment.risk === 'CRITICAL' ? 'bg-red-500/10 border-red-500/40 text-red-300' :
            shipment.risk === 'HIGH' ? 'bg-amber-500/10 border-amber-500/40 text-amber-300' :
            'bg-slate-800/80 border-slate-700 text-slate-300'
          }`}>
            <div className="flex items-center space-x-3">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block">
                  {shipment.risk} RISK — Exposure Active
                </span>
                <span className="text-xs opacity-90">Current Route: {shipment.currentRoute}</span>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-slate-900 rounded-md border border-slate-800">
              Status: {shipment.status}
            </span>
          </div>

          {/* Route Origin -> Destination Card */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Voyage Corridor
            </span>
            <div className="flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="text-slate-400 block text-[10px]">ORIGIN</span>
                <span className="font-semibold text-slate-100">{shipment.originPort}</span>
                <span className="text-slate-400 block text-[11px]">{shipment.origin}</span>
              </div>

              <div className="flex flex-col items-center px-4">
                <ArrowRight className="w-5 h-5 text-cyan-400 animate-pulse" />
                <span className="text-[10px] text-cyan-400 font-mono mt-1">{shipment.volume}</span>
              </div>

              <div className="space-y-0.5 text-right">
                <span className="text-slate-400 block text-[10px]">DESTINATION</span>
                <span className="font-semibold text-slate-100">{shipment.destination}</span>
                <span className="text-slate-400 block text-[11px]">{shipment.destinationRegion}</span>
              </div>
            </div>
          </div>

          {/* Quantitative Impact Breakdown */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Transit Delay
              </span>
              <div className="text-lg font-bold text-amber-400 mt-1">
                +{shipment.delayDays} Days
              </div>
              <span className="text-[10px] text-slate-400">
                New ETA: {shipment.eta} (Orig: {shipment.originalEta})
              </span>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-red-400" />
                Freight Cost Delta
              </span>
              <div className="text-lg font-bold text-red-400 mt-1">
                +${ (shipment.costDelta / 1000000).toFixed(2) }M
              </div>
              <span className="text-[10px] text-slate-400">
                Bunker & charter premium
              </span>
            </div>
          </div>

          {/* Alternative Route Comparison for this Shipment */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              Evaluated Alternative Corridors
            </span>

            <div className="space-y-2 text-xs">
              <div className="bg-slate-950 border border-cyan-500/30 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-cyan-400 block">Cape of Good Hope Reroute</span>
                  <span className="text-slate-400 text-[11px]">Circumnavigate Africa • 34 Days Transit</span>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/30">
                  Recommended
                </span>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center justify-between opacity-70">
                <div>
                  <span className="font-bold text-slate-200 block">Saudi East-West Pipeline Bypass</span>
                  <span className="text-slate-400 text-[11px]">Landbridge to Red Sea • Slot Capacity Constrained</span>
                </div>
                <span className="text-xs text-amber-400">Congested</span>
              </div>
            </div>
          </div>

          {/* Recommended Action & AI Reason */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-200">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>StraitShift Recommended Action</span>
            </div>
            <p className="text-xs text-cyan-300 font-semibold bg-cyan-500/10 p-2.5 rounded-lg border border-cyan-500/20">
              {shipment.recommendedAction}
            </p>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-5 border-t border-slate-800 bg-slate-950 flex items-center space-x-3">
          <button
            onClick={() => onExecuteReroute(shipment.id)}
            disabled={shipment.status === 'Rerouted'}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
              shipment.status === 'Rerouted'
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25'
            }`}
          >
            <GitFork className="w-4 h-4" />
            <span>{shipment.status === 'Rerouted' ? 'Reroute Order Executed' : 'Execute Reroute Order'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
