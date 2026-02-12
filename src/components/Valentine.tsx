import { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

const rise = keyframes`
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-100vh); opacity: 0; }
`;

const yesGlow = keyframes`
  0%, 100% { box-shadow: 0 10px 24px rgba(235, 87, 135, 0.35); }
  50% { box-shadow: 0 14px 34px rgba(235, 87, 135, 0.55); }
`;

const confettiBurst = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
  100% { transform: translate(var(--dx), var(--dy)) rotate(var(--rot)); opacity: 0; }
`;

const noWiggle = keyframes`
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-2px); }
  40% { transform: translateX(2px); }
  60% { transform: translateX(-1px); }
  80% { transform: translateX(1px); }
`;

const HEARTS = ['❤️', '💕', '💖', '💗'];
const NO_BUTTON_WIDTH = 96;
const NO_BUTTON_HEIGHT = 48;
const NO_BUTTON_MARGIN = 20;
const MIN_CURSOR_DISTANCE = 140;
const NO_MOVE_COOLDOWN_MS = 180;
const EASTER_EGG_THRESHOLD = 10;
const EASTER_EGG_MESSAGE = 'Okay that was personal. I\'m filing an emotional incident report. 📝';
const CONFETTI_COLORS = ['#ff4d8d', '#ff9f43', '#ffd166', '#7bdff2', '#b388ff', '#8cff98'];

const DEADPAN_MESSAGES = [
  'Acknowledged',
  'Documented',
  'Event logged: no_click_attempt_3',
  'Patch v1.0.1: No button still impossible to catch',
  'Respectfully... try the other button?',
  'Intermission ends when you hit Yes 💌',
];

const ACCEPTED_TITLE = 'Official update: you + me = very cute 💞';

function Valentine() {
  const [accepted, setAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; heart: string }[]>([]);
  const [displayedAcceptedTitle, setDisplayedAcceptedTitle] = useState('');
  const [noWiggleKey, setNoWiggleKey] = useState(0);
  const [confettiPieces, setConfettiPieces] = useState<
    { id: number; x: number; y: number; dx: string; dy: string; rot: string; color: string; size: number }[]
  >([]);
  const lastNoMoveAt = useRef(0);

  // YES button grows with a cap
  const yesScale = Math.min(1 + noCount * 0.15, 2);

  const getSafeNoPosition = (
    current: { x: number; y: number },
    pointer?: { x: number; y: number }
  ) => {
    const minX = NO_BUTTON_MARGIN;
    const maxX = Math.max(minX, window.innerWidth - NO_BUTTON_WIDTH - NO_BUTTON_MARGIN);
    const minY = NO_BUTTON_MARGIN;
    const maxY = Math.max(minY, window.innerHeight - NO_BUTTON_HEIGHT - NO_BUTTON_MARGIN);

    const offset = () => (Math.random() < 0.5 ? -1 : 1) * (100 + Math.random() * 100);

    for (let i = 0; i < 12; i += 1) {
      const candidate = {
        x: Math.max(minX, Math.min(maxX, current.x + offset())),
        y: Math.max(minY, Math.min(maxY, current.y + offset())),
      };

      if (!pointer) return candidate;

      const distanceToPointer = Math.hypot(candidate.x - pointer.x, candidate.y - pointer.y);
      if (distanceToPointer >= MIN_CURSOR_DISTANCE) return candidate;
    }

    if (!pointer) return current;

    return {
      x: pointer.x < window.innerWidth / 2 ? maxX : minX,
      y: pointer.y < window.innerHeight / 2 ? maxY : minY,
    };
  };

  const moveNoButton = useCallback((pointer?: { x: number; y: number }) => {
    const now = Date.now();
    if (now - lastNoMoveAt.current < NO_MOVE_COOLDOWN_MS) return;
    lastNoMoveAt.current = now;

    setNoPos((prev) => {
      const current = prev ?? {
        x: window.innerWidth / 2 + 60,
        y: window.innerHeight / 2,
      };
      return getSafeNoPosition(current, pointer);
    });
    setNoWiggleKey((k) => k + 1);
    setNoCount((c) => c + 1);
  }, []);

  // Spawn floating hearts on accepted
  useEffect(() => {
    if (!accepted) return;
    let id = 0;
    const interval = setInterval(() => {
      const heart = HEARTS[Math.floor(Math.random() * HEARTS.length)];
      const x = Math.random() * 100;
      setFloatingHearts((prev) => [...prev.slice(-20), { id: id++, x, heart }]);
    }, 400);
    return () => clearInterval(interval);
  }, [accepted]);

  useEffect(() => {
    if (!accepted) {
      setDisplayedAcceptedTitle('');
      return;
    }

    let idx = 0;
    const interval = setInterval(() => {
      idx += 1;
      setDisplayedAcceptedTitle(ACCEPTED_TITLE.slice(0, idx));
      if (idx >= ACCEPTED_TITLE.length) clearInterval(interval);
    }, 36);

    return () => clearInterval(interval);
  }, [accepted]);

  useEffect(() => {
    if (!confettiPieces.length) return;
    const timeout = setTimeout(() => setConfettiPieces([]), 1100);
    return () => clearTimeout(timeout);
  }, [confettiPieces]);

  const triggerConfettiBurst = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const pieces = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: centerX,
      y: centerY,
      dx: `${(Math.random() - 0.5) * 460}px`,
      dy: `${-120 - Math.random() * 260}px`,
      rot: `${(Math.random() - 0.5) * 900}deg`,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: 6 + Math.floor(Math.random() * 8),
    }));

    setConfettiPieces(pieces);
  };

  const handleAccept = () => {
    triggerConfettiBurst();
    setAccepted(true);
  };

  if (accepted) {
    return (
      <Box
        minH="100vh"
        bg="linear-gradient(160deg, #fff6fa 0%, #fff5f5 45%, #fdf3ff 100%)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        position="relative"
      >
        <Box
          position="absolute"
          top="-120px"
          right="-80px"
          w="320px"
          h="320px"
          bg="pink.200"
          opacity={0.35}
          filter="blur(70px)"
          borderRadius="full"
          pointerEvents="none"
        />
        <Box
          position="absolute"
          bottom="-140px"
          left="-80px"
          w="340px"
          h="340px"
          bg="purple.200"
          opacity={0.25}
          filter="blur(80px)"
          borderRadius="full"
          pointerEvents="none"
        />

        {floatingHearts.map(({ id, x, heart }) => (
          <Text
            key={id}
            position="absolute"
            bottom="-40px"
            left={`${x}%`}
            fontSize="1.5rem"
            animation={`${rise} 5s linear forwards`}
            pointerEvents="none"
            aria-hidden
          >
            {heart}
          </Text>
        ))}

        {confettiPieces.map((piece) => (
          <Box
            key={piece.id}
            position="fixed"
            left={`${piece.x}px`}
            top={`${piece.y}px`}
            w={`${piece.size}px`}
            h={`${piece.size * 0.55}px`}
            bg={piece.color}
            borderRadius="sm"
            pointerEvents="none"
            zIndex={20}
            style={{
              ['--dx' as string]: piece.dx,
              ['--dy' as string]: piece.dy,
              ['--rot' as string]: piece.rot,
            }}
            animation={`${confettiBurst} 1s ease-out forwards`}
          />
        ))}

        <VStack
          spacing={5}
          textAlign="center"
          zIndex={1}
          bg="whiteAlpha.750"
          backdropFilter="blur(10px)"
          borderRadius="2xl"
          px={{ base: 6, md: 10 }}
          py={{ base: 8, md: 10 }}
          boxShadow="0 20px 60px rgba(214, 67, 120, 0.2)"
          border="1px solid"
          borderColor="whiteAlpha.600"
        >
          <Text fontSize="4rem" animation={`${pulse} 1.5s ease-in-out infinite`}>
            ❤️
          </Text>
          <Heading
            fontSize={{ base: 'xl', md: '2xl' }}
            color="gray.700"
            fontFamily="heading"
            fontWeight={500}
          >
            {displayedAcceptedTitle || '\u00A0'}
          </Heading>
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(160deg, #fff9fb 0%, #fff7f7 45%, #f7f4ff 100%)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="-120px"
        right="-100px"
        w="340px"
        h="340px"
        bg="pink.200"
        opacity={0.28}
        filter="blur(80px)"
        borderRadius="full"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="-140px"
        left="-120px"
        w="360px"
        h="360px"
        bg="purple.200"
        opacity={0.22}
        filter="blur(90px)"
        borderRadius="full"
        pointerEvents="none"
      />

      <VStack
        spacing={6}
        textAlign="center"
        zIndex={1}
        px={{ base: 5, md: 10 }}
        py={{ base: 8, md: 10 }}
        mx={4}
        maxW="760px"
        w="full"
        bg="whiteAlpha.760"
        backdropFilter="blur(12px)"
        borderRadius="2xl"
        boxShadow="0 20px 60px rgba(214, 67, 120, 0.18)"
        border="1px solid"
        borderColor="whiteAlpha.700"
      >
        <Text fontSize="3rem">❤️</Text>

        <Heading
          fontSize={{ base: 'xl', md: '2xl' }}
          color="gray.700"
          fontFamily="heading"
          fontWeight={500}
        >
          Will you be my Valentine?
        </Heading>

        {noCount > 0 && (
          <Text fontSize={{ base: 'sm', md: 'md' }} color="pink.700" fontWeight={500}>
            {noCount >= EASTER_EGG_THRESHOLD
              ? EASTER_EGG_MESSAGE
              : DEADPAN_MESSAGES[Math.min(noCount - 1, DEADPAN_MESSAGES.length - 1)]}
          </Text>
        )}

        <Box display="flex" gap={4} alignItems="center" justifyContent="center" mt={3}>
          <Button
            onClick={handleAccept}
            bgGradient="linear(to-r, pink.500, red.400)"
            color="white"
            _hover={{ bgGradient: 'linear(to-r, pink.500, red.500)' }}
            _active={{ bgGradient: 'linear(to-r, pink.600, red.600)' }}
            rounded="lg"
            px={8}
            py={3}
            fontWeight={700}
            letterSpacing="0.2px"
            transform={`scale(${yesScale})`}
            boxShadow="0 10px 24px rgba(235, 87, 135, 0.35)"
            transition="all 0.25s ease"
            animation={`${yesGlow} 1.6s ease-in-out infinite`}
          >
            Yes
          </Button>

          {noPos === null ? (
            <Button
              onMouseEnter={(e) => moveNoButton({ x: e.clientX, y: e.clientY })}
              onTouchStart={(e) => {
                const touch = e.touches[0];
                moveNoButton(touch ? { x: touch.clientX, y: touch.clientY } : undefined);
              }}
              variant="outline"
              color="gray.400"
              borderColor="gray.300"
              _hover={{ bg: 'transparent' }}
              rounded="lg"
              px={6}
              py={2}
            >
              No
            </Button>
          ) : null}
        </Box>
      </VStack>

      {noPos !== null && (
        <Button
          key={`no-button-${noWiggleKey}`}
          position="fixed"
          left={`${noPos.x}px`}
          top={`${noPos.y}px`}
          onMouseEnter={(e) => moveNoButton({ x: e.clientX, y: e.clientY })}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            moveNoButton(touch ? { x: touch.clientX, y: touch.clientY } : undefined);
          }}
          variant="outline"
          color="gray.400"
          borderColor="gray.300"
          _hover={{ bg: 'transparent' }}
          rounded="lg"
          px={6}
          py={2}
          animation={`${noWiggle} 0.22s ease-out`}
          transition="left 0.15s ease, top 0.15s ease"
          zIndex={10}
        >
          No
        </Button>
      )}
    </Box>
  );
}

export default Valentine;
