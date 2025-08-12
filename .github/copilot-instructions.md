# GitHub Copilot Instructions for Konstantin-Volodin.github.io

## Project Overview

This is a personal portfolio website for Konstantin Volodin built with:
- **Framework**: React 17.0.2 + TypeScript 4.5.5
- **Build Tool**: Vite 7.1.1 (migrated from Create React App)
- **UI Library**: Chakra UI 2.10.9
- **Styling**: Emotion (CSS-in-JS)
- **Deployment**: GitHub Pages via gh-pages
- **Package Manager**: npm

## Project Structure

```
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── header.tsx     # Navigation header
│   │   ├── intro.tsx      # Hero/intro section  
│   │   ├── projects.tsx   # Projects showcase
│   │   ├── skills.tsx     # Skills/technologies
│   │   ├── projectsData.tsx # Project data
│   │   └── skillsData.tsx # Skills data
│   ├── static/           # Images, logos, fonts
│   ├── App.tsx           # Main app component
│   ├── index.tsx         # React app entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite build configuration
└── build/                # Production build output
```

## Development Workflow

### Environment Setup
```bash
# Install dependencies (takes ~54 seconds)
npm install

# Start development server (ready in ~200ms)
npm run dev
# Serves on http://localhost:5173/

# Build for production (takes ~3 seconds)
npm run build
# Output in build/ directory

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

### Build Process Timing
- **Dependencies Install**: ~54 seconds
- **Development Server**: ~200ms startup
- **Production Build**: ~3 seconds
- **Build Size**: ~500KB JS bundle, ~1MB CSS, plus image assets

### Key Scripts
- `npm run dev` - Start Vite development server
- `npm run build` - Production build with Vite
- `npm run preview` - Preview production build locally
- `npm run predeploy` - Run build before deploy
- `npm run deploy` - Deploy to GitHub Pages using gh-pages

## Technical Configuration

### React Version Compatibility
⚠️ **Important**: The project uses React 17 but Chakra UI v2.10.9 expects React 18+. This causes runtime errors with hooks like `useId` and `useSyncExternalStore`.

**Current entry point** (`src/index.tsx`):
```tsx
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

**Recommended fixes**:
1. **Upgrade to React 18** (preferred):
   ```bash
   npm install react@^18.3.1 react-dom@^18.3.1 @types/react@^18.2.0 @types/react-dom@^18.2.0
   ```
   Then update `src/index.tsx` to use `createRoot`:
   ```tsx
   import { createRoot } from 'react-dom/client';
   const root = createRoot(document.getElementById('root')!);
   root.render(<React.StrictMode><App /></React.StrictMode>);
   ```

2. **Downgrade Chakra UI** (alternative):
   ```bash
   npm install @chakra-ui/react@^1.8.9
   ```

### TypeScript Configuration
- `tsconfig.json` - Main TypeScript config
- `tsconfig.node.json` - Node.js specific config for Vite
- Strict mode enabled
- No explicit linting configuration found

### Build Warnings
The build generates warnings about:
- Bundle size >500KB (consider code splitting)
- Peer dependency mismatches with React versions

## Deployment

### GitHub Pages Deployment
- Uses `gh-pages` package to deploy `build/` folder
- Deploys to `gh-pages` branch
- Accessible at https://konstantin-volodin.github.io/
- Homepage URL configured in `package.json`

### Deployment Process
```bash
npm run predeploy  # Builds the project
npm run deploy     # Pushes to gh-pages branch
```

## Component Architecture

### Main Components
1. **Header** (`header.tsx`) - Navigation with responsive mobile drawer
2. **Intro** (`intro.tsx`) - Hero section with personal introduction
3. **Projects** (`projects.tsx`) - Filterable project showcase with modals
4. **Skills** (`skills.tsx`) - Technology skills grouped by category

### Data Files
- `projectsData.tsx` - Project information, images, descriptions
- `skillsData.tsx` - Skills organized by Programming, Tools, etc.

### UI Patterns
- Uses Chakra UI components extensively
- Responsive design with mobile-first approach
- Framer Motion for animations
- Image optimization for project assets

## Development Guidelines

### Adding New Projects
1. Add project data to `src/components/projectsData.tsx`
2. Add project images to `src/static/images/`
3. Import images at the top of `projectsData.tsx`
4. Follow existing project object structure

### Adding New Skills
1. Add skill data to `src/components/skillsData.tsx`  
2. Add skill logos to `src/static/logos/`
3. Import logos and add to appropriate skill section

### Image Optimization
- Place images in appropriate `src/static/` subdirectories
- Use descriptive filenames
- Consider image sizes for web performance
- Images are automatically processed by Vite

### Code Style
- TypeScript strict mode
- React functional components with hooks
- Chakra UI design system components
- Responsive design patterns

## Common Issues & Solutions

### React Version Conflicts
If you encounter `useId` or `useSyncExternalStore` errors:
```bash
# Upgrade React (recommended)
npm install react@^18.3.1 react-dom@^18.3.1 @types/react@^18.2.0 @types/react-dom@^18.2.0
```

### Build Failures
- Ensure all imports are correctly typed
- Check for missing dependencies
- Verify image imports exist

### Performance Optimization
- Consider lazy loading for large images
- Implement code splitting for large bundles
- Use Chakra UI's built-in responsive utilities

## Testing

Currently, no test suite is configured. To add testing:

```bash
# Add testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest jsdom

# Add test script to package.json
"scripts": {
  "test": "vitest"
}
```

## Monitoring & Analytics

The project includes `reportWebVitals.ts` for performance monitoring. Connect to analytics services as needed.

---

## Quick Commands Reference

```bash
# Setup and development
npm install                 # Install dependencies (~54s)
npm run dev                 # Start dev server (~200ms)
npm run build              # Production build (~3s)
npm run preview            # Preview production build
npm run deploy             # Deploy to GitHub Pages

# Useful debugging
npx tsc --noEmit          # TypeScript type checking
npm list                   # Check installed packages
npm outdated              # Check for package updates
```

This portfolio website showcases Konstantin's projects and skills with a clean, professional design optimized for performance and accessibility.