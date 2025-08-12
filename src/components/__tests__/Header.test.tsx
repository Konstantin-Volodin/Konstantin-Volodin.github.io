import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { vi } from 'vitest';
import Header from '../header';
import theme from '../../static/fonts/theme';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const renderWithChakra = (component: React.ReactElement) => {
  return render(
    <ChakraProvider theme={theme}>
      {component}
    </ChakraProvider>
  );
};

describe('Header Component', () => {
  test('renders navigation links', () => {
    renderWithChakra(<Header />);
    
    expect(screen.getByText('konstantin volodin')).toBeInTheDocument();
    expect(screen.getByText('github')).toBeInTheDocument();
    expect(screen.getByText('linkedin')).toBeInTheDocument();
    expect(screen.getByText('resume')).toBeInTheDocument();
  });

  test('renders color mode toggle button', () => {
    renderWithChakra(<Header />);
    
    // Should render either "Switch to dark mode" or "Switch to light mode"
    const toggleButton = screen.getByRole('button', { 
      name: /Switch to (dark|light) mode/i 
    });
    expect(toggleButton).toBeInTheDocument();
  });

  test('color mode toggle button changes on click', () => {
    renderWithChakra(<Header />);
    
    const toggleButton = screen.getByRole('button', { 
      name: /Switch to (dark|light) mode/i 
    });
    
    const initialText = toggleButton.getAttribute('aria-label');
    fireEvent.click(toggleButton);
    
    // After clicking, the button text should change
    const newText = toggleButton.getAttribute('aria-label');
    expect(newText).not.toBe(initialText);
  });

  test('mobile menu button exists', () => {
    renderWithChakra(<Header />);
    
    const menuButton = screen.getByRole('button', { 
      name: 'Open navigation menu' 
    });
    expect(menuButton).toBeInTheDocument();
  });
});