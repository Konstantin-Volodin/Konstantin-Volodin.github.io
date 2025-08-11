// Type definitions for project data structures

export interface Project {
  company: string;
  name: string;
  description: string;
  longDescription: string;
  picture: string; // Image imports from webpack
  technologies: string[];
  skills: string[];
  link: string | null;
}

export interface ProjectCardProps {
  name: string;
  company: string;
  description: string;
  longDescription: string;
  pic: string; // Image imports from webpack
  skills: string[];
  technologies: string[];
  link: string | null;
}

export interface Skill {
  name: string;
  image: string; // Image imports from webpack
}

export interface SkillSection {
  section: string;
  skills: Skill[];
}