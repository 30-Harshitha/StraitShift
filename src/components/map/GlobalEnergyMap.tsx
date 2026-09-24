import React, { useState } from 'react';
import { 
  Layers, 
  MapPin, 
  Navigation
} from 'lucide-react';
import type { Shipment } from '../../types/straitshift';

interface GlobalEnergyMapProps {
  shipments?: Shipment[];
  onSelectShipment?: (shipment: Shipment) => void;
  compact?: boolean;
}

export const GlobalEnergyMap: React.FC<GlobalEnergyMapProps> = ({
  shipments: _shipments = [],
  onSelectShipment: _onSelectShipment,
  compact = false
}) => {
  const [activeLayer, setActiveLayer] = useState<'all' | 'disrupted' | 'cape' | 'pipeline'>('all');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Geographic Nodes with stylized SVG relative coordinates (width 1000, height 500)
  const nodes = [
    { id: 'ras-tanura', name: 'Ras Tanura (Saudi Arabia)', x: 490, y: 220, type: 'source', status: 'Blocked Export', volume: '6.5M bbl/d', risk: 'CRITICAL' },
    { id: 'hormuz', name: 'Strait of Hormuz', x: 535, y: 225, type: 'disruption', status: 'CLOSED / CRITICAL', volume: '20.5M bbl/d exposing', risk: 'CRITICAL' },
    { id: 'fujairah', name: 'Fujairah Hub (UAE)', x: 555, y: 235, type: 'source', status: 'Bypass Operating', volume: '1.8M bbl/d', risk: 'MEDIUM' },
    { id: 'yanbu', name: 'Yanbu Terminal (Red Sea)', x: 440, y: 240, type: 'pipeline-node', status: 'Landbridge Active', volume: '5.0M bbl/d', risk: 'MEDIUM' },
    { id: 'rotterdam', name: 'Rotterdam (Europe Hub)', x: 260, y: 110, type: 'destination', status: 'Critical Reserve', volume: '3.4M bbl/d intake', risk: 'HIGH' },
    { id: 'singapore', name: 'Singapore Shipping Hub', x: 790, y: 310, type: 'destination', status: 'Stock Depleting', volume: '4.2M bbl/d intake', risk: 'HIGH' },
    { id: 'tokyo', name: 'Tokyo Bay / Chiba (Japan)', x: 910, y: 180, type: 'destination', status: 'High Exposure', volume: '2.8M bbl/d intake', risk: 'CRITICAL' },
    { id: 'cape', name: 'Cape of Good Hope (SA)', x: 400, y: 440, type: 'chokepoint', status: 'Bypass Corridor Active', volume: '+14 Days Transit', risk: 'LOW' },
    { id: 'houston', name: 'Houston USGC (Atlantic)', x: 80, y: 200, type: 'source', status: 'Spot Swap Available', volume: '2.8M bbl/d export', risk: 'LOW' }
  ];

  const nodeDetails = nodes.find(n => n.id === (selectedNode || hoveredNode));

  return (
    <div className={`relative bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col ${compact ? 'h-[420px]' : 'h-[580px]'}`}>
      {/* Map Header / Layer Filter Toolbar */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 z-10">
        <div className="flex items-center space-x-2">
          <Navigation className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Global Energy Flow & Maritime Corridor Map
          </h3>
          <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
            Disruption Active
          </span>
        </div>

        {/* Route Layers */}
        <div className="flex items-center space-x-1.5">
          <div className="text-[11px] text-slate-400 font-medium hidden sm:inline mr-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            Corridors:
          </div>
          <button
            onClick={() => setActiveLayer('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              activeLayer === 'all' 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            All Corridors
          </button>
          <button
            onClick={() => setActiveLayer('disrupted')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              activeLayer === 'disrupted' 
                ? 'bg-red-500/20 text-red-300 border border-red-500/40' 
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Blocked Strait
          </button>
          <button
            onClick={() => setActiveLayer('cape')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              activeLayer === 'cape' 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Cape Bypass
          </button>
          <button
            onClick={() => setActiveLayer('pipeline')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              activeLayer === 'pipeline' 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            East-West Landbridge
          </button>
        </div>
      </div>

      {/* Interactive Map SVG Visualizer */}
      <div className="relative flex-1 bg-slate-950 overflow-hidden cursor-crosshair">
        <svg 
          className="w-full h-full object-cover" 
          viewBox="0 0 1000 500" 
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Grid background pattern */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2,2" />
            </pattern>

            {/* Glowing line filters */}
            <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Grid */}
          <rect width="1000" height="500" fill="#090d16" />
          <rect width="1000" height="500" fill="url(#grid)" opacity="0.7" />

          {/* World Continent Outlines (Stylized SVG Path Representation) */}
          {/* North America */}
          <path d="M 30,80 Q 90,60 160,90 T 140,240 T 70,220 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
          {/* South America */}
          <path d="M 170,260 Q 220,300 210,400 T 160,450 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
          {/* Europe */}
          <path d="M 240,70 Q 300,60 350,90 T 310,170 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
          {/* Africa */}
          <path d="M 280,180 Q 380,170 380,280 T 360,430 T 270,300 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
          {/* Middle East & Arabia */}
          <path d="M 420,180 Q 480,170 540,220 T 460,280 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="1.2" />
          {/* Asia */}
          <path d="M 460,80 Q 750,50 920,120 T 880,310 T 650,220 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
          {/* Southeast Asia & Australia */}
          <path d="M 760,300 Q 820,320 840,400 T 780,450 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />

          {/* --- MARITIME ENERGY ROUTES --- */}

          {/* DISRUPTED ROUTE: Strait of Hormuz Corridor (Red, Pulsing Dashed) */}
          {(activeLayer === 'all' || activeLayer === 'disrupted') && (
            <g>
              <path 
                d="M 490,220 L 535,225 L 555,235 L 680,290 L 790,310" 
                fill="none" 
                stroke="#ef4444" 
                strokeWidth="3.5" 
                filter="url(#glow-red)"
                className="animate-dash-flow"
              />
              <path 
                d="M 535,225 L 600,260 L 700,220 L 910,180" 
                fill="none" 
                stroke="#ef4444" 
                strokeWidth="2.5" 
                strokeDasharray="4 4" 
                opacity="0.8"
              />
              {/* Strait Blockade Pulsing Warning Circle */}
              <circle cx="535" cy="225" r="14" fill="#ef4444" opacity="0.25" className="animate-ping" />
              <circle cx="535" cy="225" r="8" fill="#ef4444" opacity="0.6" />
              <circle cx="535" cy="225" r="3" fill="#ffffff" />
            </g>
          )}

          {/* ALTERNATIVE 1: Cape of Good Hope Bypass (Cyan, Solid/Dashed) */}
          {(activeLayer === 'all' || activeLayer === 'cape') && (
            <g>
              {/* Route around Africa: Gulf -> Arabian Sea -> Indian Ocean -> Cape -> Atlantic -> Rotterdam */}
              <path 
                d="M 555,235 C 560,330 460,420 400,440 C 320,440 250,300 260,110" 
                fill="none" 
                stroke="#06b6d4" 
                strokeWidth="3" 
                strokeDasharray="8 4" 
                filter="url(#glow-cyan)"
              />
              {/* Moving Vessel Sim Indicator */}
              <circle cx="360" cy="410" r="4" fill="#38bdf8" className="animate-bounce" />
              <circle cx="280" cy="240" r="4" fill="#38bdf8" />
            </g>
          )}

          {/* ALTERNATIVE 2: Saudi East-West Landbridge Pipeline (Amber) */}
          {(activeLayer === 'all' || activeLayer === 'pipeline') && (
            <g>
              {/* Overland Pipeline from Abqaiq/Ras Tanura to Yanbu */}
              <path 
                d="M 490,220 L 440,240" 
                fill="none" 
                stroke="#f59e0b" 
                strokeWidth="4" 
                strokeDasharray="2 2"
              />
              {/* Yanbu via Red Sea / Suez to Rotterdam */}
              <path 
                d="M 440,240 L 410,210 L 370,160 L 260,110" 
                fill="none" 
                stroke="#f59e0b" 
                strokeWidth="2.5" 
                strokeDasharray="6 3"
              />
            </g>
          )}

          {/* ALTERNATIVE 3: Atlantic Spot Swap (Emerald) */}
          {activeLayer === 'all' && (
            <path 
              d="M 80,200 L 260,110" 
              fill="none" 
              stroke="#10b981" 
              strokeWidth="2.5" 
              strokeDasharray="4 4"
              opacity="0.85"
            />
          )}

          {/* --- MAP NODES & INTERACTIVE HOTSPOTS --- */}
          {nodes.map((node) => {
            const isHovered = hoveredNode === node.id || selectedNode === node.id;
            const isDisruption = node.type === 'disruption';
            const isDestination = node.type === 'destination';

            let nodeColor = '#38bdf8';
            if (isDisruption) nodeColor = '#ef4444';
            if (isDestination) nodeColor = '#a855f7';
            if (node.id === 'yanbu') nodeColor = '#f59e0b';
            if (node.id === 'houston') nodeColor = '#10b981';

            return (
              <g 
                key={node.id} 
                className="cursor-pointer transition-transform duration-200 hover:scale-125"
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setSelectedNode(node.id)}
              >
                {/* Halo ring for selected or disruption */}
                {isHovered && (
                  <circle cx={node.x} cy={node.y} r="14" fill={nodeColor} opacity="0.3" />
                )}

                {/* Main Node Point */}
                <circle 
                  cx={node.x} 
                  cy={node.y} 
                  r={isDisruption ? 7 : 5} 
                  fill={nodeColor} 
                  stroke="#0f172a" 
                  strokeWidth="2"
                />

                {/* Node Label */}
                <text 
                  x={node.x} 
                  y={node.y + 16} 
                  textAnchor="middle" 
                  fill={isHovered ? '#ffffff' : '#94a3b8'} 
                  fontSize="10" 
                  fontWeight={isHovered ? 'bold' : '500'}
                  className="pointer-events-none select-none"
                >
                  {node.name.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected / Hovered Node Information Overlay Box */}
        {nodeDetails && (
          <div className="absolute top-4 left-4 bg-slate-900/95 border border-slate-700/80 p-3 rounded-xl shadow-2xl backdrop-blur-md max-w-xs z-20">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
              <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {nodeDetails.name}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                nodeDetails.risk === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                nodeDetails.risk === 'HIGH' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {nodeDetails.risk}
              </span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Status:</span>
                <span className="font-semibold text-slate-200">{nodeDetails.status}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Capacity / Flow:</span>
                <span className="font-semibold text-cyan-400">{nodeDetails.volume}</span>
              </div>
            </div>
          </div>
        )}

        {/* Legend Box bottom right */}
        <div className="absolute bottom-4 right-4 bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl shadow-xl backdrop-blur-md text-[11px] space-y-1.5 z-10 hidden sm:block">
          <div className="font-bold text-slate-300 text-[10px] uppercase tracking-wider mb-1">
            Map Legend
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-1 bg-red-500 rounded"></span>
            <span className="text-slate-300">Disrupted Strait of Hormuz</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-1 bg-cyan-400 rounded"></span>
            <span className="text-slate-300">Cape of Good Hope Reroute</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-1 bg-amber-400 rounded"></span>
            <span className="text-slate-300">Saudi East-West Pipeline</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-1 bg-emerald-400 rounded"></span>
            <span className="text-slate-300">Atlantic Spot Replacement</span>
          </div>
        </div>
      </div>
    </div>
  );
};
