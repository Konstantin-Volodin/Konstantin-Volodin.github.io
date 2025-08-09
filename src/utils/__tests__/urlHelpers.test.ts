import {
  getCatFromUrl,
  getTechFromUrl,
  getProjectFromUrl,
  GROUPS,
  GroupKey,
  GROUP_NAMES,
  isValidGroup,
  syncSelection,
  setProjectInUrl,
  removeProjectFromUrl,
  slugify,
  STORAGE_KEY,
  STORAGE_TECH_KEY
} from '../urlHelpers';

// Mock window.location and window.history for testing
const mockLocation = {
  href: 'https://example.com',
  hash: '',
  search: ''
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

describe('URL Helper Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocation.href = 'https://example.com';
    mockLocation.hash = '';
    mockLocation.search = '';
  });

  describe('getCatFromUrl', () => {
    it('should return category from search params', () => {
      mockLocation.href = 'https://example.com?cat=Web';
      expect(getCatFromUrl()).toBe('Web');
    });

    it('should return category from hash', () => {
      mockLocation.hash = '#cat=ML';
      expect(getCatFromUrl()).toBe('ML');
    });

    it('should return decoded category from hash', () => {
      mockLocation.hash = '#cat=Optimization%20Test';
      expect(getCatFromUrl()).toBe('Optimization Test');
    });

    it('should prioritize search params over hash', () => {
      mockLocation.href = 'https://example.com?cat=Web';
      mockLocation.hash = '#cat=ML';
      expect(getCatFromUrl()).toBe('Web');
    });

    it('should return null if no category found', () => {
      expect(getCatFromUrl()).toBeNull();
    });

    it('should handle malformed URLs gracefully', () => {
      mockLocation.href = 'not-a-url';
      expect(getCatFromUrl()).toBeNull();
    });

    it('should handle complex hash patterns', () => {
      mockLocation.hash = '#section=projects&cat=Analytics&other=value';
      expect(getCatFromUrl()).toBe('Analytics');
    });
  });

  describe('getTechFromUrl', () => {
    it('should return technology from search params', () => {
      mockLocation.href = 'https://example.com?tech=React';
      expect(getTechFromUrl()).toBe('React');
    });

    it('should return technology from hash', () => {
      mockLocation.hash = '#tech=Python';
      expect(getTechFromUrl()).toBe('Python');
    });

    it('should return decoded technology from hash', () => {
      mockLocation.hash = '#tech=Node.js';
      expect(getTechFromUrl()).toBe('Node.js');
    });

    it('should prioritize search params over hash', () => {
      mockLocation.href = 'https://example.com?tech=Python';
      mockLocation.hash = '#tech=React';
      expect(getTechFromUrl()).toBe('Python');
    });

    it('should return null if no technology found', () => {
      expect(getTechFromUrl()).toBeNull();
    });

    it('should handle malformed URLs gracefully', () => {
      mockLocation.href = 'invalid';
      expect(getTechFromUrl()).toBeNull();
    });
  });

  describe('getProjectFromUrl', () => {
    it('should return project from search params', () => {
      mockLocation.href = 'https://example.com?project=test-project';
      expect(getProjectFromUrl()).toBe('test-project');
    });

    it('should return null if no project found', () => {
      expect(getProjectFromUrl()).toBeNull();
    });

    it('should handle malformed URLs gracefully', () => {
      mockLocation.href = 'malformed-url';
      expect(getProjectFromUrl()).toBeNull();
    });
  });

  describe('GROUPS filtering functions', () => {
    const mockProject = {
      skills: ['Web Development', 'Data Science'],
      technologies: ['React', 'Python', 'PyTorch']
    };

    it('should have All group that accepts everything', () => {
      expect(GROUPS.All()).toBe(true);
      expect(GROUPS.All(mockProject)).toBe(true);
      expect(GROUPS.All({})).toBe(true);
    });

    it('should filter Web projects correctly', () => {
      const webProject = { skills: ['Web Development'], technologies: [] };
      const reactProject = { skills: [], technologies: ['React'] };
      const djangoProject = { skills: [], technologies: ['Django'] };
      const otherProject = { skills: ['Other Skill'], technologies: ['Other Tech'] };

      expect(GROUPS.Web(webProject)).toBe(true);
      expect(GROUPS.Web(reactProject)).toBe(true);
      expect(GROUPS.Web(djangoProject)).toBe(true);
      expect(GROUPS.Web(otherProject)).toBe(false);
    });

    it('should filter ML projects correctly', () => {
      const mlProject = { skills: ['Data Science'], technologies: [] };
      const pytorchProject = { skills: [], technologies: ['PyTorch'] };
      const statsProject = { skills: [], technologies: ['Statsforecast'] };
      const otherProject = { skills: ['Other'], technologies: ['Other'] };

      expect(GROUPS.ML(mlProject)).toBe(true);
      expect(GROUPS.ML(pytorchProject)).toBe(true);
      expect(GROUPS.ML(statsProject)).toBe(true);
      expect(GROUPS.ML(otherProject)).toBe(false);
    });

    it('should filter Optimization projects correctly', () => {
      const optimizationSkillProject = { skills: ['Mathematical Optimization'], technologies: [] };
      const gurobiProject = { skills: [], technologies: ['Gurobi'] };
      const otherProject = { skills: ['Other'], technologies: ['Other'] };

      expect(GROUPS.Optimization(optimizationSkillProject)).toBe(true);
      expect(GROUPS.Optimization(gurobiProject)).toBe(true);
      expect(GROUPS.Optimization(otherProject)).toBe(false);
    });

    it('should filter Analytics projects correctly', () => {
      const analysisProject = { skills: ['Data Analysis'], technologies: [] };
      const vizProject = { skills: ['Visualization'], technologies: [] };
      const dashProject = { skills: ['Dashboarding'], technologies: [] };
      const otherProject = { skills: ['Other'], technologies: ['Other'] };

      expect(GROUPS.Analytics(analysisProject)).toBe(true);
      expect(GROUPS.Analytics(vizProject)).toBe(true);
      expect(GROUPS.Analytics(dashProject)).toBe(true);
      expect(GROUPS.Analytics(otherProject)).toBe(false);
    });

    it('should filter Cloud projects correctly', () => {
      const gcpProject = { skills: [], technologies: ['GCP'] };
      const awsProject = { skills: [], technologies: ['AWS'] };
      const cloudSkillProject = { skills: ['Cloud Providers'], technologies: [] };
      const otherProject = { skills: ['Other'], technologies: ['Other'] };

      expect(GROUPS.Cloud(gcpProject)).toBe(true);
      expect(GROUPS.Cloud(awsProject)).toBe(true);
      expect(GROUPS.Cloud(cloudSkillProject)).toBe(true);
      expect(GROUPS.Cloud(otherProject)).toBe(false);
    });

    it('should handle projects with missing skills/technologies arrays', () => {
      const emptyProject = {};
      const nullProject = { skills: null, technologies: null };
      const undefinedProject = { skills: undefined, technologies: undefined };

      expect(GROUPS.Web(emptyProject)).toBe(false);
      expect(GROUPS.Web(nullProject)).toBe(false);
      expect(GROUPS.Web(undefinedProject)).toBe(false);
    });
  });

  describe('GROUP_NAMES', () => {
    it('should contain all expected group names', () => {
      expect(GROUP_NAMES).toEqual(['All', 'Web', 'ML', 'Optimization', 'Analytics', 'Cloud']);
    });
  });

  describe('isValidGroup', () => {
    it('should return true for valid group names', () => {
      expect(isValidGroup('All')).toBe(true);
      expect(isValidGroup('Web')).toBe(true);
      expect(isValidGroup('ML')).toBe(true);
      expect(isValidGroup('Optimization')).toBe(true);
      expect(isValidGroup('Analytics')).toBe(true);
      expect(isValidGroup('Cloud')).toBe(true);
    });

    it('should return false for invalid group names', () => {
      expect(isValidGroup('Invalid')).toBe(false);
      expect(isValidGroup('')).toBe(false);
      expect(isValidGroup(null)).toBe(false);
      expect(isValidGroup(undefined)).toBe(false);
      expect(isValidGroup(123)).toBe(false);
      expect(isValidGroup({})).toBe(false);
    });

    it('should be case sensitive', () => {
      expect(isValidGroup('web')).toBe(false);
      expect(isValidGroup('WEB')).toBe(false);
      expect(isValidGroup('all')).toBe(false);
    });
  });

  describe('syncSelection', () => {
    beforeEach(() => {
      mockLocation.href = 'https://example.com';
    });

    it('should sync category and technology to localStorage', () => {
      syncSelection('Web', 'React');

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(STORAGE_KEY, 'Web');
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(STORAGE_TECH_KEY, 'React');
    });

    it('should update URL with both parameters', () => {
      syncSelection('ML', 'Python');

      expect(mockHistory.replaceState).toHaveBeenCalledWith(
        mockHistory.state,
        '',
        'https://example.com/?cat=ML&tech=Python'
      );
    });

    it('should omit tech parameter when it is "All"', () => {
      syncSelection('Web', 'All');

      expect(mockHistory.replaceState).toHaveBeenCalledWith(
        mockHistory.state,
        '',
        'https://example.com/?cat=Web'
      );
    });

    it('should use pushState when replace is false', () => {
      syncSelection('Analytics', 'Python', false);

      expect(mockHistory.pushState).toHaveBeenCalled();
      expect(mockHistory.replaceState).not.toHaveBeenCalled();
    });

    it('should use replaceState when replace is true (default)', () => {
      syncSelection('Cloud', 'AWS');

      expect(mockHistory.replaceState).toHaveBeenCalled();
      expect(mockHistory.pushState).not.toHaveBeenCalled();
    });

    it('should preserve existing hash in URL', () => {
      mockLocation.href = 'https://example.com#section';
      syncSelection('Web', 'React');

      expect(mockHistory.replaceState).toHaveBeenCalledWith(
        mockHistory.state,
        '',
        'https://example.com/?cat=Web&tech=React#section'
      );
    });

    it('should handle errors gracefully', () => {
      mockLocation.href = 'invalid-url';
      expect(() => syncSelection('Web', 'React')).not.toThrow();
    });
  });

  describe('setProjectInUrl', () => {
    beforeEach(() => {
      mockLocation.href = 'https://example.com';
    });

    it('should add project parameter to URL', () => {
      setProjectInUrl('test-project');

      expect(mockHistory.pushState).toHaveBeenCalledWith(
        mockHistory.state,
        '',
        'https://example.com/?project=test-project'
      );
    });

    it('should not update if project is already the same', () => {
      mockLocation.href = 'https://example.com?project=test-project';
      setProjectInUrl('test-project');

      expect(mockHistory.pushState).not.toHaveBeenCalled();
    });

    it('should update if project is different', () => {
      mockLocation.href = 'https://example.com?project=old-project';
      setProjectInUrl('new-project');

      expect(mockHistory.pushState).toHaveBeenCalledWith(
        mockHistory.state,
        '',
        'https://example.com/?project=new-project'
      );
    });

    it('should handle errors gracefully', () => {
      mockLocation.href = 'invalid-url';
      expect(() => setProjectInUrl('test')).not.toThrow();
    });
  });

  describe('removeProjectFromUrl', () => {
    it('should remove project parameter from URL', () => {
      mockLocation.href = 'https://example.com?project=test-project&other=value';
      removeProjectFromUrl();

      expect(mockHistory.replaceState).toHaveBeenCalledWith(
        mockHistory.state,
        '',
        'https://example.com/?other=value'
      );
    });

    it('should not update if no project parameter exists', () => {
      mockLocation.href = 'https://example.com?other=value';
      removeProjectFromUrl();

      expect(mockHistory.replaceState).not.toHaveBeenCalled();
    });

    it('should handle errors gracefully', () => {
      mockLocation.href = 'invalid-url';
      expect(() => removeProjectFromUrl()).not.toThrow();
    });
  });

  describe('slugify', () => {
    it('should convert strings to URL-safe slugs', () => {
      expect(slugify('Test Project Name')).toBe('test-project-name');
      expect(slugify('Hello World!')).toBe('hello-world');
      expect(slugify('Project with 123 Numbers')).toBe('project-with-123-numbers');
      expect(slugify('Special@#$%Characters')).toBe('specialcharacters');
    });

    it('should handle empty and null values', () => {
      expect(slugify('')).toBe('');
      expect(slugify('   ')).toBe('-'); // Multiple spaces become a single hyphen
    });

    it('should handle multiple spaces', () => {
      expect(slugify('Multiple    Spaces')).toBe('multiple-spaces');
    });

    it('should preserve hyphens', () => {
      expect(slugify('already-has-hyphens')).toBe('already-has-hyphens');
    });

    it('should handle mixed case', () => {
      expect(slugify('MiXeD CaSe')).toBe('mixed-case');
    });
  });
});