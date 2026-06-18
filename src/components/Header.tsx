import { useState, useEffect } from 'react';
import {
  Box, Flex, Text, IconButton, Stack, HStack,
  Collapse, useColorMode, useColorModeValue, useDisclosure,
  Link as ChakraLink, Container
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

const NAV_ITEMS: Array<NavItem> = [
  { label: 'Projects', href: '#Projects' },
  { label: 'Skills', href: '#Skills' },
  { label: 'GitHub', href: 'https://github.com/Konstantin-Volodin', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/konstantin-volodin/', external: true },
];

interface NavLinkProps {
  children: React.ReactNode;
  href: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  // Allow style/layout props to be forwarded
  [key: string]: any;
}

const NavLink = ({ children, href, external, onClick, ...rest }: NavLinkProps) => {
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
      onClick={onClick}
      isExternal={external}
      color={linkColor}
      fontWeight={500}
      {...rest}>
      {children}
    </ChakraLink>
  );
};

const MobileNav = ({ onNavigate }: { onNavigate: () => void }) => (
  <Stack bg={useColorModeValue('white', 'gray.800')} px={4} pb={4} pt={2} spacing={1} display={{ md: 'none' }}>
    {NAV_ITEMS.map((navItem) => (
      <MobileNavItem key={navItem.label} {...navItem} onNavigate={onNavigate} />
    ))}
  </Stack>
);

const MobileNavItem = ({ label, href, external, onNavigate }: NavItem & { onNavigate: () => void }) => (
  <Box>
    <NavLink
      href={href}
      external={external}
      onClick={() => {
        onNavigate();
        if (href.startsWith('#')) {
          // smooth scroll for internal anchors
            const el = document.querySelector(href);
            el && el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }}
      w='full'
      display='block'
      fontSize='lg'
      py={3}
    >
      <Text fontWeight={600}>{label}</Text>
    </NavLink>
  </Box>
);

export default function HeaderEnhanced() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bg = useColorModeValue('bg-glass', 'bg-glass');
  const borderClr = useColorModeValue('border', 'border');

  return (
    <MotionBox
      position="fixed"
      top={0}
      w="full"
      zIndex={999}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' } as any}
      bg={bg}
      backdropFilter="blur(12px) saturate(1.2)" shadow={scrolled ? 'sm' : 'none'}
      borderBottom={'1px solid'} borderColor={borderClr}
    >
      <Container maxW="container.lg">
        <Flex minH={'60px'} py={{ base: 1, md: 2 }} align={'center'} justify={'space-between'}>
          {/* Logo / Name */}
          <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Text
              fontFamily={'heading'}
              fontSize={{ base: 'md', md: 'lg' }}
              fontWeight={700}
              letterSpacing='0.5px'
              color={useColorModeValue('slate.800', 'white')}
              cursor="pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              konstantin <Box as='span' color='brand.500'>volodin</Box>
            </Text>
          </MotionBox>

          {/* Desktop nav */}
          <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
            {NAV_ITEMS.map((navItem) => (
              <NavLink key={navItem.label} href={navItem.href} external={navItem.external}
                onClick={(e: React.MouseEvent) => {
                  if (navItem.href.startsWith('#')) {
                    e.preventDefault();
                    const el = document.getElementById(navItem.href.slice(1));
                    el && el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                {navItem.label}
              </NavLink>
            ))}
          </HStack>

          {/* Controls */}
          <HStack spacing={1}>
            <IconButton
              size={'sm'}
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              aria-label={colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              onClick={toggleColorMode}
              variant={'ghost'}
              _hover={{ bg: useColorModeValue('slate.200', 'slate.700'), transform: 'rotate(180deg)' }}
              transition="all 0.3s"
            />
            <IconButton
              onClick={onToggle}
              icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
              variant={'ghost'}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              display={{ md: 'none' }}
              aria-expanded={isOpen}
              _hover={{ bg: useColorModeValue('slate.200', 'slate.700') }}
            />
          </HStack>
        </Flex>

        {/* Mobile navigation collapse */}
        <Collapse in={isOpen} animateOpacity>
          <MobileNav onNavigate={onClose} />
        </Collapse>
      </Container>
    </MotionBox>
  );
}