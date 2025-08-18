import { Box, Container, Heading, Text, VStack, HStack, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

export default function IntroEnhanced() {
  const accentColor = useColorModeValue('orange.500', 'orange.300');
  const subtleColor = useColorModeValue('gray.600', 'gray.400');
  
  return (
    <MotionBox
      pt={{ base: '120px', md: '140px' }} // Account for fixed header
      pb={{ base: 16, md: 20 }}
      minH="80vh"
      display="flex"
      alignItems="center"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <Container maxW="container.lg">
        <MotionVStack 
          spacing={{ base: 6, md: 8 }} 
          align="start" 
          maxW="800px"
          variants={staggerContainer}
        >
          {/* Greeting */}
          <MotionText 
            fontSize={{ base: 'lg', md: 'xl' }}
            color={subtleColor}
            fontWeight="500"
            variants={fadeInUp}
          >
            Welcome — I'm Konstantin 👋
          </MotionText>

          {/* Role Badge */}
          <MotionBox variants={fadeInUp}>
            <Text
              fontSize={{ base: 'sm', md: 'md' }}
              fontWeight="600"
              color={accentColor}
              textTransform="uppercase"
              letterSpacing="wider"
              mb={4}
            >
              Data Science & Analytics
            </Text>
          </MotionBox>

          {/* Main Headline */}
          <MotionHeading
            as="h1"
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            fontWeight="800"
            lineHeight="1.2"
            color={useColorModeValue('gray.800', 'white')}
            variants={fadeInUp}
            maxW="700px"
          >
            I build reliable{' '}
            <Box as="span" color={accentColor} position="relative">
              data products
              <Box
                position="absolute"
                bottom="-4px"
                left="0"
                right="0"
                height="4px"
                bg={accentColor}
                opacity="0.3"
                borderRadius="full"
                as={motion.div}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1.5, duration: 0.8 }}
              />
            </Box>{' '}
            that turn policy into impact.
          </MotionHeading>

          {/* Description */}
          <MotionText
            fontSize={{ base: 'lg', md: 'xl' }}
            color={subtleColor}
            lineHeight="1.7"
            maxW="600px"
            variants={fadeInUp}
          >
            I'm a data scientist with the Government of Canada based in Montreal. 
            I focus on robust pipelines, reproducible analytics, and clear decision support.
          </MotionText>

          {/* Stats or highlights */}
          {/* <MotionBox variants={fadeInUp} pt={4}>
            <HStack 
              spacing={{ base: 4, md: 8 }} 
              flexWrap="wrap"
              divider={
                <Box 
                  w="1px" 
                  h="30px" 
                  bg={useColorModeValue('gray.300', 'gray.600')} 
                />
              }
            >
              <VStack spacing={1} align="start">
                <Text fontSize="2xl" fontWeight="bold" color={accentColor}>12+</Text>
                <Text fontSize="sm" color={subtleColor}>Projects</Text>
              </VStack>

              <VStack spacing={1} align="start">
                <Text fontSize="2xl" fontWeight="bold" color={accentColor}>20+</Text>
                <Text fontSize="sm" color={subtleColor}>Technologies</Text>
              </VStack>
            </HStack>
          </MotionBox> */}
        </MotionVStack>
      </Container>
    </MotionBox>
  );
}