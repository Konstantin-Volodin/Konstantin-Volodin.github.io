import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './shared/reportWebVitals';

import './index.css';
import App from './App';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

reportWebVitals();
