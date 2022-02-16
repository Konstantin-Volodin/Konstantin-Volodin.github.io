import { ReactNode } from 'react';
import {
  Box,
  Text,
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
  Spacer,
  Divider,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const Links = ['github', 'linkedin'];

function NavLink({ children }: { children: ReactNode }) {
  return(
    <Link fontWeight='bold' fontSize='20px' px={4} py={2} rounded={'md'} href={'#'} _hover={{textDecoration: 'none', bg: 'gray.200',}}>
      {children}
    </Link>
  )
}

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg='white'>

        <Container maxW='1140px'>
          <Flex h={16} alignItems={'center'}>

            {/* Logo */}
            <Text fontWeight='bold' fontSize='20px'>konstantin volodin</Text>
                      
            <Spacer />

            {/* Large Screen Links */}
            <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => ( <NavLink key={link}>{link}</NavLink> ))}
              <Box px={4} py={2} >
                <Button colorScheme='teal' variant='solid'> 
                  email me
                </Button>
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
                    <Button colorScheme='teal' variant='solid' px={4} py={2} h='46px'> 
                      email me
                    </Button>
                </VStack>
            </ModalBody>
        </ModalContent>
        </Modal>

      </Box>
      <Divider />
    </>
  );
}

export default Header