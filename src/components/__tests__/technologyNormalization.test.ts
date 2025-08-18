import projectsData from '../ProjectsData';

// Expected technology names that should be present in TOP_TECHS for filtering
const EXPECTED_TECH_NAMES = [
  'Python', 'R', 'SQL', 'JavaScript', 'TypeScript', 'React', 'Django', 
  'PyTorch', 'GCP', 'AWS', 'Docker', 'Airflow', 'Databricks', 'Power BI', 
  'Postman', 'Node.js', 'NoSQL'
];

describe('Technology Naming Normalization', () => {
  
  it('should have consistent technology names across all projects', () => {
    // Extract all technology names from project data
    const allTechnologies = new Set<string>();
    
    projectsData.forEach((project: any) => {
      if (Array.isArray(project.technologies)) {
        project.technologies.forEach((tech: string) => {
          allTechnologies.add(tech);
        });
      }
    });

    // Check for specific known inconsistencies that break filtering
    const inconsistentNames = Array.from(allTechnologies).filter(tech => {
      // Check for Power BI vs PowerBi
      if (tech === 'PowerBi') {
        return true; // This should be 'Power BI'
      }
      
      // Check for Node.js vs NodeJS variations  
      if (tech.match(/^node(?:js)?$/i) && tech !== 'Node.js') {
        return true;
      }
      
      return false;
    });

    expect(inconsistentNames).toEqual([]);
  });

  it('should only use technology names that exist in the expected filter list or are reasonable extensions', () => {
    const allTechnologies = new Set<string>();
    
    projectsData.forEach((project: any) => {
      if (Array.isArray(project.technologies)) {
        project.technologies.forEach((tech: string) => {
          allTechnologies.add(tech);
        });
      }
    });

    // Technologies that are not in EXPECTED_TECH_NAMES but are reasonable
    const allowedExtensions = [
      'Statsforecast', 'Plotly', 'Shiny', 'Excel', 'RMarkdown', 
      'Linux', 'Gurobi', 'MySQL', 'SPSS'
    ];

    const allAllowed = [...EXPECTED_TECH_NAMES, ...allowedExtensions];
    
    const unexpectedTechs = Array.from(allTechnologies).filter(tech => 
      !allAllowed.includes(tech)
    );

    // If this fails, either the technology should be added to allowedExtensions
    // or it should be renamed to match an expected name
    expect(unexpectedTechs).toEqual([]);
  });

  it('should ensure all technologies used in TOP_TECHS filtering are present in project data', () => {
    // This test ensures that if we add a technology to TOP_TECHS for filtering,
    // it actually exists in the project data
    const projectTechnologies = new Set<string>();
    
    projectsData.forEach((project: any) => {
      if (Array.isArray(project.technologies)) {
        project.technologies.forEach((tech: string) => {
          projectTechnologies.add(tech);
        });
      }
    });

    // Check that key technologies that should be filterable are actually present
    const criticalTechnologies = ['Python', 'React', 'R', 'SQL', 'Power BI'];
    
    criticalTechnologies.forEach(tech => {
      expect(projectTechnologies.has(tech)).toBe(true);
    });
  });

  it('should have proper filter coverage - each technology should surface relevant projects', () => {
    // Test that the most common technologies actually filter projects
    const commonTechs = ['Python', 'React', 'R', 'SQL'];
    
    commonTechs.forEach(tech => {
      const projectsWithTech = projectsData.filter((project: any) => 
        Array.isArray(project.technologies) && project.technologies.includes(tech)
      );
      
      expect(projectsWithTech.length).toBeGreaterThan(0);
    });
  });

  it('should specifically test Power BI naming consistency', () => {
    // This test specifically addresses the issue mentioned in the PR
    const projectsWithPowerBI = projectsData.filter((project: any) => 
      Array.isArray(project.technologies) && project.technologies.includes('Power BI')
    );
    
    const projectsWithPowerBi = projectsData.filter((project: any) => 
      Array.isArray(project.technologies) && project.technologies.includes('PowerBi')
    );
    
    // Should have projects using 'Power BI' (correct name)
    expect(projectsWithPowerBI.length).toBeGreaterThan(0);
    
    // Should NOT have projects using 'PowerBi' (incorrect name)
    expect(projectsWithPowerBi.length).toBe(0);
  });
});