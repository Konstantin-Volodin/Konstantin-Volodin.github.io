import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import Projects from '../projects';
import { GROUPS } from '../../utils/urlHelpers';

// Mock the projectsData module
jest.mock('../projectsData', () => {
  return [
    {
      name: 'React Web App',
      company: 'Tech Corp',
      description: 'A web application',
      longDescription: 'A comprehensive web application built with React',
      picture: '/test-image.jpg',
      skills: ['Web Development'],
      technologies: ['React', 'JavaScript'],
      link: null
    },
    {
      name: 'ML Model',
      company: 'AI Labs',
      description: 'Machine learning model',
      longDescription: 'A machine learning model for prediction',
      picture: '/test-ml.jpg',
      skills: ['Data Science', 'Machine Learning'],
      technologies: ['Python', 'PyTorch'],
      link: null
    },
    {
      name: 'Optimization Engine',
      company: 'OptCorp',
      description: 'Mathematical optimization',
      longDescription: 'Advanced optimization algorithms',
      picture: '/test-opt.jpg',
      skills: ['Mathematical Optimization', 'Algorithms'],
      technologies: ['Python', 'Gurobi'],
      link: null
    },
    {
      name: 'Analytics Dashboard',
      company: 'DataCorp',
      description: 'Business analytics',
      longDescription: 'Dashboard for business intelligence',
      picture: '/test-analytics.jpg',
      skills: ['Data Analysis', 'Visualization'],
      technologies: ['Python', 'Power BI'],
      link: null
    },
    {
      name: 'Cloud Solution',
      company: 'CloudTech',
      description: 'Cloud infrastructure',
      longDescription: 'Scalable cloud infrastructure',
      picture: '/test-cloud.jpg',
      skills: ['Cloud Providers', 'DevOps'],
      technologies: ['AWS', 'Docker'],
      link: null
    }
  ];
});

// Mock window.location and other browser APIs
const mockLocation = {
  href: 'https://example.com',
  hash: '',
  search: '',
  pathname: '/',
  origin: 'https://example.com'
};

const mockHistory = {
  pushState: jest.fn(),
  replaceState: jest.fn(),
  state: {}
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true
});

Object.defineProperty(window, 'history', {
  value: mockHistory,
  writable: true
});

Object.defineProperty(window, 'addEventListener', {
  value: jest.fn(),
  writable: true
});

Object.defineProperty(window, 'removeEventListener', {
  value: jest.fn(),
  writable: true
});

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn()
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true
});

// Mock IntersectionObserver for react-visibility-sensor
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

// Helper function to render component with Chakra Provider
const renderWithChakra = (component: React.ReactElement) => {
  return render(
    <ChakraProvider>
      {component}
    </ChakraProvider>
  );
};

describe('Projects Component - Filter Logic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocation.href = 'https://example.com';
    mockLocation.hash = '';
    mockLocation.search = '';
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  describe('Category filtering', () => {
    it('should render all projects when "All" category is selected', () => {
      renderWithChakra(<Projects />);
      
      // Should display all 5 projects
      expect(screen.getByText('React Web App')).toBeInTheDocument();
      expect(screen.getByText('ML Model')).toBeInTheDocument();
      expect(screen.getByText('Optimization Engine')).toBeInTheDocument();
      expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Cloud Solution')).toBeInTheDocument();
    });

    it('should filter Web projects correctly', () => {
      renderWithChakra(<Projects />);
      
      // Click on Web filter
      fireEvent.click(screen.getByText('Web'));
      
      // Should only show React Web App
      expect(screen.getByText('React Web App')).toBeInTheDocument();
      expect(screen.queryByText('ML Model')).not.toBeInTheDocument();
      expect(screen.queryByText('Optimization Engine')).not.toBeInTheDocument();
      expect(screen.queryByText('Analytics Dashboard')).not.toBeInTheDocument();
      expect(screen.queryByText('Cloud Solution')).not.toBeInTheDocument();
    });

    it('should filter ML projects correctly', () => {
      renderWithChakra(<Projects />);
      
      // Click on ML filter
      fireEvent.click(screen.getByText('ML'));
      
      // Should only show ML Model
      expect(screen.queryByText('React Web App')).not.toBeInTheDocument();
      expect(screen.getByText('ML Model')).toBeInTheDocument();
      expect(screen.queryByText('Optimization Engine')).not.toBeInTheDocument();
      expect(screen.queryByText('Analytics Dashboard')).not.toBeInTheDocument();
      expect(screen.queryByText('Cloud Solution')).not.toBeInTheDocument();
    });

    it('should filter Optimization projects correctly', () => {
      renderWithChakra(<Projects />);
      
      // Click on Optimization filter
      fireEvent.click(screen.getByText('Optimization'));
      
      // Should only show Optimization Engine
      expect(screen.queryByText('React Web App')).not.toBeInTheDocument();
      expect(screen.queryByText('ML Model')).not.toBeInTheDocument();
      expect(screen.getByText('Optimization Engine')).toBeInTheDocument();
      expect(screen.queryByText('Analytics Dashboard')).not.toBeInTheDocument();
      expect(screen.queryByText('Cloud Solution')).not.toBeInTheDocument();
    });

    it('should filter Analytics projects correctly', () => {
      renderWithChakra(<Projects />);
      
      // Click on Analytics filter
      fireEvent.click(screen.getByText('Analytics'));
      
      // Should only show Analytics Dashboard
      expect(screen.queryByText('React Web App')).not.toBeInTheDocument();
      expect(screen.queryByText('ML Model')).not.toBeInTheDocument();
      expect(screen.queryByText('Optimization Engine')).not.toBeInTheDocument();
      expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();
      expect(screen.queryByText('Cloud Solution')).not.toBeInTheDocument();
    });

    it('should filter Cloud projects correctly', () => {
      renderWithChakra(<Projects />);
      
      // Click on Cloud filter
      fireEvent.click(screen.getByText('Cloud'));
      
      // Should only show Cloud Solution
      expect(screen.queryByText('React Web App')).not.toBeInTheDocument();
      expect(screen.queryByText('ML Model')).not.toBeInTheDocument();
      expect(screen.queryByText('Optimization Engine')).not.toBeInTheDocument();
      expect(screen.queryByText('Analytics Dashboard')).not.toBeInTheDocument();
      expect(screen.getByText('Cloud Solution')).toBeInTheDocument();
    });
  });

  describe('Technology filtering', () => {
    it('should filter by Python technology', () => {
      renderWithChakra(<Projects />);
      
      // Click on Python filter
      fireEvent.click(screen.getByText('Python'));
      
      // Should show projects that use Python (ML Model, Optimization Engine, Analytics Dashboard)
      expect(screen.queryByText('React Web App')).not.toBeInTheDocument();
      expect(screen.getByText('ML Model')).toBeInTheDocument();
      expect(screen.getByText('Optimization Engine')).toBeInTheDocument();
      expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();
      expect(screen.queryByText('Cloud Solution')).not.toBeInTheDocument();
    });

    it('should filter by React technology', () => {
      renderWithChakra(<Projects />);
      
      // Click on React filter (assuming it's in the tech filters)
      const reactButton = screen.getAllByText('React').find(button => 
        button.tagName === 'SPAN' && button.closest('[role="button"]')
      );
      
      if (reactButton) {
        fireEvent.click(reactButton.closest('[role="button"]')!);
        
        // Should only show React Web App
        expect(screen.getByText('React Web App')).toBeInTheDocument();
        expect(screen.queryByText('ML Model')).not.toBeInTheDocument();
        expect(screen.queryByText('Optimization Engine')).not.toBeInTheDocument();
        expect(screen.queryByText('Analytics Dashboard')).not.toBeInTheDocument();
        expect(screen.queryByText('Cloud Solution')).not.toBeInTheDocument();
      }
    });
  });

  describe('Combined filtering', () => {
    it('should combine category and technology filters', () => {
      renderWithChakra(<Projects />);
      
      // First filter by ML category
      fireEvent.click(screen.getByText('ML'));
      
      // Then filter by Python technology
      fireEvent.click(screen.getByText('Python'));
      
      // Should show ML Model (has both ML skills and Python technology)
      expect(screen.queryByText('React Web App')).not.toBeInTheDocument();
      expect(screen.getByText('ML Model')).toBeInTheDocument();
      expect(screen.queryByText('Optimization Engine')).not.toBeInTheDocument();
      expect(screen.queryByText('Analytics Dashboard')).not.toBeInTheDocument();
      expect(screen.queryByText('Cloud Solution')).not.toBeInTheDocument();
    });

    it('should show no results when filters don\'t match any projects', () => {
      renderWithChakra(<Projects />);
      
      // Filter by Web category
      fireEvent.click(screen.getByText('Web'));
      
      // Then filter by Python technology (React Web App doesn't use Python)
      fireEvent.click(screen.getByText('Python'));
      
      // Should show no projects
      expect(screen.queryByText('React Web App')).not.toBeInTheDocument();
      expect(screen.queryByText('ML Model')).not.toBeInTheDocument();
      expect(screen.queryByText('Optimization Engine')).not.toBeInTheDocument();
      expect(screen.queryByText('Analytics Dashboard')).not.toBeInTheDocument();
      expect(screen.queryByText('Cloud Solution')).not.toBeInTheDocument();
    });
  });

  describe('Clear filters functionality', () => {
    it('should show clear filters button when filters are active', () => {
      renderWithChakra(<Projects />);
      
      // Initially no clear button should be visible
      expect(screen.queryByText('Clear filters')).not.toBeInTheDocument();
      
      // Apply a filter
      fireEvent.click(screen.getByText('Web'));
      
      // Now clear filters button should be visible
      expect(screen.getByText('Clear filters')).toBeInTheDocument();
    });

    it('should clear all filters when clear button is clicked', () => {
      renderWithChakra(<Projects />);
      
      // Apply filters
      fireEvent.click(screen.getByText('Web'));
      fireEvent.click(screen.getByText('Python'));
      
      // Clear filters
      fireEvent.click(screen.getByText('Clear filters'));
      
      // Should show all projects again
      expect(screen.getByText('React Web App')).toBeInTheDocument();
      expect(screen.getByText('ML Model')).toBeInTheDocument();
      expect(screen.getByText('Optimization Engine')).toBeInTheDocument();
      expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Cloud Solution')).toBeInTheDocument();
      
      // Clear button should be hidden
      expect(screen.queryByText('Clear filters')).not.toBeInTheDocument();
    });
  });

  describe('Filter state persistence', () => {
    it('should sync filter state to localStorage', () => {
      renderWithChakra(<Projects />);
      
      // Apply filter
      fireEvent.click(screen.getByText('Web'));
      
      // Should save to localStorage
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('kv.projects.activeGroup', 'Web');
    });

    it('should sync technology filter to localStorage', () => {
      renderWithChakra(<Projects />);
      
      // Apply technology filter
      fireEvent.click(screen.getByText('Python'));
      
      // Should save to localStorage
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('kv.projects.activeTech', 'Python');
    });

    it('should initialize from localStorage if URL params are not present', () => {
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'kv.projects.activeGroup') return 'ML';
        if (key === 'kv.projects.activeTech') return 'Python';
        return null;
      });
      
      renderWithChakra(<Projects />);
      
      // Should start with ML filter applied
      expect(screen.queryByText('React Web App')).not.toBeInTheDocument();
      expect(screen.getByText('ML Model')).toBeInTheDocument();
    });
  });

  describe('URL synchronization', () => {
    it('should update URL when filter changes', () => {
      renderWithChakra(<Projects />);
      
      // Apply filter
      fireEvent.click(screen.getByText('Web'));
      
      // Should update URL
      expect(mockHistory.replaceState).toHaveBeenCalled();
    });

    it('should initialize from URL parameters', () => {
      mockLocation.href = 'https://example.com?cat=ML&tech=Python';
      
      renderWithChakra(<Projects />);
      
      // Should start with filters applied based on URL
      expect(screen.queryByText('React Web App')).not.toBeInTheDocument();
      expect(screen.getByText('ML Model')).toBeInTheDocument();
    });
  });
});

describe('Filter Logic - Unit Tests for GROUPS', () => {
  describe('GROUPS filter functions', () => {
    it('should identify Web projects correctly', () => {
      const webDevProject = { skills: ['Web Development'], technologies: [] };
      const reactProject = { skills: [], technologies: ['React'] };
      const djangoProject = { skills: [], technologies: ['Django'] };
      const nonWebProject = { skills: ['Data Science'], technologies: ['Python'] };

      expect(GROUPS.Web(webDevProject)).toBe(true);
      expect(GROUPS.Web(reactProject)).toBe(true);
      expect(GROUPS.Web(djangoProject)).toBe(true);
      expect(GROUPS.Web(nonWebProject)).toBe(false);
    });

    it('should identify ML projects correctly', () => {
      const dataScienceProject = { skills: ['Data Science'], technologies: [] };
      const pytorchProject = { skills: [], technologies: ['PyTorch'] };
      const statsProject = { skills: [], technologies: ['Statsforecast'] };
      const nonMLProject = { skills: ['Web Development'], technologies: ['React'] };

      expect(GROUPS.ML(dataScienceProject)).toBe(true);
      expect(GROUPS.ML(pytorchProject)).toBe(true);
      expect(GROUPS.ML(statsProject)).toBe(true);
      expect(GROUPS.ML(nonMLProject)).toBe(false);
    });

    it('should identify Optimization projects correctly', () => {
      const optimizationProject = { skills: ['Mathematical Optimization'], technologies: [] };
      const gurobiProject = { skills: [], technologies: ['Gurobi'] };
      const optimizationSkillProject = { skills: ['Optimization Algorithms'], technologies: [] };
      const nonOptProject = { skills: ['Web Development'], technologies: ['React'] };

      expect(GROUPS.Optimization(optimizationProject)).toBe(true);
      expect(GROUPS.Optimization(gurobiProject)).toBe(true);
      expect(GROUPS.Optimization(optimizationSkillProject)).toBe(true);
      expect(GROUPS.Optimization(nonOptProject)).toBe(false);
    });

    it('should identify Analytics projects correctly', () => {
      const analysisProject = { skills: ['Data Analysis'], technologies: [] };
      const vizProject = { skills: ['Visualization'], technologies: [] };
      const dashProject = { skills: ['Dashboarding'], technologies: [] };
      const nonAnalyticsProject = { skills: ['Web Development'], technologies: ['React'] };

      expect(GROUPS.Analytics(analysisProject)).toBe(true);
      expect(GROUPS.Analytics(vizProject)).toBe(true);
      expect(GROUPS.Analytics(dashProject)).toBe(true);
      expect(GROUPS.Analytics(nonAnalyticsProject)).toBe(false);
    });

    it('should identify Cloud projects correctly', () => {
      const gcpProject = { skills: [], technologies: ['GCP'] };
      const awsProject = { skills: [], technologies: ['AWS'] };
      const cloudSkillProject = { skills: ['Cloud Providers'], technologies: [] };
      const nonCloudProject = { skills: ['Web Development'], technologies: ['React'] };

      expect(GROUPS.Cloud(gcpProject)).toBe(true);
      expect(GROUPS.Cloud(awsProject)).toBe(true);
      expect(GROUPS.Cloud(cloudSkillProject)).toBe(true);
      expect(GROUPS.Cloud(nonCloudProject)).toBe(false);
    });

    it('should handle edge cases with missing or null arrays', () => {
      const emptyProject = {};
      const nullProject = { skills: null, technologies: null };
      const undefinedProject = { skills: undefined, technologies: undefined };

      // All filters should handle missing data gracefully
      expect(GROUPS.Web(emptyProject)).toBe(false);
      expect(GROUPS.Web(nullProject)).toBe(false);
      expect(GROUPS.Web(undefinedProject)).toBe(false);

      expect(GROUPS.ML(emptyProject)).toBe(false);
      expect(GROUPS.Analytics(emptyProject)).toBe(false);
      expect(GROUPS.Cloud(emptyProject)).toBe(false);
      expect(GROUPS.Optimization(emptyProject)).toBe(false);
    });

    it('should handle case sensitivity in skill matching', () => {
      const lowerCaseProject = { skills: ['data analysis'], technologies: [] };
      const upperCaseProject = { skills: ['DATA ANALYSIS'], technologies: [] };
      const mixedCaseProject = { skills: ['Data Analysis'], technologies: [] };

      // Only exact case match should work (based on current implementation)
      expect(GROUPS.Analytics(lowerCaseProject)).toBe(false);
      expect(GROUPS.Analytics(upperCaseProject)).toBe(false);
      expect(GROUPS.Analytics(mixedCaseProject)).toBe(true);
    });
  });
});