import { Users, TrendingDown, GitBranch } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: 'talent' | 'attrition' | 'succession') => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#1a1d2e] text-white">
      {/* Header */}
      <header className="bg-[#252837] px-8 py-4 flex items-center justify-between border-b border-gray-700">
        <div className="text-2xl text-teal-400">synvert</div>
        <div className="text-lg">Talent Management System</div>
        <div className="text-sm text-gray-400">
          <div>Mumbai</div>
          <div>Apr 15, 2025 15:02</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-140px)]">
        <div className="max-w-6xl w-full px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl mb-3">Talent Management Hub</h1>
            <p className="text-gray-400">AI-powered insights for your workforce</p>
          </div>

          {/* Navigation Cards */}
          <div className="grid grid-cols-3 gap-6">
            {/* Talent Card */}
            <button
              onClick={() => onNavigate('talent')}
              className="bg-[#252837] rounded-lg p-8 border border-gray-700 hover:border-teal-500 transition-all duration-300 hover:scale-105 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-400 rounded-lg flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl mb-3 text-teal-400">Talent Card</h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                Explore employee profiles, AI-powered search, flight risk assessment, and high potential detection
              </p>
            </button>

            {/* Attrition */}
            <button
              onClick={() => onNavigate('attrition')}
              className="bg-[#252837] rounded-lg p-8 border border-gray-700 hover:border-red-500 transition-all duration-300 hover:scale-105 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-400 rounded-lg flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <TrendingDown className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl mb-3 text-red-400">Attrition</h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                Analyze workforce trends, predict turnover, and identify retention opportunities
              </p>
            </button>

            {/* Succession Planning */}
            <button
              onClick={() => onNavigate('succession')}
              className="bg-[#252837] rounded-lg p-8 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-400 rounded-lg flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <GitBranch className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl mb-3 text-purple-400">Succession Planning</h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                Identify future leaders, create succession pipelines, and ensure business continuity
              </p>
            </button>
          </div>
        </div>
      </main>

      {/* Branding */}
      <div className="fixed bottom-6 right-6 text-xs text-gray-600">
        OBSERVATION DECK
      </div>
    </div>
  );
}