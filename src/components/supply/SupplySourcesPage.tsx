import React, { useState } from 'react';
import { 
  Boxes, 
  Sparkles,
  TrendingDown
} from 'lucide-react';
import type { SupplySource } from '../../types/straitshift';

interface SupplySourcesPageProps {
  sources: SupplySource[];
}

export const SupplySourcesPage: React.FC<SupplySourcesPageProps> = ({ sources }) => {
  const [atlanticShiftPct, setAtlanticShiftPct] = useState<number>(35);

  // Dynamic calculation of concentration risk drop
  const baselineDependence = 72.4;
  const currentDependence = Math.max(25, Number((baselineDependence - (atlanticShiftPct * 0.85)).toFixed(1)));
  const riskScoreDrop = Math.round(atlanticShiftPct * 1.6);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <Boxes className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-slate-100">Global Energy Supply Sources & Allocation Matrix</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Evaluate primary supplier capacity, regional lead times, and Atlantic basin diversification.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400">Active Supply Nodes:</span>
          <span className="text-xs font-bold text-slate-100 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
            {sources.length} Global Providers
          </span>
        </div>
      </div>

      {/* DIVERSIFY SUPPLY INTERACTIVE RECOMMENDATION TOOL */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/40 p-5 rounded-2xl space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h3 className="text-sm font-bold text-slate-100">
              StraitShift Supply Diversification Simulator
            </h3>
          </div>
          <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2.5 py-0.5 rounded-full font-semibold">
            Recommended Action
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          Shift volume from Persian Gulf loading ports toward Atlantic basin suppliers (Petrobras West Africa & Chevron USGC) to insulate downstream refining operations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center pt-2">
          {/* Slider */}
          <div className="space-y-2 md:col-span-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Volume Shift to Atlantic Basin:</span>
              <span className="text-cyan-400 font-mono">{atlanticShiftPct}% Shifted</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="5"
              value={atlanticShiftPct}
              onChange={e => setAtlanticShiftPct(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0% (100% Gulf Dependent)</span>
              <span>30% (Recommended)</span>
              <span>60% (Maximum Atlantic Shift)</span>
            </div>
          </div>

          {/* Impact result box */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Gulf Corridor Exposure:</span>
              <span className="font-bold text-amber-400 font-mono">{currentDependence}%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Supply Risk Reduction:</span>
              <span className="font-bold text-emerald-400 font-mono flex items-center gap-1">
                <TrendingDown className="w-3.5 h-3.5" /> -{riskScoreDrop}% Risk
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Supplier Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Supplier Name</th>
                <th className="py-3.5 px-4">Region</th>
                <th className="py-3.5 px-4">Commodity</th>
                <th className="py-3.5 px-4">Avail Capacity / Alloc</th>
                <th className="py-3.5 px-4">Lead Time</th>
                <th className="py-3.5 px-4">Reliability</th>
                <th className="py-3.5 px-4">Corridor Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300 font-medium">
              {sources.map(s => (
                <tr key={s.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-100">{s.supplier}</td>
                  <td className="py-3.5 px-4 text-slate-400">{s.region}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 text-[11px]">
                      {s.commodity}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold">
                    <span className="text-cyan-400">{s.availableCapacityMbd}M</span> / <span className="text-slate-400">{s.currentAllocationMbd}M bbd</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">{s.leadTimeDays} Days</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-1.5 bg-slate-950 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-400 rounded-full"
                          style={{ width: `${s.reliability}%` }}
                        ></div>
                      </div>
                      <span className="font-mono text-emerald-400 font-bold text-[11px]">{s.reliability}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      s.risk === 'CRITICAL' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                      s.risk === 'MEDIUM' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                      'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    }`}>
                      {s.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
