import { useState, useEffect, useCallback } from 'react';
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

const HEARTS = ['❤️', '💕', '💖', '💗'];
const MESSAGES = [
  'Really?',
  'Are you sure?',
  'Think again...',
  'Wrong answer!',
  'Try the other button',
  'Nope, try again',
  'I\'ll wait...',
  '...',
];

function Valentine() {
  const [accepted, setAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; heart: string }[]>([]);

  // YES button grows with a cap
  const yesScale = Math.min(1 + noCount * 0.15, 2);

  const moveNoButton = useCallback(() => {
    setNoPos((prev) => {
      const current = prev ?? {
        x: window.innerWidth / 2 + 60,
        y: window.innerHeight / 2,
      };
      const offset = () => (Math.random() < 0.5 ? -1 : 1) * (100 + Math.random() * 100);
      const x = Math.max(20, Math.min(window.innerWidth - 80, current.x + offset()));
      const y = Math.max(20, Math.min(window.innerHeight - 60, current.y + offset()));
      return { x, y };
    });
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

  if (accepted) {
    return (
      <Box
        minH="100vh"
        bg="#fff5f5"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        position="relative"
      >
        {floatingHearts.map(({ id, x, heart }) => (
          <Text
            key={id}
            position="absolute"
            bottom="-40px"
            left={`${x}%`}
            fontSize="1.5rem"
            animation={`${rise} 5s linear forwards`}
            pointerEvents="none"
          >
            {heart}
          </Text>
        ))}

        <VStack spacing={4} textAlign="center" zIndex={1}>
          <Text fontSize="4rem" animation={`${pulse} 1.5s ease-in-out infinite`}>
            ❤️
          </Text>
          <Heading
            fontSize={{ base: 'xl', md: '2xl' }}
            color="gray.700"
            fontFamily="heading"
            fontWeight={500}
          >
            I knew you'd say yes
          </Heading>
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      minH="100vh"
      bg="#fff9f9"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
    >
      <VStack spacing={6} textAlign="center" zIndex={1} px={4}>
        <Text fontSize="3rem">❤️</Text>

        <Heading
          fontSize={{ base: 'xl', md: '2xl' }}
          color="gray.700"
          fontFamily="heading"
          fontWeight={500}
        >
          Will you be my Valentine?
        </Heading>

        <Text fontSize="sm" color="gray.400">
          (there is only one correct answer)
        </Text>

        {noCount > 0 && (
          <Text fontSize="sm" color="gray.500">
            {MESSAGES[Math.min(noCount - 1, MESSAGES.length - 1)]}
          </Text>
        )}

        <Box display="flex" gap={4} alignItems="center" justifyContent="center">
          <Button
            onClick={() => setAccepted(true)}
            bg="red.400"
            color="white"
            _hover={{ bg: 'red.500' }}
            _active={{ bg: 'red.600' }}
            rounded="lg"
            px={6}
            py={2}
            transform={`scale(${yesScale})`}
            transition="all 0.3s ease"
          >
            Yes
          </Button>

          {noPos === null ? (
            <Button
              onMouseEnter={moveNoButton}
              onTouchStart={moveNoButton}
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
          position="fixed"
          left={`${noPos.x}px`}
          top={`${noPos.y}px`}
          onMouseEnter={moveNoButton}
          onTouchStart={moveNoButton}
          variant="outline"
          color="gray.400"
          borderColor="gray.300"
          _hover={{ bg: 'transparent' }}
          rounded="lg"
          px={6}
          py={2}
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
