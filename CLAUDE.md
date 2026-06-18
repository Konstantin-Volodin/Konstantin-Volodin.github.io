# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Single-page portfolio website (Konstantin Volodin) deployed to GitHub Pages at https://konstantin-volodin.github.io/. 
React 18 + TypeScript + Vite, styled with Chakra UI.

## Commands

- `npm run dev` - run dev server.
- `npm run deploy` - updates the live website at `gh-pages` branch.

## Architecture notes

- **Entry & routing**: `src/index.tsx` mounts `App` with `ChakraProvider` + `HelmetProvider`. `App.tsx` checks the path: `/cv.pdf` and `/resume.pdf` redirect to the static `/cv.pdf`, `/valentine` renders the lazy `Valentine` component, everything else renders the `Portfolio` (Header → Intro → Projects → Skills). `Projects`, `Skills`, and `Valentine` are `React.lazy` + `Suspense` with skeleton fallbacks (`ProjectsSkeleton`, `SkillsSkeleton`).

- **Project layout**: `src/` is organized by role - `src/sections/{projects,skills,valentine}/` (each section co-locates its component + data + tests), `src/components/` (shared presentational components + `skeletons/`), `src/shared/` (`theme/`, `types/`, `utils/`, `test/`, `reportWebVitals.ts`), `src/assets/` (bundled `images/`, `logos/`), and `src/static/` (passthrough only: `.docx`, `resume/`). `App.tsx`/`index.tsx`/`index.css`/`global.d.ts` stay at the `src/` root.

- **Content is data-driven**: page content lives in `src/sections/projects/projectsData.tsx` (typed `Project[]` from `src/shared/types/index.ts`) and `src/sections/skills/skillsData.tsx`. To change projects/skills shown on the site, edit these data files - not the rendering components.

- **Projects filtering** (`src/sections/projects/Projects.tsx`) is the most complex piece:
  - Two filter dimensions: category `GROUPS` (All/Web/ML/Optimization/Analytics/Cloud - predicate functions over a project's `skills`/`technologies`) and a featured `technologies` list.
  - Filter state is mirrored to **both the URL query params** (`?cat=`, `?tech=`, `?project=`) **and `localStorage`** (`kv.projects.*` keys), and kept in sync with browser back/forward via `popstate`.
  - Project modals are deep-linkable via `?project=<slug>` where slug = lowercased name, spaces→`-`, non-alphanumerics stripped. Arrow keys navigate between visible projects while a modal is open.
  - Technology names in the data **must be normalized** (e.g. `Power BI` not `PowerBi`, `Node.js` not `NodeJS`) or filtering silently breaks. `src/sections/projects/__tests__/technologyNormalization.test.ts` enforces this against an allowlist - when adding a project with a new technology, update that allowlist or rename to match.

- **Theme**: `src/shared/theme/theme.tsx` is the single Chakra theme (Slate + Amber `brand` palette, Space Grotesk headings, square-ish radii, system color mode). `src/shared/theme/font.tsx` loads fonts. Components lean heavily on semantic tokens (`bg-subtle`, `border`, `brand.*`, `slate.*`) and explicit `_dark={{...}}` overrides - match that pattern rather than hardcoding colors.

- **Naming**: component files are PascalCase (`Header.tsx`, `Projects.tsx`) and imports match filenames exactly. `tsconfig.json` sets `forceConsistentCasingInFileNames`, so keep casing exact - case-only mismatches will break a case-sensitive (CI/Linux) build even though they resolve on Windows/macOS.

## Resume / CV (LaTeX)

- The CV is a LaTeX project under `src/static/resume/` built from `cv.tex` (1-page, primary) and `cv-two-page.tex`, each `\input`-ing section files from `variants/1-page/` and `variants/2-page/` and styled by `TLCresume.sty`. Build with `latexmk`/`pdflatex` (output in `src/static/resume/build/`).
- The served PDF is `public/cv.pdf`. After editing the `.tex` sources and rebuilding, copy the resulting PDF to `public/cv.pdf` so it ships with the site (recent "update: CV" commits are this flow).
- `src/static/resume/variants/prompt_for_new_variants.MD` is a spec/prompt for adding MLE/DS/OR conditional-compilation variants - read it before working on resume variants.
