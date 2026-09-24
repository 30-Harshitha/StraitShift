import React, { useState } from 'react';
import { 
  Ship, 
  Search, 
  ChevronRight
} from 'lucide-react';
import type { Shipment } from '../../types/straitshift';

interface ShipmentsPageProps {
  shipments: Shipment[];
  onSelectShipment: (shipment: Shipment) => void;
  onExecuteReroute?: (shipmentId: string) => void;
}

export const ShipmentsPage: React.FC<ShipmentsPageProps> = ({
  shipments,
  onSelectShipment,
  onExecuteReroute: _onExecuteReroute
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRisk, setSelectedRisk] = useState<string>('ALL');
  const [selectedCommodity, setSelectedCommodity] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Filtering
  const filteredShipments = shipments.filter(s => {
    const matchesSearch = 
      s.vesselName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.destination.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRisk = selectedRisk === 'ALL' || s.risk === selectedRisk;
    const matchesCommodity = selectedCommodity === 'ALL' || s.commodity === selectedCommodity;
    const matchesStatus = selectedStatus === 'ALL' || s.status === selectedStatus;

    return matchesSearch && matchesRisk && matchesCommodity && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <Ship className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-slate-100">Exposed Cargo & Shipment Control Table</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time status of active maritime energy shipments across Persian Gulf loading ports.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400">Total Cargoes:</span>
          <span className="text-xs font-bold text-slate-100 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
            {filteredShipments.length} / {shipments.length}
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search bar */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search vessel, shipment ID, origin, destination..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-cyan-500 placeholder-slate-400"
            />
          </div>

          {/* Risk Filter */}
          <select
            value={selectedRisk}
            onChange={e => setSelectedRisk(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">All Risk Levels</option>
            <option value="CRITICAL">Critical Risk</option>
            <option value="HIGH">High Risk</option>
            <option value="MEDIUM">Medium Risk</option>
            <option value="LOW">Low Risk</option>
          </select>

          {/* Commodity Filter */}
          <select
            value={selectedCommodity}
            onChange={e => setSelectedCommodity(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">All Commodities</option>
            <option value="Crude Oil">Crude Oil</option>
            <option value="LNG">LNG</option>
            <option value="Refined Fuel">Refined Fuel</option>
            <option value="Petrochemicals">Petrochemicals</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="Holding">Holding (Gulf)</option>
            <option value="In Transit">In Transit</option>
            <option value="Rerouted">Rerouted</option>
          </select>
        </div>
      </div>

      {/* Shipments Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Shipment ID / Vessel</th>
                <th className="py-3.5 px-4">Commodity</th>
                <th className="py-3.5 px-4">Origin & Destination</th>
                <th className="py-3.5 px-4">Volume</th>
                <th className="py-3.5 px-4">Current Route</th>
                <th className="py-3.5 px-4">Risk Level</th>
                <th className="py-3.5 px-4">Est. Delay / Cost</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300 font-medium">
              {filteredShipments.map(s => (
                <tr 
                  key={s.id}
                  onClick={() => onSelectShipment(s)}
                  className="hover:bg-slate-800/60 transition-colors cursor-pointer group"
                >
                  {/* ID / Vessel */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                        <Ship className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-100 block group-hover:text-cyan-400 transition-colors">
                          {s.vesselName}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">{s.id}</span>
                      </div>
                    </div>
                  </td>

                  {/* Commodity */}
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 font-semibold">
                      {s.commodity}
                    </span>
                  </td>

                  {/* Origin & Dest */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5">
                      <div className="text-slate-200 font-semibold">{s.originPort}</div>
                      <div className="text-[10px] text-slate-400">→ {s.destination}</div>
                    </div>
                  </td>

                  {/* Volume */}
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-200">
                    {s.volume}
                  </td>

                  {/* Current Route */}
                  <td className="py-3.5 px-4">
                    <span className={`text-[11px] font-semibold ${
                      s.currentRoute.includes('Blocked') ? 'text-red-400' : 'text-slate-300'
                    }`}>
                      {s.currentRoute}
                    </span>
                  </td>

                  {/* Risk */}
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      s.risk === 'CRITICAL' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                      s.risk === 'HIGH' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                      'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    }`}>
                      {s.risk}
                    </span>
                  </td>

                  {/* Delay / Cost */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5">
                      <span className="text-amber-400 font-bold block">
                        +{s.delayDays}d Delay
                      </span>
                      <span className="text-[10px] text-red-400">
                        +${(s.costDelta / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectShipment(s);
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg text-xs font-semibold border border-slate-700 transition-colors inline-flex items-center space-x-1"
                    >
                      <span>Analyze</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
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
