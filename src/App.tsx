import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Helmet, HelmetProvider } from "react-helmet-async";

import Fonts from './static/fonts/font'
import theme from './static/fonts/theme'

import Header from './components/header';
import Intro from './components/intro';
import Projects from './components/projects';
import Skills from './components/skills'
import ContactMe from './components/knowMore'

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
        <Projects />
        <Skills />
        {/* <ContactMe /> */}

      </ChakraProvider>
    </HelmetProvider>
  );
}

export default App;
