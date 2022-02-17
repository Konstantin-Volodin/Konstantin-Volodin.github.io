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

const Links = ['github', 'linkedin'];

function NavLink({ children }: { children: ReactNode }) {
  return(
    <Link px={4} py={2} rounded={'md'} href={'#'} _hover={{textDecoration: 'none', bg: 'gray.200',}}>
      <Text>
        {children}
      </Text>
    </Link>
  )
}

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg='white' position='sticky' top={0}>

        <Container maxW='1140px'>
          <Flex h={16} alignItems={'center'}>

            {/* Logo */}
            <Heading size='md'>konstantin volodin</Heading>
                      
            <Spacer />

            {/* Large Screen Links */}
            <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => ( <NavLink key={link}>{link}</NavLink> ))}
              <Box px={4} py={2} >
                <LinkOverlay  href="mailto:volodin.kostia@gmail.com">
                  <Button colorScheme='teal' variant='solid'> 
                    email me
                  </Button>
                </LinkOverlay >
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
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />

          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
                <VStack spacing={8} alignItems={'center'}>
                  {Links.map((link) => (
                    <NavLink key={link}>{link}</NavLink>
                  ))}
                  <LinkOverlay  href="mailto:volodin.kostia@gmail.com">
                    <Button colorScheme='teal' variant='solid' px={4} py={2} h='46px'> 
                      email me
                    </Button>
                  </LinkOverlay >
                </VStack>
            </ModalBody>
        </ModalContent>
        </Modal>

        <Divider />
      </Box>
    </>
  );
}

export default Header