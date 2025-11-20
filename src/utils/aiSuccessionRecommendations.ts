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

export function generateAISuccessors(positionId: string): Candidate[] {
  // Simulated AI-generated candidates with confidence scores
  const aiCandidates: Candidate[] = [
    {
      id: 101,
      name: 'Ahmed Hassan Al Mansoori',
      jobTitle: 'Director General Operations',
      confidenceScore: 92,
      performance: 'Exceeded',
      age: 45,
      gender: 'Male',
      yearsInOrg: 15,
      yearsInCurrentLevel: 5,
      nationality: 'Emirati',
      department: 'Operations',
      skills: ['Strategic Planning', 'Change Management', 'Leadership', 'Financial Analysis', 'Project Management'],
      education: 'MBA, Harvard Business School | Bachelor in Engineering',
      cognitiveScore: 85,
      previousPositions: [
        { organization: 'Department of Energy', position: 'Senior Director', years: 4 },
        { organization: 'Department of Energy', position: 'Director', years: 3 },
        { organization: 'Energy Corp', position: 'Manager', years: 3 }
      ],
      strengths: [
        'Exceptional strategic thinking and execution',
        'Proven track record in leading large-scale transformations',
        'Strong stakeholder management across government entities',
        'Deep understanding of energy sector regulations'
      ],
      developmentAreas: [
        'International exposure and global market knowledge',
        'Digital transformation leadership'
      ],
      isAIGenerated: true
    },
    {
      id: 102,
      name: 'Sarah Abdullah Al Zaabi',
      jobTitle: 'Undersecretary 2',
      confidenceScore: 88,
      performance: 'Exceeded',
      age: 42,
      gender: 'Female',
      yearsInOrg: 12,
      yearsInCurrentLevel: 4,
      nationality: 'Emirati',
      department: 'Policy & Strategy',
      skills: ['Policy Development', 'Strategic Planning', 'Governance', 'Risk Management', 'Innovation'],
      education: 'PhD in Public Policy, Oxford | MBA, INSEAD',
      cognitiveScore: 88,
      previousPositions: [
        { organization: 'Department of Energy', position: 'Director General', years: 3 },
        { organization: 'Department of Energy', position: 'Senior Director Policy', years: 4 },
        { organization: 'Federal Government', position: 'Policy Advisor', years: 2 }
      ],
      strengths: [
        'Outstanding policy formulation and implementation',
        'Strong analytical and critical thinking skills',
        'Excellent communication with senior leadership',
        'Track record of innovation in government services'
      ],
      developmentAreas: [
        'Operational management experience',
        'Budget and financial planning expertise'
      ],
      isAIGenerated: true
    },
    {
      id: 103,
      name: 'Omar Mohammed Al Kaabi',
      jobTitle: 'Director General Facilities',
      confidenceScore: 85,
      performance: 'Achieved',
      age: 48,
      gender: 'Male',
      yearsInOrg: 18,
      yearsInCurrentLevel: 6,
      nationality: 'Emirati',
      department: 'Facilities Management',
      skills: ['Operations Management', 'Facilities Planning', 'Team Leadership', 'Compliance', 'Vendor Management'],
      education: 'Executive MBA, London Business School | Bachelor in Civil Engineering',
      cognitiveScore: 82,
      previousPositions: [
        { organization: 'Department of Energy', position: 'Deputy Director General', years: 5 },
        { organization: 'Department of Energy', position: 'Senior Manager', years: 4 },
        { organization: 'Construction Authority', position: 'Project Manager', years: 3 }
      ],
      strengths: [
        'Extensive operational knowledge and experience',
        'Strong relationship building within the organization',
        'Proven crisis management capabilities',
        'Deep technical expertise in facilities'
      ],
      developmentAreas: [
        'Strategic vision and long-term planning',
        'Change management and transformation leadership',
        'Advanced financial acumen'
      ],
      isAIGenerated: true
    }
  ];

  return aiCandidates;
}

export function calculateMatchScore(candidate: Candidate, position: string): number {
  // Simulate AI confidence scoring based on various factors
  let score = 0;

  // Performance weight (30%)
  if (candidate.performance === 'Exceeded') score += 30;
  else if (candidate.performance === 'Achieved') score += 20;

  // Experience weight (25%)
  if (candidate.yearsInOrg >= 15) score += 25;
  else if (candidate.yearsInOrg >= 10) score += 20;
  else if (candidate.yearsInOrg >= 5) score += 15;

  // Cognitive score weight (20%)
  score += (candidate.cognitiveScore / 100) * 20;

  // Leadership level weight (15%)
  if (candidate.jobTitle.includes('Undersecretary')) score += 15;
  else if (candidate.jobTitle.includes('Director General')) score += 12;
  else if (candidate.jobTitle.includes('Director')) score += 8;

  // Skills match weight (10%)
  const criticalSkills = ['Strategic Planning', 'Leadership', 'Change Management'];
  const matchingSkills = candidate.skills.filter(skill => 
    criticalSkills.some(cs => skill.includes(cs))
  ).length;
  score += (matchingSkills / criticalSkills.length) * 10;

  return Math.min(Math.round(score), 100);
}
