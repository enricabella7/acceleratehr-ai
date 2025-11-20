import { Sparkles, TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';
import { FlightRiskAssessment } from '../utils/aiInsights';

interface FlightRiskCardProps {
  assessment: FlightRiskAssessment;
}

export function FlightRiskCard({ assessment }: FlightRiskCardProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/50' };
      case 'medium': return { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/50' };
      case 'high': return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/50' };
      default: return { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500/50' };
    }
  };

  const colors = getRiskColor(assessment.level);

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive': return <TrendingDown className="w-3 h-3 text-emerald-400" />;
      case 'negative': return <TrendingUp className="w-3 h-3 text-red-400" />;
      default: return <Minus className="w-3 h-3 text-gray-400" />;
    }
  };

  return (
    <div className="bg-[#151925] rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-teal-400" />
          <h3 className="text-sm">Flight Risk</h3>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full">
          <Sparkles className="w-3 h-3 text-white" />
          <span className="text-xs text-white">AI</span>
        </div>
      </div>

      {/* Risk Level Display */}
      <div className={`${colors.bg} ${colors.border} border rounded-lg p-3 mb-3`}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-[10px] text-gray-400 mb-0.5">Risk Level</div>
            <div className={`text-lg uppercase ${colors.text}`}>
              {assessment.level}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-gray-400 mb-0.5">Score</div>
            <div className={`text-lg ${colors.text}`}>
              {assessment.percentage}%
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
          <div 
            className={`h-full ${assessment.level === 'low' ? 'bg-emerald-500' : assessment.level === 'medium' ? 'bg-amber-500' : 'bg-red-500'} transition-all duration-500`}
            style={{ width: `${assessment.percentage}%` }}
          />
        </div>

        <div className="text-[10px] text-gray-400 mt-1.5">
          Confidence: {assessment.confidence}%
        </div>
      </div>

      {/* Key Factors */}
      <div>
        <h4 className="text-xs mb-2 text-gray-400">Key Factors</h4>
        <div className="space-y-1.5">
          {assessment.factors.slice(0, 3).map((factor, idx) => (
            <div 
              key={idx}
              className="bg-[#0f1419] rounded p-2 flex items-start gap-2"
            >
              <div className="mt-0.5">
                {getImpactIcon(factor.impact)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs truncate">{factor.name}</div>
                <div className="text-[10px] text-gray-400 truncate">{factor.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}