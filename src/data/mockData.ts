import type { 
  Shipment, 
  RouteOption, 
  SupplySource, 
  BusinessRisk, 
  Recommendation, 
  ScenarioParams, 
  ScenarioResults,
  NotificationItem
} from '../types/straitshift';

export const INITIAL_SHIPMENTS: Shipment[] = [
  {
    id: 'SS-9041',
    vesselName: 'VLCC Arabian Titan',
    commodity: 'Crude Oil',
    volume: '2.1M bbls',
    volumeBarrels: 2100000,
    origin: 'Ras Tanura, Saudi Arabia',
    originPort: 'Ras Tanura Terminal',
    destination: 'Rotterdam, Netherlands',
    destinationRegion: 'Europe (NW)',
    currentRoute: 'Strait of Hormuz (Blocked)',
    risk: 'CRITICAL',
    eta: 'Oct 14, 2026',
    originalEta: 'Oct 02, 2026',
    delayDays: 14,
    costDelta: 3200000,
    recommendedAction: 'Reroute via Cape of Good Hope',
    status: 'Holding',
    cargoValue: 168000000,
    priority: 'Critical',
    coordinates: {
      current: [26.4, 50.1], // Persian Gulf
      origin: [26.6, 50.1],
      destination: [51.9, 4.1]
    }
  },
  {
    id: 'SS-9042',
    vesselName: 'Al Shamal LNG',
    commodity: 'LNG',
    volume: '170,000 m³',
    volumeBarrels: 1050000,
    origin: 'Ras Laffan, Qatar',
    originPort: 'Ras Laffan Port',
    destination: 'Tokyo Bay, Japan',
    destinationRegion: 'East Asia',
    currentRoute: 'Strait of Hormuz (Blocked)',
    risk: 'CRITICAL',
    eta: 'Oct 09, 2026',
    originalEta: 'Sep 29, 2026',
    delayDays: 10,
    costDelta: 2450000,
    recommendedAction: 'Execute Spot Swap with US Gulf Supplier',
    status: 'Holding',
    cargoValue: 95000000,
    priority: 'Critical',
    coordinates: {
      current: [25.9, 51.5],
      origin: [25.9, 51.5],
      destination: [35.6, 139.7]
    }
  },
  {
    id: 'SS-9043',
    vesselName: 'GasLog Empress',
    commodity: 'LNG',
    volume: '155,000 m³',
    volumeBarrels: 960000,
    origin: 'Das Island, UAE',
    originPort: 'Das Island LNG',
    destination: 'Singapore Hub',
    destinationRegion: 'Southeast Asia',
    currentRoute: 'Strait of Hormuz (Blocked)',
    risk: 'HIGH',
    eta: 'Oct 05, 2026',
    originalEta: 'Sep 28, 2026',
    delayDays: 7,
    costDelta: 1800000,
    recommendedAction: 'Transfer cargo via Fujairah Bypass Pipeline',
    status: 'In Transit',
    cargoValue: 88000000,
    priority: 'High',
    coordinates: {
      current: [25.1, 56.3], // Gulf of Oman / Fujairah
      origin: [25.1, 52.9],
      destination: [1.2, 103.8]
    }
  },
  {
    id: 'SS-9044',
    vesselName: 'Najaf Star',
    commodity: 'Refined Fuel',
    volume: '850,000 bbls',
    volumeBarrels: 850000,
    origin: 'Jubail, Saudi Arabia',
    originPort: 'Jubail Industrial Port',
    destination: 'Chiba, Japan',
    destinationRegion: 'East Asia',
    currentRoute: 'Cape of Good Hope (Rerouted)',
    risk: 'HIGH',
    eta: 'Oct 22, 2026',
    originalEta: 'Oct 08, 2026',
    delayDays: 14,
    costDelta: 2100000,
    recommendedAction: 'Bunker fuel optimization at Cape Town',
    status: 'Rerouted',
    cargoValue: 72000000,
    priority: 'High',
    coordinates: {
      current: [-33.9, 18.4], // Cape Town
      origin: [27.0, 49.6],
      destination: [35.6, 140.0]
    }
  },
  {
    id: 'SS-9045',
    vesselName: 'Petro Chemist II',
    commodity: 'Petrochemicals',
    volume: '45,000 MT',
    volumeBarrels: 340000,
    origin: 'Mesaieed, Qatar',
    originPort: 'Mesaieed Port',
    destination: 'Ningbo-Zhoushan, China',
    destinationRegion: 'East Asia',
    currentRoute: 'Strait of Hormuz (Blocked)',
    risk: 'CRITICAL',
    eta: 'Oct 18, 2026',
    originalEta: 'Oct 03, 2026',
    delayDays: 15,
    costDelta: 1400000,
    recommendedAction: 'Activate Secondary Supplier (Petrobras Atlantic)',
    status: 'Holding',
    cargoValue: 54000000,
    priority: 'High',
    coordinates: {
      current: [24.9, 51.5],
      origin: [24.9, 51.5],
      destination: [29.8, 121.5]
    }
  },
  {
    id: 'SS-9046',
    vesselName: 'Suezmax Gulf Victory',
    commodity: 'Crude Oil',
    volume: '1.0M bbls',
    volumeBarrels: 1000000,
    origin: 'Basra Terminal, Iraq',
    originPort: 'Basra Oil Terminal',
    destination: 'Houston, USA',
    destinationRegion: 'North America',
    currentRoute: 'Strait of Hormuz (Blocked)',
    risk: 'CRITICAL',
    eta: 'Oct 28, 2026',
    originalEta: 'Oct 10, 2026',
    delayDays: 18,
    costDelta: 4100000,
    recommendedAction: 'Reroute via Cape of Good Hope',
    status: 'Holding',
    cargoValue: 80000000,
    priority: 'Critical',
    coordinates: {
      current: [29.8, 48.8],
      origin: [29.8, 48.8],
      destination: [29.7, -95.3]
    }
  },
  {
    id: 'SS-9047',
    vesselName: 'East-West Express I',
    commodity: 'Crude Oil',
    volume: '1.8M bbls',
    volumeBarrels: 1800000,
    origin: 'Yanbu, Red Sea (Saudi Landbridge)',
    originPort: 'Yanbu Crude Terminal',
    destination: 'Rotterdam, Netherlands',
    destinationRegion: 'Europe (NW)',
    currentRoute: 'Red Sea / Suez Corridor',
    risk: 'MEDIUM',
    eta: 'Oct 04, 2026',
    originalEta: 'Oct 04, 2026',
    delayDays: 0,
    costDelta: 450000,
    recommendedAction: 'Maintain route — Monitor Red Sea security',
    status: 'In Transit',
    cargoValue: 144000000,
    priority: 'Normal',
    coordinates: {
      current: [24.0, 38.0], // Red Sea Yanbu
      origin: [24.0, 38.0],
      destination: [51.9, 4.1]
    }
  },
  {
    id: 'SS-9048',
    vesselName: 'Atlantic Voyager',
    commodity: 'Crude Oil',
    volume: '1.5M bbls',
    volumeBarrels: 1500000,
    origin: 'Cabinda, Angola',
    originPort: 'Cabinda Offshore',
    destination: 'Rotterdam, Netherlands',
    destinationRegion: 'Europe (NW)',
    currentRoute: 'Atlantic Direct',
    risk: 'LOW',
    eta: 'Oct 01, 2026',
    originalEta: 'Oct 01, 2026',
    delayDays: 0,
    costDelta: 0,
    recommendedAction: 'Increase volume allocation +20%',
    status: 'In Transit',
    cargoValue: 120000000,
    priority: 'Normal',
    coordinates: {
      current: [-5.5, 12.2],
      origin: [-5.5, 12.2],
      destination: [51.9, 4.1]
    }
  }
];

export const MOCK_ROUTES: RouteOption[] = [
  {
    id: 'route-hormuz',
    name: 'Primary Route: Strait of Hormuz',
    code: 'SOH-01',
    description: 'Direct maritime corridor through the Persian Gulf and Strait of Hormuz to Gulf of Oman.',
    distanceNM: 6400,
    transitTimeDays: 18,
    relativeCostPerBbl: 2.10,
    riskLevel: 'CRITICAL',
    capacityPct: 0,
    co2PerKt: 14.2,
    reliabilityScore: 5,
    keyNodes: ['Ras Tanura', 'Strait of Hormuz', 'Arabian Sea', 'Indian Ocean'],
    status: 'BLOCKED'
  },
  {
    id: 'route-cape',
    name: 'Alternative 1: Cape of Good Hope Bypass',
    code: 'CGH-02',
    description: 'Circumnavigation of Africa via South Africa. Extended voyage with high bunker consumption but maximum vessel clearance.',
    distanceNM: 11800,
    transitTimeDays: 34,
    relativeCostPerBbl: 4.85,
    riskLevel: 'MEDIUM',
    capacityPct: 92,
    co2PerKt: 28.6,
    reliabilityScore: 88,
    keyNodes: ['Persian Gulf / Fujairah', 'Indian Ocean', 'Cape Town', 'Atlantic Ocean', 'Rotterdam'],
    status: 'AVAILABLE'
  },
  {
    id: 'route-pipeline',
    name: 'Alternative 2: Saudi East-West Pipeline (Yanbu Red Sea)',
    code: 'EWP-03',
    description: 'Cross-Kingdom 5M bbl/day overland pipeline from Eastern Province to Yanbu port on Red Sea.',
    distanceNM: 7100,
    transitTimeDays: 20,
    relativeCostPerBbl: 3.40,
    riskLevel: 'HIGH',
    capacityPct: 65,
    co2PerKt: 16.8,
    reliabilityScore: 74,
    keyNodes: ['Abqaiq Pipeline Feed', 'Yanbu Terminal', 'Red Sea', 'Suez Canal'],
    status: 'CONGESTED'
  },
  {
    id: 'route-spot-swap',
    name: 'Alternative 3: Atlantic / Regional Spot Supply Swap',
    code: 'SWS-04',
    description: 'Commercial commodity substitution from West Africa (Angola/Nigeria) and US Gulf Coast suppliers.',
    distanceNM: 4200,
    transitTimeDays: 12,
    relativeCostPerBbl: 5.60,
    riskLevel: 'LOW',
    capacityPct: 78,
    co2PerKt: 10.4,
    reliabilityScore: 94,
    keyNodes: ['Cabinda / Houston', 'Atlantic Crossing', 'Rotterdam / Singapore'],
    status: 'AVAILABLE'
  }
];

export const MOCK_SUPPLY_SOURCES: SupplySource[] = [
  {
    id: 'sup-aramco',
    supplier: 'Saudi Aramco (Gulf Terminals)',
    region: 'Middle East (Persian Gulf)',
    commodity: 'Crude Oil',
    availableCapacityMbd: 6.5,
    currentAllocationMbd: 5.2,
    leadTimeDays: 18,
    risk: 'CRITICAL',
    reliability: 25,
    costIndex: 100
  },
  {
    id: 'sup-adnoc-fujairah',
    supplier: 'ADNOC Offshore (Fujairah Pipeline Terminal)',
    region: 'Middle East (Gulf of Oman)',
    commodity: 'Crude Oil',
    availableCapacityMbd: 1.8,
    currentAllocationMbd: 1.5,
    leadTimeDays: 14,
    risk: 'MEDIUM',
    reliability: 82,
    costIndex: 112
  },
  {
    id: 'sup-qatar-lng',
    supplier: 'QatarEnergy Ras Laffan',
    region: 'Middle East (Persian Gulf)',
    commodity: 'LNG',
    availableCapacityMbd: 3.2,
    currentAllocationMbd: 3.0,
    leadTimeDays: 20,
    risk: 'CRITICAL',
    reliability: 15,
    costIndex: 105
  },
  {
    id: 'sup-petrobras',
    supplier: 'Petrobras Atlantic Basin',
    region: 'South America / West Africa',
    commodity: 'Crude Oil',
    availableCapacityMbd: 2.1,
    currentAllocationMbd: 0.8,
    leadTimeDays: 10,
    risk: 'LOW',
    reliability: 95,
    costIndex: 135
  },
  {
    id: 'sup-chevron-usgc',
    supplier: 'Chevron US Gulf Coast Exports',
    region: 'North America (US Gulf)',
    commodity: 'Refined Fuel',
    availableCapacityMbd: 2.8,
    currentAllocationMbd: 1.1,
    leadTimeDays: 8,
    risk: 'LOW',
    reliability: 98,
    costIndex: 142
  },
  {
    id: 'sup-equinor',
    supplier: 'Equinor Johan Sverdrup',
    region: 'North Sea (Europe)',
    commodity: 'Crude Oil',
    availableCapacityMbd: 1.4,
    currentAllocationMbd: 0.9,
    leadTimeDays: 4,
    risk: 'LOW',
    reliability: 99,
    costIndex: 148
  }
];

export const MOCK_BUSINESS_RISKS: BusinessRisk[] = [
  {
    id: 'risk-delay',
    title: 'Severe Delivery Delays',
    severity: 'CRITICAL',
    metric: '+14.8 Days Avg',
    explanation: 'Rerouting via Cape of Good Hope adds 12-16 transit days, jeopardizing downstream refinery production schedules in Northwest Europe and East Asia.',
    affectedDivision: 'Global Refining Operations',
    trend: 'up'
  },
  {
    id: 'risk-cost',
    title: 'Surging Transportation & Freight Costs',
    severity: 'CRITICAL',
    metric: '+$48.5M Est. Impact',
    explanation: 'VLCC spot charter rates increased +140% while Cape bunker fuel costs add $650,000 per vessel voyage.',
    affectedDivision: 'Logistics & Chartering',
    trend: 'up'
  },
  {
    id: 'risk-inventory',
    title: 'Destination Terminal Inventory Shortage',
    severity: 'HIGH',
    metric: '21.4 Days Remaining',
    explanation: 'Rotterdam and Chiba storage buffers will hit minimum operating thresholds by Day 26 if no spot swaps are executed.',
    affectedDivision: 'Inventory & Storage',
    trend: 'down'
  },
  {
    id: 'risk-supplier',
    title: 'Single-Corridor Supplier Concentration',
    severity: 'HIGH',
    metric: '72.4% Gulf Dependence',
    explanation: '72% of active long-term crude contracts rely on Persian Gulf loading ports now choked by the Strait disruption.',
    affectedDivision: 'Procurement & Supply Chain',
    trend: 'stable'
  },
  {
    id: 'risk-market',
    title: 'Unhedged Commodity Market Exposure',
    severity: 'MEDIUM',
    metric: '$18.4/bbl Brent Premium',
    explanation: 'Spot prices surged sharply; unhedged volume exposure stands at 4.2M barrels across open orders.',
    affectedDivision: 'Trading & Financial Risk',
    trend: 'up'
  }
];

export const INITIAL_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'rec-1',
    priority: 'CRITICAL',
    title: 'Diversify Supply Allocation & Execute Spot Swaps',
    problem: 'Current demo scenario shows 72.4% excessive dependence on the blocked Strait of Hormuz supply corridor.',
    recommendedAction: 'Shift 35% of crude allocation from Ras Tanura to West Africa (Petrobras Atlantic) and US Gulf Coast sources.',
    expectedImpact: 'Reduces inventory failure probability by 78% and guarantees refinery baseline feed.',
    reason: 'Atlantic basin crude availability can bridge the 14-day transit gap with only +8% price premium.',
    status: 'Pending',
    savingsEstimate: 'Prevents $18M refinery shutdown penalties'
  },
  {
    id: 'rec-2',
    priority: 'HIGH',
    title: 'Activate Cape Rerouting Protocol for 6 VLCC Vessels',
    problem: '6 loaded VLCC tankers are currently idling in the Persian Gulf with rising demurrage costs ($85k/day).',
    recommendedAction: 'Issue immediate sailing instructions to proceed via Cape of Good Hope and secure bunkering slots at Durban/Cape Town.',
    expectedImpact: 'Secures delivery within 34 days vs indefinite delay in Gulf waters.',
    reason: 'Demurrage costs for 7-day waiting exceed extra fuel costs of Cape reroute.',
    status: 'Pending',
    savingsEstimate: '$2.1M demurrage savings'
  },
  {
    id: 'rec-3',
    priority: 'HIGH',
    title: 'Contract Capacity on Saudi East-West Pipeline (Abqaiq -> Yanbu)',
    problem: 'Refineries in Mediterranean require immediate light crude volumes before Cape vessels arrive.',
    recommendedAction: 'Nominate 400,000 bbl/d via East-West Pipeline to Red Sea terminal at Yanbu.',
    expectedImpact: 'Bypasses Strait of Hormuz completely, reducing transit delay from 16 days to 2 days.',
    reason: 'Pipeline capacity at Yanbu is currently at 65% with 1.2M bbl/d unallocated slot reserve.',
    status: 'Pending',
    savingsEstimate: 'Saves 12 transit days per cargo'
  },
  {
    id: 'rec-4',
    priority: 'MEDIUM',
    title: 'Lease Buffer Tankage at Rotterdam Hub Terminal',
    problem: 'Rotterdam commercial inventory expected to drop below safety stock of 15 days by Oct 18.',
    recommendedAction: 'Secure 1.5M bbl short-term storage lease at Vopak Rotterdam Terminal.',
    expectedImpact: 'Provides 12 additional days of operational buffer for European downstream clients.',
    reason: 'Ensures contractual SLA compliance during sustained corridor disruption.',
    status: 'Pending',
    savingsEstimate: 'Protects $45M client contracts'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    time: '10 mins ago',
    title: 'CRITICAL ROUTE ALERT',
    description: 'Strait of Hormuz transit status officially changed to CRITICAL (Blocked). 18 vessels exposed.',
    type: 'alert',
    read: false
  },
  {
    id: 'notif-2',
    time: '28 mins ago',
    title: 'AI Intelligence Updated',
    description: 'StraitShift Intelligence updated scenario matrix for 30-day disruption impact.',
    type: 'update',
    read: false
  },
  {
    id: 'notif-3',
    time: '1 hour ago',
    title: 'VLCC Reroute Suggested',
    description: 'Shipment SS-9041 (VLCC Arabian Titan) flagged for Cape reroute optimization.',
    type: 'action',
    read: true
  }
];

export const DEFAULT_SCENARIO_PARAMS: ScenarioParams = {
  durationDays: 30,
  oilDemandMbd: 14.5,
  lngDemandBcf: 8.2,
  inventoryDays: 24,
  altRouteCapacityPct: 70,
  bunkerPriceUSD: 680
};

export const generateScenarioResults = (params: ScenarioParams): ScenarioResults => {
  const mult = params.durationDays / 30;
  const gap = Number((3.8 * (1 + (params.oilDemandMbd - 14.5) * 0.08) * (1 - (params.altRouteCapacityPct - 70) * 0.01)).toFixed(1));
  const remainingInventory = Math.max(2, Math.round(params.inventoryDays - (params.durationDays * 0.65)));
  const cost = Math.round(48.5 * mult * (params.bunkerPriceUSD / 680));
  const delay = Number((14.8 * (1 + (90 - params.altRouteCapacityPct) * 0.005)).toFixed(1));
  const affectedCount = Math.min(42, Math.round(18 * mult));

  const trajectory = [];
  for (let i = 0; i <= params.durationDays; i += Math.max(1, Math.floor(params.durationDays / 6))) {
    const unmitigated = Math.max(0, Math.round(params.inventoryDays - (i * 0.75)));
    const mitigated = Math.max(8, Math.round(params.inventoryDays - (i * 0.35)));
    trajectory.push({
      day: i,
      stockWithoutAction: unmitigated,
      stockWithReroute: mitigated
    });
  }

  const supplyVsDemand = [
    { period: 'Week 1', demand: params.oilDemandMbd, currentSupply: Number((params.oilDemandMbd - gap * 0.6).toFixed(1)), optimizedSupply: Number((params.oilDemandMbd - 0.2).toFixed(1)) },
    { period: 'Week 2', demand: params.oilDemandMbd, currentSupply: Number((params.oilDemandMbd - gap * 0.85).toFixed(1)), optimizedSupply: Number((params.oilDemandMbd - 0.5).toFixed(1)) },
    { period: 'Week 3', demand: params.oilDemandMbd, currentSupply: Number((params.oilDemandMbd - gap * 1.1).toFixed(1)), optimizedSupply: Number((params.oilDemandMbd - 0.8).toFixed(1)) },
    { period: 'Week 4', demand: params.oilDemandMbd, currentSupply: Number((params.oilDemandMbd - gap * 1.25).toFixed(1)), optimizedSupply: Number((params.oilDemandMbd - 1.0).toFixed(1)) }
  ];

  const costBreakdown = [
    { category: 'Cape Bunker Fuel Surge', costMUSD: Math.round(cost * 0.42) },
    { category: 'VLCC Charter Spot Rate Increase', costMUSD: Math.round(cost * 0.28) },
    { category: 'Demurrage & Port Holding Fees', costMUSD: Math.round(cost * 0.18) },
    { category: 'Spot Premium for Atlantic Swaps', costMUSD: Math.round(cost * 0.12) }
  ];

  const routeDistribution = [
    { route: 'Strait of Hormuz (Blocked)', volumeMbd: 0, color: '#ef4444' },
    { route: 'Cape of Good Hope Reroute', volumeMbd: Number((gap * 0.45).toFixed(1)), color: '#06b6d4' },
    { route: 'East-West Saudi Pipeline', volumeMbd: Number((gap * 0.35).toFixed(1)), color: '#f59e0b' },
    { route: 'Atlantic Basin Swaps', volumeMbd: Number((gap * 0.20).toFixed(1)), color: '#10b981' }
  ];

  return {
    expectedSupplyGapMbd: gap,
    inventoryCoverageDays: remainingInventory,
    additionalCostUSD: cost,
    avgDelayDays: delay,
    affectedShipmentsCount: affectedCount,
    depletionTrajectory: trajectory,
    supplyVsDemand,
    costBreakdown,
    routeDistribution
  };
};
