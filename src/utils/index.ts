// Animation utilities
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 300, damping: 17 }
};

// Text utilities
export const truncateText = (text: string, maxLength: number = 150): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Date utilities
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short' 
  });
};

export const calculateDuration = (startDate: string, endDate?: string): string => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  const months = (end.getFullYear() - start.getFullYear()) * 12 + 
                 (end.getMonth() - start.getMonth());
  
  if (months < 12) {
    return `${months} month${months !== 1 ? 's' : ''}`;
  }
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  }
  
  return `${years}y ${remainingMonths}m`;
};

// Color utilities
export const getSkillColor = (proficiency: number): string => {
  const colors = ['red.400', 'orange.400', 'yellow.400', 'green.400', 'blue.400'];
  return colors[Math.max(0, Math.min(4, proficiency - 1))] || 'gray.400';
};

export const getTechBadgeColor = (tech: string): string => {
  const colorMap: Record<string, string> = {
    'React': 'blue',
    'Python': 'green', 
    'JavaScript': 'yellow',
    'TypeScript': 'blue',
    'Node.js': 'green',
    'AWS': 'orange',
    'GCP': 'red',
    'SQL': 'purple',
    'NoSQL': 'teal',
  };
  return colorMap[tech] || 'gray';
};