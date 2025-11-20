import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { TalentCardExplorer } from './components/TalentCardExplorer';
import { TalentCardDetails } from './components/TalentCardDetails';
import { AttritionPage } from './components/AttritionPage';
import { SuccessionPlanningPage } from './components/SuccessionPlanningPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'explorer' | 'details' | 'attrition' | 'succession'>('home');
  const [selectedTalentId, setSelectedTalentId] = useState<string | null>(null);

  const handleViewDetails = (talentId: string) => {
    setSelectedTalentId(talentId);
    setCurrentPage('details');
  };

  const handleBackToExplorer = () => {
    setCurrentPage('explorer');
  };

  const handleLandingNavigation = (page: 'talent' | 'attrition' | 'succession') => {
    if (page === 'talent') {
      setCurrentPage('explorer');
    } else if (page === 'attrition') {
      setCurrentPage('attrition');
    } else if (page === 'succession') {
      setCurrentPage('succession');
    }
  };

  const handleNavigateHome = () => {
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-[#1a1d2e]">
      {currentPage === 'home' && (
        <LandingPage onNavigate={handleLandingNavigation} />
      )}
      
      {currentPage === 'explorer' && (
        <TalentCardExplorer 
          onViewDetails={handleViewDetails}
          onNavigate={setCurrentPage}
          onNavigateHome={handleNavigateHome}
        />
      )}
      
      {currentPage === 'details' && (
        <TalentCardDetails 
          talentId={selectedTalentId}
          onBack={handleBackToExplorer}
          onNavigate={setCurrentPage}
          onNavigateHome={handleNavigateHome}
        />
      )}
      
      {currentPage === 'attrition' && (
        <AttritionPage onNavigate={handleNavigateHome} />
      )}
      
      {currentPage === 'succession' && (
        <SuccessionPlanningPage onNavigate={handleNavigateHome} />
      )}
    </div>
  );
}