import { ReactNode } from 'react';
import {
  Box, Flex, Container, Center,
  Text, Heading, Link, LinkOverlay, LinkBox,
  HStack, VStack,
  IconButton, Button, Spacer, Divider,
  useDisclosure,
  Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton,
} from '@chakra-ui/react';
import { HamburgerIcon, EmailIcon } from '@chakra-ui/icons';
import Resume from "../assets/resume.pdf";
import "../index.css"

const Links = [
  {'name': 'github', 'link': 'https://github.com/Konstantin-Volodin'},
  // {'name': 'linkedin', 'link': 'https://github.com/Konstantin-Volodin'},
  {'name': 'resume', 'link': Resume},
];

function NavLink(props : any) {
  return(
    <Link px={6} py={3} my={4} href={props.link} _hover={{textDecoration: 'none', bg: 'gray.200',}} isExternal>
      <Text letterSpacing='0.5px' textTransform='uppercase' fontWeight='600'>
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
            <Heading size='sm' letterSpacing='0.5px' textTransform='uppercase' fontWeight='700'>konstantin volodin</Heading>
            <Spacer />

            {/* Large Screen Links */}
            <LinkBox>
              <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
                {Links.map((link) => {return(
                  <NavLink key={link.name} name={link.name} link={link.link} />
                )})}
                <Box px={4} py={2} >
                  <LinkOverlay  href="mailto:volodin.kostia@gmail.com" isExternal>
                    <button className="btn btn-1 btn-1d"> 
                      email me
                    </button>
                  </LinkOverlay >
                </Box>
              </HStack>
            </LinkBox>
            
            {/* Small Screen Button */}
            <IconButton size={'md'} display={{ base: 'flex', md: 'none' }} 
              aria-label={'Open Menu'} icon={<HamburgerIcon/>} 
              onClick={isOpen ? onClose : onOpen}
            />
          </Flex>
        </Container>
        
        {/* Small Screen Links */}
          <Modal isOpen={isOpen} onClose={onClose} isCentered size='full'>
            <ModalOverlay />
            <ModalContent opacity={"0.9 !important"} borderRadius='none'>
              <ModalCloseButton />

              <ModalBody>
                  <Flex direction='column' justify='center' align='center' opacity={"1 !important"} h="95vh">
                    {Links.map((link) => {return(
                      <NavLink key={link.name} name={link.name} link={link.link} />
                    )})}
                    <NavLink name='email me' link="mailto:volodin.kostia@gmail.com"></NavLink>
                  </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>

        <Divider />
      </Box>
    </>
  );
}

export default Header