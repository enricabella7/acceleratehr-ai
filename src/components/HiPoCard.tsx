import { Sparkles, Star, TrendingUp, Award, Target } from 'lucide-react';
import { HiPoAssessment } from '../utils/aiInsights';

interface HiPoCardProps {
  assessment: HiPoAssessment;
}

export function HiPoCard({ assessment }: HiPoCardProps) {
  return (
    <div className="bg-[#151925] rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-teal-400" />
          <h3 className="text-sm">HiPo Detection</h3>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full">
          <Sparkles className="w-3 h-3 text-white" />
          <span className="text-xs text-white">AI</span>
        </div>
      </div>

      {/* HiPo Status */}
      <div className={`${assessment.isHiPo ? 'bg-green-500/20 border-green-500/50' : 'bg-gray-700/20 border-gray-600/50'} border rounded-lg p-3 mb-3`}>
        <div className="flex items-center gap-2 mb-2">
          {assessment.isHiPo ? (
            <>
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="w-4 h-4 text-white fill-white" />
              </div>
              <div className="min-w-0">
                <div className="text-sm text-green-400">High Potential</div>
                <div className="text-[10px] text-gray-400">Exceptional promise</div>
              </div>
            </>
          ) : (
            <>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="w-4 h-4 text-gray-500" />
              </div>
              <div className="min-w-0">
                <div className="text-sm text-gray-400">Standard</div>
                <div className="text-[10px] text-gray-400">Solid performer</div>
              </div>
            </>
          )}
        </div>

        {/* Score Display */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="bg-[#0f1419] rounded p-2">
            <div className="text-[10px] text-gray-400 mb-0.5">Score</div>
            <div className={`text-sm ${assessment.isHiPo ? 'text-green-400' : 'text-gray-400'}`}>
              {assessment.score}/100
            </div>
          </div>
          <div className="bg-[#0f1419] rounded p-2">
            <div className="text-[10px] text-gray-400 mb-0.5">Confidence</div>
            <div className={`text-sm ${assessment.isHiPo ? 'text-green-400' : 'text-gray-400'}`}>
              {assessment.confidence}%
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
          <div 
            className={`h-full ${assessment.isHiPo ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gray-600'} transition-all duration-500`}
            style={{ width: `${assessment.score}%` }}
          />
        </div>
        <div className="text-[10px] text-gray-400 mt-1">
          {assessment.isHiPo ? 'Above threshold (60+)' : 'Below threshold'}
        </div>
      </div>

      {/* Strengths */}
      {assessment.strengths.length > 0 && (
        <div className="mb-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <h4 className="text-xs text-gray-400">Strengths</h4>
          </div>
          <div className="space-y-1">
            {assessment.strengths.slice(0, 2).map((strength, idx) => (
              <div 
                key={idx}
                className="bg-emerald-500/10 border border-emerald-500/30 rounded p-1.5 flex items-center gap-1.5"
              >
                <div className="w-1 h-1 bg-emerald-400 rounded-full flex-shrink-0" />
                <div className="text-[10px] text-emerald-300 truncate">{strength}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Development Areas */}
      {assessment.areas.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Target className="w-3 h-3 text-amber-400" />
            <h4 className="text-xs text-gray-400">Development</h4>
          </div>
          <div className="space-y-1">
            {assessment.areas.slice(0, 2).map((area, idx) => (
              <div 
                key={idx}
                className="bg-amber-500/10 border border-amber-500/30 rounded p-1.5 flex items-center gap-1.5"
              >
                <div className="w-1 h-1 bg-amber-400 rounded-full flex-shrink-0" />
                <div className="text-[10px] text-amber-300 truncate">{area}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}