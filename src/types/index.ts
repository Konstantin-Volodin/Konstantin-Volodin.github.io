// Project data types
export interface Project {
  company: string;
  name: string;
  description: string;
  longDescription: string;
  picture: string;
  technologies: string[];
  skills: string[];
  link: string | null;
  status?: 'Active' | 'Completed' | 'Archived';
  startDate?: string;
  endDate?: string;
  teamSize?: number;
  featured?: boolean;
}

// Skills data types  
export interface Skill {
  name: string;
  image?: string;
  proficiency?: number; // 1-5 scale
  yearsExperience?: number;
  description?: string;
  certifications?: string[];
}

export interface SkillSection {
  section: string;
  skills: Skill[];
  icon?: string;
}

// Theme types
export type ColorMode = 'light' | 'dark';

// Component prop types
export interface ProjectCardProps {
  project: Project;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface SkillCardProps {
  skill: Skill;
  variant?: 'default' | 'compact';
}