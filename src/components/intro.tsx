// @ts-nocheck
import { Box, Heading, Text } from '@chakra-ui/react';

function Intro() {
  return (
    <Box
      as="section"
      borderTopWidth='1px'
      borderColor='border-subtle'
      scrollMarginTop='80px'
      style={{
        scrollSnapAlign: 'start',
        backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(245,158,11,0.06), transparent 40%)'
      }}
      display='flex'
      alignItems='center'
      minH='calc(100vh - 64px)'
    >
      <Box maxW='64rem' mx='auto' px='20px' textAlign={{ base: 'center', md: 'left' }} width='100%'>
        <Text fontSize='sm' color='text-muted' mx={{ base: 'auto', md: '0' }} mb='0.5rem'>
          Welcome — I'm Konstantin 👋
        </Text>

        <Text color='brand.600' fontWeight='semibold' letterSpacing='0.08em' textTransform='uppercase' mx={{ base: 'auto', md: '0' }}>
          Data Science & Analytics
        </Text>

        <Heading as='h1' fontSize='4xl' lineHeight='1.1' textTransform='none' maxW='48rem' mt='2rem' mx={{ base: 'auto', md: '0' }}>
          I build reliable data products that turn policy into impact.
        </Heading>

        <Text fontSize='lg' color='slate.600' maxW='42rem' mt='1.25rem' mx={{ base: 'auto', md: '0' }}>
          I'm a data scientist with the Government of Canada based in Montreal. I focus on robust pipelines, reproducible analytics, and clear decision support.
        </Text>
      </Box>
    </Box>
  )
}

export default Intro