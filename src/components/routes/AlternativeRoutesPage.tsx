import React, { useState } from 'react';
import { 
  GitFork, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  Sliders,
  Navigation
} from 'lucide-react';
import type { RouteOption } from '../../types/straitshift';

interface AlternativeRoutesPageProps {
  routes: RouteOption[];
}

export const AlternativeRoutesPage: React.FC<AlternativeRoutesPageProps> = ({ routes }) => {
  const [bunkerFuelPrice, setBunkerFuelPrice] = useState<number>(680); // $/ton baseline

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <GitFork className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-slate-100">Alternative Supply Corridors & Route Trade-offs</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Comparative analysis of maritime and overland bypass options during Strait of Hormuz closure.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[11px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full font-semibold">
            Simulated Corridor Estimate
          </span>
        </div>
      </div>

      {/* Interactive Fuel Price Simulator Slider */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Interactive Bunker Fuel Cost Multiplier
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-cyan-400">
            VLSFO Bunker Price: ${bunkerFuelPrice} / Metric Ton
          </span>
        </div>

        <div className="flex items-center space-x-4 pt-1">
          <span className="text-xs text-slate-400 font-mono">$400</span>
          <input
            type="range"
            min="400"
            max="1200"
            step="20"
            value={bunkerFuelPrice}
            onChange={(e) => setBunkerFuelPrice(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <span className="text-xs text-slate-400 font-mono">$1200</span>
        </div>
      </div>

      {/* Route Cards Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {routes.map(r => {
          // Adjusted cost based on bunker fuel price slider
          const adjustedCost = (r.relativeCostPerBbl * (bunkerFuelPrice / 680)).toFixed(2);

          return (
            <div 
              key={r.id}
              className={`bg-slate-900 border rounded-2xl p-5 flex flex-col justify-between shadow-xl transition-all ${
                r.status === 'BLOCKED' 
                  ? 'border-red-500/40 bg-gradient-to-b from-red-950/20 to-slate-900' 
                  : r.id === 'route-cape'
                  ? 'border-cyan-500/50 ring-1 ring-cyan-500/20'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    r.status === 'BLOCKED' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    r.status === 'CONGESTED' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {r.status}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{r.code}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-100 mb-1">{r.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{r.description}</p>

                {/* Visual Progress Metrics */}
                <div className="space-y-3 text-xs">
                  {/* Distance */}
                  <div>
                    <div className="flex justify-between text-slate-300 font-semibold mb-1">
                      <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                        <Navigation className="w-3 h-3 text-cyan-400" /> Distance
                      </span>
                      <span className="font-mono">{r.distanceNM.toLocaleString()} NM</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyan-400 rounded-full"
                        style={{ width: `${Math.min(100, (r.distanceNM / 12000) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Transit Time */}
                  <div>
                    <div className="flex justify-between text-slate-300 font-semibold mb-1">
                      <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                        <Clock className="w-3 h-3 text-amber-400" /> Transit Time
                      </span>
                      <span className="font-mono">{r.transitTimeDays} Days</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: `${Math.min(100, (r.transitTimeDays / 40) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Relative Cost */}
                  <div>
                    <div className="flex justify-between text-slate-300 font-semibold mb-1">
                      <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                        <DollarSign className="w-3 h-3 text-red-400" /> Est. Cost/bbl
                      </span>
                      <span className="font-mono text-cyan-300">${adjustedCost}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-400 rounded-full"
                        style={{ width: `${Math.min(100, (r.relativeCostPerBbl / 6.0) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Reliability Score */}
                  <div>
                    <div className="flex justify-between text-slate-300 font-semibold mb-1">
                      <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Corridor Reliability
                      </span>
                      <span className="font-mono">{r.reliabilityScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-400 rounded-full"
                        style={{ width: `${r.reliabilityScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Key Nodes */}
              <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-400">
                <span className="font-bold text-slate-300 block mb-1">Key Waypoints:</span>
                <span className="leading-tight block font-mono">{r.keyNodes.join(' → ')}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
