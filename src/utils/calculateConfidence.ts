import { FilterCriteria } from './aiFilter';

export function calculateConfidenceScore(talent: any, criteria: FilterCriteria): number {
  let totalPoints = 0;
  let earnedPoints = 0;
  
  // Education match (30 points)
  if (criteria.education && criteria.education.length > 0) {
    totalPoints += 30;
    const hasMatchingEducation = talent.education.some((edu: any) => 
      criteria.education!.some(keyword => 
        edu.title.toLowerCase().includes(keyword) ||
        edu.institute.toLowerCase().includes(keyword)
      )
    );
    
    if (hasMatchingEducation) {
      // Check how many education keywords match
      const matchCount = criteria.education.filter(keyword =>
        talent.education.some((edu: any) =>
          edu.title.toLowerCase().includes(keyword) ||
          edu.institute.toLowerCase().includes(keyword)
        )
      ).length;
      
      earnedPoints += Math.min(30, (matchCount / criteria.education.length) * 30);
    }
  }

  // Years of experience match (25 points)
  if (criteria.minYearsExperience !== undefined || criteria.maxYearsExperience !== undefined) {
    totalPoints += 25;
    
    const experienceMatch = talent.yearsOfService.match(/(\d+(?:\.\d+)?)\s*Years?/i);
    if (experienceMatch) {
      const years = parseFloat(experienceMatch[1]);
      
      // Also check total experience from history
      const totalExp = talent.experienceHistory.reduce((total: number, exp: any) => {
        const durationMatch = exp.duration.match(/(\d+(?:\.\d+)?)/);
        return total + (durationMatch ? parseFloat(durationMatch[1]) : 0);
      }, 0);
      
      const effectiveYears = Math.max(years, totalExp);
      
      if (criteria.minYearsExperience !== undefined) {
        if (effectiveYears >= criteria.minYearsExperience) {
          // Give full points if they meet or exceed by a reasonable amount
          // Bonus points for significantly exceeding requirements
          const excess = effectiveYears - criteria.minYearsExperience;
          earnedPoints += Math.min(25, 20 + (excess * 2));
        } else {
          // Partial points if they're close
          const percentage = effectiveYears / criteria.minYearsExperience;
          earnedPoints += percentage * 15;
        }
      }
      
      if (criteria.maxYearsExperience !== undefined && effectiveYears <= criteria.maxYearsExperience) {
        earnedPoints += 25;
      }
    }
  }

  // Skills match (25 points)
  if (criteria.skills && criteria.skills.length > 0) {
    totalPoints += 25;
    
    const matchingSkills = criteria.skills.filter(skill => 
      talent.skills.toLowerCase().includes(skill)
    );
    
    if (matchingSkills.length > 0) {
      earnedPoints += (matchingSkills.length / criteria.skills.length) * 25;
    }
  }

  // Location match (10 points)
  if (criteria.location && criteria.location.length > 0) {
    totalPoints += 10;
    const hasMatchingLocation = criteria.location.some(loc => 
      talent.location.toLowerCase().includes(loc)
    );
    if (hasMatchingLocation) earnedPoints += 10;
  }

  // Department match (5 points)
  if (criteria.department && criteria.department.length > 0) {
    totalPoints += 5;
    const hasMatchingDepartment = criteria.department.some(dept => 
      talent.department.toLowerCase().includes(dept)
    );
    if (hasMatchingDepartment) earnedPoints += 5;
  }

  // Performance match (5 points)
  if (criteria.minPerformance !== undefined) {
    totalPoints += 5;
    if (talent.performance >= criteria.minPerformance) {
      earnedPoints += 5;
    } else {
      earnedPoints += (talent.performance / criteria.minPerformance) * 3;
    }
  }

  // Name match (exact match bonus)
  if (criteria.name) {
    totalPoints += 10;
    if (talent.name.toLowerCase().includes(criteria.name.toLowerCase())) {
      const exactMatch = talent.name.toLowerCase() === criteria.name.toLowerCase();
      earnedPoints += exactMatch ? 10 : 7;
    }
  }

  // Calculate percentage
  if (totalPoints === 0) return 100; // No criteria, perfect match
  
  const percentage = Math.round((earnedPoints / totalPoints) * 100);
  return Math.min(100, Math.max(0, percentage));
}

export function calculateConfidenceScores(talents: any[], criteria: FilterCriteria): Map<string, number> {
  const scores = new Map<string, number>();
  
  talents.forEach(talent => {
    const score = calculateConfidenceScore(talent, criteria);
    scores.set(talent.id, score);
  });
  
  return scores;
}
