export type ViewMode = 
  | 'overview' 
  | 'map' 
  | 'shipments' 
  | 'routes' 
  | 'supply' 
  | 'scenario' 
  | 'recommendations' 
  | 'reports' 
  | 'architecture'
  | 'login'
  | 'register'
  | 'profile';

export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type CommodityType = 'Crude Oil' | 'LNG' | 'Refined Fuel' | 'Petrochemicals';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  division: string;
  avatar: string;
  apiKey: string;
  mfaEnabled: boolean;
  emailAlerts: boolean;
  smsAlerts: boolean;
}

export interface Shipment {
  id: string;
  vesselName: string;
  commodity: CommodityType;
  volume: string;
  volumeBarrels: number;
  origin: string;
  originPort: string;
  destination: string;
  destinationRegion: string;
  currentRoute: string;
  risk: RiskLevel;
  eta: string;
  originalEta: string;
  delayDays: number;
  costDelta: number;
  recommendedAction: string;
  status: 'In Transit' | 'Rerouted' | 'Holding' | 'Delivered';
  cargoValue: number;
  priority: 'Critical' | 'High' | 'Normal';
  coordinates: {
    current: [number, number];
    origin: [number, number];
    destination: [number, number];
  };
}

export interface RouteOption {
  id: string;
  name: string;
  code: string;
  description: string;
  distanceNM: number;
  transitTimeDays: number;
  relativeCostPerBbl: number;
  riskLevel: RiskLevel;
  capacityPct: number;
  co2PerKt: number;
  reliabilityScore: number;
  keyNodes: string[];
  status: 'BLOCKED' | 'AVAILABLE' | 'CONGESTED';
}

export interface SupplySource {
  id: string;
  supplier: string;
  region: string;
  commodity: CommodityType;
  availableCapacityMbd: number;
  currentAllocationMbd: number;
  leadTimeDays: number;
  risk: RiskLevel;
  reliability: number;
  costIndex: number;
}

export interface BusinessRisk {
  id: string;
  title: string;
  severity: RiskLevel;
  metric: string;
  explanation: string;
  affectedDivision: string;
  trend: 'up' | 'down' | 'stable';
}

export interface Recommendation {
  id: string;
  priority: RiskLevel;
  title: string;
  problem: string;
  recommendedAction: string;
  expectedImpact: string;
  reason: string;
  status: 'Pending' | 'Accepted' | 'Reviewing' | 'Dismissed';
  savingsEstimate: string;
}

export interface ScenarioParams {
  durationDays: 7 | 30 | 90;
  oilDemandMbd: number;
  lngDemandBcf: number;
  inventoryDays: number;
  altRouteCapacityPct: number;
  bunkerPriceUSD: number;
}

export interface ScenarioResults {
  expectedSupplyGapMbd: number;
  inventoryCoverageDays: number;
  additionalCostUSD: number;
  avgDelayDays: number;
  affectedShipmentsCount: number;
  depletionTrajectory: { day: number; stockWithoutAction: number; stockWithReroute: number }[];
  supplyVsDemand: { period: string; demand: number; currentSupply: number; optimizedSupply: number }[];
  costBreakdown: { category: string; costMUSD: number }[];
  routeDistribution: { route: string; volumeMbd: number; color: string }[];
}

export interface NotificationItem {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'alert' | 'update' | 'action';
  read: boolean;
}
