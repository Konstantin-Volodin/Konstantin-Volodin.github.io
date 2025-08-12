import { useState } from 'react';
import {
  Wrap, WrapItem,
  Box, Flex, Image,
  Heading, Text, Container, Grid,
  Divider, SlideFade, Center, usePrefersReducedMotion
} from '@chakra-ui/react';
import VisibilitySensor from "react-visibility-sensor";
import skillData from './skillsData'


function SkillIcon(props: any) {
  return (
    <Flex align='center' direction='column' width='100px'>
      <Image src={props.image} maxW='100px' maxH='50px' mb={3}></Image>
      <Text fontSize='md' textAlign='center'> {props.name} </Text>
    </Flex>
  )
}

function SkillCard(props: any) {
  const [enteredScreen, setEnteredScreen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  function onChange(isVisible: boolean) {
    if (isVisible) { setEnteredScreen(true) }
  };

  return (
    <VisibilitySensor onChange={onChange} partialVisibility={true}>
      <SlideFade in={enteredScreen} offsetY={prefersReducedMotion ? '0px' : '60px'} transition={{ enter: { duration: 0.3 } }}>

        <Box width="300px">


          <Heading fontSize={'2xl'} textTransform='none'> {props.name} </Heading>
          <Heading letterSpacing='0.5px' textTransform='uppercase' fontSize={'lg'} textAlign='center'>
            {props.data.section}
          </Heading>
          <Divider my={4}></Divider>

          <Wrap spacing={14} align='center' justify='center'>
            {props.data.skills.map((skill: any) => (
              <WrapItem key={skill.name}>
                <SkillIcon image={skill.image} name={skill.name} />
              </WrapItem>
            ))}
          </Wrap>

        </Box>
      </SlideFade>
    </VisibilitySensor>
  )
}

function Skills() {
  return (

    <Box id='Skills' scrollMarginTop='5rem' borderTopWidth='1px' borderColor='slate.100'>
      <Container maxW='container.lg' py={'112px'}>
        <Heading maxW='500px' textTransform='none'>
          Knowledge & Skills
        </Heading>
        {/* <Text maxW='700px' fontSize='lg' mt={8}>
              Coming Soon
            </Text> */}
        <Center mt={16}>
          <Grid width="min-content"
            columnGap={{ "base": "24", "xl": "32" }}
            rowGap={12}
            justifyContent='center'
            templateColumns={{ 'base': 'repeat(1,1fr)', 'md': 'repeat(2,1fr)', 'xl': 'repeat(3,1fr)' }}>
            {skillData.map((item) => {
              return (<SkillCard data={item} key={item.section}> </SkillCard>)
            })}
          </Grid>
        </Center>
      </Container>
    </Box>
  )
}

export default Skills