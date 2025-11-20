// AI-powered talent insights

export interface FlightRiskAssessment {
  level: 'low' | 'medium' | 'high';
  percentage: number;
  confidence: number;
  factors: {
    name: string;
    impact: 'positive' | 'negative' | 'neutral';
    description: string;
  }[];
}

export interface HiPoAssessment {
  isHiPo: boolean;
  score: number;
  confidence: number;
  strengths: string[];
  areas: string[];
}

export function calculateFlightRisk(talent: any): FlightRiskAssessment {
  let riskScore = 50; // Start at neutral
  const factors: FlightRiskAssessment['factors'] = [];

  // Years of service (longer tenure = lower risk)
  const yearsMatch = talent.yearsOfService.match(/(\d+(?:\.\d+)?)/);
  const years = yearsMatch ? parseFloat(yearsMatch[1]) : 0;
  
  if (years < 1) {
    riskScore += 20;
    factors.push({
      name: 'New Hire',
      impact: 'negative',
      description: 'Less than 1 year tenure increases flight risk'
    });
  } else if (years < 2) {
    riskScore += 10;
    factors.push({
      name: 'Short Tenure',
      impact: 'negative',
      description: 'Limited time with company'
    });
  } else if (years > 5) {
    riskScore -= 15;
    factors.push({
      name: 'Long Tenure',
      impact: 'positive',
      description: 'Strong commitment demonstrated'
    });
  }

  // Performance rating (high performers may be flight risk if not engaged)
  if (talent.performance === 5) {
    riskScore += 5;
    factors.push({
      name: 'Top Performer',
      impact: 'negative',
      description: 'High performers are often recruited externally'
    });
  } else if (talent.performance <= 3) {
    riskScore += 15;
    factors.push({
      name: 'Low Performance',
      impact: 'negative',
      description: 'Disengagement or poor fit may lead to departure'
    });
  }

  // Grade history - promotions
  const recentPromotions = talent.gradeHistory.length >= 2;
  if (recentPromotions) {
    const grades = talent.gradeHistory.map((g: any) => g.grade);
    const hasProgression = new Set(grades).size > 1;
    
    if (hasProgression) {
      riskScore -= 10;
      factors.push({
        name: 'Career Progression',
        impact: 'positive',
        description: 'Recent promotions indicate growth opportunities'
      });
    } else {
      riskScore += 8;
      factors.push({
        name: 'Stagnation',
        impact: 'negative',
        description: 'No grade changes may indicate lack of growth'
      });
    }
  }

  // Job changes in experience history
  const jobChanges = talent.experienceHistory.length;
  if (jobChanges > 3) {
    riskScore += 12;
    factors.push({
      name: 'Frequent Job Changes',
      impact: 'negative',
      description: 'History of changing roles frequently'
    });
  } else if (jobChanges === 1) {
    riskScore -= 5;
    factors.push({
      name: 'Stable Career',
      impact: 'positive',
      description: 'Low turnover history'
    });
  }

  // Skills diversity (more skills = more opportunities elsewhere)
  const skillCount = talent.skills.split(',').length;
  if (skillCount > 4) {
    riskScore += 8;
    factors.push({
      name: 'Diverse Skills',
      impact: 'negative',
      description: 'Broad skill set makes them marketable'
    });
  }

  // Department factors
  if (talent.department.toLowerCase().includes('engineering') || 
      talent.department.toLowerCase().includes('design')) {
    riskScore += 5;
    factors.push({
      name: 'High-Demand Field',
      impact: 'negative',
      description: 'Tech talent is highly sought after'
    });
  }

  // Normalize score to 0-100
  const finalScore = Math.max(0, Math.min(100, riskScore));
  
  let level: 'low' | 'medium' | 'high';
  if (finalScore < 35) level = 'low';
  else if (finalScore < 65) level = 'medium';
  else level = 'high';

  // Confidence based on data completeness
  const dataPoints = [
    talent.yearsOfService,
    talent.performance,
    talent.gradeHistory.length > 0,
    talent.experienceHistory.length > 0,
    talent.skills
  ].filter(Boolean).length;
  
  const confidence = Math.min(95, (dataPoints / 5) * 100);

  return {
    level,
    percentage: finalScore,
    confidence,
    factors: factors.slice(0, 4) // Top 4 factors
  };
}

export function calculateHiPo(talent: any): HiPoAssessment {
  let hipoScore = 0;
  const strengths: string[] = [];
  const areas: string[] = [];

  // Performance excellence
  if (talent.performance === 5) {
    hipoScore += 30;
    strengths.push('Consistent top-tier performance');
  } else if (talent.performance === 4) {
    hipoScore += 20;
    strengths.push('Strong performance track record');
  } else {
    areas.push('Performance improvement needed');
  }

  // Career progression
  if (talent.gradeHistory.length >= 3) {
    const positions = talent.gradeHistory.map((g: any) => g.position);
    const hasAdvancement = positions.some((p: string) => 
      p.toLowerCase().includes('senior') || 
      p.toLowerCase().includes('lead') ||
      p.toLowerCase().includes('sr')
    );
    
    if (hasAdvancement) {
      hipoScore += 25;
      strengths.push('Rapid career advancement');
    }
  } else {
    areas.push('Limited progression history');
  }

  // Education level
  const hasMasters = talent.education.some((edu: any) => 
    edu.level.includes('PG') || edu.level.includes('M.')
  );
  const hasPrestigious = talent.education.some((edu: any) => 
    edu.institute.includes('IIT') || 
    edu.institute.includes('IIM') ||
    edu.institute.includes('IISc')
  );

  if (hasMasters && hasPrestigious) {
    hipoScore += 20;
    strengths.push('Elite educational background');
  } else if (hasMasters || hasPrestigious) {
    hipoScore += 10;
    strengths.push('Strong educational foundation');
  }

  // Skills diversity and relevance
  const skillCount = talent.skills.split(',').length;
  if (skillCount >= 4) {
    hipoScore += 15;
    strengths.push('Versatile skill set');
  }

  // Certifications
  if (talent.certificates.length >= 2) {
    hipoScore += 10;
    strengths.push('Committed to continuous learning');
  } else {
    areas.push('Could benefit from more certifications');
  }

  // Tenure sweet spot (2-7 years is ideal for HiPo)
  const yearsMatch = talent.yearsOfService.match(/(\d+(?:\.\d+)?)/);
  const years = yearsMatch ? parseFloat(yearsMatch[1]) : 0;
  
  if (years >= 2 && years <= 7) {
    hipoScore += 10;
    strengths.push('Optimal experience level');
  } else if (years > 7) {
    areas.push('May benefit from fresh challenges');
  } else {
    areas.push('Building foundational experience');
  }

  const isHiPo = hipoScore >= 60;
  
  // Confidence calculation
  const dataCompleteness = [
    talent.performance > 0,
    talent.gradeHistory.length > 0,
    talent.education.length > 0,
    talent.certificates.length > 0,
    talent.skills.length > 0
  ].filter(Boolean).length;
  
  const confidence = Math.min(95, (dataCompleteness / 5) * 100);

  return {
    isHiPo,
    score: hipoScore,
    confidence,
    strengths: strengths.slice(0, 4),
    areas: areas.slice(0, 3)
  };
}
