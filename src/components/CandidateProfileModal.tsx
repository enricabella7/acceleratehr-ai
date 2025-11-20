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
}

interface CandidateProfileModalProps {
  candidate: Candidate;
  onClose: () => void;
  isAIGenerated?: boolean;
}

export function CandidateProfileModal({ candidate, onClose, isAIGenerated }: CandidateProfileModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">
      <div className="bg-[#1f2139] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#1f2139] border-b border-gray-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl">Candidate Profile</h2>
            {isAIGenerated && (
              <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                AI Recommended
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header Section */}
          <div className="flex items-start gap-6 mb-6 pb-6 border-b border-gray-700">
            <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-purple-500 rounded-full flex items-center justify-center text-3xl">
              {candidate.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl">{candidate.name}</h3>
                <span className="px-3 py-1 bg-teal-500 text-white rounded text-sm">
                  {candidate.performance}
                </span>
                {candidate.readiness && (
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                    {candidate.readiness}
                  </span>
                )}
              </div>
              <div className="text-gray-400 mb-1">{candidate.jobTitle}</div>
              <div className="text-sm text-gray-400">{candidate.department}</div>
            </div>
            
            {/* Scores */}
            <div className="flex gap-4">
              {isAIGenerated && candidate.confidenceScore && (
                <div className="text-center">
                  <div className="text-xs text-gray-400 mb-2">AI Match</div>
                  <div className="relative">
                    <div className="w-16 h-16">
                      <svg className="transform -rotate-90" viewBox="0 0 36 36">
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          stroke="#2a2d47"
                          strokeWidth="3"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          stroke="#a855f7"
                          strokeWidth="3"
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
                  <div className="w-16 h-16">
                    <svg className="transform -rotate-90" viewBox="0 0 36 36">
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke="#2a2d47"
                        strokeWidth="3"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
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
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm text-gray-400 mb-3">Personal Information</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#2a2d47] rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">Age</div>
                    <div className="text-sm">{candidate.age}</div>
                  </div>
                  <div className="bg-[#2a2d47] rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">Gender</div>
                    <div className="text-sm">{candidate.gender}</div>
                  </div>
                  <div className="bg-[#2a2d47] rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">Years in Org</div>
                    <div className="text-sm">{candidate.yearsInOrg}</div>
                  </div>
                  <div className="bg-[#2a2d47] rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">Years in Level</div>
                    <div className="text-sm">{candidate.yearsInCurrentLevel}</div>
                  </div>
                  <div className="bg-[#2a2d47] rounded-lg p-3 col-span-2">
                    <div className="text-xs text-gray-400 mb-1">Nationality</div>
                    <div className="text-sm">{candidate.nationality}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm text-gray-400 mb-3">Skills & Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm text-gray-400 mb-3">Education</h4>
                <div className="bg-[#2a2d47] rounded-lg p-3">
                  <div className="text-sm">{candidate.education}</div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm text-gray-400 mb-3">Key Strengths</h4>
                <div className="space-y-2">
                  {candidate.strengths.map((strength, idx) => (
                    <div key={idx} className="bg-green-500/10 border-l-2 border-green-500 rounded p-3">
                      <div className="text-xs text-green-400">{strength}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm text-gray-400 mb-3">Development Areas</h4>
                <div className="space-y-2">
                  {candidate.developmentAreas.map((area, idx) => (
                    <div key={idx} className="bg-amber-500/10 border-l-2 border-amber-500 rounded p-3">
                      <div className="text-xs text-amber-400">{area}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm text-gray-400 mb-3">Previous Positions</h4>
                <div className="space-y-2">
                  {candidate.previousPositions.map((pos, idx) => (
                    <div key={idx} className="bg-[#2a2d47] rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm">{pos.position}</div>
                        <div className="text-xs text-gray-400">{pos.years} years</div>
                      </div>
                      <div className="text-xs text-gray-400">{pos.organization}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
