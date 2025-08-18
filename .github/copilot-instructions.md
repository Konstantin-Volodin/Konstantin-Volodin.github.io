# GitHub Copilot Instructions for Konstantin-Volodin.github.io

## Project Overview

This is a personal portfolio website for Konstantin Volodin built with:
- **Framework**: React 18.3.x + TypeScript (strict)
- **Build Tool**: Vite 7.x
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
│   ├── static/            # Images, logos, fonts
│   ├── App.tsx            # Main app component
│   ├── index.tsx          # React app entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
└── build/                 # Production build output
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

### React 18 Entry Point
Use createRoot with React 18.
```tsx
// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Head Management
Use react-helmet-async (safe for concurrent rendering).
```tsx
// src/App.tsx
// ...existing code...
import { HelmetProvider } from 'react-helmet-async';
// ...existing code...
export default function App() {
  return (
    <HelmetProvider>
      {/* ...existing app/providers... */}
    </HelmetProvider>
  );
}
```

### Chakra UI and Color Mode
- Import `useColorMode` where needed: `import { useColorMode } from '@chakra-ui/react'`
- Add `ColorModeScript` once (e.g., in `index.tsx`) to persist theme.
```tsx
// src/index.tsx
// ...existing code...
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: { initialColorMode: 'system', useSystemColorMode: true },
});

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
```
Common pitfall: “Cannot find name 'useColorMode'” means the hook isn’t imported. Ensure `import { useColorMode } from '@chakra-ui/react'` is present in the file using it.

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

### React/Chakra Version Mismatch
Project uses React 18 and Chakra UI 2.10.9. If you see `useId` or `useSyncExternalStore` errors, ensure React 18+ and `@types/react@18+` are installed.

### Color Mode Hook
- Error: “Cannot find name 'useColorMode'”
  - Fix: `import { useColorMode } from '@chakra-ui/react'` in the component that uses it.

### Build Failures
- Verify import paths
- Ensure images exist
- Resolve missing types

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

## Performance
- Lazy-load large sections
- Optimize and compress images
- Consider code splitting to keep initial JS light

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