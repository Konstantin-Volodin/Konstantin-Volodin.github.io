import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Roboto-Header',
    body: 'Roboto Body',
  },
  colors: {
    // Modern Slate + Amber
    brand: {
      50: '#FFFBEB',
      100: '#FEF3C7',
      200: '#FDE68A',
      300: '#FCD34D',
      400: '#FBBF24',
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309',
      800: '#92400E',
      900: '#78350F',
    },
    slate: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
    },
  },
  components: {
    Button: {
      baseStyle: {
        _focus: { boxShadow: 'none' },
        _focusVisible: {
          boxShadow: '0 0 0 2px var(--chakra-colors-brand-200)',
        },
      },
      variants: {
        cta: {
          bg: 'brand.500',
          color: 'white',
          rounded: 'md',
          px: 5,
          _hover: { bg: 'brand.600' },
          _active: { bg: 'brand.700' },
          _focusVisible: { boxShadow: '0 0 0 3px rgba(245, 158, 11, 0.5)' },
        },
      },
    },
    IconButton: {
      baseStyle: {
        _focus: { boxShadow: 'none' },
        _focusVisible: {
          boxShadow: '0 0 0 2px var(--chakra-colors-brand-200)',
        },
      },
    },
    CloseButton: {
      baseStyle: {
        _focus: { boxShadow: 'none' },
        _focusVisible: {
          boxShadow: '0 0 0 2px var(--chakra-colors-brand-200)',
        },
      },
    },
    Link: {
      baseStyle: {
        _hover: { textDecoration: 'none', color: 'brand.600' },
        _focus: { boxShadow: 'none', outline: 'none' },
        _focusVisible: { boxShadow: '0 0 0 3px rgba(245, 158, 11, 0.35)' },
      },
    },
    Heading: {
      baseStyle: {
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        fontWeight: 700,
        cursor: 'default',
      },
    },
    Text: {
      baseStyle: {
        cursor: 'default',
      },
    },
    Modal: {
      defaultProps: {
        motionPreset: 'slideInBottom',
      },
    },
  },
  styles: {
    global: {
      'html, body': { bg: 'slate.50', color: 'slate.900' },
      html: { scrollBehavior: 'smooth' },
      body: { scrollSnapType: 'y proximity', scrollPaddingTop: '64px' },
    },
  },
});

export default theme;
