import { ArrowLeft } from 'lucide-react';
import { talentsData } from '../data/talentsData';
import { calculateFlightRisk, calculateHiPo } from '../utils/aiInsights';
import { FlightRiskCard } from './FlightRiskCard';
import { HiPoCard } from './HiPoCard';

interface TalentCardDetailsProps {
  talentId: string | null;
  onBack: () => void;
  onNavigate: (page: 'explorer' | 'details') => void;
  onNavigateHome: () => void;
}

export function TalentCardDetails({ talentId, onBack, onNavigate, onNavigateHome }: TalentCardDetailsProps) {
  const talent = talentsData.find(t => t.id === talentId) || talentsData[0];

  const flightRisk = calculateFlightRisk(talent);
  const hipoAssessment = calculateHiPo(talent);

  const employmentData = [
    { month: 'Jan 25', value: 8 },
    { month: 'Feb 25', value: 15 },
    { month: 'Mar 25', value: 12 },
    { month: 'Apr 25', value: 18 },
    { month: 'May 25', value: 16 }
  ];

  const maxValue = Math.max(...employmentData.map(d => d.value));

  return (
    <div className="min-h-screen bg-[#1a1d2e] text-white pb-20">
      {/* Header */}
      <header className="bg-[#252837] px-8 py-4 flex items-center justify-between border-b border-gray-700">
        <div className="text-2xl text-teal-400">synvert</div>
        <div>Talent Card Details</div>
        <div className="text-sm text-gray-400">
          <div>Mumbai</div>
          <div>Apr 15, 2025 15:02</div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-16 bg-[#0f1419] border-r border-gray-800 flex flex-col items-center py-8 gap-6">
          <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center text-teal-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-teal-400 hover:text-teal-300 mb-4 px-3 py-1.5 border border-teal-500 rounded text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="grid grid-cols-3 gap-6" style={{ height: 'calc(100vh - 240px)' }}>
            {/* Left Column */}
            <div className="bg-[#151925] rounded-lg p-6 flex flex-col h-full overflow-y-auto scrollbar-thin">
              {/* Profile */}
              <div className="pb-6 border-b border-gray-800">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-purple-500 rounded-full flex items-center justify-center text-2xl">
                    {talent.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl mb-1">{talent.name}</h2>
                    <p className="text-sm text-gray-400">{talent.jobTitle}</p>
                    <div className="text-xs text-teal-400 mt-1">{talent.employeeId}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#0f1419] rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">Email</div>
                    <div className="text-xs text-teal-400">{talent.email}</div>
                  </div>
                  <div className="bg-[#0f1419] rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">Phone</div>
                    <div className="text-xs">{talent.phone}</div>
                  </div>
                  <div className="bg-[#0f1419] rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">Location</div>
                    <div className="text-xs">{talent.location}</div>
                  </div>
                  <div className="bg-[#0f1419] rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">DOB</div>
                    <div className="text-xs">{talent.dob}</div>
                  </div>
                </div>
              </div>

              {/* Employment Info */}
              <div className="py-6 border-b border-gray-800">
                <h3 className="text-sm text-gray-400 mb-4">Employment Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 border-b border-gray-800">
                    <span className="text-xs text-gray-400">Years of Service</span>
                    <span className="text-xs text-teal-400">{talent.yearsOfService}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-800">
                    <span className="text-xs text-gray-400">Current CTC</span>
                    <span className="text-xs text-teal-400">₹{talent.ctc}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-800">
                    <span className="text-xs text-gray-400">Department</span>
                    <span className="text-xs">{talent.department}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-800">
                    <span className="text-xs text-gray-400">Emergency Contact</span>
                    <span className="text-xs">{talent.emergencyContact}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-xs text-gray-400">PTO</span>
                    <span className="text-xs">{talent.pto}</span>
                  </div>
                </div>
              </div>

              {/* Manager */}
              <div className="py-6 border-b border-gray-800">
                <h3 className="text-sm text-gray-400 mb-4">Manager</h3>
                <div className="flex items-center gap-3 bg-[#0f1419] rounded-lg p-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span>{talent.manager.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="text-sm">{talent.manager.name}</div>
                    <div className="text-xs text-gray-400">{talent.manager.role}</div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="py-6 border-b border-gray-800">
                <h3 className="text-sm text-gray-400 mb-4">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {talent.skills.split(',').map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 bg-teal-500/20 text-teal-400 rounded text-xs"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Grade History */}
              <div className="pt-6 flex-1">
                <h3 className="text-sm text-gray-400 mb-4">Grade History</h3>
                <div className="bg-[#0f1419] rounded-lg overflow-hidden">
                  <table className="w-full text-xs">
                    <thead className="bg-[#080b12]">
                      <tr>
                        <th className="px-3 py-2 text-left text-[10px] text-gray-400">Period</th>
                        <th className="px-3 py-2 text-left text-[10px] text-gray-400">Position</th>
                        <th className="px-3 py-2 text-left text-[10px] text-gray-400">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {talent.gradeHistory.map((grade, idx) => (
                        <tr key={idx} className="border-t border-gray-800">
                          <td className="px-3 py-2 text-gray-400 text-[10px]">{grade.period}</td>
                          <td className="px-3 py-2 text-gray-400 text-[10px]">{grade.position}</td>
                          <td className="px-3 py-2 text-[10px]">{grade.grade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Middle Column */}
            <div className="bg-[#151925] rounded-lg p-6 flex flex-col h-full overflow-y-auto scrollbar-thin">
              {/* Employment Chart */}
              <div className="pb-6 border-b border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm text-gray-400">Employment Summary</h3>
                  <div className="flex gap-2">
                    <button className="px-2 py-1 bg-teal-500/20 text-teal-400 rounded text-xs">
                      Promotion
                    </button>
                    <button className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                      Increment
                    </button>
                  </div>
                </div>

                <div className="flex items-end justify-between h-40 gap-2 mb-4">
                  {employmentData.map((data, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <div className="flex-1 flex items-end w-full">
                        <div 
                          className="w-full bg-gradient-to-t from-teal-500 to-teal-400 rounded-t"
                          style={{ height: `${(data.value / maxValue) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-400">{data.month}</div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-[#0f1419] rounded-lg p-2.5">
                    <div className="text-[10px] text-gray-400 mb-0.5">Role</div>
                    <div className="text-xs">{talent.proficiency}</div>
                  </div>
                  <div className="bg-[#0f1419] rounded-lg p-2.5">
                    <div className="text-[10px] text-gray-400 mb-0.5">Dept</div>
                    <div className="text-xs">{talent.department}</div>
                  </div>
                  <div className="bg-[#0f1419] rounded-lg p-2.5">
                    <div className="text-[10px] text-gray-400 mb-0.5">PTO</div>
                    <div className="text-xs">{talent.pto}</div>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="py-6 border-b border-gray-800">
                <h3 className="text-sm text-gray-400 mb-4">Education</h3>
                <div className="space-y-2">
                  {talent.education.map((edu, idx) => (
                    <div 
                      key={idx}
                      className="bg-[#0f1419] rounded-lg p-3 border-l-2 border-teal-500"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-xs text-teal-400">{edu.level}</span>
                        <span className="text-xs text-gray-500">{edu.year}</span>
                      </div>
                      <div className="text-xs mb-1">{edu.title}</div>
                      <div className="text-xs text-gray-400">{edu.institute}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificates */}
              <div className="py-6 border-b border-gray-800">
                <h3 className="text-sm text-gray-400 mb-4">Professional Certificates</h3>
                <div className="space-y-2">
                  {talent.certificates.map((cert, idx) => (
                    <div 
                      key={idx}
                      className="bg-[#0f1419] rounded-lg p-3 border-l-2 border-purple-500"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-xs text-purple-400">{cert.name}</span>
                        <span className="text-xs text-gray-500">{cert.year}</span>
                      </div>
                      <div className="text-xs text-gray-400">{cert.archival}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="pt-6 flex-1">
                <h3 className="text-sm text-gray-400 mb-4">Work Experience</h3>
                <div className="space-y-2">
                  {talent.experienceHistory.map((exp, idx) => (
                    <div 
                      key={idx}
                      className="bg-[#0f1419] rounded-lg p-3 border-l-2 border-amber-500"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-xs text-amber-400">{exp.company}</span>
                        <span className="text-xs text-gray-500">{exp.duration}</span>
                      </div>
                      <div className="text-xs text-gray-400">{exp.period}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="bg-[#151925] rounded-lg p-6 flex flex-col h-full overflow-y-auto scrollbar-thin">
              {/* Leaves */}
              <div className="pb-6 border-b border-gray-800">
                <h3 className="text-sm text-gray-400 mb-4">Leave Balance (2025)</h3>
                <div className="space-y-3">
                  {['Jan 25', 'Feb 25', 'Mar 25', 'Apr 25', 'May 25'].map((month, idx) => {
                    const value = [5, 8, 4, 6, 3][idx];
                    return (
                      <div key={month} className="flex items-center gap-3">
                        <div className="text-xs text-gray-400 w-14">{month}</div>
                        <div className="flex-1 bg-[#0f1419] rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-teal-500 to-teal-400 h-full rounded-full"
                            style={{ width: `${(value / 10) * 100}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-400 w-8 text-right">{value}d</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Flight Risk */}
              <div className="py-6 border-b border-gray-800">
                <FlightRiskCard assessment={flightRisk} />
              </div>

              {/* HiPo */}
              <div className="pt-6 flex-1">
                <HiPoCard assessment={hipoAssessment} />
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
        <button 
          onClick={() => onNavigate('explorer')}
          className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
        >
          Talent Card Explorer
        </button>
        <button className="px-6 py-2 bg-teal-500/20 text-teal-400 rounded">
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