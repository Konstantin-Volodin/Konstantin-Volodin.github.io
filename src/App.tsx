import { ChakraProvider } from '@chakra-ui/react';
import { Helmet } from "react-helmet";

import Fonts from './static/fonts/font'
import theme from './static/fonts/theme'

import Header from './components/header';
import Intro from './components/intro';
import Projects from './components/projects';
import Skills from './components/skills'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Helmet>
        <title>Konstantin Volodin - Data Science & Analytics Portfolio</title>
        <meta name="description" content="Data scientist with the Government of Canada based in Montreal. I build reliable data products that turn policy into impact with robust pipelines, reproducible analytics, and clear decision support." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://konstantin-volodin.github.io/" />
        <meta property="og:title" content="Konstantin Volodin - Data Science & Analytics Portfolio" />
        <meta property="og:description" content="Data scientist with the Government of Canada based in Montreal. I build reliable data products that turn policy into impact with robust pipelines, reproducible analytics, and clear decision support." />
        <meta property="og:image" content="https://konstantin-volodin.github.io/social-share.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Konstantin Volodin - Data Science & Analytics Portfolio" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://konstantin-volodin.github.io/" />
        <meta property="twitter:title" content="Konstantin Volodin - Data Science & Analytics Portfolio" />
        <meta property="twitter:description" content="Data scientist with the Government of Canada based in Montreal. I build reliable data products that turn policy into impact with robust pipelines, reproducible analytics, and clear decision support." />
        <meta property="twitter:image" content="https://konstantin-volodin.github.io/social-share.png" />
        
        {/* Additional SEO meta tags */}
        <meta name="author" content="Konstantin Volodin" />
        <meta name="keywords" content="data science, analytics, government, canada, montreal, machine learning, data products, policy analysis" />
        <link rel="canonical" href="https://konstantin-volodin.github.io/" />
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
