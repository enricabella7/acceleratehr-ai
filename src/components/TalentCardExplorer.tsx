import { useState } from 'react';
import { Search, ChevronDown, Star, Sparkles, X } from 'lucide-react';
import { talentsData } from '../data/talentsData';
import { parseNaturalLanguageQuery, filterTalentsByCriteria, generateFilterSummary, FilterCriteria } from '../utils/aiFilter';
import { calculateConfidenceScores } from '../utils/calculateConfidence';
import { ConfidenceScore } from './ConfidenceScore';

interface TalentCardExplorerProps {
  onViewDetails: (talentId: string) => void;
  onNavigate: (page: 'explorer' | 'details') => void;
  onNavigateHome: () => void;
}

export function TalentCardExplorer({ onViewDetails, onNavigate, onNavigateHome }: TalentCardExplorerProps) {
  const [selectedTalent, setSelectedTalent] = useState(talentsData[0]);
  const [aiQuery, setAiQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterCriteria | null>(null);
  const [filteredTalents, setFilteredTalents] = useState(talentsData);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [confidenceScores, setConfidenceScores] = useState<Map<string, number>>(new Map());

  const exampleQueries = [
    "employees that studied telecom engineering and have more than 5 years of working experience",
    "engineers with Python skills in Mumbai",
    "5 star performers with MBA degree",
    "designers with more than 3 years experience",
    "finance professionals in Mumbai or Delhi",
    "employees with AWS or networking skills"
  ];

  const handleRowClick = (talent: typeof talentsData[0]) => {
    setSelectedTalent(talent);
  };

  const handleViewFullDetails = () => {
    onViewDetails(selectedTalent.id);
  };

  const handleAiSearch = () => {
    if (!aiQuery.trim()) {
      setFilteredTalents(talentsData);
      setActiveFilter(null);
      setConfidenceScores(new Map());
      return;
    }

    const criteria = parseNaturalLanguageQuery(aiQuery);
    const filtered = filterTalentsByCriteria(talentsData, criteria);
    const scores = calculateConfidenceScores(filtered, criteria);
    
    // Sort by confidence score (highest first)
    const sortedFiltered = [...filtered].sort((a, b) => {
      const scoreA = scores.get(a.id) || 0;
      const scoreB = scores.get(b.id) || 0;
      return scoreB - scoreA;
    });
    
    setFilteredTalents(sortedFiltered);
    setActiveFilter(criteria);
    setConfidenceScores(scores);
    setShowSuggestions(false);
    
    if (sortedFiltered.length > 0) {
      setSelectedTalent(sortedFiltered[0]);
    }
  };

  const handleClearFilter = () => {
    setAiQuery('');
    setFilteredTalents(talentsData);
    setActiveFilter(null);
    setConfidenceScores(new Map());
    setSelectedTalent(talentsData[0]);
  };

  const handleExampleClick = (example: string) => {
    setAiQuery(example);
    setShowSuggestions(false);
    // Auto-search when clicking example
    setTimeout(() => {
      const criteria = parseNaturalLanguageQuery(example);
      const filtered = filterTalentsByCriteria(talentsData, criteria);
      const scores = calculateConfidenceScores(filtered, criteria);
      
      const sortedFiltered = [...filtered].sort((a, b) => {
        const scoreA = scores.get(a.id) || 0;
        const scoreB = scores.get(b.id) || 0;
        return scoreB - scoreA;
      });
      
      setFilteredTalents(sortedFiltered);
      setActiveFilter(criteria);
      setConfidenceScores(scores);
      if (sortedFiltered.length > 0) {
        setSelectedTalent(sortedFiltered[0]);
      }
    }, 100);
  };

  const renderStars = (count: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-3 h-3 ${i < count ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-600 text-gray-600'}`} 
          />
        ))}
      </div>
    );
  };

  const filterSummary = activeFilter 
    ? generateFilterSummary(activeFilter, filteredTalents.length)
    : null;

  const isAiFilterActive = activeFilter !== null;

  return (
    <div className="min-h-screen bg-[#1a1d2e] text-white">
      {/* Header */}
      <header className="bg-[#252837] px-8 py-4 flex items-center justify-between border-b border-gray-700">
        <div className="text-2xl text-teal-400">synvert</div>
        <div>Talent Card</div>
        <div className="text-sm text-gray-400">
          <div>Mumbai</div>
          <div>Apr 15, 2025 15:02</div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-16 bg-[#0f1419] border-r border-gray-700 flex flex-col items-center py-8 gap-6">
          <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center text-teal-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Filters Row */}
          <div className="flex gap-4 mb-6">
            {/* Traditional Filters */}
            <div className="flex-1 bg-[#252837] p-4 rounded-lg">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Name</label>
                  <select className="w-full bg-[#1a1d2e] border border-gray-700 rounded px-3 py-2 text-sm">
                    <option>All</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Character Based</label>
                  <select className="w-full bg-[#1a1d2e] border border-gray-700 rounded px-3 py-2 text-sm">
                    <option>All</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Employment Type</label>
                  <select className="w-full bg-[#1a1d2e] border border-gray-700 rounded px-3 py-2 text-sm">
                    <option>All</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Fellowship</label>
                  <select className="w-full bg-[#1a1d2e] border border-gray-700 rounded px-3 py-2 text-sm">
                    <option>All</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Hometown</label>
                  <select className="w-full bg-[#1a1d2e] border border-gray-700 rounded px-3 py-2 text-sm">
                    <option>All</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Manager Name</label>
                  <select className="w-full bg-[#1a1d2e] border border-gray-700 rounded px-3 py-2 text-sm">
                    <option>All</option>
                  </select>
                </div>
              </div>
            </div>

            {/* AI Filter Search */}
            <div className="w-[420px] bg-gradient-to-br from-teal-500/10 to-purple-500/10 border border-teal-500/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-sm">Talent Search</h3>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full">
                  <Sparkles className="w-3 h-3 text-white" />
                  <span className="text-xs text-white">AI</span>
                </div>
              </div>
              
              <div className="relative">
                <div className="flex flex-col gap-2">
                  <div className="relative">
                    <input 
                      type="text" 
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      onFocus={() => setShowSuggestions(true)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAiSearch()}
                      placeholder="Try: 'telecom engineers with 5+ years'" 
                      className="w-full bg-[#0f1419] border border-teal-500/50 rounded-lg px-3 py-2 pr-8 text-sm placeholder:text-gray-500 focus:outline-none focus:border-teal-400"
                    />
                    {aiQuery && (
                      <button
                        onClick={handleClearFilter}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <button 
                    onClick={handleAiSearch}
                    className="w-full px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    Search
                  </button>
                </div>

                {/* Example Queries */}
                {showSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#151925] border border-gray-700 rounded-lg shadow-xl z-10 max-h-64 overflow-y-auto">
                    <div className="p-2 border-b border-gray-800">
                      <div className="text-xs text-gray-400">Try these:</div>
                    </div>
                    {exampleQueries.map((example, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleExampleClick(example)}
                        className="w-full text-left px-3 py-2 hover:bg-teal-500/10 text-xs text-gray-300 border-b border-gray-800 last:border-b-0 transition-colors"
                      >
                        <Sparkles className="w-3 h-3 inline mr-1 text-teal-400" />
                        {example}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Filter Summary */}
              {filterSummary && (
                <div className="mt-2">
                  <div className="px-2 py-1 bg-teal-500/20 text-teal-300 rounded text-xs flex items-center gap-2">
                    <span className="flex-1 truncate">{filterSummary}</span>
                    <button 
                      onClick={handleClearFilter}
                      className="hover:text-white flex-shrink-0"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-6">
            {/* Talent List */}
            <div className="flex-1">
              <div className="bg-[#151925] rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#0f1419]">
                      <tr>
                        {isAiFilterActive && <th className="px-4 py-3 text-left text-xs text-gray-400">Match</th>}
                        <th className="px-4 py-3 text-left text-xs text-gray-400">ID</th>
                        <th className="px-4 py-3 text-left text-xs text-gray-400">Name</th>
                        <th className="px-4 py-3 text-left text-xs text-gray-400">Job Title</th>
                        <th className="px-4 py-3 text-left text-xs text-gray-400">Proficiencies</th>
                        <th className="px-4 py-3 text-left text-xs text-gray-400">Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTalents.map((talent) => (
                        <tr 
                          key={talent.id}
                          onClick={() => handleRowClick(talent)}
                          className={`border-t border-gray-800 cursor-pointer transition-colors ${
                            selectedTalent.id === talent.id ? 'bg-teal-500/10' : 'hover:bg-gray-800/50'
                          }`}
                        >
                          {isAiFilterActive && (
                            <td className="px-4 py-3">
                              <ConfidenceScore score={confidenceScores.get(talent.id) || 0} size={36} />
                            </td>
                          )}
                          <td className="px-4 py-3">
                            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs">
                              {talent.id}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">{talent.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-400">{talent.jobTitle}</td>
                          <td className="px-4 py-3 text-sm text-gray-400">{talent.proficiency}</td>
                          <td className="px-4 py-3">
                            {renderStars(talent.performance)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-3 border-t border-gray-800 text-sm text-gray-400 text-center">
                  {filteredTalents.length === 0 ? 'No talents match your criteria' : 'No More Talent'}
                </div>
              </div>
            </div>

            {/* Talent Card Preview */}
            <div className="w-[480px] bg-[#151925] rounded-lg p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <h3 className="text-lg">Talent Card Preview</h3>
                <button 
                  onClick={handleViewFullDetails}
                  className="text-teal-400 hover:text-teal-300 text-sm"
                >
                  Details →
                </button>
              </div>

              <div className="space-y-4">
                {/* Profile */}
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                    <span>{selectedTalent.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base">{selectedTalent.name}</h4>
                    <p className="text-xs text-gray-400">{selectedTalent.jobTitle}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(selectedTalent.performance)}
                      <span className="text-xs text-gray-400 ml-1">
                        {selectedTalent.department} - {selectedTalent.experience}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#0f1419] rounded-lg p-2.5">
                    <div className="text-xs text-gray-400 mb-0.5">Employee ID</div>
                    <div className="text-sm">{selectedTalent.employeeId}</div>
                  </div>

                  <div className="bg-[#0f1419] rounded-lg p-2.5">
                    <div className="text-xs text-gray-400 mb-0.5">Checked Out</div>
                    <div className="text-sm">{selectedTalent.checkedOut}</div>
                  </div>

                  <div className="bg-[#0f1419] rounded-lg p-2.5 col-span-2">
                    <div className="text-xs text-gray-400 mb-0.5">Current Location</div>
                    <div className="text-sm">{selectedTalent.location}</div>
                  </div>

                  <div className="bg-[#0f1419] rounded-lg p-2.5 col-span-2">
                    <div className="text-xs text-gray-400 mb-0.5">Synfect Location (B)</div>
                    <div className="text-sm">{selectedTalent.synfectLocation}</div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-xs mb-1.5 text-gray-400">Skills</h4>
                  <div className="bg-[#0f1419] rounded-lg p-2.5">
                    <div className="text-sm">{selectedTalent.skills}</div>
                  </div>
                </div>

                {/* Grade History */}
                <div>
                  <h4 className="text-xs mb-1.5">Grade History</h4>
                  <div className="bg-[#0f1419] rounded-lg overflow-hidden">
                    <table className="w-full text-xs">
                      <thead className="bg-[#080b12]">
                        <tr>
                          <th className="px-2 py-1.5 text-left text-gray-400">Period</th>
                          <th className="px-2 py-1.5 text-left text-gray-400">Position</th>
                          <th className="px-2 py-1.5 text-left text-gray-400">Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedTalent.gradeHistory.slice(0, 2).map((grade, idx) => (
                          <tr key={idx} className="border-t border-gray-800">
                            <td className="px-2 py-1.5 text-gray-400 text-[10px]">{grade.period}</td>
                            <td className="px-2 py-1.5 text-gray-400 text-[10px]">{grade.position}</td>
                            <td className="px-2 py-1.5 text-[10px]">{grade.grade}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {selectedTalent.gradeHistory.length > 2 && (
                      <div className="text-center py-1 text-[10px] text-gray-500 bg-[#080b12] border-t border-gray-800">
                        +{selectedTalent.gradeHistory.length - 2} more
                      </div>
                    )}
                  </div>
                </div>

                {/* Manager Details */}
                <div>
                  <h4 className="text-xs mb-1.5">Manager Details</h4>
                  <div className="flex items-center gap-2.5 bg-[#0f1419] rounded-lg p-2.5">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-sm">
                      <span>{selectedTalent.manager.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="text-sm">{selectedTalent.manager.name}</div>
                      <div className="text-xs text-gray-400">{selectedTalent.manager.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#151925] border-t border-gray-800 px-8 py-4 flex items-center justify-center gap-8">
        <button 
          onClick={onNavigateHome}
          className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
        >
          Home
        </button>
        <button className="px-6 py-2 bg-teal-500/20 text-teal-400 rounded">
          Talent Card Explorer
        </button>
        <button 
          onClick={() => onNavigate('details')}
          className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
        >
          Talent Card Details
        </button>
      </nav>

      {/* Branding */}
      <div className="fixed bottom-6 right-6 text-xs text-gray-600">
        OBSERVATION DECK
      </div>
    </div>
  );
}