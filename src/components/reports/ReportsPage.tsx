import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Printer, 
  CheckCircle2, 
  FileText
} from 'lucide-react';
import type { Shipment } from '../../types/straitshift';

interface ReportsPageProps {
  shipments?: Shipment[];
}

export const ReportsPage: React.FC<ReportsPageProps> = () => {
  const [selectedReportType, setSelectedReportType] = useState<'impact' | 'supply' | 'routes' | 'executive'>('executive');

  const reportTypes = [
    { id: 'executive', title: 'Executive Summary Brief', desc: 'High-level C-suite brief on Strait disruption, financial exposure & response strategy.' },
    { id: 'impact', title: 'Disruption Impact Report', desc: 'Detailed quantitative metrics on exposed cargoes, volume at risk & transit delay.' },
    { id: 'supply', title: 'Supply Risk & Concentration Report', desc: 'Breakdown of supplier dependencies and Atlantic basin diversification strategy.' },
    { id: 'routes', title: 'Route Comparison & Bunker Analysis', desc: 'Cape of Good Hope vs Saudi East-West Pipeline distance, cost & CO2 metrics.' }
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <FileSpreadsheet className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-slate-100">Executive Report Generator</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Generate printable, board-ready audit reports for Strait of Hormuz business continuity planning.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center space-x-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Export PDF</span>
          </button>
        </div>
      </div>

      {/* Report Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTypes.map(r => (
          <button
            key={r.id}
            onClick={() => setSelectedReportType(r.id as any)}
            className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
              selectedReportType === r.id
                ? 'bg-cyan-500/15 border-cyan-500/50 ring-1 ring-cyan-500/30'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <FileText className={`w-4 h-4 ${selectedReportType === r.id ? 'text-cyan-400' : 'text-slate-400'}`} />
                {selectedReportType === r.id && (
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                )}
              </div>
              <h3 className="text-xs font-bold text-slate-100 mb-1">{r.title}</h3>
              <p className="text-[11px] text-slate-400 leading-tight">{r.desc}</p>
            </div>
            <span className="text-[10px] text-cyan-400 font-semibold mt-3">Select Template →</span>
          </button>
        ))}
      </div>

      {/* PREVIEW DOCUMENT (PRINTABLE CONTAINER) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 max-w-4xl mx-auto print:bg-white print:text-slate-900 print:border-none print:shadow-none">
        {/* Document Header */}
        <div className="flex items-center justify-between border-b border-slate-800 print:border-slate-300 pb-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold text-lg">
              SS
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 print:text-slate-900">
                StraitShift Executive Continuity Report
              </h2>
              <p className="text-xs text-slate-400 print:text-slate-600">
                Incident Response Brief: Strait of Hormuz Disruption • 30-Day Outlook
              </p>
            </div>
          </div>

          <div className="text-right text-xs">
            <span className="font-mono text-slate-400 print:text-slate-600 block">Date: 2026-09-24</span>
            <span className="font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/30 text-[10px]">
              CONFIDENTIAL / BOARD USE
            </span>
          </div>
        </div>

        {/* Executive Summary Narrative */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 print:text-cyan-700">
            1. Executive Assessment
          </h3>
          <p className="text-xs text-slate-300 print:text-slate-800 leading-relaxed bg-slate-950 print:bg-slate-50 p-4 rounded-xl border border-slate-800 print:border-slate-200">
            On September 24, 2026, maritime transit through the Strait of Hormuz was suspended. StraitShift control tower models indicate immediate exposure across <span className="font-bold text-cyan-400">18 active shipments</span> representing <span className="font-bold text-cyan-400">14.2M barrels</span> of crude oil and LNG. Total projected financial impact from freight charter spikes and transit delays stands at <span className="font-bold text-red-400">$48.5M</span> over a 30-day disruption horizon.
          </p>
        </div>

        {/* Key Metrics Table */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 print:text-cyan-700">
            2. Quantitative Disruption Summary
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-950 print:bg-slate-50 p-3 rounded-xl border border-slate-800 print:border-slate-200">
              <span className="text-[10px] text-slate-400 print:text-slate-600 block">Exposed Fleet:</span>
              <span className="font-bold text-slate-100 print:text-slate-900 text-sm">18 / 42 Vessels</span>
            </div>
            <div className="bg-slate-950 print:bg-slate-50 p-3 rounded-xl border border-slate-800 print:border-slate-200">
              <span className="text-[10px] text-slate-400 print:text-slate-600 block">Avg Delay (Cape):</span>
              <span className="font-bold text-amber-400 print:text-amber-700 text-sm">+14.8 Days</span>
            </div>
            <div className="bg-slate-950 print:bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 print:text-slate-600 block">Terminal Coverage:</span>
              <span className="font-bold text-cyan-400 print:text-cyan-700 text-sm">21.4 Days Remaining</span>
            </div>
            <div className="bg-slate-950 print:bg-slate-50 p-3 rounded-xl border border-slate-800 print:border-slate-200">
              <span className="text-[10px] text-slate-400 print:text-slate-600 block">Cost Impact:</span>
              <span className="font-bold text-red-400 print:text-red-700 text-sm">+$48.5M Est.</span>
            </div>
          </div>
        </div>

        {/* Action Plan Summary */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 print:text-cyan-700">
            3. Recommended Action Plan
          </h3>

          <div className="space-y-2 text-xs">
            <div className="bg-slate-950 print:bg-slate-50 p-3 rounded-xl border border-slate-800 print:border-slate-200 flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-100 print:text-slate-900 block">Cape Reroute Execution:</span>
                <span className="text-slate-400 print:text-slate-700 text-[11px]">Issue sailing orders for 6 VLCC tankers around Africa; secure bunker slots at Cape Town.</span>
              </div>
            </div>

            <div className="bg-slate-950 print:bg-slate-50 p-3 rounded-xl border border-slate-800 print:border-slate-200 flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-100 print:text-slate-900 block">Atlantic Spot Swap Activation:</span>
                <span className="text-slate-400 print:text-slate-700 text-[11px]">Contract 35% crude volume with Petrobras (West Africa) to supply Northwest Europe refineries.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sign-off footer */}
        <div className="pt-6 border-t border-slate-800 print:border-slate-300 flex items-center justify-between text-xs text-slate-400 print:text-slate-600">
          <div>
            <span>Prepared by: StraitShift Intelligence Control Engine</span>
          </div>
          <div>
            <span>Approved by: VP Supply Chain & Risk</span>
          </div>
        </div>
      </div>
    </div>
  );
};
