import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

// 1. Updated color mode config to follow system preference
const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
}

const theme = extendTheme({
  config,
  fonts: {
    // Space Grotesk for headings, system stack for body
    heading: 'SpaceGroteskVariable, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace'
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
  semanticTokens: {
    colors: {
      // Background colors
      bg: { default: 'slate.50', _dark: 'slate.900' },
      'bg-subtle': { default: 'white', _dark: 'slate.800' },
      'bg-layer': { default: 'white', _dark: 'slate.800' },
      'bg-alt': { default: 'slate.100', _dark: 'slate.800' },
      'bg-glass': { default: 'rgba(255,255,255,0.75)', _dark: 'rgba(15,23,42,0.75)' },
      // Text colors
      text: { default: 'slate.900', _dark: 'slate.50' },
      'text-muted': { default: 'slate.500', _dark: 'slate.400' },
      // Border colors
      border: { default: 'slate.200', _dark: 'slate.700' },
      'border-subtle': { default: 'slate.100', _dark: 'slate.800' },
      // Accent colors
      accent: { default: 'brand.500', _dark: 'brand.400' },
      'focus-ring': { default: 'brand.300', _dark: 'brand.400' },
      // Hover states
      'hover-bg': { default: 'gray.200', _dark: 'slate.700' },
    },
    radii: {
      card: '0.5rem'
    }
  },
  radii: {
    // square-ish aesthetic but allow small rounding tokens
    none: '0',
    sm: '2px',
    md: '4px',
    lg: '8px',
    xl: '12px',
    full: '9999px'
  },
  shadows: {
    outline: '0 0 0 3px rgba(245,158,11,0.45)',
    subtle: '0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.1)',
    lift: '0 4px 12px rgba(0,0,0,0.12)'
  },
  sizes: {
    content: '1280px'
  },
  components: {
    Button: {
      baseStyle: {
        _focus: { boxShadow: 'none' },
        _focusVisible: { boxShadow: '0 0 0 2px var(--chakra-colors-focus-ring)' },
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
        ghostPill: {
          bg: 'transparent',
          color: 'text',
          rounded: 'full',
          px: 4,
          _hover: { bg: 'slate.100', _dark: { bg: 'slate.700' } }
        }
      },
    },
    Tag: {
      variants: {
        pill: {
          rounded: 'full',
          fontWeight: 500,
          letterSpacing: 'wide',
          px: 3,
          py: 1,
          bg: 'slate.100',
          color: 'slate.700',
          _dark: { bg: 'slate.700', color: 'slate.200' },
          _hover: { bg: 'brand.50', _dark: { bg: 'slate.600' } }
        }
      }
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
        letterSpacing: '-0.25px',
        textTransform: 'none',
        fontWeight: 600,
        cursor: 'default',
        color: 'text',
      },
    },
    Text: {
      baseStyle: {
        cursor: 'default',
        color: 'text',
      },
    },
    IconButton: {
      baseStyle: {
        _focus: { boxShadow: 'none' },
        _focusVisible: { boxShadow: '0 0 0 2px var(--chakra-colors-focus-ring)' },
      },
    },
    CloseButton: {
      baseStyle: {
        _focus: { boxShadow: 'none' },
        _focusVisible: { boxShadow: '0 0 0 2px var(--chakra-colors-focus-ring)' },
      },
    },
    Modal: { defaultProps: { motionPreset: 'slideInBottom' } }
  },
  styles: {
    global: {
      'html, body': {
        bg: 'bg',
        color: 'text',
        transition: 'background-color 0.2s, color 0.2s'
      },
      html: { scrollBehavior: 'smooth' },
      body: { scrollPaddingTop: '70px' },
      '*, *::before, *::after': { borderColor: 'border-subtle' },
      '::selection': { background: 'brand.500', color: 'white' }
    }
  }
})

export default theme