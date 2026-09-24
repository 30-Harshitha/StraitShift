import React from 'react';
import { 
  X, 
  Database, 
  Cpu, 
  Navigation, 
  Sliders, 
  Sparkles, 
  LayoutDashboard, 
  ArrowDown, 
  Plug
} from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col my-8 max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-slate-100">How StraitShift Works — Platform Architecture</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300">
          <p className="leading-relaxed">
            StraitShift acts as a centralized enterprise control tower that converts multi-source maritime and supply chain signals into actionable disruption response plans. Below is the end-to-end data pipeline architecture.
          </p>

          {/* Architecture Visual Diagram Flow */}
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-inner">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block text-center mb-2">
              SYSTEM ARCHITECTURE DATA FLOW DIAGRAM
            </span>

            <div className="flex flex-col items-center space-y-3 max-w-xl mx-auto">
              {/* Step 1: Data Sources */}
              <div className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Database className="w-5 h-5 text-cyan-400" />
                  <div>
                    <span className="font-bold text-slate-100 block">1. Ingestion Data Sources</span>
                    <span className="text-[10px] text-slate-400">AIS Vessel Feeds • SAP ERP Inventory • Platts Crude Prices • Weather/Risk</span>
                  </div>
                </div>
                <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded font-mono">
                  Input
                </span>
              </div>

              <ArrowDown className="w-4 h-4 text-slate-500 animate-bounce" />

              {/* Step 2: Data Processing Layer */}
              <div className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Cpu className="w-5 h-5 text-amber-400" />
                  <div>
                    <span className="font-bold text-slate-100 block">2. Data Processing & Normalization</span>
                    <span className="text-[10px] text-slate-400">Cargo Matching • Transit Calculation • Bunker Indexing</span>
                  </div>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                  Transform
                </span>
              </div>

              <ArrowDown className="w-4 h-4 text-slate-500" />

              {/* Step 3: Risk & Route Analysis */}
              <div className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Navigation className="w-5 h-5 text-blue-400" />
                  <div>
                    <span className="font-bold text-slate-100 block">3. Risk & Route Corridor Engine</span>
                    <span className="text-[10px] text-slate-400">Strait Blockage Scan • Cape vs Pipeline Costing • Delay Estimation</span>
                  </div>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                  Analysis
                </span>
              </div>

              <ArrowDown className="w-4 h-4 text-slate-500" />

              {/* Step 4: Scenario Engine */}
              <div className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Sliders className="w-5 h-5 text-purple-400" />
                  <div>
                    <span className="font-bold text-slate-100 block">4. Multi-Day Scenario Simulator</span>
                    <span className="text-[10px] text-slate-400">7 / 30 / 90 Day Depletion Trajectory • Supply vs Demand Gap</span>
                  </div>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                  Simulation
                </span>
              </div>

              <ArrowDown className="w-4 h-4 text-slate-500" />

              {/* Step 5: AI Decision Assistant */}
              <div className="w-full bg-slate-900 border border-cyan-500/50 p-3 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <div>
                    <span className="font-bold text-slate-100 block">5. StraitShift AI Intelligence</span>
                    <span className="text-[10px] text-slate-400">Automated Response Directive • Spot Swap Optimization</span>
                  </div>
                </div>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono">
                  AI Layer
                </span>
              </div>

              <ArrowDown className="w-4 h-4 text-slate-500" />

              {/* Step 6: Control Tower UI */}
              <div className="w-full bg-cyan-500/20 border border-cyan-500/60 p-3 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <LayoutDashboard className="w-5 h-5 text-cyan-300" />
                  <div>
                    <span className="font-bold text-slate-100 block">6. Executive Control Tower</span>
                    <span className="text-[10px] text-cyan-200">Interactive Dashboard • Action Center • Executive Reports</span>
                  </div>
                </div>
                <span className="text-[10px] bg-cyan-500 text-slate-950 font-bold px-2 py-0.5 rounded font-mono">
                  UI Output
                </span>
              </div>
            </div>
          </div>

          {/* API Readiness explanation */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
            <span className="font-bold text-slate-200 flex items-center gap-1.5 text-xs">
              <Plug className="w-4 h-4 text-cyan-400" /> Real-World API Integration Readiness
            </span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              This enterprise prototype utilizes structured mock JSON feeds (`mockData.ts`). The frontend state architecture is completely decoupled from data providers, allowing production connections to real-world AIS vessel APIs (Spire, MarineTraffic), ERP connectors (SAP S/4HANA), and commodity benchmarks (S&P Global Platts) without refactoring the UI.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors"
          >
            Close Architecture View
          </button>
        </div>
      </div>
    </div>
  );
};
