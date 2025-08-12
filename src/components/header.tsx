import {
  Box, Flex, Container, Text, Heading, Link, LinkBox,
  HStack, IconButton, Spacer,
  useDisclosure, useColorMode,
  // Replace Modal with Drawer for mobile navigation
  Drawer, DrawerOverlay, DrawerContent, DrawerBody, DrawerCloseButton,
  VStack,
} from '@chakra-ui/react';
import { HamburgerIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import "../index.css";

// Define Link item type and annotate the array so `type` narrows to the literal union
type LinkItem = { name: string; link: string; type?: 'internal' | 'external' };
const Links: LinkItem[] = [
  // { name: 'about', link: '#Projects', type: 'internal' },
  { name: 'github', link: 'https://github.com/Konstantin-Volodin', type: 'external' },
  { name: 'linkedin', link: 'https://www.linkedin.com/in/konstantin-volodin/', type: 'external' },
  { name: 'resume', link: '/resume.pdf', type: 'external' },
];

// Strongly type NavLink props and infer external links when type is not provided
interface NavLinkProps {
  name: string;
  link: string;
  type?: 'internal' | 'external';
}

function NavLink({ name, link, type }: NavLinkProps) {
  const isExternal = typeof type !== 'undefined' ? type === 'external' : /^(https?:|mailto:)/.test(link);
  return (
    <Link px={6} py={3} my={4} href={link} _hover={{ textDecoration: 'none', bg: 'hover-bg' }} isExternal={isExternal}>
      <Text letterSpacing='0.5px' textTransform='uppercase' fontWeight='600'>
        {name}
      </Text>
    </Link>
  );
}

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box
        bg='bg-glass'
        backdropFilter='saturate(180%) blur(10px)'
        top={0}
        zIndex={100}
        position='sticky'
        shadow='sm'
        borderBottomWidth='1px'
        borderBottomColor='border'
      >

        <Container maxW='container.lg'>
          <Flex h={16} alignItems={'center'}>

            {/* Logo */}
            <Heading size='sm' letterSpacing='0.5px' textTransform='uppercase' fontWeight='700'>konstantin volodin</Heading>
            <Spacer />

            {/* Large Screen Links */}
            <LinkBox>
              <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
                {Links.map((link) => {
                  return (
                    <NavLink key={link.name} name={link.name} link={link.link} type={link.type} />
                  )
                })}
                {/* Color Mode Toggle */}
                <IconButton
                  aria-label={colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                  icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                  onClick={toggleColorMode}
                  variant="ghost"
                  size="sm"
                />
              </HStack>
            </LinkBox>

            {/* Small Screen Buttons */}
            <HStack display={{ base: 'flex', md: 'none' }}>
              <IconButton
                aria-label={colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="ghost"
                size="sm"
              />
              <IconButton size={'md'}
                aria-label={'Open navigation menu'} icon={<HamburgerIcon />}
                onClick={onOpen}
                variant='ghost'
              />
            </HStack>
          </Flex>
        </Container>

        {/* Mobile Navigation Drawer */}
        <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody display='flex' alignItems='center' justifyContent='center'>
              <VStack spacing={4}>
                {Links.map((link) => {
                  return (
                    <NavLink key={link.name} name={link.name} link={link.link} type={link.type} />
                  )
                })}
                {/* Color Mode Toggle for Mobile */}
                <IconButton
                  aria-label={colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                  icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                  onClick={toggleColorMode}
                  variant="ghost"
                  size="md"
                />
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
}

export default Header