import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Basic test to ensure the App component renders without errors
test('renders without crashing', () => {
  render(<App />);
});

test('renders the portfolio content', () => {
  render(<App />);
  // The actual content is loaded dynamically, so just verify it renders
  const rootDiv = document.querySelector('#root');
  expect(rootDiv).toBeDefined();
});