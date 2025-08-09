// URL helper functions for project filtering and modal state sync

/**
 * Extracts category parameter from URL search params or hash
 */
export function getCatFromUrl(): string | null {
  try {
    const url = new URL(window.location.href);
    const fromSearch = url.searchParams.get('cat');
    if (fromSearch) return fromSearch;
    const hash = window.location.hash || '';
    const match = hash.match(/(?:[?#&]|^)cat=([^&]+)/i);
    if (match && match[1]) return decodeURIComponent(match[1]);
  } catch {}
  return null;
}

/**
 * Extracts technology parameter from URL search params or hash
 */
export function getTechFromUrl(): string | null {
  try {
    const url = new URL(window.location.href);
    const fromSearch = url.searchParams.get('tech');
    if (fromSearch) return fromSearch;
    const hash = window.location.hash || '';
    const match = hash.match(/(?:[?#&]|^)tech=([^&]+)/i);
    if (match && match[1]) return decodeURIComponent(match[1]);
  } catch {}
  return null;
}

/**
 * Extracts project parameter from URL search params
 */
export function getProjectFromUrl(): string | null {
  try {
    const url = new URL(window.location.href);
    return url.searchParams.get('project');
  } catch {}
  return null;
}

/**
 * Available project categories/groups
 */
export const GROUPS = {
  All: () => true,
  Web: (item: any) => (item.skills || []).includes('Web Development') || (item.technologies || []).some((t: string) => ['React', 'Django'].includes(t)),
  ML: (item: any) => (item.skills || []).includes('Data Science') || (item.technologies || []).some((t: string) => ['PyTorch', 'Statsforecast'].includes(t)),
  Optimization: (item: any) => (item.skills || []).some((s: string) => s.toLowerCase().includes('optimiz')) || (item.technologies || []).some((t: string) => ['Gurobi'].includes(t)),
  Analytics: (item: any) => (item.skills || []).some((s: string) => ['Data Analysis', 'Visualization', 'Dashboarding'].includes(s)),
  Cloud: (item: any) => (item.technologies || []).some((t: string) => ['GCP', 'AWS'].includes(t)) || (item.skills || []).includes('Cloud Providers')
} as const;

export type GroupKey = keyof typeof GROUPS;
export const GROUP_NAMES = Object.keys(GROUPS) as GroupKey[];

/**
 * Validates if a category is a valid group
 */
export function isValidGroup(cat: any): cat is GroupKey {
  return typeof cat === 'string' && GROUP_NAMES.includes(cat as GroupKey);
}

/**
 * Storage keys for persistence
 */
export const STORAGE_KEY = 'kv.projects.activeGroup';
export const STORAGE_TECH_KEY = 'kv.projects.activeTech';

/**
 * Syncs category and technology selection to URL and localStorage
 */
export function syncSelection(cat: GroupKey, tech: string, replace = true): void {
  try {
    // Persist to localStorage
    localStorage.setItem(STORAGE_KEY, cat as string);
    localStorage.setItem(STORAGE_TECH_KEY, tech);
    
    // Update the URL's search params while preserving hash
    const url = new URL(window.location.href);
    url.searchParams.set('cat', cat as string);
    if (tech && tech !== 'All') {
      url.searchParams.set('tech', tech);
    } else {
      url.searchParams.delete('tech');
    }
    const method = replace ? 'replaceState' : 'pushState';
    window.history[method](window.history.state, '', url.toString());
  } catch {}
}

/**
 * Sets project slug in URL for deep-linking modals
 */
export function setProjectInUrl(slug: string): void {
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.get('project') !== slug) {
      url.searchParams.set('project', slug);
      window.history.pushState(window.history.state, '', url.toString());
    }
  } catch {}
}

/**
 * Removes project parameter from URL
 */
export function removeProjectFromUrl(): void {
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.get('project')) {
      url.searchParams.delete('project');
      window.history.replaceState(window.history.state, '', url.toString());
    }
  } catch {}
}

/**
 * Generates a URL-safe slug from a string
 */
export function slugify(str: string): string {
  return String(str || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
}