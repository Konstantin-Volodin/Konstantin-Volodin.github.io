import {
  Box, Flex, Spacer,
  Heading, Text,
} from '@chakra-ui/react';

function Intro() {
    return(
        
      <Box>
        <Flex maxW='1140px' h='80vh' p={5} mx='auto' direction='column' align={'baseline'}>
            <Spacer></Spacer>
            <Heading maxW='500px' >
                Hi, I'm Konstantin - a data analyst and and OR expert
            </Heading>
            <Text maxW='700px' fontSize='lg' mt={8}>
                I have worked on a variety of data analytics, with extensive experience in
                predictive and prescriptive analytics. Currently working as a data 
                analyst at the Immigration, Refugees, and Citizenship Canada department.
            </Text>
            <Spacer></Spacer>
        </Flex>
      </Box>
    )
}

export default Intro