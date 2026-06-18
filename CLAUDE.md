# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

- Single-page portfolio site (Konstantin Volodin), deployed to GitHub Pages: https://konstantin-volodin.github.io/
- React 18 + TypeScript + Vite + Tailwind CSS v4

## Commands

- `npm run dev` - dev server
- `npm test` - run tests (Vitest)
- `npm run build` - production build to `build/`
- `npm run deploy` - publish `build/` to `gh-pages` branch

## Code style

- Every change must leave the code easier to read than before.
- Prefer deletion over addition. If a refactor grows a file, question the approach.
- Remove dead code, redundant comments, and unused abstractions immediately.
- Simpler is correct. A smaller diff is usually a better diff.
- Before adding a function, check if the file's primary purpose is still singular. If not, make a new module.

## Layout

- `src/sections/{projects,skills,valentine}/` - each section co-locates component + data + tests
- `src/components/` - shared presentational components: `Container`, `Reveal`, `Header`, `Intro` (+ `skeletons/`)
- `src/shared/` - `hooks/`, `types/`, `test/`, `reportWebVitals.ts`
- `src/assets/` - bundled `images/`, `logos/`
- `src/static/` - passthrough only (`.docx`, `resume/`)
- `App.tsx` / `index.tsx` / `index.css` / `global.d.ts` - at `src/` root

## Architecture

- **Entry/routing**: `index.tsx` mounts `App`. `App.tsx` switches on `window.location.pathname`: `/cv.pdf` & `/resume.pdf` → static `/cv.pdf`; `/valentine` → `Valentine`; else `Portfolio` (Header → Intro → Projects → Skills).
- **Lazy loading**: `Projects`, `Skills`, `Valentine` are `React.lazy` + `Suspense` (skeleton fallbacks).
- **Data-driven content**: edit `src/sections/projects/projectsData.tsx` and `src/sections/skills/skillsData.tsx` (typed from `src/shared/types/index.ts`), not the rendering components.
- **Styling**: Tailwind v4, configured in CSS (`src/index.css` via `@import "tailwindcss"` + `@theme`). Palette `brand-*` (Amber) / `slate-*`; Space Grotesk headings via `font-heading`. Prefer **semantic tokens** that auto-flip in dark mode (`bg-canvas`, `bg-surface`, `bg-surface-alt`, `text-content`, `text-muted`, `border-line`, `border-line-subtle`, `accent`) over hardcoded colors; use `dark:` only for one-off overrides. Semantic tokens are CSS vars redefined under `.dark` (`@theme inline`).
- **Dark mode**: class-based (`dark` on `<html>`). `useColorMode` (`src/shared/hooks/`) toggles + persists to `localStorage` (`kv.colorMode`), defaulting to system. An inline script in `index.html` applies the class before paint to avoid flash. `dark` variant wired via `@custom-variant` in `index.css`.
- **Animations**: no animation library. CSS keyframes in `index.css` (`@theme --animate-*`); scroll-reveal via `Reveal` component (`react-visibility-sensor` toggles a `.reveal`/`.is-visible` class); `usePrefersReducedMotion` hook + Tailwind `motion-safe:` gate motion.
- **Naming**: component files are PascalCase; imports must match filenames exactly (`forceConsistentCasingInFileNames` is on - case-only mismatches break case-sensitive CI builds).

## Projects filtering (`src/sections/projects/Projects.tsx`)

- Two filter dimensions: category `GROUPS` (All/Web/ML/Optimization/Analytics/Cloud) + featured `technologies` list.
- Filter state mirrored to URL params (`?cat=`, `?tech=`, `?project=`) **and** `localStorage` (`kv.projects.*`); synced with back/forward via `popstate`.
- Modals deep-linkable via `?project=<slug>` (slug = lowercased name, spaces→`-`, non-alphanumerics stripped). Arrow keys navigate open modal.
- Technology names **must be normalized** (`Power BI` not `PowerBi`, `Node.js` not `NodeJS`) or filtering breaks. `__tests__/technologyNormalization.test.ts` enforces an allowlist - update it when adding new tech.

## Resume / CV (LaTeX)

- Source under `src/static/resume/`: `cv.tex` (1-page, primary) and `cv-two-page.tex`, `\input`-ing `variants/{1-page,2-page}/`, styled by `TLCresume.sty`. Build with `latexmk`/`pdflatex` (output `src/static/resume/build/`).
- Served PDF is `public/cv.pdf` - copy the rebuilt PDF there to ship it.
- `src/static/resume/variants/prompt_for_new_variants.MD` - spec for MLE/DS/OR variants; read before editing variants.
