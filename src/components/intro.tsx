import {
  Box, Flex, Spacer,
  Heading, Text, Link
} from '@chakra-ui/react';

function Intro() {
    return(
        
      <Box>
        <Flex maxW='1300px' h='80vh' p={5} mx='auto' direction='column' align={'baseline'}>
            <Spacer></Spacer>
            <Heading maxW='500px' >
              Hi, I'm Konstantin - a data analyst and an OR expert
            </Heading>
            <Text maxW='700px' fontSize='lg' mt={8}>
              I have worked on a variety of advanced analytics projects, with extensive experience in 
              predictive and prescriptive analytics. I am currently working as a data 
              analyst at a federal department for the Government of Canada.
            </Text>
            <Text maxW='700px' fontSize='lg' mt={8}>
              If you want to chat about any advanced analytics projects, you are welcome to email me at <Link fontWeight={'bold'} href="mailto:volodin.kostia@gmail.com">volodin.kostia@gmail.com</Link>!
            </Text>
            <Spacer></Spacer>
        </Flex>
      </Box>
    )
}

export default Intro