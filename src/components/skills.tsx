import { useState, useRef, useEffect  } from 'react';
import {
  Box, Flex, Spacer, Image, Icon,
  Heading, Text, Container, Grid, SimpleGrid, 
  Tabs, TabList, Tab, TabPanels, TabPanel, Divider, SlideFade, Center
} from '@chakra-ui/react';
import VisibilitySensor   from "react-visibility-sensor";
import skillData from './skills-data'


function SkillIcon(props: any) {
  return(
    <Flex align='center' direction='column'>
      <Icon>
        {props.image}
        {/* <props.image fill="blue" width="50%" height="100%"/>  */}
      </Icon>
      <Text fontSize='md' textAlign='center'> {props.name} </Text>
    </Flex>
  )
}
function SkillList(props: any) {
  const domRef: any = useRef();
  const [enteredScreen, setEneredScreen] = useState(false);

  function onChange (isVisible : boolean) {
    if (isVisible == true) { setEneredScreen(true) }
  };

  return(
    <VisibilitySensor onChange={onChange} partialVisibility={true}>
      <SlideFade in={enteredScreen} offsetY='100px' transition={{ enter: { duration: 0.2 } }}>

        <Box width='250px'>
          
          <Text letterSpacing='0.5px' textTransform='uppercase' fontWeight='600' textAlign='center'>
            {props.data.section}
          </Text>
          <Divider></Divider>
          
          <Grid justifyContent='center' mt={14} templateColumns='repeat(2, 1fr)' gap={10}>
            {props.data.skills.map((skill : any) => {
              return( <SkillIcon image={skill.image} name={skill.name}> </SkillIcon> )
            })}
          </Grid>
        </Box>
      </SlideFade>
    </VisibilitySensor>
  )
}

function Skills() {
    return(
        
      <Box>
        <Container maxW='1300px' mb={52}>
          <Heading maxW='500px' >
              Skills & Technology
              
            </Heading>
            {/* <Text maxW='700px' fontSize='lg' mt={8}>
              Coming Soon
            </Text> */}
            <Center mt={16}>
              <Grid width="min-content"columnGap={{"base":"24", "xl":"32"}} rowGap={10} justifyContent='center' templateColumns={{'base':'repeat(1,1fr)','md':'repeat(2,1fr)', 'lg':'repeat(3,1fr)'}}>
                {skillData.map((item) => {
                    return( <SkillList data={item}> </SkillList> )
                  })}
              </Grid>
            </Center>
          </Container>
      </Box>
    )
}

export default Skills