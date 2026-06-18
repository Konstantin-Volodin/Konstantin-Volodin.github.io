import { useMemo, useState, useEffect, useCallback } from 'react';
import Container from '../../components/Container';
import Reveal from '../../components/Reveal';
import projData from './projectsData';

const chipClass = (isActive: boolean) =>
  'rounded-full border px-3 py-1.5 text-sm font-medium tracking-wide transition-all duration-150 ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 ' +
  (isActive
    ? 'border-brand-500 bg-brand-500 text-white dark:border-brand-500 dark:bg-brand-600 dark:hover:border-brand-400'
    : 'border-slate-200 bg-slate-100 text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600');

function ProjectCard(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  const slug = String(props.name || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  // IDs for a11y wiring
  const modalId = `${slug}-modal`;
  const modalHeaderId = `${slug}-header`;

  const meta = useMemo(() => {
    // Prioritize technologies, then skills, unique, max 3
    const tech = Array.isArray(props.technologies) ? props.technologies : [];
    const skills = Array.isArray(props.skills) ? props.skills : [];
    const arr = [...tech, ...skills].filter(Boolean);
    const uniq: string[] = [];
    arr.forEach((v) => { if (!uniq.includes(v)) uniq.push(v); });
    return uniq.slice(0, 3);
  }, [props.technologies, props.skills]);

  // URL helpers for deep-linking the modal
  const getProjectFromUrl = useCallback(() => {
    try {
      const url = new URL(window.location.href);
      return url.searchParams.get('project');
    } catch {}
    return null;
  }, []);

  const openModal = useCallback(() => {
    onOpen();
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.get('project') !== slug) {
        url.searchParams.set('project', slug);
        window.history.pushState(window.history.state, '', url.toString());
      }
    } catch {}
  }, [onOpen, slug]);

  const closeModal = useCallback(() => {
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.get('project')) {
        url.searchParams.delete('project');
        window.history.replaceState(window.history.state, '', url.toString());
      }
    } catch {}
    onClose();
  }, [onClose]);

  // Keep modal state in sync with URL for navigation/back/forward and initial load
  useEffect(() => {
    const handlePop = () => {
      const p = getProjectFromUrl();
      if (p === slug) {
        if (!isOpen) onOpen();
      } else if (isOpen) {
        onClose();
      }
    };
    window.addEventListener('popstate', handlePop);
    // Initial check (deep-link)
    const initial = getProjectFromUrl();
    if (initial === slug && !isOpen) {
      onOpen();
    }
    return () => window.removeEventListener('popstate', handlePop);
  }, [getProjectFromUrl, isOpen, onClose, onOpen, slug]);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal();
    }
  }, [openModal]);

  return (
    <Reveal>
      <article
        role="group"
        aria-labelledby={`${slug}-title`}
        tabIndex={0}
        onClick={openModal}
        onKeyDown={onKeyDown}
        className="group block h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-within:ring-2 focus-within:ring-slate-300"
      >
        <div
          className="flex h-full min-h-[240px] flex-col overflow-hidden border border-line bg-surface shadow-subtle transition-[box-shadow,border-color,transform,background-color] duration-[250ms] hover:border-brand-300 hover:bg-white hover:shadow-lift motion-safe:hover:-translate-y-1 motion-safe:active:-translate-y-0.5 active:shadow-sm md:min-h-[320px] dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600 dark:hover:bg-slate-700"
        >
          {/* IMAGE: fixed height for uniform cards */}
          <div className="relative h-[110px] shrink-0 bg-slate-100 md:h-[170px]">
            <img
              src={props.pic}
              alt={`${props.name} preview`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-[filter,transform] duration-[400ms] motion-safe:group-hover:scale-[1.01]"
            />
            {/* Light glass hover overlay */}
            <div
              className="pointer-events-none absolute inset-0 bg-black/5 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-40"
            />
          </div>

          {/* CONTENT */}
          <div className="flex flex-1 flex-col gap-3 px-5 pb-6 pt-4 md:px-6 md:pt-6">
            <span className="w-fit border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200">
              {props.company}
            </span>

            <h3
              id={`${slug}-title`}
              className="line-clamp-2 font-heading text-lg font-semibold leading-[1.25] text-slate-800 transition-colors group-hover:text-slate-900 md:text-xl dark:text-slate-100 dark:group-hover:text-white"
            >
              {props.name}
            </h3>

            {props.description && (
              <p className="hidden line-clamp-2 text-sm text-slate-600 md:block dark:text-slate-300">
                {props.description}
              </p>
            )}

            {meta.length > 0 && (
              <div className="mt-auto pt-1">
                <p className="line-clamp-1 text-xs text-slate-500 opacity-65 transition-opacity duration-200 group-hover:opacity-100 dark:text-slate-400">
                  {meta.join(' • ')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modal with full description and details */}
        {isOpen && (
          <div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4 backdrop-blur-[6px]"
            onClick={closeModal}
          >
            <div
              id={modalId}
              role="dialog"
              aria-modal="true"
              aria-labelledby={modalHeaderId}
              aria-describedby={`${slug}-desc`}
              className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto bg-white text-content shadow-lift motion-safe:animate-modal-in dark:border dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              onClick={closeModal}
              onKeyDown={(e) => { if (e.key === 'Escape') closeModal(); }}
            >
              <h2 id={modalHeaderId} className="px-6 pb-4 pt-5 font-heading text-xl font-semibold leading-tight dark:text-slate-100">
                {props.name}
              </h2>
              <button
                aria-label="Close"
                onClick={closeModal}
                className="absolute right-2 top-2 rounded p-2 text-slate-500 transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 dark:hover:bg-slate-700"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="px-5 py-6 md:px-10 md:py-10">
                {/* Summary band */}
                <dl className="mb-7 grid grid-cols-1 items-start gap-y-3 md:grid-cols-[160px_1fr] md:gap-x-6">
                  {props.company && (
                    <>
                      <dt className="text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300">Company</dt>
                      <dd className="text-base leading-[1.8] text-slate-800 dark:text-slate-200">{props.company}</dd>
                    </>
                  )}

                  {Array.isArray(props.technologies) && props.technologies.length > 0 && (
                    <>
                      <dt className="text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300">Tech</dt>
                      <dd className="break-words text-base leading-[1.8] text-slate-800 dark:text-slate-200">
                        {props.technologies.slice(0, 10).join(', ')}
                      </dd>
                    </>
                  )}

                  {Array.isArray(props.skills) && props.skills.length > 0 && (
                    <>
                      <dt className="text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300">Skills</dt>
                      <dd className="break-words text-base leading-[1.8] text-slate-800 dark:text-slate-200">
                        {props.skills.slice(0, 8).join(', ')}
                      </dd>
                    </>
                  )}
                </dl>

                <hr className="mb-6 border-line dark:border-slate-700" />

                <p id={`${slug}-desc`} className="whitespace-pre-wrap text-base leading-[1.9] text-slate-700 dark:text-slate-200">
                  {props.longDescription || 'No additional details available.'}
                </p>

                {props.pic && (
                  <div className="mt-7 border border-slate-200 bg-slate-50 p-2 md:p-3 dark:border-slate-600 dark:bg-slate-700">
                    <img
                      src={props.pic}
                      alt={`${props.name} preview`}
                      loading="lazy"
                      decoding="async"
                      className="h-auto max-h-40 w-full object-cover md:max-h-[180px]"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </article>
    </Reveal>
  );
}

// Predefined category groups
const GROUPS: Record<string, (item: any) => boolean> = {
  All: () => true,
  Web: (i) => (i.skills || []).includes('Web Development') || (i.technologies || []).some((t: string) => ['React', 'Django'].includes(t)),
  ML: (i) => (i.skills || []).includes('Data Science') || (i.technologies || []).some((t: string) => ['PyTorch', 'Statsforecast'].includes(t)),
  Optimization: (i) => (i.skills || []).some((s: string) => s.toLowerCase().includes('optimiz')) || (i.technologies || []).some((t: string) => ['Gurobi'].includes(t)),
  Analytics: (i) => (i.skills || []).some((s: string) => ['Data Analysis', 'Visualization', 'Dashboarding'].includes(s)),
  Cloud: (i) => (i.technologies || []).some((t: string) => ['GCP', 'AWS'].includes(t)) || (i.skills || []).includes('Cloud Providers')
};

const GROUP_NAMES = Object.keys(GROUPS);
const STORAGE_KEY = 'kv.projects.activeGroup';
const STORAGE_TECH_KEY = 'kv.projects.activeTech';

function getCatFromUrl() {
  try {
    const url = new URL(window.location.href);
    const fromSearch = url.searchParams.get('cat');
    if (fromSearch) return fromSearch;
    const hash = window.location.hash || '';
    const m = hash.match(/(?:[?#&]|^)cat=([^&]+)/i);
    if (m && m[1]) return decodeURIComponent(m[1]);
  } catch {}
  return null;
}

function getTechFromUrl() {
  try {
    const url = new URL(window.location.href);
    const fromSearch = url.searchParams.get('tech');
    if (fromSearch) return fromSearch;
    const hash = window.location.hash || '';
    const m = hash.match(/(?:[?#&]|^)tech=([^&]+)/i);
    if (m && m[1]) return decodeURIComponent(m[1]);
  } catch {}
  return null;
}

function isValidGroup(cat: any): cat is keyof typeof GROUPS {
  return typeof cat === 'string' && GROUP_NAMES.includes(cat);
}

function Projects() {
  // All technologies present in data, ordered with common ones first
  const allTechs = useMemo(() => {
    const set = new Set<string>();
    projData.forEach((i: any) => Array.isArray(i.technologies) && i.technologies.forEach((t: string) => set.add(t)));
    const TOP_TECHS = ['Python','R','SQL','JavaScript','TypeScript','React','Django','PyTorch','GCP','AWS','Docker','Airflow','Databricks','Power BI','Postman','Node.js','NoSQL'];
    const top = TOP_TECHS.filter(t => set.has(t));
    const rest = Array.from(set).filter(t => !TOP_TECHS.includes(t));
    return [...top, ...rest];
  }, []);

  // Add a configurable label for the category selector
  const CATEGORY_LABEL = 'Focus';

  // Initialize from URL, then localStorage, else default 'All'
  const [activeGroup, setActiveGroup] = useState(() => {
    const fromUrl = getCatFromUrl();
    if (isValidGroup(fromUrl)) return fromUrl;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isValidGroup(saved)) return saved;
    } catch {}
    return 'All';
  });

  const [activeTech, setActiveTech] = useState(() => {
    const fromUrl = getTechFromUrl();
    if (typeof fromUrl === 'string' && (fromUrl === 'All' || allTechs.includes(fromUrl))) return fromUrl;
    try {
      const saved = localStorage.getItem(STORAGE_TECH_KEY);
      if (typeof saved === 'string' && (saved === 'All' || allTechs.includes(saved))) return saved;
    } catch {}
    return 'All';
  });

  // Only keep 4–5 most relevant technology filters (present in data)
  const TECH_NAMES = useMemo(() => {
    const FEATURED_TECH_ORDER = ['Python','R','SQL','PyTorch','React'];
    const featured = FEATURED_TECH_ORDER.filter(t => allTechs.includes(t));
    return ['All', ...featured];
  }, [allTechs]);

  // If activeTech isn't in the limited list, coerce to 'All' to avoid hidden state
  useEffect(() => {
    if (!TECH_NAMES.includes(activeTech)) {
      setActiveTech('All');
    }
  }, [TECH_NAMES, activeTech]);

  // Keep URL and localStorage in sync with selection
  const syncSelection = useCallback((cat: keyof typeof GROUPS, tech: string, replace = true) => {
    try {
      // Persist to localStorage
      localStorage.setItem(STORAGE_KEY, cat as string);
      localStorage.setItem(STORAGE_TECH_KEY, tech);
      // Update the URL's search params while preserving hash
      const url = new URL(window.location.href);
      // Only include cat when not 'All'
      if (cat && cat !== 'All') {
        url.searchParams.set('cat', cat as string);
      } else {
        url.searchParams.delete('cat');
      }
      // Only include tech when not 'All'
      if (tech && tech !== 'All') {
        url.searchParams.set('tech', tech);
      } else {
        url.searchParams.delete('tech');
      }
      const method = replace ? 'replaceState' : 'pushState';
      window.history[method](window.history.state, '', url.toString());
    } catch {}
  }, []);

  // Handle browser nav to keep UI in sync
  useEffect(() => {
    const onPop = () => {
      const fromUrl = getCatFromUrl();
      if (isValidGroup(fromUrl)) {
        setActiveGroup(fromUrl);
        try { localStorage.setItem(STORAGE_KEY, fromUrl); } catch {}
      }
      const techFromUrl = getTechFromUrl();
      const nextTech = (typeof techFromUrl === 'string' && (techFromUrl === 'All' || allTechs.includes(techFromUrl))) ? techFromUrl : 'All';
      setActiveTech(nextTech);
      try { localStorage.setItem(STORAGE_TECH_KEY, nextTech); } catch {}
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [allTechs]);

  // Apply sync whenever the selection changes
  useEffect(() => {
    syncSelection(activeGroup, activeTech, true);
  }, [activeGroup, activeTech, syncSelection]);

  const handleSelect = (cat: keyof typeof GROUPS) => {
    if (cat !== activeGroup) {
      setActiveGroup(cat);
      // URL/localStorage are synced in effect
    }
  };

  const handleSelectTech = (tech: string) => {
    if (tech !== activeTech) {
      setActiveTech(tech);
      // URL/localStorage are synced in effect
    }
  };

  // Calculate counts for each category filter
  const categoryFilterCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    GROUP_NAMES.forEach(cat => {
      const fn = GROUPS[cat] || GROUPS.All;
      let filteredData = projData.filter(fn);
      // Apply current technology filter when calculating category counts
      if (activeTech && activeTech !== 'All') {
        filteredData = filteredData.filter((i: any) => Array.isArray(i.technologies) && i.technologies.includes(activeTech));
      }
      counts[cat] = filteredData.length;
    });
    return counts;
  }, [activeTech]);

  // Calculate counts for each technology filter
  const technologyFilterCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    TECH_NAMES.forEach(tech => {
      // Apply current category filter when calculating technology counts
      const fn = GROUPS[activeGroup] || GROUPS.All;
      let filteredData = projData.filter(fn);
      // Apply technology filter
      if (tech === 'All') {
        counts[tech] = filteredData.length;
      } else {
        const techFilteredData = filteredData.filter((i: any) => Array.isArray(i.technologies) && i.technologies.includes(tech));
        counts[tech] = techFilteredData.length;
      }
    });
    return counts;
  }, [activeGroup, TECH_NAMES]);

  // Show a clear control only when filters are active
  const hasActiveFilters = useMemo(() => activeGroup !== 'All' || activeTech !== 'All', [activeGroup, activeTech]);
  const clearFilters = useCallback(() => { setActiveGroup('All'); setActiveTech('All'); }, []);

  const items = useMemo(() => {
    const fn = GROUPS[activeGroup] || GROUPS.All;
    let arr = projData.filter(fn);
    if (activeTech && activeTech !== 'All') {
      arr = arr.filter((i: any) => Array.isArray(i.technologies) && i.technologies.includes(activeTech));
    }
    return arr;
  }, [activeGroup, activeTech]);

  // Build slugs of visible items for keyboard navigation in modal
  const slugify = useCallback((s: string) => String(s || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''), []);
  const slugs = useMemo(() => items.map((i: any) => slugify(i.name)), [items, slugify]);

  // Local helper to read current project from URL
  const getProjectFromUrlLocal = useCallback(() => {
    try {
      const url = new URL(window.location.href);
      return url.searchParams.get('project');
    } catch {}
    return null;
  }, []);

  // Arrow key navigation between projects while modal is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const current = getProjectFromUrlLocal();
      if (!current) return; // no modal open
      if (slugs.length === 0) return;
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const idx = slugs.indexOf(current);
      if (idx === -1) return;
      const nextIdx = e.key === 'ArrowRight' ? (idx + 1) % slugs.length : (idx - 1 + slugs.length) % slugs.length;
      const nextSlug = slugs[nextIdx];
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('project', nextSlug);
        window.history.pushState(window.history.state, '', url.toString());
        // Notify listeners (ProjectCards) to sync
        window.dispatchEvent(new PopStateEvent('popstate'));
      } catch {}
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [slugs, getProjectFromUrlLocal]);

  return (
    <section id="Projects" className="scroll-mt-20 border-t border-line-subtle">
      <Container className="py-16 md:py-24">
        <h2 className="max-w-[500px] font-heading text-3xl font-semibold tracking-[-0.25px] text-content md:text-4xl">
          Projects
        </h2>

        {/* Category descriptor + compact chips */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-semibold text-slate-700 dark:text-slate-300">{CATEGORY_LABEL}:</span>
          {GROUP_NAMES.map((cat) => {
            const isActive = activeGroup === cat;
            const count = categoryFilterCounts[cat] || 0;
            return (
              <button
                key={cat}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(cat as any)}
                aria-pressed={isActive}
                className={chipClass(isActive)}
              >
                {cat} <span className="ml-1 text-xs opacity-75">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Technology descriptor + compact chips (limited list) */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-semibold text-slate-700 dark:text-slate-300">Technology:</span>
          {TECH_NAMES.map((tech) => {
            const isActive = activeTech === tech;
            const count = technologyFilterCounts[tech] || 0;
            return (
              <button
                key={tech}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelectTech(tech)}
                aria-pressed={isActive}
                className={chipClass(isActive)}
              >
                {tech} <span className="ml-1 text-xs opacity-75">({count})</span>
              </button>
            );
          })}

          {hasActiveFilters && (
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={clearFilters}
              aria-label="Clear filters"
              className="px-2 py-1 text-sm text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-200 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* 2 per row on md+ */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
          {items.map((item: any) => (
            <ProjectCard key={item.name}
              name={item.name}
              company={item.company}
              description={item.description}
              longDescription={item.longDescription}
              pic={item.picture}
              skills={item.skills}
              technologies={item.technologies}
              link={item.link}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Projects;
