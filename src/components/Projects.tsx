import { ReactNode } from 'react';
import {
  Box, Container, Heading,
  Grid, GridItem,
  Center,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image
} from '@chakra-ui/react';

import projData from './projects-data'

function ProjectCard(props: any) {
  return (
      <Box w={'full'} boxShadow={'md'} border='1px' borderColor={'gray.100'} rounded={'md'}
        p={6}
        overflow={'hidden'}>
        {/* <Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}>
          <Image
            src={'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'}
          />
        </Box> */}
        
        <Stack>
          <Text> {props.name} </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            Boost your conversion rate
          </Heading>
          <Text color={'gray.500'}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Avatar
            src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
          />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>Achim Rolle</Text>
            <Text color={'gray.500'}>Feb 08, 2021 · 6min read</Text>
          </Stack>
        </Stack>
      </Box>
  );
}

function Projects() {
  return(
    <Box>
      <Container maxW='1140px' mb={20}>
        <Heading>
            Relevant Projects
        </Heading>
        <Grid mt={8} templateColumns={{'base':'repeat(1,1fr)','lg':'repeat(2,1fr)'}} gap={8}>
          <ProjectCard name={projData[0].name}/>
          <ProjectCard name={projData[0].name}/>
          <ProjectCard name={projData[0].name}/>
          <ProjectCard name={projData[0].name}/>
          <ProjectCard name={projData[0].name}/>
          <GridItem w='100%' h={20} bg='blue.500' />
          <GridItem w='100%' h={20} bg='blue.500' />
          <GridItem w='100%' h={20} bg='blue.500' />
          <GridItem w='100%' h={20} bg='blue.500' />
          <GridItem w='100%' h={20} bg='blue.500' />
          <GridItem w='100%' h={20} bg='blue.500' />
          <GridItem w='100%' h={20} bg='blue.500' />
          <GridItem w='100%' h={20} bg='blue.500' />
          <GridItem w='100%' h={20} bg='blue.500' />
          <GridItem w='100%' h={20} bg='blue.500' />
        </Grid>
      </Container>
    </Box>
  )
}



export default Projects

