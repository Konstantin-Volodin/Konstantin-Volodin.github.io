import { useState, useEffect } from 'react';
import {
  Box, Flex, Text, IconButton, Button, Stack, HStack,
  Collapse, useColorMode, useColorModeValue, useDisclosure,
  Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
  VStack, Link as ChakraLink, Container
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Projects',
    href: '#Projects',
  },
  {
    label: 'Skills', 
    href: '#Skills',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Konstantin-Volodin',
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/konstantin-volodin/',
    external: true,
  },
  {
    label: 'Resume',
    href: '/resume.pdf',
    external: true,
  },
];

const NavLink = ({ children, href, external, ...rest }: any) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  
  return (
    <ChakraLink
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        color: linkHoverColor,
        bg: useColorModeValue('gray.200', 'gray.700'),
        transform: 'translateY(-2px)',
      }}
      transition="all 0.2s"
      href={href}
      isExternal={external}
      color={linkColor}
      fontWeight={500}
      {...rest}>
      {children}
      {external && <ExternalLinkIcon mx="2px" boxSize={3} />}
    </ChakraLink>
  );
};

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, href, external }: NavItem) => {
  return (
    <Stack spacing={4}>
      <NavLink href={href} external={external}>
        <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
      </NavLink>
    </Stack>
  );
};

export default function HeaderEnhanced() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <MotionBox
      position="fixed"
      top={0}
      w="full"
      zIndex={999}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" } as any}
      bg={useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)')}
      backdropFilter="blur(10px)"
      borderBottom={scrolled ? 1 : 0}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.900')}
      shadow={scrolled ? 'md' : 'none'}
      transition="all 0.3s"
    >
      <Container maxW="container.lg">
        <Flex
          minH={'60px'}
          py={{ base: 2 }}
          align={'center'}
          justify={'space-between'}>
          
          {/* Logo/Name */}
          <MotionBox
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Text
              fontFamily={'heading'}
              fontSize={{ base: 'lg', md: 'xl' }}
              fontWeight={700}
              color={useColorModeValue('gray.800', 'white')}
              cursor="pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              konstantin volodin
            </Text>
          </MotionBox>

          {/* Desktop Navigation */}
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <HStack spacing={4}>
              {NAV_ITEMS.map((navItem) => (
                <NavLink key={navItem.label} href={navItem.href} external={navItem.external}>
                  {navItem.label}
                </NavLink>
              ))}
            </HStack>
          </Flex>

          {/* Right side controls */}
          <HStack spacing={2}>
            {/* Color mode toggle */}
            <IconButton
              size={'sm'}
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              aria-label={'Switch Color Mode'}
              onClick={toggleColorMode}
              variant={'ghost'}
              _hover={{
                bg: useColorModeValue('gray.200', 'gray.700'),
                transform: 'rotate(180deg)',
              }}
              transition="all 0.3s"
            />

            {/* Mobile menu button */}
            <IconButton
              onClick={onToggle}
              icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
              display={{ md: 'none' }}
              _hover={{
                bg: useColorModeValue('gray.200', 'gray.700'),
              }}
            />
          </HStack>
        </Flex>

        {/* Mobile Navigation */}
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Container>

      {/* Mobile Drawer (Alternative to Collapse) */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen && false}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Navigation</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {NAV_ITEMS.map((navItem) => (
                <NavLink 
                  key={navItem.label} 
                  href={navItem.href} 
                  external={navItem.external}
                  onClick={onClose}
                >
                  {navItem.label}
                </NavLink>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </MotionBox>
  );
}