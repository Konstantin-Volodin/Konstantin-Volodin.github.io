import { useState, useRef, useEffect } from 'react';
import { Box, Center, Container, Heading, Grid, Text, Stack, Image, AspectRatio, SlideFade, Tag, Wrap, LinkBox, LinkOverlay } from '@chakra-ui/react';
import VisibilitySensor from "react-visibility-sensor";
import projData from './projectsData'

function ProjectCard(props: any) {
  const domRef: any = useRef();
  const [enteredScreen, setEneredScreen] = useState(false);

  function onChange(isVisible: boolean) {
    if (isVisible == true) { setEneredScreen(true); console.log(props) }
  };

  return (
    <VisibilitySensor onChange={onChange} partialVisibility={true}>
      <SlideFade in={enteredScreen} offsetY='100px' transition={{ enter: { duration: 0.2 } }}>


        <LinkBox as='article'>
          <Box w={'full'} boxShadow={'md'} border='1px' borderColor={'gray.100'} rounded={'md'}>

            {/* IMAGE / LINK */}
            <LinkOverlay isExternal href={props.link}>
              <Center bg='gray.200' p={4} h='200px'>
                <AspectRatio w='100%' h='100%' ratio={16 / 9} >
                  <Image src={props.pic} pos='relative' sx={{ 'filter': 'blur(0px)' }} />
                </AspectRatio>
              </Center>
            </LinkOverlay>

            {/* SKILLS / TECHNOLOGIES */}
            <Stack p={6}>
              <Text fontSize='lg'> {props.company} </Text>
              <Heading fontSize={'2xl'}> {props.name} </Heading>

              <Wrap>
                {props.technologies.map((text: string) => (
                  <Tag key={text} w='fit-content' bg='blue.50'>{text}</Tag>
                ))}
                {props.skills.map((text: string) => (
                  <Tag key={text} w='fit-content' bg='purple.50'>{text}</Tag>
                ))}
              </Wrap>

              {/* DESCRIPTION */}
              <Text fontSize='md' whiteSpace='pre-wrap'>
                {props.description}
              </Text>

            </Stack>
          </Box>
        </LinkBox>

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
                link={item.link}
              > </ProjectCard>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}

export default Projects

