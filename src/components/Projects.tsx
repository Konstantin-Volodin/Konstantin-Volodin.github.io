import { ReactNode } from 'react';
import {
  Box, Container, Heading, Grid,
  Text, Stack, Image, AspectRatio
} from '@chakra-ui/react';

import projData from './projects-data'

function ProjectCard(props: any) {
  return (
      <Box w={'full'} boxShadow={'md'} border='1px' borderColor={'gray.100'} rounded={'md'}>

        <Box bg='gray.200' p={6}>
          <AspectRatio w='full' ratio={16/9} >
            <Image src={props.pic} pos='relative' sx={{'filter':'blur(0px)'}} />
          </AspectRatio>
        </Box>
       
        <Stack p={6}>
          <Text fontSize='lg'> {props.company} </Text>
          <Heading fontSize={'2xl'}> {props.name} </Heading>
          <Text fontSize='md'>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.
          </Text>
        </Stack>
      </Box>
  );
}

function Projects() {
  return(
    <Box>
      <Container maxW='1300px' mb={52}>
        <Heading maxW='500px' >
          Relevant Projects
        </Heading>
        <Grid mt={8} templateColumns={{'base':'repeat(1,1fr)','sm':'repeat(2,1fr)', 'lg':'repeat(2,1fr)'}} gap={14}>
          {projData.map((item) => {
            return( <ProjectCard name={item.name} company={item.company} description={item.description} pic={item.picture}> </ProjectCard>)
          })}
        </Grid>
      </Container>
    </Box>
  )
}



export default Projects

