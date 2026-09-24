import { useState } from 'react';
import confetti from 'canvas-confetti';
import type { 
  ViewMode, 
  Shipment, 
  Recommendation, 
  NotificationItem,
  UserProfile 
} from './types/straitshift';
import { 
  INITIAL_SHIPMENTS, 
  MOCK_ROUTES, 
  MOCK_SUPPLY_SOURCES, 
  MOCK_BUSINESS_RISKS, 
  INITIAL_RECOMMENDATIONS, 
  INITIAL_NOTIFICATIONS 
} from './data/mockData';

// Layout
import { TopBar } from './components/layout/TopBar';
import { Sidebar } from './components/layout/Sidebar';

// Pages
import { OverviewPage } from './components/dashboard/OverviewPage';
import { GlobalEnergyMap } from './components/map/GlobalEnergyMap';
import { ShipmentsPage } from './components/shipments/ShipmentsPage';
import { ShipmentDetailDrawer } from './components/shipments/ShipmentDetailDrawer';
import { AlternativeRoutesPage } from './components/routes/AlternativeRoutesPage';
import { SupplySourcesPage } from './components/supply/SupplySourcesPage';
import { ScenarioPlannerPage } from './components/scenario/ScenarioPlannerPage';
import { RecommendationsPage } from './components/recommendations/RecommendationsPage';
import { ReportsPage } from './components/reports/ReportsPage';
import { ArchitectureModal } from './components/architecture/ArchitectureModal';
import { GuidedTourModal } from './components/GuidedTourModal';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { ProfilePage } from './components/profile/ProfilePage';
import { DemoVideoModal } from './components/video/DemoVideoModal';
import { CheckCircle2 } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('overview');
  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>(INITIAL_RECOMMENDATIONS);
  const [notifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  
  // User & Auth State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>({
    id: 'USR-8042',
    name: 'Cmdr. Marcus Vance',
    email: 'm.vance@globalenergy.com',
    company: 'Global Energy Operations Corp',
    role: 'VP Supply Chain & Risk Strategy',
    division: 'Maritime Logistics & Energy Continuity',
    avatar: 'MV',
    apiKey: 'sk_live_straitshift_89f0a214b7',
    mfaEnabled: true,
    emailAlerts: true,
    smsAlerts: true
  });
  
  // Modals & Tour
  const [isArchitectureOpen, setIsArchitectureOpen] = useState<boolean>(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const [tourStep, setTourStep] = useState<number>(1);
  
  // Toast Alert
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Handlers
  const handleExecuteReroute = (shipmentId: string) => {
    setShipments(prev => prev.map(s => {
      if (s.id === shipmentId) {
        return {
          ...s,
          status: 'Rerouted',
          currentRoute: 'Cape of Good Hope (Rerouted)',
          risk: 'MEDIUM',
          recommendedAction: 'Reroute Order Active — Sailing via Cape'
        };
      }
      return s;
    }));

    if (selectedShipment && selectedShipment.id === shipmentId) {
      setSelectedShipment(prev => prev ? {
        ...prev,
        status: 'Rerouted',
        currentRoute: 'Cape of Good Hope (Rerouted)',
        risk: 'MEDIUM'
      } : null);
    }

    showToast(`Reroute order executed for ${shipmentId}. Sailing via Cape of Good Hope.`);
  };

  const handleUpdateRecommendationStatus = (id: string, newStatus: 'Accepted' | 'Reviewing' | 'Dismissed') => {
    setRecommendations(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    showToast(`Recommendation "${id}" status set to ${newStatus}.`);
  };

  const handleGenerateAIPlan = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    showToast('StraitShift Intelligence generated Response Plan #4. 35% spot shift active.');
    setCurrentView('scenario');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Signed out of StraitShift Session.');
  };

  const pendingRecCount = recommendations.filter(r => r.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Bar */}
      <TopBar
        currentView={currentView}
        onNavigate={setCurrentView}
        notifications={notifications}
        user={currentUser}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        onOpenVideoModal={() => setIsVideoModalOpen(true)}
        onStartTour={() => {
          setTourStep(1);
          setIsTourOpen(true);
          setCurrentView('overview');
        }}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar
          currentView={currentView}
          onNavigate={setCurrentView}
          pendingRecCount={pendingRecCount}
        />

        {/* Dynamic Page Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">
          {currentView === 'overview' && (
            <OverviewPage
              shipments={shipments}
              risks={MOCK_BUSINESS_RISKS}
              onNavigate={setCurrentView}
              onSelectShipment={(s) => setSelectedShipment(s)}
              onRunSimulation={() => setCurrentView('scenario')}
              onGenerateAIPlan={handleGenerateAIPlan}
              onOpenVideoModal={() => setIsVideoModalOpen(true)}
            />
          )}

          {currentView === 'map' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <div>
                  <h1 className="text-xl font-bold text-slate-100">Global Energy Flow & Maritime Corridor Map</h1>
                  <p className="text-xs text-slate-400 mt-1">Full-screen interactive routing control center for Strait of Hormuz disruption monitoring.</p>
                </div>
              </div>
              <GlobalEnergyMap 
                shipments={shipments}
                onSelectShipment={(s) => setSelectedShipment(s)}
                compact={false}
              />
            </div>
          )}

          {currentView === 'shipments' && (
            <ShipmentsPage
              shipments={shipments}
              onSelectShipment={(s) => setSelectedShipment(s)}
              onExecuteReroute={handleExecuteReroute}
            />
          )}

          {currentView === 'routes' && (
            <AlternativeRoutesPage routes={MOCK_ROUTES} />
          )}

          {currentView === 'supply' && (
            <SupplySourcesPage sources={MOCK_SUPPLY_SOURCES} />
          )}

          {currentView === 'scenario' && (
            <ScenarioPlannerPage
              onNavigateToReport={() => setCurrentView('reports')}
            />
          )}

          {currentView === 'recommendations' && (
            <RecommendationsPage
              recommendations={recommendations}
              onUpdateStatus={handleUpdateRecommendationStatus}
            />
          )}

          {currentView === 'reports' && (
            <ReportsPage shipments={shipments} />
          )}

          {currentView === 'architecture' && (
            <div className="space-y-4">
              <button
                onClick={() => setIsArchitectureOpen(true)}
                className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl"
              >
                Open Architecture Modal
              </button>
              <ArchitectureModal
                isOpen={true}
                onClose={() => setCurrentView('overview')}
              />
            </div>
          )}

          {currentView === 'login' && (
            <LoginPage
              onNavigate={setCurrentView}
              onLoginSuccess={(u) => {
                setCurrentUser(u);
                showToast(`Welcome back, ${u.name}`);
              }}
            />
          )}

          {currentView === 'register' && (
            <RegisterPage
              onNavigate={setCurrentView}
              onRegisterSuccess={(u) => {
                setCurrentUser(u);
                showToast(`Corporate Account created for ${u.company}`);
              }}
            />
          )}

          {currentView === 'profile' && currentUser && (
            <ProfilePage
              user={currentUser}
              onUpdateUser={(updated) => {
                setCurrentUser(updated);
                showToast('Executive profile updated.');
              }}
              onLogout={handleLogout}
              onNavigate={setCurrentView}
            />
          )}

          {currentView === 'profile' && !currentUser && (
            <LoginPage
              onNavigate={setCurrentView}
              onLoginSuccess={(u) => {
                setCurrentUser(u);
                showToast(`Welcome back, ${u.name}`);
              }}
            />
          )}
        </main>
      </div>

      {/* Shipment Detail Drawer */}
      <ShipmentDetailDrawer
        shipment={selectedShipment}
        onClose={() => setSelectedShipment(null)}
        onExecuteReroute={handleExecuteReroute}
      />

      {/* Architecture Modal */}
      <ArchitectureModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />

      {/* In-App Demo Video Modal */}
      <DemoVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      {/* Guided Tour Assistant */}
      <GuidedTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        currentStep={tourStep}
        onStepChange={setTourStep}
        onNavigate={setCurrentView}
        onSelectSampleShipment={() => setSelectedShipment(shipments[0])}
      />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900 border border-cyan-500/50 p-4 rounded-xl shadow-2xl flex items-center space-x-3 text-xs text-slate-100 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;
