import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'kv.colorMode';
type ColorMode = 'light' | 'dark';

function currentMode(): ColorMode {
  if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
    return 'dark';
  }
  return 'light';
}

function applyMode(mode: ColorMode) {
  document.documentElement.classList.toggle('dark', mode === 'dark');
}

/**
 * Class-based replacement for Chakra's color mode. Defaults to the system
 * preference (see the inline script in index.html that avoids a flash on load),
 * and persists explicit user choices to localStorage.
 */
export function useColorMode() {
  const [colorMode, setColorMode] = useState<ColorMode>(currentMode);

  // Follow the system preference until the user makes an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return;
      } catch {}
      const mode: ColorMode = mq.matches ? 'dark' : 'light';
      applyMode(mode);
      setColorMode(mode);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggleColorMode = useCallback(() => {
    setColorMode((prev) => {
      const next: ColorMode = prev === 'dark' ? 'light' : 'dark';
      applyMode(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch {}
      return next;
    });
  }, []);

  return { colorMode, toggleColorMode };
}
