import { useState } from 'react';
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react';

interface AttritionPageProps {
  onNavigate: (page: 'home') => void;
}

export function AttritionPage({ onNavigate }: AttritionPageProps) {
  const [selectedView, setSelectedView] = useState<'citizens' | 'transfers'>('citizens');
  const [selectedToggle, setSelectedToggle] = useState<'entity' | 'department'>('entity');
  const [selectedPeriod, setSelectedPeriod] = useState('2025');
  const [selectedKPI, setSelectedKPI] = useState<'default' | 'flightRisk'>('default');

  // Mock data for charts
  const genderData = [
    { label: 'Men', joiners: 60, leavers: 8 },
    { label: 'Women', joiners: 40, leavers: 12 }
  ];

  const ageGroupData = [
    { range: '<18-24', joiners: 5, leavers: 2 },
    { range: '25-29', joiners: 25, leavers: 4 },
    { range: '30-34', joiners: 30, leavers: 6 },
    { range: '35-39', joiners: 20, leavers: 4 },
    { range: '40-49', joiners: 15, leavers: 3 },
    { range: '>50-60', joiners: 5, leavers: 1 }
  ];

  const gradeData = [
    { grade: '0K', joiners: 10, leavers: 2 },
    { grade: '3K', joiners: 15, leavers: 3 },
    { grade: '10K', joiners: 35, leavers: 6 },
    { grade: '15K', joiners: 25, leavers: 4 },
    { grade: '20K', joiners: 10, leavers: 3 },
    { grade: '30K', joiners: 5, leavers: 2 }
  ];

  const performanceData = [
    { label: 'High Performers', joiners: 40, leavers: 3 },
    { label: 'Low Performers', joiners: 20, leavers: 7 }
  ];

  const tenureDistribution = [
    { range: '<6 M', count: 5 },
    { range: '6-12 M', count: 8 },
    { range: '1-2 Y', count: 15 },
    { range: '2-3 Y', count: 20 },
    { range: '6-10 Y', count: 25 },
    { range: '10-15 Y', count: 18 },
    { range: '>15 Y', count: 12 }
  ];

  const reasonsData = [
    { reason: 'Resignation', value: 40 },
    { reason: 'Retirement', value: 25 },
    { reason: 'Innovation', value: 15 },
    { reason: 'End of Contract', value: 10 },
    { reason: 'Redundancy/Layoff', value: 7 },
    { reason: 'Mutual Agreement', value: 3 }
  ];

  const movementTrendsData = [
    { quarter: 'Q1', year: 2023, joiners: 15, leavers: 8 },
    { quarter: 'Q2', year: 2023, joiners: 20, leavers: 6 },
    { quarter: 'Q3', year: 2023, joiners: 18, leavers: 10 },
    { quarter: 'Q4', year: 2023, joiners: 22, leavers: 5 },
    { quarter: 'Q1', year: 2024, joiners: 25, leavers: 12 },
    { quarter: 'Q2', year: 2024, joiners: 28, leavers: 8 },
    { quarter: 'Q3', year: 2024, joiners: 30, leavers: 15 },
    { quarter: 'Q4', year: 2024, joiners: 26, leavers: 10 },
    { quarter: 'Q1', year: 2025, joiners: 32, leavers: 9 },
    { quarter: 'Q2', year: 2025, joiners: 35, leavers: 11 },
    { quarter: 'Q3', year: 2025, joiners: 38, leavers: 13 },
    { quarter: 'Q4', year: 2025, joiners: 40, leavers: 7 }
  ];

  const entityData = [
    { name: 'Entity 1', netChange: 30, attrition: '10%', attrHighPerf: '10%', avgTenure: 2 },
    { name: 'Entity 2', netChange: 30, attrition: '10%', attrHighPerf: '10%', avgTenure: 2 },
    { name: 'Entity 3', netChange: 40, attrition: '10%', attrHighPerf: '10%', avgTenure: 2 },
    { name: 'Entity 4', netChange: 20, attrition: '10%', attrHighPerf: '10%', avgTenure: 2 },
    { name: 'Entity 5', netChange: 30, attrition: '10%', attrHighPerf: '10%', avgTenure: 2 }
  ];

  const maxValue = Math.max(...ageGroupData.map(d => Math.max(d.joiners, d.leavers)));
  const maxGradeValue = Math.max(...gradeData.map(d => Math.max(d.joiners, d.leavers)));
  const maxTenure = Math.max(...tenureDistribution.map(d => d.count));
  const maxMovement = Math.max(...movementTrendsData.map(d => Math.max(d.joiners, d.leavers)));

  // Flight Risk Data
  const flightRiskByDepartment = [
    { department: 'Operations', high: 12, medium: 8, low: 20 },
    { department: 'IT', high: 8, medium: 10, low: 15 },
    { department: 'Finance', high: 5, medium: 7, low: 18 },
    { department: 'HR', high: 3, medium: 5, low: 12 },
    { department: 'Legal', high: 2, medium: 4, low: 10 }
  ];

  const flightRiskByTenure = [
    { range: '<1 Y', high: 8, medium: 6, low: 12 },
    { range: '1-2 Y', high: 10, medium: 8, low: 15 },
    { range: '2-3 Y', high: 6, medium: 7, low: 18 },
    { range: '3-5 Y', high: 4, medium: 6, low: 20 },
    { range: '>5 Y', high: 2, medium: 7, low: 25 }
  ];

  const flightRiskByPerformance = [
    { level: 'Exceeded', count: 18, percentage: 60 },
    { level: 'Achieved', count: 10, percentage: 33 },
    { level: 'Below', count: 2, percentage: 7 }
  ];

  const flightRiskFactors = [
    { factor: 'Low Engagement Score', value: 35 },
    { factor: 'No Promotion in 3+ Years', value: 28 },
    { factor: 'Below Market Compensation', value: 22 },
    { factor: 'Recent Manager Change', value: 18 },
    { factor: 'Declined Learning Opportunities', value: 12 },
    { factor: 'High Workload (>50h/week)', value: 10 }
  ];

  const totalHighRisk = flightRiskByDepartment.reduce((sum, dept) => sum + dept.high, 0);
  const totalEmployees = 250; // Example total
  const highRiskPercentage = ((totalHighRisk / totalEmployees) * 100).toFixed(1);

  const maxFlightRiskDept = Math.max(...flightRiskByDepartment.map(d => d.high + d.medium + d.low));
  const maxFlightRiskTenure = Math.max(...flightRiskByTenure.map(d => d.high + d.medium + d.low));

  return (
    <div className="min-h-screen bg-[#1a1d2e] text-white flex flex-col">
      {/* Header */}
      <header className="bg-[#252837] px-6 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="text-xl text-teal-400">synvert</div>
        <div>Workforce - Movements</div>
        <div className="text-xs text-gray-400 text-right">
          <div>Refreshed</div>
          <div>Jan 27, 2025 10:01</div>
        </div>
      </header>

      {/* Filters Bar */}
      <div className="bg-[#252837] px-6 py-3 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Period */}
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-400">Period</label>
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-[#1a1d2e] border border-gray-600 rounded px-3 py-1 text-xs"
              >
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
              </select>
            </div>

            {/* Department/Entity */}
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-400">Department/Entity</label>
              <select className="bg-[#1a1d2e] border border-gray-600 rounded px-3 py-1 text-xs">
                <option>All</option>
              </select>
            </div>

            {/* Nationality */}
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-400">Nationality</label>
              <select className="bg-[#1a1d2e] border border-gray-600 rounded px-3 py-1 text-xs">
                <option>All</option>
              </select>
            </div>

            {/* Grade */}
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-400">Grade</label>
              <select className="bg-[#1a1d2e] border border-gray-600 rounded px-3 py-1 text-xs">
                <option>All</option>
              </select>
            </div>

            {/* Gender */}
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-400">Gender</label>
              <select className="bg-[#1a1d2e] border border-gray-600 rounded px-3 py-1 text-xs">
                <option>All</option>
              </select>
            </div>

            {/* Job Family */}
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-400">Job Family</label>
              <select className="bg-[#1a1d2e] border border-gray-600 rounded px-3 py-1 text-xs">
                <option>All</option>
              </select>
            </div>

            {/* Highest Qualification */}
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-400">Highest Qualification</label>
              <select className="bg-[#1a1d2e] border border-gray-600 rounded px-3 py-1 text-xs">
                <option>All</option>
              </select>
            </div>
          </div>

          {/* Right side toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedView('citizens')}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                selectedView === 'citizens' 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-[#1a1d2e] text-gray-400 hover:text-white'
              }`}
            >
              Citizens & Leavers
            </button>
            <button
              onClick={() => setSelectedView('transfers')}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                selectedView === 'transfers' 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-[#1a1d2e] text-gray-400 hover:text-white'
              }`}
            >
              Transfers & Secondments
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {/* KPI Cards */}
          <div className="flex items-center justify-between mb-4">
            {/* Entity/Department Toggle */}
            <div className="flex items-center gap-2 bg-[#252837] rounded p-1">
              <button
                onClick={() => setSelectedToggle('entity')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  selectedToggle === 'entity' ? 'bg-[#1a1d2e] text-white' : 'text-gray-400'
                }`}
              >
                Entity
              </button>
              <button
                onClick={() => setSelectedToggle('department')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  selectedToggle === 'department' ? 'bg-[#1a1d2e] text-white' : 'text-gray-400'
                }`}
              >
                Department
              </button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4 mb-4">
            {/* Net Talent Change */}
            <div className="bg-[#252837] rounded-lg p-4">
              <div className="text-xs text-gray-400 mb-2">Net Talent Change</div>
              <div className="text-3xl mb-2">90</div>
              <div className="text-xs text-gray-400 mb-1">100 Joiners vs 10 Leavers</div>
              <div className="flex items-center gap-1 text-xs text-red-400">
                <TrendingDown className="w-3 h-3" />
                <span>↓ (-1%) vs Last Year</span>
              </div>
            </div>

            {/* Attrition */}
            <div className="bg-[#252837] rounded-lg p-4">
              <div className="text-xs text-gray-400 mb-2">Attrition</div>
              <div className="text-3xl mb-2">20 <span className="text-lg">%</span></div>
              <div className="text-xs text-gray-400 mb-1">↑ (+1%) Target Var. (5%)</div>
              <div className="flex items-center gap-1 text-xs text-red-400">
                <TrendingDown className="w-3 h-3" />
                <span>↓ (-1%) vs Last Year</span>
              </div>
            </div>

            {/* Attr. High Performance */}
            <div className="bg-[#252837] rounded-lg p-4">
              <div className="text-xs text-gray-400 mb-2">Attr. High Performance</div>
              <div className="text-3xl mb-2">10 <span className="text-lg">%</span></div>
              <div className="text-xs text-gray-400 mb-1">↑ (+1%) Target Var. (5%)</div>
              <div className="flex items-center gap-1 text-xs text-red-400">
                <TrendingDown className="w-3 h-3" />
                <span>↓ (-2%) vs Last Year</span>
              </div>
            </div>

            {/* Leavers Avg. Tenure */}
            <div className="bg-[#252837] rounded-lg p-4">
              <div className="text-xs text-gray-400 mb-2">Leavers Avg. Tenure</div>
              <div className="text-3xl mb-2">3 <span className="text-lg">Years</span></div>
              <div className="flex items-center gap-1 text-xs text-red-400 mt-8">
                <TrendingDown className="w-3 h-3" />
                <span>↓ (-1%) vs Last Year</span>
              </div>
            </div>

            {/* AI Flight Risk */}
            <button
              onClick={() => setSelectedKPI(selectedKPI === 'flightRisk' ? 'default' : 'flightRisk')}
              className={`bg-[#252837] rounded-lg p-4 text-left transition-all hover:ring-2 hover:ring-purple-500/50 ${
                selectedKPI === 'flightRisk' ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-400">High Flight Risk</span>
                <span className="px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded text-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI
                </span>
              </div>
              <div className="text-3xl mb-1">{totalHighRisk} <span className="text-lg text-purple-400">({highRiskPercentage}%)</span></div>
              <div className="text-xs text-gray-400 mb-1">Employees at risk of leaving</div>
              <div className="flex items-center gap-1 text-xs text-amber-400">
                <TrendingUp className="w-3 h-3" />
                <span>↑ (+3%) vs Last Month</span>
              </div>
              {selectedKPI === 'flightRisk' && (
                <div className="mt-2 text-xs text-purple-400">
                  Click to hide analysis ↑
                </div>
              )}
              {selectedKPI !== 'flightRisk' && (
                <div className="mt-2 text-xs text-purple-400">
                  Click to see analysis ↓
                </div>
              )}
            </button>
          </div>

          {/* Flight Risk Analysis - Conditional - REPLACES charts below */}
          {selectedKPI === 'flightRisk' ? (
            <div className="mb-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h2 className="text-sm">AI Flight Risk Analysis</h2>
                <span className="text-xs text-gray-400">Where is the flight risk detected?</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Flight Risk by Department */}
                <div className="bg-[#252837] rounded-lg p-4">
                  <h3 className="text-xs text-gray-400 mb-3">Flight Risk by Department</h3>
                  <div className="space-y-2">
                    {flightRiskByDepartment.map((dept, idx) => (
                      <div key={idx}>
                        <div className="text-xs mb-1">{dept.department}</div>
                        <div className="flex gap-1 h-8">
                          <div 
                            className="bg-red-500 rounded flex items-center justify-center text-xs"
                            style={{ width: `${(dept.high / maxFlightRiskDept) * 100}%` }}
                          >
                            {dept.high > 0 && dept.high}
                          </div>
                          <div 
                            className="bg-amber-500 rounded flex items-center justify-center text-xs"
                            style={{ width: `${(dept.medium / maxFlightRiskDept) * 100}%` }}
                          >
                            {dept.medium > 0 && dept.medium}
                          </div>
                          <div 
                            className="bg-green-500 rounded flex items-center justify-center text-xs"
                            style={{ width: `${(dept.low / maxFlightRiskDept) * 100}%` }}
                          >
                            {dept.low > 0 && dept.low}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <span className="text-gray-400">High Risk</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-amber-500 rounded-full" />
                      <span className="text-gray-400">Medium</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-gray-400">Low</span>
                    </div>
                  </div>
                </div>

                {/* Flight Risk by Tenure */}
                <div className="bg-[#252837] rounded-lg p-4">
                  <h3 className="text-xs text-gray-400 mb-3">Flight Risk by Tenure</h3>
                  <div className="h-40 flex items-end gap-3">
                    {flightRiskByTenure.map((item, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full flex flex-col gap-0.5">
                          <div 
                            className="bg-red-500 rounded-sm w-full flex items-center justify-center text-xs"
                            style={{ height: `${(item.high / maxFlightRiskTenure) * 120}px`, minHeight: item.high > 0 ? '20px' : '0' }}
                          >
                            {item.high}
                          </div>
                          <div 
                            className="bg-amber-500 rounded-sm w-full flex items-center justify-center text-xs"
                            style={{ height: `${(item.medium / maxFlightRiskTenure) * 120}px`, minHeight: item.medium > 0 ? '20px' : '0' }}
                          >
                            {item.medium}
                          </div>
                          <div 
                            className="bg-green-500 rounded-sm w-full flex items-center justify-center text-xs"
                            style={{ height: `${(item.low / maxFlightRiskTenure) * 120}px`, minHeight: item.low > 0 ? '20px' : '0' }}
                          >
                            {item.low}
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">{item.range}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs justify-center">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <span className="text-gray-400">High</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-amber-500 rounded-full" />
                      <span className="text-gray-400">Medium</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-gray-400">Low</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* High Risk by Performance Level */}
                <div className="bg-[#252837] rounded-lg p-4">
                  <h3 className="text-xs text-gray-400 mb-3">High Risk Employees by Performance</h3>
                  <div className="space-y-3">
                    {flightRiskByPerformance.map((item, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-300">{item.level}</span>
                          <span className="text-purple-400">{item.count} employees ({item.percentage}%)</span>
                        </div>
                        <div className="h-8 bg-[#1a1d2e] rounded overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded transition-all flex items-center justify-center text-xs"
                            style={{ width: `${item.percentage}%` }}
                          >
                            {item.percentage}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Risk Factors */}
                <div className="bg-[#252837] rounded-lg p-4">
                  <h3 className="text-xs text-gray-400 mb-3">Top Risk Factors Detected</h3>
                  <div className="space-y-2">
                    {flightRiskFactors.map((item, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-300">{item.factor}</span>
                          <span className="text-purple-400">{item.value}%</span>
                        </div>
                        <div className="h-6 bg-[#1a1d2e] rounded overflow-hidden">
                          <div 
                            className="h-full bg-purple-500 rounded transition-all"
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 text-xs text-purple-300 bg-purple-500/10 rounded p-3 border border-purple-500/30">
                <strong>AI Insight:</strong> The highest concentration of flight risk is in the Operations department among employees with 1-2 years of tenure. 
                60% of high-risk employees are high performers who haven't been promoted in 3+ years and have low engagement scores. 
                Immediate action is recommended to address compensation and career development for this group.
              </div>
            </div>
          ) : (
            <>
              {/* Default Charts Section */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                {/* Left Column - Joiners & Leavers Distribution */}
                <div className="col-span-2 bg-[#252837] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm">Joiners & Leavers Distribution</h2>
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span className="text-gray-400">Joiners</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-teal-500 rounded-full" />
                        <span className="text-gray-400">Leavers</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-6">
                    {/* Gender */}
                    <div>
                      <div className="text-xs text-gray-400 mb-3">Gender</div>
                      <div className="space-y-2">
                        {genderData.map((item) => (
                          <div key={item.label}>
                            <div className="text-xs mb-1">{item.label}</div>
                            <div className="flex gap-1 h-6">
                              <div 
                                className="bg-blue-500 rounded"
                                style={{ width: `${(item.joiners / 100) * 100}%` }}
                              />
                              <div 
                                className="bg-teal-500 rounded"
                                style={{ width: `${(item.leavers / 20) * 30}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-400 mt-2">0K</div>
                    </div>

                    {/* Age Group */}
                    <div>
                      <div className="text-xs text-gray-400 mb-3">Age Group</div>
                      <div className="h-32 flex items-end gap-1">
                        {ageGroupData.map((item, idx) => (
                          <div key={idx} className="flex-1 flex flex-col gap-1 items-center">
                            <div className="w-full flex flex-col gap-0.5">
                              <div 
                                className="bg-blue-500 rounded-sm w-full"
                                style={{ height: `${(item.joiners / maxValue) * 80}px` }}
                              />
                              <div 
                                className="bg-teal-500 rounded-sm w-full"
                                style={{ height: `${(item.leavers / maxValue) * 80}px` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        {ageGroupData.map((item, idx) => (
                          <span key={idx} className="text-xs">{item.range.replace('<18-', '<')}</span>
                        ))}
                      </div>
                    </div>

                    {/* Grade */}
                    <div>
                      <div className="text-xs text-gray-400 mb-3">Grade</div>
                      <div className="h-32 flex items-end gap-1">
                        {gradeData.map((item, idx) => (
                          <div key={idx} className="flex-1 flex flex-col gap-1 items-center">
                            <div className="w-full flex flex-col gap-0.5">
                              <div 
                                className="bg-blue-500 rounded-sm w-full"
                                style={{ height: `${(item.joiners / maxGradeValue) * 80}px` }}
                              />
                              <div 
                                className="bg-teal-500 rounded-sm w-full"
                                style={{ height: `${(item.leavers / maxGradeValue) * 80}px` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        {gradeData.map((item, idx) => (
                          <span key={idx}>{item.grade}</span>
                        ))}
                      </div>
                    </div>

                    {/* Performance */}
                    <div>
                      <div className="text-xs text-gray-400 mb-3">Performance</div>
                      <div className="h-32 flex items-end gap-2">
                        {performanceData.map((item, idx) => (
                          <div key={idx} className="flex-1 flex flex-col gap-1 items-center">
                            <div className="w-full flex flex-col gap-0.5">
                              <div 
                                className="bg-blue-500 rounded-sm w-full"
                                style={{ height: `${(item.joiners / 50) * 80}px` }}
                              />
                              <div 
                                className="bg-teal-500 rounded-sm w-full"
                                style={{ height: `${(item.leavers / 50) * 80}px` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mt-1 gap-2">
                        <span className="text-center">High Performers</span>
                        <span className="text-center">Low Performers</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Movements Trends Detail */}
                <div className="bg-[#252837] rounded-lg p-4">
                  <h2 className="text-sm mb-3">Movements Trends</h2>
                  
                  {/* Entity Checkboxes */}
                  <div className="mb-4">
                    <div className="text-xs text-gray-400 mb-2">Entity</div>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {Array.from({ length: 12 }, (_, i) => (
                        <label key={i} className="flex items-center gap-2 text-xs">
                          <input type="checkbox" className="w-3 h-3 rounded" />
                          <span className="text-gray-300">Entity {i + 1}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Trends Chart */}
                  <div>
                    <div className="text-xs mb-2">
                      <span className="text-teal-400">Net Talent Trend</span>
                      <span className="text-gray-400 ml-2">5K</span>
                    </div>
                    <div className="h-24 flex items-end gap-1 mb-1">
                      {movementTrendsData.map((data, idx) => (
                        <div key={idx} className="flex-1 flex flex-col">
                          <div 
                            className="bg-blue-500 rounded-sm w-full"
                            style={{ height: `${(data.joiners / maxMovement) * 100}%` }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Q1 2023</span>
                      <span>Q4 2023</span>
                      <span>Q1 2024</span>
                      <span>Q4 2024</span>
                      <span>Q1 2025</span>
                      <span>Q4 2025</span>
                    </div>
                  </div>

                  {/* Attrition Trend */}
                  <div className="mt-4">
                    <div className="text-xs mb-2">
                      <span className="text-teal-400">Attrition Trend</span>
                      <span className="text-gray-400 ml-2">30%</span>
                    </div>
                    <div className="h-24 relative">
                      <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                        <polyline
                          fill="none"
                          stroke="#14b8a6"
                          strokeWidth="2"
                          points="0,80 20,70 40,75 60,65 80,60 100,55 120,50 140,58 160,45 180,40 200,35"
                        />
                      </svg>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Q1 2023</span>
                      <span>Q4 2023</span>
                      <span>Q1 2024</span>
                      <span>Q4 2024</span>
                      <span>Q1 2025</span>
                      <span>Q4 2025</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attrition Distribution & Entity Table */}
              <div className="grid grid-cols-3 gap-4">
                {/* Attrition Distribution */}
                <div className="col-span-2 bg-[#252837] rounded-lg p-4">
                  <h2 className="text-sm mb-4">Attrition Distribution</h2>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {/* When Do Employees Leave */}
                    <div>
                      <div className="text-xs text-gray-400 mb-3">When Do Employees Leave?</div>
                      <div className="h-40 flex items-end gap-2">
                        {tenureDistribution.map((item, idx) => (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                            <div 
                              className="bg-blue-500 rounded-sm w-full relative group"
                              style={{ height: `${(item.count / maxTenure) * 160}px` }}
                            >
                              <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                {item.count}
                              </div>
                            </div>
                            <span className="text-xs text-gray-400">{item.range}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Why Do Employees Leave */}
                    <div>
                      <div className="text-xs text-gray-400 mb-3">Why Do Employees Leave?</div>
                      <div className="space-y-2">
                        {reasonsData.map((item, idx) => (
                          <div key={idx}>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-gray-300">{item.reason}</span>
                              <span className="text-gray-400">{item.value}%</span>
                            </div>
                            <div className="h-6 bg-[#1a1d2e] rounded overflow-hidden">
                              <div 
                                className="h-full bg-teal-500 rounded transition-all"
                                style={{ width: `${item.value}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-400 text-center mt-3">No Filters Applied</div>
                    </div>
                  </div>
                </div>

                {/* Entity Table */}
                <div className="bg-[#252837] rounded-lg p-4">
                  <h2 className="text-sm mb-3">Entity</h2>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-2 text-gray-400"></th>
                          <th className="text-left py-2 text-gray-400">Net Talent Change</th>
                          <th className="text-left py-2 text-gray-400">Attrition</th>
                          <th className="text-left py-2 text-gray-400">Attrition High Perf.</th>
                          <th className="text-left py-2 text-gray-400">Leavers Avg. Tenure (Years)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {entityData.map((entity, idx) => (
                          <tr key={idx} className="border-b border-gray-800 hover:bg-[#1a1d2e]">
                            <td className="py-2">{entity.name}</td>
                            <td className="py-2">{entity.netChange}</td>
                            <td className="py-2">{entity.attrition}</td>
                            <td className="py-2">{entity.attrHighPerf}</td>
                            <td className="py-2">{entity.avgTenure}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
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
          Retention Overview
        </button>
        <button className="px-4 py-1.5 text-xs text-gray-400 hover:text-white transition-colors">
          Demographics
        </button>
        <button className="px-4 py-1.5 text-xs bg-teal-500/20 text-teal-400 rounded">
          Movements
        </button>
      </nav>

      {/* Branding */}
      <div className="fixed bottom-3 right-4 text-xs text-gray-600">
        OBSERVATION DECK
      </div>
    </div>
  );
}