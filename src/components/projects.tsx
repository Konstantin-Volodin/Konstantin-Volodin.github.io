// @ts-nocheck
import { useMemo, useState, useEffect, useCallback } from 'react';
import { Box, Container, Heading, Grid, Text, Stack, Image, SlideFade, Tag, LinkBox, usePrefersReducedMotion, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Button, Divider } from '@chakra-ui/react';
import VisibilitySensor from "react-visibility-sensor";
import projData from './projectsData'

function ProjectCard(props: any) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const slug = String(props.name || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const { isOpen, onOpen, onClose } = useDisclosure();
  // IDs for a11y wiring
  const modalId = `${slug}-modal`;
  const modalHeaderId = `${slug}-header`;

  function onChange(isVisible: boolean) {
    if (isVisible) { setEnteredScreen(true); }
  };

  const meta = useMemo(() => {
    // Prioritize technologies, then skills, unique, max 3
    const tech = Array.isArray(props.technologies) ? props.technologies : [];
    const skills = Array.isArray(props.skills) ? props.skills : [];
    const arr = [...tech, ...skills].filter(Boolean);
    const uniq: string[] = [];
    arr.forEach((v) => { if (!uniq.includes(v)) uniq.push(v); });
    return uniq.slice(0, 3);
  }, [props.technologies, props.skills]);

  const hoverTransform = prefersReducedMotion ? 'none' : 'translateY(-4px)';
  const imageHover = prefersReducedMotion ? 'none' : 'scale(1.02)';

  // URL helpers for deep-linking the modal
  const getProjectFromUrl = useCallback(() => {
    try {
      const url = new URL(window.location.href);
      return url.searchParams.get('project');
    } catch {}
    return null;
  }, []);

  const openModal = useCallback(() => {
    onOpen();
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.get('project') !== slug) {
        url.searchParams.set('project', slug);
        window.history.pushState(window.history.state, '', url.toString());
      }
    } catch {}
  }, [onOpen, slug]);

  const closeModal = useCallback(() => {
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.get('project')) {
        url.searchParams.delete('project');
        window.history.replaceState(window.history.state, '', url.toString());
      }
    } catch {}
    onClose();
  }, [onClose]);

  // Keep modal state in sync with URL for navigation/back/forward and initial load
  useEffect(() => {
    const handlePop = () => {
      const p = getProjectFromUrl();
      if (p === slug) {
        if (!isOpen) onOpen();
      } else if (isOpen) {
        onClose();
      }
    };
    window.addEventListener('popstate', handlePop);
    // Initial check (deep-link)
    const initial = getProjectFromUrl();
    if (initial === slug && !isOpen) {
      onOpen();
    }
    return () => window.removeEventListener('popstate', handlePop);
  }, [getProjectFromUrl, isOpen, onClose, onOpen, slug]);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal();
    }
  }, [openModal]);

  return (
    <VisibilitySensor onChange={onChange} partialVisibility={true}>
      <SlideFade in={enteredScreen} offsetY={prefersReducedMotion ? '0px' : '60px'} transition={{ enter: { duration: 0.25 } }}>

        <>
          <LinkBox as='article' aria-labelledby={`${slug}-title`} role='button'
                   aria-expanded={isOpen} aria-controls={modalId}
                   _focus={{ outline: 'none' }}
                   _focusVisible={{ boxShadow: '0 0 0 2px var(--chakra-colors-brand-200)' }}
                   _focusWithin={{ boxShadow: '0 0 0 2px var(--chakra-colors-brand-200)' }}
                   onClick={openModal} onKeyDown={onKeyDown} tabIndex={0} cursor='pointer'>
            <Box w='full' h='100%' display='flex' flexDirection='column'
                 border='1px' borderColor='slate.200' rounded='none' bg='white' overflow='hidden'
                 boxShadow='xs'
                 outline='1px solid transparent'
                 transition='transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, outline-color 0.25s ease'
                 _hover={{ transform: hoverTransform, boxShadow: 'lg', borderColor: 'slate.300', outline: '1px solid var(--chakra-colors-brand-200)' }}
                 minH={{ base: '340px', md: '360px' }}>

              {/* IMAGE: fixed height for uniform cards */}
              <Box bg='slate.100' position='relative' flexShrink={0} h={{ base: '140px', md: '160px', lg: '180px' }}>
                <Image src={props.pic}
                       alt={`${props.name} preview`}
                       loading='lazy'
                       decoding='async'
                       fetchPriority='low'
                       w='100%'
                       h='100%'
                       objectFit='cover'
                       transform='translateZ(0)'
                       transition='transform 0.4s ease, filter 0.4s ease'
                       _groupHover={{ transform: imageHover }} />
                {/* Light glass hover overlay */}
                <Box pointerEvents='none' position='absolute' inset={0} opacity={0}
                     transition='opacity 0.3s ease'
                     _groupHover={{ opacity: 1 }}
                     bg='blackAlpha.50'
                     style={{ backdropFilter: 'blur(4px) saturate(1.1)' }} />
              </Box>

              {/* CONTENT (minimalist) */}
              <Stack p={{ base: '16px', md: '20px' }} spacing={3} flex={1}>
                <Tag size='sm' bg='slate.50' color='slate.700' borderWidth='1px' borderColor='slate.200' rounded='none' w='fit-content'>
                  {props.company}
                </Tag>

                <Heading as='h3' fontSize={{ base: 'md', md: 'lg' }} lineHeight='1.25' id={`${slug}-title`} fontWeight='semibold' noOfLines={2}
                         color='slate.800' _groupHover={{ color: 'slate.900' }}>
                  {props.name}
                </Heading>

                {props.description && (
                  <Text fontSize='sm' color='slate.700' noOfLines={1} display={{ base: 'none', md: 'block' }}>
                    {props.description}
                  </Text>
                )}

                {meta.length > 0 && (
                  <Box mt='auto' pt={1}>
                    <Text fontSize='xs' color='slate.600' noOfLines={1}
                          opacity={0.6}
                          transition='opacity 0.2s ease'
                          _groupHover={{ opacity: 1 }}>
                      {meta.join(' • ')}
                    </Text>
                  </Box>
                )}
              </Stack>
            </Box>
          </LinkBox>

          {/* Modal with full description and details */}
          <Modal isOpen={isOpen} onClose={closeModal} isCentered motionPreset={prefersReducedMotion ? 'none' : 'scale'}>
            <ModalOverlay bg='blackAlpha.400' backdropFilter='blur(6px)' />
            <ModalContent id={modalId} aria-labelledby={modalHeaderId} aria-describedby={`${slug}-desc`} rounded='none' maxW='container.lg' w='full'>
              <ModalHeader id={modalHeaderId} fontWeight='semibold' lineHeight='1.2'>{props.name}</ModalHeader>
              <ModalCloseButton _focusVisible={{ boxShadow: '0 0 0 2px var(--chakra-colors-brand-200)' }} />
              <ModalBody px={{ base: 7, md: 10 }} py={{ base: 7, md: 10 }}>
                {/* Summary band - improved readability & semantics */}
                <Box as='dl'
                     display='grid'
                     gridTemplateColumns={{ base: '1fr', md: '160px 1fr' }}
                     alignItems='start'
                     columnGap={{ base: 0, md: 6 }}
                     rowGap={3}
                     mb={7}>
                  {props.company && (
                    <>
                      <Box as='dt' fontSize='sm' color='slate.700' fontWeight='semibold' letterSpacing='wide' textTransform='uppercase'>
                        Company
                      </Box>
                      <Box as='dd' fontSize='md' color='slate.800' lineHeight='1.8'>
                        {props.company}
                      </Box>
                    </>
                  )}

                  {(Array.isArray(props.technologies) && props.technologies.length > 0) && (
                    <>
                      <Box as='dt' fontSize='sm' color='slate.700' fontWeight='semibold' letterSpacing='wide' textTransform='uppercase'>
                        Tech
                      </Box>
                      <Box as='dd' fontSize='md' color='slate.800' lineHeight='1.8' whiteSpace='normal' wordBreak='break-word'>
                        {props.technologies.slice(0, 10).join(', ')}
                      </Box>
                    </>
                  )}

                  {(Array.isArray(props.skills) && props.skills.length > 0) && (
                    <>
                      <Box as='dt' fontSize='sm' color='slate.700' fontWeight='semibold' letterSpacing='wide' textTransform='uppercase'>
                        Skills
                      </Box>
                      <Box as='dd' fontSize='md' color='slate.800' lineHeight='1.8' whiteSpace='normal' wordBreak='break-word'>
                        {props.skills.slice(0, 8).join(', ')}
                      </Box>
                    </>
                  )}
                </Box>

                {/* Separation */}
                <Divider mb={6} />

                {/* Long description, calmer text */}
                <Text id={`${slug}-desc`} color='slate.700' whiteSpace='pre-wrap' fontSize='md' lineHeight='1.9'>
                  {props.longDescription || 'No additional details available.'}
                </Text>

                {/* Media preview, compact size (no enforced aspect ratio) */}
                {props.pic && (
                  <Box mt={7} p={{ base: 2, md: 3 }} bg='slate.50' borderWidth='1px' borderColor='slate.200'>
                    <Image src={props.pic}
                           alt={`${props.name} preview`}
                           loading='lazy'
                           decoding='async'
                           fetchPriority='low'
                           w='100%'
                           h='auto'
                           objectFit='cover'
                           maxH={{ base: '160px', md: '180px' }} />
                  </Box>
                )}

                {/* No actions per request */}
              </ModalBody>
            </ModalContent>
          </Modal>
        </>

      </SlideFade>
    </VisibilitySensor>
  );
}

// Predefined category groups
const GROUPS: Record<string, (item: any) => boolean> = {
  All: () => true,
  Web: (i) => (i.skills || []).includes('Web Development') || (i.technologies || []).some((t: string) => ['React', 'Django'].includes(t)),
  ML: (i) => (i.skills || []).includes('Data Science') || (i.technologies || []).some((t: string) => ['PyTorch', 'Statsforecast'].includes(t)),
  Optimization: (i) => (i.skills || []).some((s: string) => s.toLowerCase().includes('optimiz')) || (i.technologies || []).some((t: string) => ['Gurobi'].includes(t)),
  Analytics: (i) => (i.skills || []).some((s: string) => ['Data Analysis', 'Visualization', 'Dashboarding'].includes(s)),
  Cloud: (i) => (i.technologies || []).some((t: string) => ['GCP', 'AWS'].includes(t)) || (i.skills || []).includes('Cloud Providers')
};

const GROUP_NAMES = Object.keys(GROUPS);
const STORAGE_KEY = 'kv.projects.activeGroup';
const STORAGE_TECH_KEY = 'kv.projects.activeTech';

function getCatFromUrl() {
  try {
    const url = new URL(window.location.href);
    const fromSearch = url.searchParams.get('cat');
    if (fromSearch) return fromSearch;
    const hash = window.location.hash || '';
    const m = hash.match(/(?:[?#&]|^)cat=([^&]+)/i);
    if (m && m[1]) return decodeURIComponent(m[1]);
  } catch {}
  return null;
}

function getTechFromUrl() {
  try {
    const url = new URL(window.location.href);
    const fromSearch = url.searchParams.get('tech');
    if (fromSearch) return fromSearch;
    const hash = window.location.hash || '';
    const m = hash.match(/(?:[?#&]|^)tech=([^&]+)/i);
    if (m && m[1]) return decodeURIComponent(m[1]);
  } catch {}
  return null;
}

function isValidGroup(cat: any): cat is keyof typeof GROUPS {
  return typeof cat === 'string' && GROUP_NAMES.includes(cat);
}

function Projects() {
  // All technologies present in data, ordered with common ones first
  const allTechs = useMemo(() => {
    const set = new Set<string>();
    projData.forEach((i: any) => Array.isArray(i.technologies) && i.technologies.forEach((t: string) => set.add(t)));
    const TOP_TECHS = ['Python','R','SQL','JavaScript','TypeScript','React','Django','PyTorch','GCP','AWS','Docker','Airflow','Databricks','Power BI','Postman','Node.js','NoSQL'];
    const top = TOP_TECHS.filter(t => set.has(t));
    const rest = Array.from(set).filter(t => !TOP_TECHS.includes(t));
    return [...top, ...rest];
  }, []);

  // Add a configurable label for the category selector
  const CATEGORY_LABEL = 'Focus';

  // Initialize from URL, then localStorage, else default 'All'
  const [activeGroup, setActiveGroup] = useState(() => {
    const fromUrl = getCatFromUrl();
    if (isValidGroup(fromUrl)) return fromUrl;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isValidGroup(saved)) return saved;
    } catch {}
    return 'All';
  });

  const [activeTech, setActiveTech] = useState(() => {
    const fromUrl = getTechFromUrl();
    if (typeof fromUrl === 'string' && (fromUrl === 'All' || allTechs.includes(fromUrl))) return fromUrl;
    try {
      const saved = localStorage.getItem(STORAGE_TECH_KEY);
      if (typeof saved === 'string' && (saved === 'All' || allTechs.includes(saved))) return saved;
    } catch {}
    return 'All';
  });

  // Only keep 4–5 most relevant technology filters (present in data)
  const TECH_NAMES = useMemo(() => {
    const FEATURED_TECH_ORDER = ['Python','R','SQL','PyTorch','React'];
    const featured = FEATURED_TECH_ORDER.filter(t => allTechs.includes(t));
    return ['All', ...featured];
  }, [allTechs]);

  // If activeTech isn't in the limited list, coerce to 'All' to avoid hidden state
  useEffect(() => {
    if (!TECH_NAMES.includes(activeTech)) {
      setActiveTech('All');
    }
  }, [TECH_NAMES, activeTech]);

  // Keep URL and localStorage in sync with selection
  const syncSelection = useCallback((cat: keyof typeof GROUPS, tech: string, replace = true) => {
    try {
      // Persist to localStorage
      localStorage.setItem(STORAGE_KEY, cat as string);
      localStorage.setItem(STORAGE_TECH_KEY, tech);
      // Update the URL's search params while preserving hash
      const url = new URL(window.location.href);
      url.searchParams.set('cat', cat as string);
      if (tech && tech !== 'All') {
        url.searchParams.set('tech', tech);
      } else {
        url.searchParams.delete('tech');
      }
      const method = replace ? 'replaceState' : 'pushState';
      window.history[method](window.history.state, '', url.toString());
    } catch {}
  }, []);

  // Handle browser nav to keep UI in sync
  useEffect(() => {
    const onPop = () => {
      const fromUrl = getCatFromUrl();
      if (isValidGroup(fromUrl)) {
        setActiveGroup(fromUrl);
        try { localStorage.setItem(STORAGE_KEY, fromUrl); } catch {}
      }
      const techFromUrl = getTechFromUrl();
      const nextTech = (typeof techFromUrl === 'string' && (techFromUrl === 'All' || allTechs.includes(techFromUrl))) ? techFromUrl : 'All';
      setActiveTech(nextTech);
      try { localStorage.setItem(STORAGE_TECH_KEY, nextTech); } catch {}
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [allTechs]);

  // Apply sync whenever the selection changes
  useEffect(() => {
    syncSelection(activeGroup, activeTech, true);
  }, [activeGroup, activeTech, syncSelection]);

  const handleSelect = (cat: keyof typeof GROUPS) => {
    if (cat !== activeGroup) {
      setActiveGroup(cat);
      // URL/localStorage are synced in effect
    }
  };

  const handleSelectTech = (tech: string) => {
    if (tech !== activeTech) {
      setActiveTech(tech);
      // URL/localStorage are synced in effect
    }
  };

  // Show a clear control only when filters are active
  const hasActiveFilters = useMemo(() => activeGroup !== 'All' || activeTech !== 'All', [activeGroup, activeTech]);
  const clearFilters = useCallback(() => { setActiveGroup('All'); setActiveTech('All'); }, []);

  const items = useMemo(() => {
    const fn = GROUPS[activeGroup] || GROUPS.All;
    let arr = projData.filter(fn);
    if (activeTech && activeTech !== 'All') {
      arr = arr.filter((i: any) => Array.isArray(i.technologies) && i.technologies.includes(activeTech));
    }
    return arr;
  }, [activeGroup, activeTech]);

  // Build slugs of visible items for keyboard navigation in modal
  const slugify = useCallback((s: string) => String(s || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''), []);
  const slugs = useMemo(() => items.map((i: any) => slugify(i.name)), [items, slugify]);

  // Local helper to read current project from URL
  const getProjectFromUrlLocal = useCallback(() => {
    try {
      const url = new URL(window.location.href);
      return url.searchParams.get('project');
    } catch {}
    return null;
  }, []);

  // Arrow key navigation between projects while modal is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const current = getProjectFromUrlLocal();
      if (!current) return; // no modal open
      if (slugs.length === 0) return;
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const idx = slugs.indexOf(current);
      if (idx === -1) return;
      const nextIdx = e.key === 'ArrowRight' ? (idx + 1) % slugs.length : (idx - 1 + slugs.length) % slugs.length;
      const nextSlug = slugs[nextIdx];
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('project', nextSlug);
        window.history.pushState(window.history.state, '', url.toString());
        // Notify listeners (ProjectCards) to sync
        window.dispatchEvent(new PopStateEvent('popstate'));
      } catch {}
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [slugs, getProjectFromUrlLocal]);

  return (
    <Box id='Projects' scrollMarginTop='5rem' borderTopWidth='1px' borderColor='slate.100'>
      <Container maxW='container.lg' py={'112px'}>
        <Heading maxW='500px' textTransform='none'>
          Projects
        </Heading>

        {/* Category descriptor + compact chips */}
        <HStack mt={5} spacing={2} flexWrap='wrap' alignItems='center'>
          <Text as='span' fontSize='sm' fontWeight='semibold' color='slate.700' mr={1}>{CATEGORY_LABEL}:</Text>
          {GROUP_NAMES.map((cat) => {
            const isActive = activeGroup === cat;
            return (
              <Tag key={cat}
                   as='button'
                   onMouseDown={(e) => e.preventDefault()}
                   onClick={() => handleSelect(cat as any)}
                   aria-pressed={isActive}
                   rounded='none'
                   px={3}
                   py={1.5}
                   fontSize={{ base: 'sm', md: 'sm' }}
                   fontWeight='medium'
                   letterSpacing='wide'
                   transition='border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease'
                   bg={isActive ? 'brand.50' : 'white'}
                   color={isActive ? 'brand.900' : 'slate.800'}
                   borderWidth='1px'
                   borderColor={isActive ? 'brand.200' : 'slate.200'}
                   _hover={{ borderColor: isActive ? 'brand.300' : 'slate.300' }}
                   _focus={{ boxShadow: 'none', outline: 'none' }}
                   _focusVisible={{ boxShadow: '0 0 0 2px var(--chakra-colors-brand-200)' }}>
                {cat}
              </Tag>
            )
          })}
        </HStack>

        {/* Technology descriptor + compact chips (limited list) */}
        <HStack mt={3} spacing={2} flexWrap='wrap' alignItems='center'>
          <Text as='span' fontSize='sm' fontWeight='semibold' color='slate.700' mr={1}>Technology:</Text>
          {TECH_NAMES.map((tech) => {
            const isActive = activeTech === tech;
            return (
              <Tag key={tech}
                   as='button'
                   onMouseDown={(e) => e.preventDefault()}
                   onClick={() => handleSelectTech(tech)}
                   aria-pressed={isActive}
                   rounded='none'
                   px={3}
                   py={1.5}
                   fontSize={{ base: 'sm', md: 'sm' }}
                   fontWeight='medium'
                   letterSpacing='wide'
                   transition='border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease'
                   bg={isActive ? 'brand.50' : 'white'}
                   color={isActive ? 'brand.900' : 'slate.800'}
                   borderWidth='1px'
                   borderColor={isActive ? 'brand.200' : 'slate.200'}
                   _hover={{ borderColor: isActive ? 'brand.300' : 'slate.300' }}
                   _focus={{ boxShadow: 'none', outline: 'none' }}
                   _focusVisible={{ boxShadow: '0 0 0 2px var(--chakra-colors-brand-200)' }}>
                {tech}
              </Tag>
            )
          })}

          {hasActiveFilters && (
            <Button onMouseDown={(e) => e.preventDefault()}
                    onClick={clearFilters}
                    variant='ghost'
                    size='sm'
                    rounded='none'
                    px={2}
                    py={1}
                    fontSize='sm'
                    color='slate.700'
                    _hover={{ bg: 'slate.50' }}
                    _focus={{ boxShadow: 'none', outline: 'none' }}
                    _focusVisible={{ boxShadow: '0 0 0 2px var(--chakra-colors-brand-200)' }}
                    aria-label='Clear filters'>
              Clear filters
            </Button>
          )}
        </HStack>

        {/* 2 per row on md+ (no toggle) */}
        <Grid mt={8} templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={16}>
          {items.map((item: any) => (
            <ProjectCard key={item.name}
              name={item.name}
              company={item.company}
              description={item.description}
              longDescription={item.longDescription}
              pic={item.picture}
              skills={item.skills}
              technologies={item.technologies}
              link={item.link}
            />
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Projects

