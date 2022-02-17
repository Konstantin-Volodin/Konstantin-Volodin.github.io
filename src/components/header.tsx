import { ReactNode } from 'react';
import {
  Box, Flex, Container,
  Text, Heading, Link, LinkOverlay, LinkBox,
  HStack, VStack,
  IconButton, Button, Spacer, Divider,
  useDisclosure,
  Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const Links = [
  {'name': 'github', 'link': 'https://github.com/Konstantin-Volodin'},
  // {'name': 'linkedin', 'link': 'https://github.com/Konstantin-Volodin'}
];

function NavLink(props : any) {
  return(
    <Link px={4} py={2} rounded={'md'} href={props.link} _hover={{textDecoration: 'none', bg: 'gray.200',}}>
      <Text>
        {props.name}
      </Text>
    </Link>
  )
}

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg='white' position='sticky' top={0} zIndex={100}>

        <Container maxW='1300px'>
          <Flex h={16} alignItems={'center'}>

            {/* Logo */}
            <Heading size='md'>konstantin volodin</Heading>
            <Spacer />

            {/* Large Screen Links */}
            <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => {return(
                <NavLink name={link.name} link={link.link} />
              )})}
              <Box px={4} py={2} >
                {/* <LinkOverlay  href="mailto:volodin.kostia@gmail.com"> */}
                  <Button colorScheme='teal' variant='solid'> 
                    email me
                  </Button>
                {/* </LinkOverlay > */}
              </Box>
            </HStack>
            
            {/* Small Screen Button */}
            <IconButton size={'md'} display={{ base: 'flex', md: 'none' }} 
              aria-label={'Open Menu'} icon={<HamburgerIcon/>} 
              onClick={isOpen ? onClose : onOpen}
            />
          </Flex>
        </Container>
        
        {/* Small Screen Links */}
        {/* <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />

          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
                <VStack spacing={8} alignItems={'center'}>
                  {Links.map((link) => {return(
                    <NavLink name={link.name} link={link.link} />
                  )})}
                  <LinkOverlay  href="mailto:volodin.kostia@gmail.com">
                    <Button colorScheme='teal' variant='solid' px={4} py={2} h='46px'> 
                      email me
                    </Button>
                  </LinkOverlay >
                </VStack>
            </ModalBody>
        </ModalContent>
        </Modal> */}

        <Divider />
      </Box>
    </>
  );
}

export default Header