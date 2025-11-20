// AI-powered natural language filter for talent search
export interface FilterCriteria {
  education?: string[];
  minYearsExperience?: number;
  maxYearsExperience?: number;
  skills?: string[];
  location?: string[];
  department?: string[];
  minPerformance?: number;
  name?: string;
}

export function parseNaturalLanguageQuery(query: string): FilterCriteria {
  const lowerQuery = query.toLowerCase();
  const criteria: FilterCriteria = {};

  // Parse education-related terms
  const educationKeywords = [
    'telecom', 'telecommunication', 'telecommunications',
    'computer science', 'cs', 'computer', 'it', 'information technology',
    'engineering', 'electrical', 'electronics', 'mechanical',
    'mba', 'business', 'marketing', 'finance', 'hr', 'human resources',
    'design', 'visual', 'communication',
    'psychology', 'accounting', 'operations', 'industrial'
  ];

  const foundEducation = educationKeywords.filter(keyword => 
    lowerQuery.includes(keyword)
  );
  
  if (foundEducation.length > 0) {
    criteria.education = foundEducation;
  }

  // Parse years of experience
  const yearPatterns = [
    /more than (\d+)\s*(?:years?|yrs?)/i,
    /over (\d+)\s*(?:years?|yrs?)/i,
    /above (\d+)\s*(?:years?|yrs?)/i,
    /(\d+)\+\s*(?:years?|yrs?)/i,
    /at least (\d+)\s*(?:years?|yrs?)/i,
    /minimum (\d+)\s*(?:years?|yrs?)/i,
    /(\d+)\s*or more\s*(?:years?|yrs?)/i
  ];

  for (const pattern of yearPatterns) {
    const match = lowerQuery.match(pattern);
    if (match) {
      criteria.minYearsExperience = parseInt(match[1]);
      break;
    }
  }

  // Parse less than years
  const maxYearPatterns = [
    /less than (\d+)\s*(?:years?|yrs?)/i,
    /under (\d+)\s*(?:years?|yrs?)/i,
    /below (\d+)\s*(?:years?|yrs?)/i,
    /maximum (\d+)\s*(?:years?|yrs?)/i
  ];

  for (const pattern of maxYearPatterns) {
    const match = lowerQuery.match(pattern);
    if (match) {
      criteria.maxYearsExperience = parseInt(match[1]);
      break;
    }
  }

  // Parse skills
  const skillKeywords = [
    'react', 'typescript', 'python', 'django', 'aws',
    'figma', 'sketch', 'adobe', 'ui', 'ux',
    'product management', 'agile', 'jira',
    'marketing', 'seo', 'analytics',
    'networking', 'cisco', 'network security', '5g', 'lte',
    'rf engineering', 'telecom systems',
    'financial planning', 'tax', 'compliance',
    'six sigma', 'lean', 'process optimization'
  ];

  const foundSkills = skillKeywords.filter(skill => 
    lowerQuery.includes(skill)
  );
  
  if (foundSkills.length > 0) {
    criteria.skills = foundSkills;
  }

  // Parse location
  const locationKeywords = [
    'mumbai', 'delhi', 'bangalore', 'chennai', 'pune',
    'hyderabad', 'kolkata', 'noida', 'gurgaon'
  ];

  const foundLocations = locationKeywords.filter(loc => 
    lowerQuery.includes(loc)
  );
  
  if (foundLocations.length > 0) {
    criteria.location = foundLocations;
  }

  // Parse department
  const departmentKeywords = [
    'design', 'engineering', 'product', 'marketing',
    'hr', 'human resources', 'finance', 'operations'
  ];

  const foundDepartments = departmentKeywords.filter(dept => 
    lowerQuery.includes(dept)
  );
  
  if (foundDepartments.length > 0) {
    criteria.department = foundDepartments;
  }

  // Parse performance rating
  const performancePatterns = [
    /(?:performance|rating)\s*(?:of\s*)?(\d+)\s*(?:stars?|\/5)?/i,
    /(\d+)\s*stars?/i,
    /top performers?/i,
    /high performers?/i
  ];

  for (const pattern of performancePatterns) {
    const match = lowerQuery.match(pattern);
    if (match) {
      if (match[0].includes('top') || match[0].includes('high')) {
        criteria.minPerformance = 5;
      } else if (match[1]) {
        criteria.minPerformance = parseInt(match[1]);
      }
      break;
    }
  }

  // Parse name search
  const namePattern = /named?\s+([a-z\s]+?)(?:\s+(?:who|with|that|in|from|and)|$)/i;
  const nameMatch = lowerQuery.match(namePattern);
  if (nameMatch && nameMatch[1]) {
    criteria.name = nameMatch[1].trim();
  }

  return criteria;
}

export function filterTalentsByCriteria(talents: any[], criteria: FilterCriteria): any[] {
  return talents.filter(talent => {
    // Filter by education
    if (criteria.education && criteria.education.length > 0) {
      const hasMatchingEducation = talent.education.some((edu: any) => 
        criteria.education!.some(keyword => 
          edu.title.toLowerCase().includes(keyword) ||
          edu.institute.toLowerCase().includes(keyword)
        )
      );
      if (!hasMatchingEducation) return false;
    }

    // Filter by minimum years of experience
    if (criteria.minYearsExperience !== undefined) {
      const experienceMatch = talent.yearsOfService.match(/(\d+(?:\.\d+)?)\s*Years?/i);
      if (experienceMatch) {
        const years = parseFloat(experienceMatch[1]);
        if (years < criteria.minYearsExperience) return false;
      }
      
      // Also check total experience from history
      const totalExp = talent.experienceHistory.reduce((total: number, exp: any) => {
        const durationMatch = exp.duration.match(/(\d+(?:\.\d+)?)/);
        return total + (durationMatch ? parseFloat(durationMatch[1]) : 0);
      }, 0);
      
      if (totalExp < criteria.minYearsExperience) return false;
    }

    // Filter by maximum years of experience
    if (criteria.maxYearsExperience !== undefined) {
      const experienceMatch = talent.yearsOfService.match(/(\d+(?:\.\d+)?)\s*Years?/i);
      if (experienceMatch) {
        const years = parseFloat(experienceMatch[1]);
        if (years > criteria.maxYearsExperience) return false;
      }
    }

    // Filter by skills
    if (criteria.skills && criteria.skills.length > 0) {
      const hasMatchingSkill = criteria.skills.some(skill => 
        talent.skills.toLowerCase().includes(skill)
      );
      if (!hasMatchingSkill) return false;
    }

    // Filter by location
    if (criteria.location && criteria.location.length > 0) {
      const hasMatchingLocation = criteria.location.some(loc => 
        talent.location.toLowerCase().includes(loc)
      );
      if (!hasMatchingLocation) return false;
    }

    // Filter by department
    if (criteria.department && criteria.department.length > 0) {
      const hasMatchingDepartment = criteria.department.some(dept => 
        talent.department.toLowerCase().includes(dept)
      );
      if (!hasMatchingDepartment) return false;
    }

    // Filter by performance
    if (criteria.minPerformance !== undefined) {
      if (talent.performance < criteria.minPerformance) return false;
    }

    // Filter by name
    if (criteria.name) {
      if (!talent.name.toLowerCase().includes(criteria.name.toLowerCase())) return false;
    }

    return true;
  });
}

export function generateFilterSummary(criteria: FilterCriteria, resultCount: number): string {
  const parts: string[] = [];

  if (criteria.education && criteria.education.length > 0) {
    parts.push(`studied ${criteria.education.join(' or ')}`);
  }

  if (criteria.minYearsExperience !== undefined) {
    parts.push(`${criteria.minYearsExperience}+ years experience`);
  }

  if (criteria.maxYearsExperience !== undefined) {
    parts.push(`less than ${criteria.maxYearsExperience} years experience`);
  }

  if (criteria.skills && criteria.skills.length > 0) {
    parts.push(`skills in ${criteria.skills.join(', ')}`);
  }

  if (criteria.location && criteria.location.length > 0) {
    parts.push(`located in ${criteria.location.join(' or ')}`);
  }

  if (criteria.department && criteria.department.length > 0) {
    parts.push(`from ${criteria.department.join(' or ')} department`);
  }

  if (criteria.minPerformance !== undefined) {
    parts.push(`${criteria.minPerformance}★ performance`);
  }

  if (criteria.name) {
    parts.push(`named "${criteria.name}"`);
  }

  const summary = parts.length > 0 
    ? `Found ${resultCount} talent${resultCount !== 1 ? 's' : ''} ${parts.join(', ')}`
    : `Showing all ${resultCount} talents`;

  return summary;
}
