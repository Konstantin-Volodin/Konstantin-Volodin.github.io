import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Helmet } from "react-helmet";

import Fonts from './static/fonts/font'
import theme from './static/fonts/theme'

import Header from './components/header';
import Intro from './components/intro';
import Projects from './components/projects';
import Skills from './components/skills'
import ContactMe from './components/knowMore'

function App() {
  return (
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
  );
}

export default App;
