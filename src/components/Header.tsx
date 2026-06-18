import { useState, useEffect } from 'react';
import { useColorMode } from '../shared/hooks/useColorMode';
import Container from './Container';

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

const Icon = ({ children, className = 'h-5 w-5' }: { children: React.ReactNode; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    {children}
  </svg>
);

const SunIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </Icon>
);
const MoonIcon = () => (
  <Icon><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></Icon>
);
const HamburgerIcon = () => (
  <Icon><path d="M3 6h18M3 12h18M3 18h18" /></Icon>
);
const CloseIcon = () => (
  <Icon className="h-4 w-4"><path d="M18 6 6 18M6 6l12 12" /></Icon>
);

interface NavLinkProps {
  children: React.ReactNode;
  href: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

const NavLink = ({ children, href, external, onClick, className = '' }: NavLinkProps) => (
  <a
    href={href}
    onClick={onClick}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    className={
      'rounded px-2 py-1 font-medium text-slate-600 transition-all duration-200 ' +
      'hover:-translate-y-0.5 hover:bg-slate-200 hover:text-slate-800 ' +
      'dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-white ' +
      className
    }
  >
    {children}
  </a>
);

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToHash = (href: string) => {
    const el = document.getElementById(href.slice(1));
    el && el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={
        'fixed top-0 z-[999] w-full border-b border-line bg-white/75 backdrop-blur-md ' +
        'transition-shadow dark:bg-slate-900/75 ' + (scrolled ? 'shadow-sm' : '')
      }
      style={{ backdropFilter: 'blur(12px) saturate(1.2)' }}
    >
      <Container>
        <div className="flex min-h-[60px] items-center justify-between py-1 md:py-2">
          {/* Logo / Name */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-heading text-base font-bold tracking-wide text-slate-800 transition-transform hover:scale-105 active:scale-95 md:text-lg dark:text-white"
          >
            konstantin <span className="text-brand-500">volodin</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-2 md:flex">
            {NAV_ITEMS.map((navItem) => (
              <NavLink key={navItem.label} href={navItem.href} external={navItem.external}
                onClick={(e) => {
                  if (navItem.href.startsWith('#')) {
                    e.preventDefault();
                    scrollToHash(navItem.href);
                  }
                }}
              >
                {navItem.label}
              </NavLink>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={toggleColorMode}
              aria-label={colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              className="rounded p-2 text-slate-600 transition-all duration-300 hover:rotate-180 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
            <button
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              className="rounded p-2 text-slate-600 hover:bg-slate-200 md:hidden dark:text-slate-200 dark:hover:bg-slate-700"
            >
              {isOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isOpen && (
          <nav className="flex flex-col gap-1 bg-white px-4 pb-4 pt-2 md:hidden dark:bg-slate-800">
            {NAV_ITEMS.map((navItem) => (
              <NavLink key={navItem.label} href={navItem.href} external={navItem.external}
                className="block w-full py-3 text-lg font-semibold"
                onClick={() => {
                  setIsOpen(false);
                  if (navItem.href.startsWith('#')) scrollToHash(navItem.href);
                }}
              >
                {navItem.label}
              </NavLink>
            ))}
          </nav>
        )}
      </Container>
    </header>
  );
}
