import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { vi } from 'vitest';
import Projects from '../Projects';
import theme from '../../static/fonts/theme';

// Helper to render component with ChakraProvider
const renderWithChakra = (component: React.ReactElement) => {
  return render(
    <ChakraProvider theme={theme}>
      {component}
    </ChakraProvider>
  );
};

// Simple mock for localStorage to avoid errors
const mockLocalStorage = {
  getItem: vi.fn().mockReturnValue(null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
  configurable: true
});

// Mock window.history to avoid errors
Object.defineProperty(window, 'history', {
  value: {
    pushState: vi.fn(),
    replaceState: vi.fn(),
    state: {}
  },
  writable: true,
  configurable: true
});

describe('Projects Component - Filter Counts and Basic Functionality', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should display filter chips with counts', () => {
    renderWithChakra(<Projects />);
    
    // Check that Focus filter chips have counts
    const allButtons = screen.getAllByRole('button', { name: /All \(\d+\)/ });
    expect(allButtons).toHaveLength(2); // One for Focus, one for Technology
    
    expect(screen.getByRole('button', { name: /Web \(\d+\)/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ML \(\d+\)/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Optimization \(\d+\)/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Analytics \(\d+\)/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cloud \(\d+\)/ })).toBeInTheDocument();
    
    // Check that Technology filter chips have counts
    expect(screen.getByRole('button', { name: /Python \(\d+\)/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /R \(\d+\)/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /SQL \(\d+\)/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /React \(\d+\)/ })).toBeInTheDocument();
  });

  test('should update counts when filters are applied', () => {
    renderWithChakra(<Projects />);
    
    // Get initial count for All in technology filters
    const initialAllButton = screen.getAllByRole('button', { name: /All \(\d+\)/ })[1]; // Technology All button
    const initialCount = initialAllButton.textContent?.match(/\((\d+)\)/)?.[1];
    
    // Click on Web filter
    const webButton = screen.getByRole('button', { name: /Web \(\d+\)/ });
    fireEvent.click(webButton);
    
    // The Technology "All" count should be different (should be lower)
    const updatedAllButton = screen.getAllByRole('button', { name: /All \(\d+\)/ })[1];
    const updatedCount = updatedAllButton.textContent?.match(/\((\d+)\)/)?.[1];
    
    expect(updatedCount).not.toBe(initialCount);
    expect(parseInt(updatedCount || '0')).toBeLessThan(parseInt(initialCount || '0'));
  });

  test('should show Clear filters button when filters are active', () => {
    renderWithChakra(<Projects />);
    
    // Initially, Clear filters button should not be visible
    expect(screen.queryByText('Clear filters')).not.toBeInTheDocument();
    
    // Click on a filter
    const webButton = screen.getByRole('button', { name: /Web \(\d+\)/ });
    fireEvent.click(webButton);
    
    // Clear filters button should now be visible
    expect(screen.getByText('Clear filters')).toBeInTheDocument();
  });

  test('should reset filters when Clear filters is clicked', () => {
    renderWithChakra(<Projects />);
    
    // Click on a filter
    const webButton = screen.getByRole('button', { name: /Web \(\d+\)/ });
    fireEvent.click(webButton);
    
    // Verify filter is active
    expect(webButton).toHaveAttribute('aria-pressed', 'true');
    
    // Click Clear filters
    const clearButton = screen.getByText('Clear filters');
    fireEvent.click(clearButton);
    
    // Check that All buttons are now active
    const allButtons = screen.getAllByRole('button', { name: /All \(\d+\)/ });
    allButtons.forEach(button => {
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });
    
    // Clear filters button should be hidden again
    expect(screen.queryByText('Clear filters')).not.toBeInTheDocument();
  });

  test('should filter projects when category filter is applied', () => {
    renderWithChakra(<Projects />);
    
    // Get initial number of projects (count the project cards)
    const initialProjects = screen.getAllByRole('group').length;
    
    // Click on Web filter (should show fewer projects than All)
    const webButton = screen.getByRole('button', { name: /Web \(\d+\)/ });
    fireEvent.click(webButton);
    
    // Should show fewer projects now
    const filteredProjects = screen.getAllByRole('group').length;
    expect(filteredProjects).toBeLessThan(initialProjects);
  });

  test('should filter projects when technology filter is applied', () => {
    renderWithChakra(<Projects />);
    
    // Get initial number of projects
    const initialProjects = screen.getAllByRole('group').length;
    
    // Click on Python filter
    const pythonButton = screen.getByRole('button', { name: /Python \(\d+\)/ });
    fireEvent.click(pythonButton);
    
    // Should show fewer projects (only Python projects)
    const filteredProjects = screen.getAllByRole('group').length;
    expect(filteredProjects).toBeLessThan(initialProjects);
  });

  test('should combine filters correctly', () => {
    renderWithChakra(<Projects />);
    
    // Click ML category first
    const mlButton = screen.getByRole('button', { name: /ML \(\d+\)/ });
    fireEvent.click(mlButton);
    
    const mlFilteredProjects = screen.getAllByRole('group').length;
    
    // Then click Python technology
    const pythonButton = screen.getByRole('button', { name: /Python \(\d+\)/ });
    fireEvent.click(pythonButton);
    
    const combinedFilteredProjects = screen.getAllByRole('group').length;
    
    // Combined filter should show same or fewer projects than just ML filter
    expect(combinedFilteredProjects).toBeLessThanOrEqual(mlFilteredProjects);
  });

  test('should save filter state to localStorage', () => {
    renderWithChakra(<Projects />);
    
    // Click on a filter
    const webButton = screen.getByRole('button', { name: /Web \(\d+\)/ });
    fireEvent.click(webButton);
    
    // Should have called localStorage.setItem
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('kv.projects.activeGroup', 'Web');
  });

  test('should handle localStorage errors gracefully', () => {
    // Mock localStorage to throw an error
    mockLocalStorage.setItem.mockImplementation(() => {
      throw new Error('localStorage error');
    });
    
    renderWithChakra(<Projects />);
    
    // Should not throw error when clicking filter
    const webButton = screen.getByRole('button', { name: /Web \(\d+\)/ });
    expect(() => fireEvent.click(webButton)).not.toThrow();
    
    // Filter should still work
    expect(webButton).toHaveAttribute('aria-pressed', 'true');
  });
});