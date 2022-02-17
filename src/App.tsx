import {ChakraProvider, extendTheme} from '@chakra-ui/react';
import { Global } from '@emotion/react'

import Fonts from './assets/fonts/font'
import theme from './assets/fonts/theme'

import Header from './components/header';
import Intro from './components/intro';
import Projects from './components/projects';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Header></Header>
      <Intro></Intro>
      <Projects></Projects>
    </ChakraProvider>
  );
}

export default App;
