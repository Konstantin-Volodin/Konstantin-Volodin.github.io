import {
  ChakraProvider,
  extendTheme
} from '@chakra-ui/react';

import 'typeface-roboto'

import Header from './components/header';
import Intro from './components/intro';

const theme = extendTheme({
  fonts: 'Roboto'
})

function App() {
  return (
    <ChakraProvider theme={theme}>
      {/* <Header></Header>
      <Intro></Intro> */}
    </ChakraProvider>
  );
}

export default App;
