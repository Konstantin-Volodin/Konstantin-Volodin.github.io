import {
  Box, Flex, Spacer,
  Heading, Text, Link
} from '@chakra-ui/react';

function Intro() {
  return (

    <Box>
      <Flex maxW='1300px' h='80vh' p={5} mx='auto' direction='column' align={'baseline'}>
        <Spacer></Spacer>
        <Heading maxW='500px' >
          Hi, I'm Konstantin
        </Heading>
        <Text maxW='700px' fontSize='xl' mt={8}>
          As a data scientist for the Government of Canada and a graduate student at McGill University, I am passionate about the power of data to drive evidence-based decision-making and transformative insights.
          My experience and education have emphasized the importance of robust data engineering, which I aspire to contribute to.
          I've used my data science and data engineering skills to improve decision-making for newcomer initiatives, harnessing the power of data for more effective outcomes.
        </Text>
        <Text maxW='700px' fontSize='xl' mt={8}>
          Outside of my work, you can find me bouldering, indulging in binge-watching sessions, and dedicating an excessive amount of time to personal analytics projects.
          {/* If you want to chat about any analytics projects, you are welcome to email me at <Link fontWeight={'bold'} href="mailto:volodin.kostia@gmail.com">volodin.kostia@gmail.com</Link>! */}
        </Text>
        <Spacer></Spacer>
      </Flex>
    </Box>
  )
}

export default Intro