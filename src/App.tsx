import {ChakraProvider, extendTheme} from '@chakra-ui/react';
import { Global } from '@emotion/react'
import { Helmet } from "react-helmet";

import Fonts from './assets/fonts/font'
import theme from './assets/fonts/theme'

import Header from './components/header';
import Intro from './components/intro';
import Projects from './components/projects';
import Skills from './components/skills'
import ContactMe from './components/knowMore'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Helmet>
        <title>Welcome | Konstantin Volodin's Portfolio</title>
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
