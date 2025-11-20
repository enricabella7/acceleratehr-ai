import { useState } from 'react';
import { ChevronRight, ChevronDown, Sparkles, GitCompare } from 'lucide-react';
import { generateAISuccessors } from '../utils/aiSuccessionRecommendations';
import { CandidateComparisonModal } from './CandidateComparisonModal';

interface SuccessionPlanningPageProps {
  onNavigate: (page: 'home') => void;
}

interface Position {
  id: string;
  title: string;
  level: string;
  category: string;
}

interface Incumbent {
  name: string;
  performance: string;
  age: number;
  tenureStart: number;
  tenureEnd: number;
  image?: string;
}

export function SuccessionPlanningPage({ onNavigate }: SuccessionPlanningPageProps) {
  const [expandedSection, setExpandedSection] = useState<string>('critical');
  const [selectedPosition, setSelectedPosition] = useState<string>('undersecretary-a');
  const [aiSuccessors, setAiSuccessors] = useState<any[]>([]);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  const [comparisonCandidates, setComparisonCandidates] = useState<any[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [viewingCandidate, setViewingCandidate] = useState<any | null>(null);

  const criticalRoles: Position[] = [
    { id: 'undersecretary-a', title: 'Undersecretary A', level: 'Executive', category: 'critical' },
    { id: 'undersecretary-1', title: 'Undersecretary 1', level: 'Executive', category: 'critical' },
    { id: 'undersecretary-2', title: 'Undersecretary 2', level: 'Executive', category: 'critical' },
    { id: 'undersecretary-3', title: 'Undersecretary 3', level: 'Executive', category: 'critical' },
    { id: 'dg-facilities', title: 'Director General Facilities', level: 'Senior Leadership', category: 'critical' },
    { id: 'dg-support', title: 'Director General Support', level: 'Senior Leadership', category: 'critical' },
    { id: 'dg-central-ops', title: 'Director General Central Ops', level: 'Senior Leadership', category: 'critical' },
    { id: 'dg-procurement', title: 'Director General Procurement', level: 'Senior Leadership', category: 'critical' },
    { id: 'dg-medical', title: 'Director General Medical', level: 'Senior Leadership', category: 'critical' },
    { id: 'director-general-2', title: 'Director General 2', level: 'Senior Leadership', category: 'critical' },
    { id: 'director-general-3', title: 'Director General 3', level: 'Senior Leadership', category: 'critical' },
    { id: 'director-general-4', title: 'Director General 4', level: 'Senior Leadership', category: 'critical' }
  ];

  const incumbent: Incumbent = {
    name: 'Mohammed Al Hammadi Mohammed',
    performance: 'Exceeded',
    age: 52,
    tenureStart: 2021,
    tenureEnd: 2025
  };

  const successors = [
    { 
      id: 1, 
      name: 'Hana Farah', 
      jobTitle: 'SVP', 
      readiness: 'R2',
      performance: 'Achieved',
      age: 38,
      gender: 'Female',
      yearsInOrg: 8,
      yearsInCurrentLevel: 3,
      nationality: 'Emirati',
      department: 'Operations',
      skills: ['Leadership', 'Project Management', 'Strategic Planning', 'Change Management'],
      education: 'MBA, London Business School | Bachelor in Business Administration',
      cognitiveScore: 75,
      previousPositions: [
        { organization: 'Department of Energy', position: 'Director', years: 3 },
        { organization: 'Department of Energy', position: 'Senior Manager', years: 2 },
        { organization: 'Energy Solutions Inc', position: 'Manager', years: 2 }
      ],
      strengths: ['Strong leadership', 'Strategic thinking', 'Excellent stakeholder management', 'Team building'],
      developmentAreas: ['International exposure', 'Financial planning'],
      isAIGenerated: false
    },
    { 
      id: 2, 
      name: 'Dr Jalil Hussain', 
      jobTitle: 'Undersecretary 1', 
      readiness: 'R1',
      performance: 'Exceeded',
      age: 42,
      gender: 'Male',
      yearsInOrg: 12,
      yearsInCurrentLevel: 4,
      nationality: 'Emirati',
      department: 'Policy & Strategy',
      skills: ['Strategic Planning', 'Policy Development', 'Change Management', 'Leadership', 'Governance'],
      education: 'PhD in Public Administration, Cambridge | MBA, INSEAD',
      cognitiveScore: 82,
      previousPositions: [
        { organization: 'Department of Energy', position: 'Director General', years: 3 },
        { organization: 'Department of Energy', position: 'Director', years: 4 },
        { organization: 'Federal Government', position: 'Senior Policy Advisor', years: 3 }
      ],
      strengths: ['Exceptional analytical skills', 'Proven leadership', 'Deep policy expertise', 'Strategic vision'],
      developmentAreas: ['Operational experience', 'Budget management'],
      isAIGenerated: false
    },
    { 
      id: 3, 
      name: 'Fatima Al Hosani', 
      jobTitle: 'Undersecretary 1', 
      readiness: 'R2',
      performance: 'Exceeded',
      age: 47,
      gender: 'Female',
      yearsInOrg: 18,
      yearsInCurrentLevel: 8,
      nationality: 'Emirati',
      department: 'Operations',
      skills: ['Change Management', 'Strategic Planning', 'Leadership', 'Governance', 'Crisis Management'],
      education: 'Executive MBA, INSEAD | Bachelor in Engineering, MIT',
      cognitiveScore: 78,
      previousPositions: [
        { organization: 'Department of Energy', position: 'Director General', years: 5 },
        { organization: 'Department of Energy', position: 'Senior Director', years: 3 },
        { organization: 'Department of Energy', position: 'Director', years: 4 }
      ],
      strengths: ['Strong leadership', 'Strategic thinking', 'Extensive experience', 'Organizational transformation'],
      developmentAreas: ['International exposure', 'Digital transformation'],
      isAIGenerated: false
    }
  ];

  const competencies = [
    'Critical Leadership Competencies',
    'Critical Leadership Competency 1',
    'Skills and Behavioral Competency 1',
    'Critical Leadership Competency 2',
    'Proven Knowledge of Artificial Intelligence and Planning'
  ];

  const handleGenerateAI = () => {
    const aiCandidates = generateAISuccessors(selectedPosition);
    setAiSuccessors(aiCandidates);
    setShowAIRecommendations(true);
  };

  const handleToggleAI = () => {
    if (showAIRecommendations) {
      setShowAIRecommendations(false);
      // Clear AI candidates from comparison if any are selected
      setComparisonCandidates(comparisonCandidates.filter(c => !c.isAIGenerated));
      // If viewing an AI candidate, switch to first nominated successor
      if (viewingCandidate?.isAIGenerated) {
        setViewingCandidate(successors[0]);
      }
    } else {
      if (aiSuccessors.length === 0) {
        const aiCandidates = generateAISuccessors(selectedPosition);
        setAiSuccessors(aiCandidates);
      }
      setShowAIRecommendations(true);
    }
  };

  const handleSelectCandidate = (candidate: any) => {
    setViewingCandidate(candidate);
  };

  const handleToggleComparison = (e: React.ChangeEvent<HTMLInputElement>, candidate: any) => {
    e.stopPropagation();
    if (comparisonCandidates.find(c => c.id === candidate.id)) {
      setComparisonCandidates(comparisonCandidates.filter(c => c.id !== candidate.id));
    } else {
      if (comparisonCandidates.length < 3) {
        setComparisonCandidates([...comparisonCandidates, candidate]);
      }
    }
  };

  const handleCompare = () => {
    if (comparisonCandidates.length >= 2) {
      setShowComparison(true);
    }
  };

  const displayCandidate = viewingCandidate || successors[0];

  return (
    <div className="min-h-screen bg-[#1a1d2e] text-white flex flex-col">
      {/* Header */}
      <header className="bg-[#252837] px-6 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="text-xl text-teal-400">synvert</div>
        <div>Succession Planning</div>
        <div className="text-xs text-gray-400 text-right">
          <div>Refreshed</div>
          <div>Jan 27, 2025 10:01</div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-56 bg-[#252837] border-r border-gray-700 overflow-y-auto">
          <div className="p-3">
            {/* Filters */}
            <div className="mb-4">
              <label className="text-xs text-gray-400 mb-1 block">Department</label>
              <select className="w-full bg-[#1a1d2e] border border-gray-700 rounded px-2 py-1.5 text-xs">
                <option>Department of Energy</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="text-xs text-gray-400 mb-1 block">Entity</label>
              <select className="w-full bg-[#1a1d2e] border border-gray-700 rounded px-2 py-1.5 text-xs">
                <option>Entity 1</option>
              </select>
            </div>

            {/* Critical Roles */}
            <div>
              <button
                onClick={() => setExpandedSection(expandedSection === 'critical' ? '' : 'critical')}
                className="flex items-center justify-between w-full text-left py-1.5 text-xs"
              >
                <span>Critical Roles</span>
                {expandedSection === 'critical' ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
              </button>

              {expandedSection === 'critical' && (
                <div className="mt-1 space-y-0.5">
                  {criticalRoles.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => setSelectedPosition(role.id)}
                      className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors ${
                        selectedPosition === role.id
                          ? 'bg-teal-500/20 text-teal-400'
                          : 'hover:bg-[#2a2d47] text-gray-300'
                      }`}
                    >
                      {role.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden flex">
          {/* Left Section - Position, Incumbent, Successors */}
          <div className="flex-1 overflow-y-auto p-4 border-r border-gray-700">
            {/* Position Profile */}
            <div className="bg-[#252837] rounded-lg p-4 mb-4">
              <h2 className="text-xs mb-3">Position Profile</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="mb-3">
                    <div className="text-xs text-gray-400 mb-1">Position ID</div>
                    <div className="text-xs">1</div>
                  </div>

                  <div className="mb-3">
                    <div className="text-xs text-gray-400 mb-1">Position</div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs">Undersecretary A</span>
                      <span className="px-1.5 py-0.5 bg-teal-500 text-white rounded text-xs">Critical</span>
                    </div>
                    <div className="text-xs text-gray-400">Entity 1</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-400 mb-1">Critical Skills Points</div>
                  <div className="space-y-0.5">
                    {competencies.slice(0, 5).map((comp, idx) => (
                      <div key={idx} className="text-xs text-gray-300">{comp}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Incumbent Details */}
            <div className="bg-[#252837] rounded-lg p-4 mb-4">
              <h2 className="text-xs mb-3">Incumbent Details</h2>
              
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                  {incumbent.name.charAt(0)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-xs">{incumbent.name}</div>
                    <span className="px-1.5 py-0.5 bg-teal-500 text-white rounded text-xs">
                      {incumbent.performance}
                    </span>
                  </div>

                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>{incumbent.tenureStart}</span>
                      <span>{incumbent.tenureEnd}</span>
                    </div>
                    <div className="relative h-1.5 bg-[#1a1d2e] rounded-full">
                      <div 
                        className="absolute h-1.5 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"
                        style={{ width: '60%' }}
                      />
                      <div 
                        className="absolute w-2 h-2 bg-white rounded-full top-1/2 -translate-y-1/2 shadow-lg"
                        style={{ left: '60%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nominated Successors Table */}
            <div className="bg-[#252837] rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs">Nominated Successors</h2>
                <div className="flex items-center gap-2">
                  {comparisonCandidates.length >= 2 && (
                    <button
                      onClick={handleCompare}
                      className="px-2 py-1 bg-teal-500 hover:bg-teal-600 rounded text-xs flex items-center gap-1 transition-colors"
                    >
                      <GitCompare className="w-3 h-3" />
                      Compare ({comparisonCandidates.length})
                    </button>
                  )}
                  <button
                    onClick={handleToggleAI}
                    className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded text-xs flex items-center gap-1 transition-all"
                  >
                    <Sparkles className="w-3 h-3" />
                    {showAIRecommendations ? 'Hide AI Successors' : 'Generate AI Successors'}
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 text-xs text-gray-400 w-6"></th>
                      <th className="text-left py-2 text-xs text-gray-400">Name</th>
                      <th className="text-left py-2 text-xs text-gray-400">Job Title</th>
                      <th className="text-left py-2 text-xs text-gray-400">Readiness</th>
                      <th className="text-left py-2 text-xs text-gray-400">Match</th>
                    </tr>
                  </thead>
                  <tbody>
                    {successors.map((successor) => {
                      const isSelected = comparisonCandidates.find(c => c.id === successor.id);
                      const isViewing = viewingCandidate?.id === successor.id;
                      return (
                        <tr 
                          key={successor.id} 
                          onClick={() => handleSelectCandidate(successor)}
                          className={`border-b border-gray-800 cursor-pointer transition-colors ${
                            isViewing ? 'bg-teal-500/10' : 'hover:bg-[#2a2d47]'
                          }`}
                        >
                          <td className="py-2">
                            <input
                              type="checkbox"
                              checked={!!isSelected}
                              onChange={(e) => handleToggleComparison(e, successor)}
                              onClick={(e) => e.stopPropagation()}
                              className="w-3 h-3 rounded border-gray-600"
                              disabled={!isSelected && comparisonCandidates.length >= 3}
                            />
                          </td>
                          <td className="py-2 text-xs">{successor.name}</td>
                          <td className="py-2 text-xs">{successor.jobTitle}</td>
                          <td className="py-2">
                            <span className={`px-1.5 py-0.5 rounded text-xs ${
                              successor.readiness === 'R1' 
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-green-500/20 text-green-400'
                            }`}>
                              {successor.readiness}
                            </span>
                          </td>
                          <td className="py-2 text-xs text-gray-400">-</td>
                        </tr>
                      );
                    })}
                    
                    {showAIRecommendations && aiSuccessors.map((aiCandidate) => {
                      const isSelected = comparisonCandidates.find(c => c.id === aiCandidate.id);
                      const isViewing = viewingCandidate?.id === aiCandidate.id;
                      return (
                        <tr 
                          key={aiCandidate.id} 
                          onClick={() => handleSelectCandidate(aiCandidate)}
                          className={`border-b border-gray-800 cursor-pointer transition-colors ${
                            isViewing ? 'bg-purple-500/10' : 'bg-purple-500/5 hover:bg-purple-500/10'
                          }`}
                        >
                          <td className="py-2">
                            <input
                              type="checkbox"
                              checked={!!isSelected}
                              onChange={(e) => handleToggleComparison(e, aiCandidate)}
                              onClick={(e) => e.stopPropagation()}
                              className="w-3 h-3 rounded border-gray-600"
                              disabled={!isSelected && comparisonCandidates.length >= 3}
                            />
                          </td>
                          <td className="py-2">
                            <div className="flex items-center gap-2">
                              <span className="px-1.5 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded text-xs flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                AI
                              </span>
                              <span className="text-xs">{aiCandidate.name}</span>
                            </div>
                          </td>
                          <td className="py-2 text-xs">{aiCandidate.jobTitle}</td>
                          <td className="py-2">
                            <span className="px-1.5 py-0.5 bg-purple-500/20 text-purple-400 rounded text-xs">
                              Recommended
                            </span>
                          </td>
                          <td className="py-2">
                            <div className="relative w-8 h-8">
                              <svg className="transform -rotate-90" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="16" fill="none" stroke="#1f2139" strokeWidth="3" />
                                <circle
                                  cx="18" cy="18" r="16" fill="none" stroke="#a855f7" strokeWidth="3"
                                  strokeDasharray={`${aiCandidate.confidenceScore} ${100 - aiCandidate.confidenceScore}`}
                                  strokeLinecap="round"
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center text-xs text-purple-400">
                                {aiCandidate.confidenceScore}%
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 text-center text-xs text-gray-400">
                {showAIRecommendations ? `${successors.length} nominated + ${aiSuccessors.length} AI recommended` : `${successors.length} nominated successors`}
              </div>
            </div>
          </div>

          {/* Right Section - Full Height Candidate Profile */}
          <div className="w-[500px] bg-[#252837] p-4 overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs">Candidate Profile</h2>
              {displayCandidate.isAIGenerated && (
                <span className="px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded text-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI Recommended
                </span>
              )}
            </div>

            {/* Header with Avatar and Basic Info */}
            <div className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-purple-500 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                {displayCandidate.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-sm">{displayCandidate.name}</span>
                  <span className="px-2 py-0.5 bg-teal-500 text-white rounded text-xs">
                    {displayCandidate.performance}
                  </span>
                  {displayCandidate.readiness && (
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs">
                      {displayCandidate.readiness}
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-400 mb-0.5">{displayCandidate.jobTitle}</div>
                <div className="text-xs text-gray-400">{displayCandidate.department}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">
                  {displayCandidate.confidenceScore ? 'AI Match' : 'Cognitive'}
                </div>
                <div className="relative">
                  <div className="w-14 h-14">
                    <svg className="transform -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" stroke="#1a1d2e" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="16" fill="none" 
                        stroke={displayCandidate.confidenceScore ? "#a855f7" : "#10b981"} 
                        strokeWidth="3"
                        strokeDasharray={`${displayCandidate.confidenceScore || displayCandidate.cognitiveScore} ${100 - (displayCandidate.confidenceScore || displayCandidate.cognitiveScore)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className={`absolute inset-0 flex items-center justify-center text-sm ${displayCandidate.confidenceScore ? 'text-purple-400' : 'text-green-400'}`}>
                    {displayCandidate.confidenceScore ? `${displayCandidate.confidenceScore}%` : displayCandidate.cognitiveScore}
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="mb-4">
              <h3 className="text-xs text-gray-400 mb-2">Personal Information</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#1a1d2e] rounded p-2">
                  <div className="text-xs text-gray-400">Age</div>
                  <div className="text-xs">{displayCandidate.age}</div>
                </div>
                <div className="bg-[#1a1d2e] rounded p-2">
                  <div className="text-xs text-gray-400">Gender</div>
                  <div className="text-xs">{displayCandidate.gender}</div>
                </div>
                <div className="bg-[#1a1d2e] rounded p-2">
                  <div className="text-xs text-gray-400">Years in Org</div>
                  <div className="text-xs">{displayCandidate.yearsInOrg}</div>
                </div>
                <div className="bg-[#1a1d2e] rounded p-2">
                  <div className="text-xs text-gray-400">Years in Level</div>
                  <div className="text-xs">{displayCandidate.yearsInCurrentLevel}</div>
                </div>
                <div className="bg-[#1a1d2e] rounded p-2 col-span-2">
                  <div className="text-xs text-gray-400">Nationality</div>
                  <div className="text-xs">{displayCandidate.nationality}</div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <h3 className="text-xs text-gray-400 mb-2">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-1">
                {displayCandidate.skills.map((skill: string, idx: number) => (
                  <span key={idx} className="px-2 py-0.5 bg-teal-500/20 text-teal-400 rounded text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mb-4">
              <h3 className="text-xs text-gray-400 mb-2">Education</h3>
              <div className="bg-[#1a1d2e] rounded p-2">
                <div className="text-xs">{displayCandidate.education}</div>
              </div>
            </div>

            {/* Strengths */}
            <div className="mb-4">
              <h3 className="text-xs text-gray-400 mb-2">Key Strengths</h3>
              <div className="space-y-1">
                {displayCandidate.strengths.map((strength: string, idx: number) => (
                  <div key={idx} className="bg-green-500/10 border-l-2 border-green-500 rounded p-2">
                    <div className="text-xs text-green-400">{strength}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Development Areas */}
            <div className="mb-4">
              <h3 className="text-xs text-gray-400 mb-2">Development Areas</h3>
              <div className="space-y-1">
                {displayCandidate.developmentAreas.map((area: string, idx: number) => (
                  <div key={idx} className="bg-amber-500/10 border-l-2 border-amber-500 rounded p-2">
                    <div className="text-xs text-amber-400">{area}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Previous Positions */}
            <div className="flex-1">
              <h3 className="text-xs text-gray-400 mb-2">Previous Positions</h3>
              <div className="space-y-2">
                {displayCandidate.previousPositions.map((pos: any, idx: number) => (
                  <div key={idx} className="bg-[#1a1d2e] rounded p-2">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="text-xs">{pos.position}</div>
                      <div className="text-xs text-gray-400">{pos.years} years</div>
                    </div>
                    <div className="text-xs text-gray-400">{pos.organization}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-[#252837] border-t border-gray-700 px-6 py-2 flex items-center justify-center gap-6">
        <button 
          onClick={() => onNavigate('home')}
          className="px-4 py-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
          Home
        </button>
        <button className="px-4 py-1.5 text-xs text-gray-400 hover:text-white transition-colors">
          Executive Summary
        </button>
        <button className="px-4 py-1.5 text-xs bg-purple-500/20 text-purple-400 rounded">
          Profile Details
        </button>
      </nav>

      {/* Branding */}
      <div className="fixed bottom-3 right-4 text-xs text-gray-600">
        OBSERVATION DECK
      </div>

      {/* Comparison Modal */}
      {showComparison && (
        <CandidateComparisonModal
          candidates={comparisonCandidates}
          onClose={() => setShowComparison(false)}
        />
      )}
    </div>
  );
}