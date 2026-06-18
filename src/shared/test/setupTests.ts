// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Chakra UI and some components rely on window.matchMedia; jsdom doesn't provide it by default.
if (typeof window !== 'undefined' && !window.matchMedia) {
  // Basic matchMedia mock that supports addListener/removeListener and addEventListener/removeEventListener
  const createMatchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false
  }) as unknown as (query: string) => MediaQueryList;

  // @ts-ignore: jsdom environment
  window.matchMedia = createMatchMedia as any;
}
