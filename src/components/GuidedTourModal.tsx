import { 
  ChevronRight, 
  ChevronLeft, 
  X
} from 'lucide-react';
import type { ViewMode } from '../types/straitshift';

interface GuidedTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStep: number;
  onStepChange: (step: number) => void;
  onNavigate: (view: ViewMode) => void;
  onSelectSampleShipment: () => void;
}

export const GuidedTourModal: React.FC<GuidedTourModalProps> = ({
  isOpen,
  onClose,
  currentStep,
  onStepChange,
  onNavigate,
  onSelectSampleShipment
}) => {
  if (!isOpen) return null;

  const steps = [
    {
      step: 1,
      title: 'Step 1: Executive Dashboard',
      targetView: 'overview' as ViewMode,
      desc: 'Start at the Executive Overview to understand the Strait of Hormuz closure status, total volume exposed (14.2M bbls), and top business risks.',
      actionText: 'View Dashboard Metrics'
    },
    {
      step: 2,
      title: 'Step 2: Disruption Map Visualization',
      targetView: 'map' as ViewMode,
      desc: 'Examine the Global Energy Flow Map to see the red blocked Strait of Hormuz, the cyan Cape of Good Hope reroute, and active vessel markers.',
      actionText: 'Open Interactive Map'
    },
    {
      step: 3,
      title: 'Step 3: Affected Shipment Deep Dive',
      targetView: 'shipments' as ViewMode,
      desc: 'Inspect the exposed cargo list. Open VLCC Arabian Titan (SS-9041) to analyze delay (+14 days), freight cost surge (+$3.2M), and route options.',
      actionText: 'Inspect Cargo Table'
    },
    {
      step: 4,
      title: 'Step 4: Alternative Route Comparison',
      targetView: 'routes' as ViewMode,
      desc: 'Compare the Cape of Good Hope bypass against the Saudi East-West Landbridge and Atlantic spot swaps across transit time, cost/bbl, and CO2 emissions.',
      actionText: 'Compare Corridors'
    },
    {
      step: 5,
      title: 'Step 5: 30-Day Scenario Simulation',
      targetView: 'scenario' as ViewMode,
      desc: 'Launch the Scenario Planner to model a 30-day disruption. See expected supply gaps, inventory depletion curves, and cost impact charts.',
      actionText: 'Run Scenario Simulation'
    },
    {
      step: 6,
      title: 'Step 6: AI Response Plan & Recommendations',
      targetView: 'recommendations' as ViewMode,
      desc: 'Review StraitShift Intelligence recommendations. Accept high-priority supply diversification actions to update the control tower metrics.',
      actionText: 'Review Action Center'
    },
    {
      step: 7,
      title: 'Step 7: Executive Board Report',
      targetView: 'reports' as ViewMode,
      desc: 'Generate a board-ready Executive Continuity Brief complete with audit tables, quantitative summaries, and printable PDF export.',
      actionText: 'Generate Executive Report'
    }
  ];

  const activeStepObj = steps[currentStep - 1] || steps[0];

  const handleNext = () => {
    if (currentStep < steps.length) {
      const nextStep = currentStep + 1;
      onStepChange(nextStep);
      const nextTargetView = steps[nextStep - 1].targetView;
      onNavigate(nextTargetView);
      if (nextStep === 3) {
        onSelectSampleShipment();
      }
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      onStepChange(prevStep);
      onNavigate(steps[prevStep - 1].targetView);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full p-4">
      <div className="bg-slate-900 border-2 border-cyan-500 rounded-2xl p-5 shadow-2xl space-y-4 backdrop-blur-xl relative">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-2">
          <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">
            {currentStep}
          </span>
          <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
            Platform Demo Walkthrough ({currentStep} of {steps.length})
          </span>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-100">{activeStepObj.title}</h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">{activeStepObj.desc}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 ${
              currentStep === 1 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev</span>
          </button>

          <button
            onClick={handleNext}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-cyan-500/25 transition-all flex items-center space-x-1.5"
          >
            <span>{currentStep === steps.length ? 'Finish Tour' : 'Next Step'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
