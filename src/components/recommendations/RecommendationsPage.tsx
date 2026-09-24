import { 
  CheckSquare, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import type { Recommendation } from '../../types/straitshift';

interface RecommendationsPageProps {
  recommendations: Recommendation[];
  onUpdateStatus: (id: string, newStatus: 'Accepted' | 'Reviewing' | 'Dismissed') => void;
}

export const RecommendationsPage: React.FC<RecommendationsPageProps> = ({
  recommendations,
  onUpdateStatus
}) => {
  const pendingCount = recommendations.filter(r => r.status === 'Pending').length;
  const acceptedCount = recommendations.filter(r => r.status === 'Accepted').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <CheckSquare className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-slate-100">Action Center & AI Recommendations</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Prioritized business decision directives to minimize Strait disruption losses.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-xl border border-slate-700">
            Pending: <span className="font-bold text-amber-400">{pendingCount}</span>
          </div>
          <div className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-xl border border-slate-700">
            Accepted: <span className="font-bold text-emerald-400">{acceptedCount}</span>
          </div>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {recommendations.map(rec => {
          return (
            <div 
              key={rec.id}
              className={`bg-slate-900 border rounded-2xl p-5 flex flex-col justify-between shadow-xl transition-all ${
                rec.status === 'Accepted'
                  ? 'border-emerald-500/40 bg-gradient-to-b from-emerald-950/10 to-slate-900'
                  : rec.status === 'Dismissed'
                  ? 'border-slate-800 opacity-60'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                {/* Priority & Status */}
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                    rec.priority === 'CRITICAL' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                    rec.priority === 'HIGH' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                    'bg-slate-800 text-slate-300 border-slate-700'
                  }`}>
                    {rec.priority} PRIORITY
                  </span>

                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded ${
                    rec.status === 'Accepted' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    rec.status === 'Reviewing' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    rec.status === 'Dismissed' ? 'bg-slate-800 text-slate-400' :
                    'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                  }`}>
                    Status: {rec.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-100">{rec.title}</h3>

                {/* Problem Statement */}
                <div className="text-xs text-slate-400 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Problem Context:</span>
                  <p className="leading-relaxed bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    {rec.problem}
                  </p>
                </div>

                {/* Recommended Action */}
                <div className="text-xs space-y-1">
                  <span className="text-[10px] uppercase font-bold text-cyan-400 block flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Recommended Action:
                  </span>
                  <p className="leading-relaxed text-cyan-200 font-semibold bg-cyan-500/10 p-2.5 rounded-lg border border-cyan-500/20">
                    {rec.recommendedAction}
                  </p>
                </div>

                {/* Expected Impact & Reason */}
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-400 font-bold block text-[10px]">Expected Impact:</span>
                    <span className="text-emerald-400 font-medium">{rec.expectedImpact}</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-400 font-bold block text-[10px]">Savings Estimate:</span>
                    <span className="text-slate-200 font-mono font-bold">{rec.savingsEstimate}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center space-x-2">
                <button
                  onClick={() => onUpdateStatus(rec.id, 'Accepted')}
                  disabled={rec.status === 'Accepted'}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 ${
                    rec.status === 'Accepted'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{rec.status === 'Accepted' ? 'Accepted' : 'Accept Action'}</span>
                </button>

                <button
                  onClick={() => onUpdateStatus(rec.id, 'Reviewing')}
                  className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
                >
                  Review
                </button>

                <button
                  onClick={() => onUpdateStatus(rec.id, 'Dismissed')}
                  className="py-2 px-3 bg-slate-800 hover:bg-red-950/40 text-slate-400 hover:text-red-400 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
