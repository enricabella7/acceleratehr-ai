import { X, Star } from 'lucide-react';

interface Candidate {
  id: number;
  name: string;
  jobTitle: string;
  readiness?: string;
  confidenceScore?: number;
  performance: string;
  age: number;
  gender: string;
  yearsInOrg: number;
  yearsInCurrentLevel: number;
  nationality: string;
  department: string;
  skills: string[];
  education: string;
  cognitiveScore: number;
  previousPositions: Array<{
    organization: string;
    position: string;
    years: number;
  }>;
  strengths: string[];
  developmentAreas: string[];
  isAIGenerated?: boolean;
}

interface CandidateComparisonModalProps {
  candidates: Candidate[];
  onClose: () => void;
}

export function CandidateComparisonModal({ candidates, onClose }: CandidateComparisonModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">
      <div className="bg-[#1f2139] rounded-lg max-w-7xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#1f2139] border-b border-gray-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl">Compare Candidates</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className={`grid gap-4 ${candidates.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {candidates.map((candidate, idx) => (
              <div key={candidate.id} className="bg-[#2a2d47] rounded-lg p-4">
                {/* Header */}
                <div className="text-center mb-4 pb-4 border-b border-gray-700">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-purple-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                    {candidate.name.charAt(0)}
                  </div>
                  <h3 className="mb-1">{candidate.name}</h3>
                  <div className="text-sm text-gray-400 mb-2">{candidate.jobTitle}</div>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {candidate.isAIGenerated && (
                      <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded text-xs flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        AI
                      </span>
                    )}
                    <span className="px-2 py-1 bg-teal-500 text-white rounded text-xs">
                      {candidate.performance}
                    </span>
                    {candidate.readiness && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                        {candidate.readiness}
                      </span>
                    )}
                  </div>
                </div>

                {/* Scores */}
                <div className="flex justify-center gap-6 mb-4 pb-4 border-b border-gray-700">
                  {candidate.confidenceScore && (
                    <div className="text-center">
                      <div className="text-xs text-gray-400 mb-2">AI Match</div>
                      <div className="relative">
                        <div className="w-14 h-14">
                          <svg className="transform -rotate-90" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="16" fill="none" stroke="#1f2139" strokeWidth="3" />
                            <circle
                              cx="18" cy="18" r="16" fill="none" stroke="#a855f7" strokeWidth="3"
                              strokeDasharray={`${candidate.confidenceScore} ${100 - candidate.confidenceScore}`}
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center text-sm text-purple-400">
                          {candidate.confidenceScore}%
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="text-center">
                    <div className="text-xs text-gray-400 mb-2">Cognitive</div>
                    <div className="relative">
                      <div className="w-14 h-14">
                        <svg className="transform -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="16" fill="none" stroke="#1f2139" strokeWidth="3" />
                          <circle
                            cx="18" cy="18" r="16" fill="none" stroke="#10b981" strokeWidth="3"
                            strokeDasharray={`${candidate.cognitiveScore} ${100 - candidate.cognitiveScore}`}
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center text-sm text-green-400">
                        {candidate.cognitiveScore}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4 pb-4 border-b border-gray-700">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Age</span>
                    <span>{candidate.age}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Gender</span>
                    <span>{candidate.gender}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Years in Org</span>
                    <span>{candidate.yearsInOrg}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Years in Level</span>
                    <span>{candidate.yearsInCurrentLevel}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Nationality</span>
                    <span>{candidate.nationality}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="text-xs text-gray-400 mb-2">Skills</div>
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.slice(0, 4).map((skill, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-teal-500/20 text-teal-400 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                    {candidate.skills.length > 4 && (
                      <span className="px-2 py-0.5 bg-gray-700 text-gray-400 rounded text-xs">
                        +{candidate.skills.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Education */}
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="text-xs text-gray-400 mb-2">Education</div>
                  <div className="text-xs">{candidate.education}</div>
                </div>

                {/* Strengths */}
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="text-xs text-gray-400 mb-2">Key Strengths</div>
                  <div className="space-y-1">
                    {candidate.strengths.slice(0, 3).map((strength, idx) => (
                      <div key={idx} className="text-xs text-green-400">• {strength}</div>
                    ))}
                  </div>
                </div>

                {/* Development Areas */}
                <div>
                  <div className="text-xs text-gray-400 mb-2">Development Areas</div>
                  <div className="space-y-1">
                    {candidate.developmentAreas.slice(0, 2).map((area, idx) => (
                      <div key={idx} className="text-xs text-amber-400">• {area}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
