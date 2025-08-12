import { useState } from 'react';
import {
  Wrap, WrapItem, Box, Flex, Image, Heading, Text, Container, Grid, Divider, 
  SlideFade, Center, usePrefersReducedMotion, Progress, Tooltip, Badge, HStack, VStack, Icon
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import VisibilitySensor from "react-visibility-sensor";
import skillData from './skillsData';
import { getSkillColor } from '../utils';
import { Skill } from '../types';

const MotionBox = motion(Box);

interface SkillIconProps {
  skill: Skill;
  variant?: 'default' | 'compact';
}

function SkillIcon({ skill, variant = 'default' }: SkillIconProps) {
  const { name, image, proficiency, yearsExperience, description } = skill;

  if (variant === 'compact') {
    return (
      <Tooltip label={description} placement="top" hasArrow>
        <VStack spacing={2} width="80px" cursor="help">
          <Image src={image} maxW="60px" maxH="40px" />
          <Text fontSize="sm" textAlign="center" noOfLines={2}>{name}</Text>
          {proficiency && (
            <HStack spacing={1}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  as={StarIcon}
                  w={3}
                  h={3}
                  color={star <= proficiency ? getSkillColor(proficiency) : 'gray.300'}
                />
              ))}
            </HStack>
          )}
        </VStack>
      </Tooltip>
    );
  }

  return (
    <MotionBox
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 17 } as any}
    >
      <Tooltip 
        label={
          <VStack align="start" spacing={1}>
            <Text fontWeight="bold">{name}</Text>
            {description && <Text fontSize="sm">{description}</Text>}
            {yearsExperience && <Text fontSize="xs">Experience: {yearsExperience} years</Text>}
          </VStack>
        } 
        placement="top" 
        hasArrow
      >
        <VStack spacing={3} width="120px" cursor="help" p={3} borderRadius="lg" 
          sx={{
            _hover: { 
              bg: 'gray.50',
              _dark: { bg: 'gray.700' }
            }
          }}
        >
          <Image src={image} maxW="80px" maxH="60px" />
          <Text fontSize="md" textAlign="center" fontWeight="medium" noOfLines={2}>{name}</Text>
          
          {proficiency && (
            <VStack spacing={1} width="full">
              <HStack spacing={1}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon
                    key={star}
                    as={StarIcon}
                    w={3}
                    h={3}
                    color={star <= proficiency ? getSkillColor(proficiency) : 'gray.300'}
                  />
                ))}
              </HStack>
              <Progress
                value={proficiency * 20}
                size="sm"
                width="full"
                colorScheme={getSkillColor(proficiency).split('.')[0]}
                borderRadius="full"
              />
            </VStack>
          )}
          
          {yearsExperience && (
            <Badge colorScheme="blue" size="sm">
              {yearsExperience}y exp
            </Badge>
          )}
        </VStack>
      </Tooltip>
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
      <SlideFade in={enteredScreen} offsetY={prefersReducedMotion ? '0px' : '60px'} transition={{ enter: { duration: 0.3 } }}>
        <Box 
          minWidth={{ base: "320px", md: "360px" }} 
          maxWidth="420px"
          p={6}
          borderRadius="xl"
          bg="white"
          shadow="lg"
          borderWidth="1px"
          borderColor="gray.200"
          sx={{
            _dark: { 
              bg: "gray.800", 
              borderColor: "gray.600" 
            }
          }}
        >
          <VStack spacing={4} align="stretch">
            <VStack spacing={2}>
              <Heading fontSize="xl" textTransform="none" textAlign="center">
                {data.section}
              </Heading>
              <Divider />
            </VStack>

            <Wrap spacing={6} align="center" justify="center">
              {data.skills.map((skill: Skill) => (
                <WrapItem key={skill.name}>
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

function SkillsEnhanced() {
  return (
    <Box id='Skills' scrollMarginTop='5rem' borderTopWidth='1px' borderColor='slate.100' 
      sx={{
        bg: "gray.50",
        _dark: { bg: "gray.900" }
      }}
    >
      <Container maxW='container.lg' py={{ base: 20, md: 24 }}>
        <VStack spacing={8} align="stretch">
          <VStack spacing={4} align="center">
            <Heading maxW='500px' textTransform='none' textAlign="center">
              Knowledge & Skills
            </Heading>
            <Text maxW='600px' fontSize='lg' textAlign="center" 
              sx={{
                color: "gray.600",
                _dark: { color: "gray.400" }
              }}
            >
              My technical expertise spans across multiple domains, from data science and analytics to full-stack development.
            </Text>
          </VStack>

          <Center>
            <Grid 
              width="min-content"
              columnGap={{ base: 6, md: 8, xl: 10 }}
              rowGap={8}
              justifyContent='center'
              templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(2,1fr)' }}
            >
              {skillData.map((item) => (
                <SkillCard data={item} key={item.section} />
              ))}
            </Grid>
          </Center>
        </VStack>
      </Container>
    </Box>
  );
}

export default SkillsEnhanced;