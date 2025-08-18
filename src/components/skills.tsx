import { useState } from 'react';
import {
  Wrap, WrapItem, Box, Image, Heading, Text, Container, Divider, 
  SlideFade, usePrefersReducedMotion, VStack, Center, Grid
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import VisibilitySensor from "react-visibility-sensor";
import skillData from './SkillsData';
import { Skill } from '../types';

const MotionBox = motion(Box);

interface SkillIconProps {
  skill: Skill;
  variant?: 'default' | 'compact';
}

function SkillIcon({ skill, variant = 'default' }: SkillIconProps) {
  const { name, image } = skill;
  const hasImage = Boolean(image);

  if (variant === 'compact') {
    return (
      <VStack spacing={2} width="80px" cursor="default" aria-label={name}>
        {hasImage && <Image src={image} maxW="60px" maxH="40px" draggable={false} />}
        <Text fontSize="sm" textAlign="center" noOfLines={2}>{name}</Text>
      </VStack>
    );
  }

  return (
    <MotionBox
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 280, damping: 18 } as any}
    >
      {/* Square design: remove rounding */}
      <VStack spacing={2} width="104px" cursor="default" p={3} rounded='none' aria-label={name}
        sx={{
          _hover: { 
            bg: 'gray.50',
            _dark: { bg: 'gray.700' }
          }
        }}
      >
        {hasImage && <Image src={image} maxW="64px" maxH="44px" draggable={false} />}
        <Text fontSize="sm" textAlign="center" fontWeight="medium" noOfLines={2}>{name}</Text>
      </VStack>
    </MotionBox>
  );
}

interface SkillCardProps {
  data: any;
}

function SkillCard({ data }: SkillCardProps) {
  const [enteredScreen, setEnteredScreen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  function onChange(isVisible: boolean) {
    if (isVisible) { setEnteredScreen(true); }
  }

  return (
    <VisibilitySensor onChange={onChange} partialVisibility={true}>
      <SlideFade in={enteredScreen} offsetY={prefersReducedMotion ? '0px' : '60px'} transition={{ enter: { duration: 0.25 } }}>
        <Box 
          w="full"
          p={5}
          rounded='none'
          bg="white"
          shadow="md"
          borderWidth="1px"
          borderColor="gray.200"
          sx={{
            _dark: { 
              bg: "gray.800", 
              borderColor: "gray.600" 
            }
          }}
        >
          <VStack spacing={3} align="stretch">
            <VStack spacing={1}>
              <Heading fontSize="lg" textTransform="none" textAlign="center">
                {data.section}
              </Heading>
              <Divider />
            </VStack>

            <Wrap spacing={{ base: 4, md: 5 }} align="center" justify="center">
              {data.skills.map((skill: Skill, idx: number) => (
                <WrapItem key={`${data.section}-${idx}-${skill.name}`}>
                  <SkillIcon skill={skill} />
                </WrapItem>
              ))}
            </Wrap>
          </VStack>
        </Box>
      </SlideFade>
    </VisibilitySensor>
  );
}

function Skills() {
  return (
    <Box id='Skills' scrollMarginTop='5rem' borderTopWidth='1px' borderColor='border-subtle' 
      sx={{
        bg: "gray.50",
        _dark: { bg: "gray.900" }
      }}
    >
      <Container maxW='container.lg' py={{ base: 16, md: 20 }}>
        <VStack spacing={12} align="stretch">
          <VStack spacing={2} align="center">
            <Heading maxW='500px' textTransform='none' textAlign="center">
              Skills that drive outcomes
            </Heading>
            <Text maxW='600px' fontSize='md' textAlign="center" 
              sx={{
                color: "gray.600",
                _dark: { color: "gray.400" }
              }}
            >
              Practical tools I use to ship reliable data products and clear decision support.
            </Text>
          </VStack>

          <Center>
            <Grid
              width="max-content"
              columnGap={{ "base": "1rem", "md": "1.5rem", "xl": "2rem" }}
              rowGap={{ base: 4, md: 6 }}
              templateColumns={{ 'base': 'repeat(1,1fr)', 'md': 'repeat(2,1fr)', 'xl': 'repeat(3,1fr)' }}
            >
              {skillData.map((item) => (
                <SkillCard key={item.section} data={item} />
              ))}
            </Grid>
          </Center>
        </VStack>
      </Container>
    </Box>
  );
}

export default Skills;