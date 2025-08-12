import { ChakraProvider } from '@chakra-ui/react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Suspense, lazy } from 'react';

import Fonts from './static/fonts/font'
import theme from './static/fonts/theme'

import Header from './components/header';
import Intro from './components/intro';
import ProjectsSkeleton from './components/ProjectsSkeleton';
import SkillsSkeleton from './components/SkillsSkeleton';

// Lazy load heavy components
const Projects = lazy(() => import('./components/projects'));
const Skills = lazy(() => import('./components/SkillsEnhanced'));

function App() {
  return (
    <HelmetProvider>
      <ChakraProvider theme={theme}>
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
      </ChakraProvider>
    </HelmetProvider>
  );
}

export default App;
