import React, { useState } from 'react';
import { 
  Sliders, 
  Play, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';
import type { ScenarioParams, ScenarioResults } from '../../types/straitshift';
import { DEFAULT_SCENARIO_PARAMS, generateScenarioResults } from '../../data/mockData';

interface ScenarioPlannerPageProps {
  onNavigateToReport: () => void;
}

export const ScenarioPlannerPage: React.FC<ScenarioPlannerPageProps> = ({ onNavigateToReport }) => {
  const [params, setParams] = useState<ScenarioParams>(DEFAULT_SCENARIO_PARAMS);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [results, setResults] = useState<ScenarioResults>(() => generateScenarioResults(DEFAULT_SCENARIO_PARAMS));
  const [acceptedSteps, setAcceptedSteps] = useState<number[]>([1, 2]);

  const handleRunScenario = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setResults(generateScenarioResults(params));
      setIsSimulating(false);
    }, 600);
  };

  const toggleStep = (stepNumber: number) => {
    if (acceptedSteps.includes(stepNumber)) {
      setAcceptedSteps(acceptedSteps.filter((s: number) => s !== stepNumber));
    } else {
      setAcceptedSteps([...acceptedSteps, stepNumber]);
    }
  };

  const responsePlanSteps = [
    { num: 1, title: 'Reroute High-Priority Shipments', desc: 'Issue immediate sailing instructions for 6 loaded VLCC tankers to proceed via Cape of Good Hope corridor.' },
    { num: 2, title: 'Increase Inventory Allocation to Vulnerable Hubs', desc: 'Release 1.5M bbl safety stock at Rotterdam & Chiba terminals to absorb transit lag.' },
    { num: 3, title: 'Activate Secondary Spot Suppliers', desc: 'Execute spot purchase contracts with Petrobras Atlantic Basin and Chevron USGC exporters.' },
    { num: 4, title: 'Prioritize Critical Customer Delivery SLAs', desc: 'Allocate available refining throughput to long-term contract utility & power plants.' },
    { num: 5, title: 'Continuous Real-Time Corridor Monitoring', desc: 'Track vessel locations, Cape bunkering congestion, and Red Sea security advisories.' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-slate-100">Plan for What Happens Next</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate multi-day Strait closure scenarios, evaluate inventory failure risk, and generate actionable response strategies.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[11px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full font-semibold">
            StraitShift Simulation Engine v2.4
          </span>
        </div>
      </div>

      {/* SCENARIO PARAMETERS INPUT CONTROL PANEL */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Select Disruption Timeline & Operational Variables
          </h3>
          <span className="text-xs text-slate-400 font-mono">Disruption Model: Strait of Hormuz Closure</span>
        </div>

        {/* 1. Duration Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 block">
            Disruption Duration:
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[7, 30, 90].map((d) => (
              <button
                key={d}
                onClick={() => setParams({ ...params, durationDays: d as 7 | 30 | 90 })}
                className={`py-3 px-4 rounded-xl text-xs font-bold transition-all border ${
                  params.durationDays === d
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                {d} Days Disruption
              </button>
            ))}
          </div>
        </div>

        {/* 2. Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
          {/* Oil Demand */}
          <div className="space-y-2 bg-slate-950 border border-slate-800 p-3.5 rounded-xl">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-medium">Oil Demand Rate</span>
              <span className="font-bold text-cyan-400 font-mono">{params.oilDemandMbd} Mbd</span>
            </div>
            <input
              type="range"
              min="10"
              max="20"
              step="0.5"
              value={params.oilDemandMbd}
              onChange={e => setParams({ ...params, oilDemandMbd: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* LNG Demand */}
          <div className="space-y-2 bg-slate-950 border border-slate-800 p-3.5 rounded-xl">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-medium">LNG Demand Rate</span>
              <span className="font-bold text-cyan-400 font-mono">{params.lngDemandBcf} Bcf/d</span>
            </div>
            <input
              type="range"
              min="4"
              max="14"
              step="0.2"
              value={params.lngDemandBcf}
              onChange={e => setParams({ ...params, lngDemandBcf: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Current Inventory */}
          <div className="space-y-2 bg-slate-950 border border-slate-800 p-3.5 rounded-xl">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-medium">Current Buffer Stock</span>
              <span className="font-bold text-cyan-400 font-mono">{params.inventoryDays} Days</span>
            </div>
            <input
              type="range"
              min="10"
              max="45"
              step="1"
              value={params.inventoryDays}
              onChange={e => setParams({ ...params, inventoryDays: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Alt Route Capacity */}
          <div className="space-y-2 bg-slate-950 border border-slate-800 p-3.5 rounded-xl">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-medium">Alt Route Capacity</span>
              <span className="font-bold text-cyan-400 font-mono">{params.altRouteCapacityPct}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="95"
              step="5"
              value={params.altRouteCapacityPct}
              onChange={e => setParams({ ...params, altRouteCapacityPct: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Large Run Button */}
        <button
          onClick={handleRunScenario}
          disabled={isSimulating}
          className="w-full py-3.5 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold rounded-xl text-sm shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center space-x-2"
        >
          {isSimulating ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
              <span>Simulating Corridor Flow Mechanics...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Run Scenario Simulation ({params.durationDays} Days)</span>
            </>
          )}
        </button>
      </div>

      {/* SCENARIO IMPACT KPIS */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Simulated Scenario Impact ({params.durationDays}-Day Disruption Horizon)
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {/* 1 */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Expected Supply Gap</span>
            <div className="text-2xl font-bold text-red-400 mt-1">{results.expectedSupplyGapMbd} Mbd</div>
            <span className="text-[10px] text-slate-400">Daily deficit</span>
          </div>

          {/* 2 */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Inventory Coverage</span>
            <div className="text-2xl font-bold text-cyan-400 mt-1">{results.inventoryCoverageDays} Days</div>
            <span className="text-[10px] text-slate-400">Remaining stock</span>
          </div>

          {/* 3 */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Addl. Transport Cost</span>
            <div className="text-2xl font-bold text-red-400 mt-1">+${results.additionalCostUSD}M</div>
            <span className="text-[10px] text-slate-400">Cape bunker surge</span>
          </div>

          {/* 4 */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avg Delivery Delay</span>
            <div className="text-2xl font-bold text-amber-400 mt-1">+{results.avgDelayDays} Days</div>
            <span className="text-[10px] text-slate-400">Reroute lag</span>
          </div>

          {/* 5 */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl col-span-2 md:col-span-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Shipments Affected</span>
            <div className="text-2xl font-bold text-slate-100 mt-1">{results.affectedShipmentsCount} Vessels</div>
            <span className="text-[10px] text-slate-400">In Persian Gulf</span>
          </div>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Inventory Coverage Depletion Trajectory */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Inventory Buffer Depletion Over Time
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Days Stock Remaining</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={results.depletionTrajectory}>
                <XAxis dataKey="day" stroke="#64748b" fontSize={10} tickFormatter={(d) => `Day ${d}`} />
                <YAxis stroke="#64748b" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="stockWithoutAction" name="Unmitigated Closure" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
                <Area type="monotone" dataKey="stockWithReroute" name="With StraitShift Rerouting" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Cost Breakdown */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Additional Transport Cost Drivers ($M)
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Cost Category</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={results.costBreakdown} layout="vertical">
                <XAxis type="number" stroke="#64748b" fontSize={10} />
                <YAxis type="category" dataKey="category" stroke="#94a3b8" fontSize={9} width={130} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="costMUSD" name="Cost Impact ($M)" fill="#06b6d4" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* RECOMMENDED RESPONSE PLAN STEP-BY-STEP */}
      <div className="bg-slate-900 border border-cyan-500/30 p-5 rounded-2xl space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-100">
              Recommended Response Plan — Actionable Steps
            </h3>
          </div>
          <button
            onClick={onNavigateToReport}
            className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center space-x-1"
          >
            <span>Export to Executive Report</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {responsePlanSteps.map(step => {
            const isChecked = acceptedSteps.includes(step.num);
            return (
              <div 
                key={step.num}
                onClick={() => toggleStep(step.num)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 ${
                  isChecked 
                    ? 'bg-slate-950 border-cyan-500/40 text-slate-200' 
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                  isChecked ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {step.num}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-100">{step.title}</h4>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      isChecked ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isChecked ? 'Accepted & Active' : 'Click to Activate'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
