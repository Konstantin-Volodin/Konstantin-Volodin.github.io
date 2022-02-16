import { ReactNode } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  VStack,
  Container,
  Heading,
  Center,
  Text,
  Stack,
  Spacer
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

function Intro() {
    return(
        
      <Box>
        <Flex maxW='1140px' h='80vh' p={5} mx='auto' direction='column' align={'baseline'}>
            <Spacer></Spacer>
            <Heading maxW='500px' >
                Hi, I'm Konstantin - a data analyst and and OR expert
            </Heading>
            <Text maxW='700px' fontSize='xl' fontWeight='lighter' mt={8}>
                I have worked on a variety of data analytics, with most experience in
                predictive and prescriptive analytics. Currently working as a data 
                analyst at the Immigration, Refugees, and Citizenship Canada department.
            </Text>
            <Spacer></Spacer>
        </Flex>
      </Box>
    )
}

export default Intro