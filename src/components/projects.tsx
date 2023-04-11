import { useState, useRef, useEffect } from 'react';
import { Box, Container, Heading, Grid, Text, Stack, Image, AspectRatio, SlideFade, Tag, Wrap, WrapItem } from '@chakra-ui/react';
import VisibilitySensor from "react-visibility-sensor";
import projData from './projectsData'

function ProjectCard(props: any) {
  const domRef: any = useRef();
  const [enteredScreen, setEneredScreen] = useState(false);

  function onChange(isVisible: boolean) {
    if (isVisible == true) { setEneredScreen(true) }
  };

  console.log(props)
  return (
    <VisibilitySensor onChange={onChange} partialVisibility={true}>
      <SlideFade in={enteredScreen} offsetY='100px' transition={{ enter: { duration: 0.2 } }}>
        <Box w={'full'} boxShadow={'md'} border='1px' borderColor={'gray.100'} rounded={'md'}>
          <Box bg='gray.200' p={6}>
            <AspectRatio w='full' ratio={16 / 9} >
              <Image src={props.pic} pos='relative' sx={{ 'filter': 'blur(0px)' }} />
            </AspectRatio>
          </Box>

          <Stack p={6}>
            <Text fontSize='lg'> {props.company} </Text>
            <Heading fontSize={'2xl'}> {props.name} </Heading>

            <Wrap>
              {props.technologies.map((text: string) => (
                <Tag key={text} w='fit-content' bg='blue.50'>{text}</Tag>
              ))}
              {props.skills.map((text: string) => (
                <Tag w='fit-content' bg='purple.50'>{text}</Tag>
              ))}
            </Wrap>
            <Text fontSize='md' whiteSpace='pre-wrap'>
              {props.description}
            </Text>
          </Stack>
        </Box>
      </SlideFade>
    </VisibilitySensor>
  );
}

function Projects() {
  return (
    <Box id='Projects'>
      <Container maxW='1300px' mb={52}>
        <Heading maxW='500px' >
          Projects
        </Heading>
        {/* <Text mt={10}>
          Coming Soon
        </Text> */}
        <Grid mt={16} templateColumns={{ 'base': 'repeat(1,1fr)', 'sm': 'repeat(2,1fr)', 'lg': 'repeat(2,1fr)' }} gap={14}>
          {projData.map((item) => {
            return (
              <ProjectCard key={item.name}
                name={item.name}
                company={item.company}
                description={item.description}
                pic={item.picture}
                skills={item.skills}
                technologies={item.technologies}
              > </ProjectCard>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}

export default Projects

