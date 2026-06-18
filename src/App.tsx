import { ChakraProvider } from '@chakra-ui/react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Suspense, lazy } from 'react';

import Fonts from './shared/theme/font'
import theme from './shared/theme/theme'

import Header from './components/Header';
import Intro from './components/Intro';
import ProjectsSkeleton from './components/skeletons/ProjectsSkeleton';
import SkillsSkeleton from './components/skeletons/SkillsSkeleton';

// Lazy load heavy components
const Projects = lazy(() => import('./sections/projects/Projects'));
const Skills = lazy(() => import('./sections/skills/Skills'));
const Valentine = lazy(() => import('./sections/valentine/Valentine'));

function Portfolio() {
  return (
    <>
      <Helmet>
        <title>Konstantin Volodin's Portfolio</title>
        <meta name="description" content="Konstantin Volodin's Portfolio" />
      </Helmet>

      <Fonts />
      <Header />
      <Intro />

      {/* Lazy load Projects with skeleton fallback */}
      <Suspense fallback={<ProjectsSkeleton />}>
        <Projects />
      </Suspense>

      {/* Lazy load Skills with skeleton fallback */}
      <Suspense fallback={<SkillsSkeleton />}>
        <Skills />
      </Suspense>

      {/* <ContactMe /> */}
    </>
  );
}

function App() {
  if (window.location.pathname.toLowerCase() === '/cv.pdf') {
    window.location.replace('/cv.pdf');
    return null;
  }

  if (window.location.pathname.toLowerCase() === '/resume.pdf') {
    window.location.replace('/cv.pdf');
    return null;
  }

  const isValentine = window.location.pathname === '/valentine';

  return (
    <HelmetProvider>
      <ChakraProvider theme={theme}>
        {isValentine ? (
          <Suspense fallback={null}>
            <Valentine />
          </Suspense>
        ) : (
          <Portfolio />
        )}
      </ChakraProvider>
    </HelmetProvider>
  );
}

export default App;
