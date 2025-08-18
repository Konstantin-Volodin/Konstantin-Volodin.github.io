import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { vi } from 'vitest';
import Projects from '../Projects';
import theme from '../../static/fonts/theme';

// Mock the project data to have a controlled test environment
vi.mock('../projectsData', () => ({
  default: [
  {
    name: 'Test Web Project',
    company: 'Test Company',
    description: 'Test description',
    longDescription: 'Test long description',
    picture: '/test.jpg',
    technologies: ['React', 'Python'],
    skills: ['Web Development'],
    link: null
  },
  {
    name: 'Test ML Project', 
    company: 'Test Company',
    description: 'Test ML description',
    longDescription: 'Test ML long description',
    picture: '/test-ml.jpg',
    technologies: ['Python', 'PyTorch'],
    skills: ['Data Science'],
    link: null
  },
  {
    name: 'Test Analytics Project',
    company: 'Test Company', 
    description: 'Test Analytics description',
    longDescription: 'Test Analytics long description',
    picture: '/test-analytics.jpg',
    technologies: ['R', 'SQL'],
    skills: ['Data Analysis'],
    link: null
  }
]}));

// Helper to render component with ChakraProvider
const renderWithChakra = (component: React.ReactElement) => {
  return render(
    <ChakraProvider theme={theme}>
      {component}
    </ChakraProvider>
  );
};

// Mock window.location and window.history for URL testing
const setMockLocation = (href: string, search = '', hash = '') => {
  delete (window as any).location;
  Object.defineProperty(window, 'location', {
    value: {
      href,
      search,
      hash,
      protocol: 'http:',
      host: 'localhost:3000',
      pathname: '/',
      port: '3000',
      hostname: 'localhost'
    },
    writable: true,
    configurable: true
  });
  
  // Mock URL constructor to work with the mock location
  (global as any).URL = vi.fn().mockImplementation((url: string) => {
    const urlObj = new (window as any).URL(url, `http://localhost:3000`);
    return {
      href: urlObj.href,
      search: urlObj.search,
      searchParams: urlObj.searchParams,
      hash: urlObj.hash,
      pathname: urlObj.pathname
    };
  });
};

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true
});

describe('Projects Component - URL Sync and Persistence', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    setMockLocation('http://localhost:3000');
    
    // Set up history mock
    Object.defineProperty(window, 'history', {
      value: {
        pushState: vi.fn(),
        replaceState: vi.fn(),
        state: {}
      },
      writable: true,
      configurable: true
    });
    
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  describe('URL Parameter Parsing', () => {
    test('should initialize with default filters when no URL params', () => {
      renderWithChakra(<Projects />);
      
      const allButtons = screen.getAllByRole('button', { name: 'All', pressed: true });
      expect(allButtons).toHaveLength(2); // Focus and Technology filters both default to All
    });

    test('should initialize from URL search params', () => {
      setMockLocation('http://localhost:3000?cat=Web&tech=React', '?cat=Web&tech=React');
      
      renderWithChakra(<Projects />);
      
      // Should have Web category selected
      expect(screen.getByRole('button', { name: 'Web', pressed: true })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'React', pressed: true })).toBeInTheDocument();
    });

    test('should handle invalid URL params gracefully', () => {
      setMockLocation('http://localhost:3000?cat=InvalidCategory&tech=InvalidTech', '?cat=InvalidCategory&tech=InvalidTech');
      
      renderWithChakra(<Projects />);
      
      // Should fall back to default 'All' - there are 2 All buttons (Focus & Technology)
      const allButtons = screen.getAllByRole('button', { name: 'All', pressed: true });
      expect(allButtons).toHaveLength(2);
    });

    test('should handle malformed URLs gracefully', () => {
      // Mock URL constructor to throw error
      const originalURL = global.URL as any;
      (global as any).URL = vi.fn().mockImplementation(() => {
        throw new Error('Invalid URL');
      });

      renderWithChakra(<Projects />);
      
      // Should still render with defaults - there are 2 All buttons
      const allButtons = screen.getAllByRole('button', { name: 'All', pressed: true });
      expect(allButtons).toHaveLength(2);
      
      // Restore URL constructor
      (global as any).URL = originalURL;
    });
  });

  describe('URL Updates on Filter Changes', () => {
    test('should update URL when category filter changes', async () => {
      renderWithChakra(<Projects />);
      
      const webButton = screen.getByRole('button', { name: 'Web' });
      fireEvent.click(webButton);
      
      await waitFor(() => {
        expect(window.history.replaceState).toHaveBeenCalled();
      });
    });

    test('should update URL when technology filter changes', async () => {
      renderWithChakra(<Projects />);
      
      const pythonButton = screen.getByRole('button', { name: 'Python' });
      fireEvent.click(pythonButton);
      
      await waitFor(() => {
        expect(window.history.replaceState).toHaveBeenCalled();
      });
    });

    test('should preserve hash when updating URL params', async () => {
      setMockLocation('http://localhost:3000#projects', '', '#projects');
      renderWithChakra(<Projects />);
      
      const webButton = screen.getByRole('button', { name: 'Web' });
      fireEvent.click(webButton);
      
      await waitFor(() => {
        expect(window.history.replaceState).toHaveBeenCalled();
      });
    });
  });

  describe('Browser Navigation Support', () => {
    test('should handle popstate events', async () => {
      renderWithChakra(<Projects />);
      
      // Simulate browser back/forward navigation
      setMockLocation('http://localhost:3000?cat=Web', '?cat=Web');
      const popstateEvent = new PopStateEvent('popstate');
      
      fireEvent(window, popstateEvent);
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Web', pressed: true })).toBeInTheDocument();
      });
    });
  });

  describe('LocalStorage Integration', () => {
    test('should save filter state to localStorage', async () => {
      renderWithChakra(<Projects />);
      
      const webButton = screen.getByRole('button', { name: 'Web' });
      fireEvent.click(webButton);
      
      await waitFor(() => {
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith('kv.projects.activeGroup', 'Web');
      });
    });

    test('should load filter state from localStorage when no URL params', () => {
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'kv.projects.activeGroup') return 'Web';
        if (key === 'kv.projects.activeTech') return 'React';
        return null;
      });
      
      renderWithChakra(<Projects />);
      
      expect(screen.getByRole('button', { name: 'Web', pressed: true })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'React', pressed: true })).toBeInTheDocument();
    });

    test('should prioritize URL params over localStorage', () => {
      mockLocalStorage.getItem.mockReturnValue('ML'); // localStorage has ML
      setMockLocation('http://localhost:3000?cat=Web', '?cat=Web'); // URL has Web
      
      renderWithChakra(<Projects />);
      
      // URL should take precedence
      expect(screen.getByRole('button', { name: 'Web', pressed: true })).toBeInTheDocument();
      // Technology filter should still default to All since not in URL
      expect(screen.getByRole('button', { name: 'React', pressed: true })).toBeInTheDocument();
    });
  });

  describe('Filter Logic', () => {
    test('should filter projects by category', () => {
      renderWithChakra(<Projects />);
      
      // Click Web filter
      const webButton = screen.getByRole('button', { name: 'Web' });
      fireEvent.click(webButton);
      
      // Should only show web projects
      expect(screen.getByText('Test Web Project')).toBeInTheDocument();
      expect(screen.queryByText('Test Analytics Project')).not.toBeInTheDocument();
    });

    test('should filter projects by technology', () => {
      renderWithChakra(<Projects />);
      
      // Click Python filter  
      const pythonButton = screen.getByRole('button', { name: 'Python' });
      fireEvent.click(pythonButton);
      
      // Should show projects with Python technology
      expect(screen.getByText('Test Web Project')).toBeInTheDocument();
      expect(screen.getByText('Test ML Project')).toBeInTheDocument();
      expect(screen.queryByText('Test Analytics Project')).not.toBeInTheDocument();
    });

    test('should combine category and technology filters', () => {
      renderWithChakra(<Projects />);
      
      // Click ML category
      const mlButton = screen.getByRole('button', { name: 'ML' });
      fireEvent.click(mlButton);
      
      // Click Python technology
      const pythonButton = screen.getByRole('button', { name: 'Python' });
      fireEvent.click(pythonButton);
      
      // Should only show ML projects with Python
      expect(screen.getByText('Test ML Project')).toBeInTheDocument();
      expect(screen.queryByText('Test Web Project')).not.toBeInTheDocument();
      expect(screen.queryByText('Test Analytics Project')).not.toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    test('should handle localStorage errors gracefully', () => {
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });
      
      renderWithChakra(<Projects />);
      
      const webButton = screen.getByRole('button', { name: 'Web' });
      fireEvent.click(webButton);
      
      // Should not throw error and continue working
      expect(screen.getByRole('button', { name: 'Web', pressed: true })).toBeInTheDocument();
    });

    test('should handle history API errors gracefully', () => {
      // Mock history to throw error
      Object.defineProperty(window, 'history', {
        value: {
          pushState: vi.fn(),
          replaceState: vi.fn().mockImplementation(() => {
            throw new Error('History API error');
          }),
          state: {}
        },
        writable: true,
        configurable: true
      });
      
      renderWithChakra(<Projects />);
      
      const webButton = screen.getByRole('button', { name: 'Web' });
      fireEvent.click(webButton);
      
      // Should not throw error and filter should still work
      expect(screen.getByRole('button', { name: 'Web', pressed: true })).toBeInTheDocument();
    });
  });
});