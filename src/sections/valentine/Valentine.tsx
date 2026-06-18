import { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react';

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

const ACCEPTED_BG = 'linear-gradient(160deg, #fff6fa 0%, #fff5f5 45%, #fdf3ff 100%)';
const PROPOSAL_BG = 'linear-gradient(160deg, #fff9fb 0%, #fff7f7 45%, #f7f4ff 100%)';

function Valentine() {
  const [accepted, setAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);
  const [noTransitionMs, setNoTransitionMs] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; heart: string }[]>([]);
  const [displayedAcceptedTitle, setDisplayedAcceptedTitle] = useState('');
  const [confettiPieces, setConfettiPieces] = useState<
    { id: number; x: number; y: number; dx: string; dy: string; rot: string; color: string; size: number }[]
  >([]);
  const lastNoMoveAt = useRef(0);
  const noPlaceholderRef = useRef<HTMLDivElement>(null);

  // YES button grows with a cap
  const yesScale = Math.min(1 + noCount * 0.15, 2);

  // Measure placeholder position on mount so fixed button starts in the right spot
  useLayoutEffect(() => {
    if (noPlaceholderRef.current && !noPos) {
      const rect = noPlaceholderRef.current.getBoundingClientRect();
      setNoPos({ x: rect.left, y: rect.top });
    }
  }, []);

  const FLEE_DISTANCE = 180;

  const getSafeNoPosition = (
    current: { x: number; y: number },
    pointer?: { x: number; y: number }
  ) => {
    const minX = NO_BUTTON_MARGIN;
    const maxX = Math.max(minX, window.innerWidth - NO_BUTTON_WIDTH - NO_BUTTON_MARGIN);
    const minY = NO_BUTTON_MARGIN;
    const maxY = Math.max(minY, window.innerHeight - NO_BUTTON_HEIGHT - NO_BUTTON_MARGIN);

    if (!pointer) {
      return {
        x: Math.max(minX, Math.min(maxX, current.x + (Math.random() - 0.5) * 200)),
        y: Math.max(minY, Math.min(maxY, current.y + (Math.random() - 0.5) * 200)),
      };
    }

    // Flee directly away from cursor
    const btnCenterX = current.x + NO_BUTTON_WIDTH / 2;
    const btnCenterY = current.y + NO_BUTTON_HEIGHT / 2;
    let dx = btnCenterX - pointer.x;
    let dy = btnCenterY - pointer.y;
    const dist = Math.hypot(dx, dy) || 1;
    dx /= dist;
    dy /= dist;

    // Add slight randomness so it doesn't feel robotic
    dx += (Math.random() - 0.5) * 0.4;
    dy += (Math.random() - 0.5) * 0.4;

    const candidate = {
      x: Math.max(minX, Math.min(maxX, current.x + dx * FLEE_DISTANCE)),
      y: Math.max(minY, Math.min(maxY, current.y + dy * FLEE_DISTANCE)),
    };

    // If cornered, try perpendicular directions before jumping far
    const distToPointer = Math.hypot(candidate.x - pointer.x, candidate.y - pointer.y);
    if (distToPointer < MIN_CURSOR_DISTANCE) {
      // Try perpendicular (rotate flee direction 90 degrees both ways)
      for (const sign of [1, -1]) {
        const perpCandidate = {
          x: Math.max(minX, Math.min(maxX, current.x + sign * -dy * FLEE_DISTANCE * 1.5)),
          y: Math.max(minY, Math.min(maxY, current.y + sign * dx * FLEE_DISTANCE * 1.5)),
        };
        const perpDist = Math.hypot(perpCandidate.x - pointer.x, perpCandidate.y - pointer.y);
        if (perpDist >= MIN_CURSOR_DISTANCE) return perpCandidate;
      }

      // Last resort: pick a random point on the opposite half of the screen
      const oppositeX = pointer.x < window.innerWidth / 2
        ? minX + (maxX - minX) * (0.5 + Math.random() * 0.5)
        : minX + (maxX - minX) * Math.random() * 0.5;
      const oppositeY = pointer.y < window.innerHeight / 2
        ? minY + (maxY - minY) * (0.5 + Math.random() * 0.5)
        : minY + (maxY - minY) * Math.random() * 0.5;
      return { x: oppositeX, y: oppositeY };
    }

    return candidate;
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
      const next = getSafeNoPosition(current, pointer);
      const moveDist = Math.hypot(next.x - current.x, next.y - current.y);
      // Scale transition: ~300ms for a normal flee, up to ~600ms for long jumps
      setNoTransitionMs(Math.min(600, Math.max(250, moveDist * 0.5)));
      return next;
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
      <div
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
        style={{ background: ACCEPTED_BG }}
      >
        <div className="pointer-events-none absolute -right-20 -top-[120px] h-80 w-80 rounded-full bg-pink-200 opacity-35 blur-[70px]" />
        <div className="pointer-events-none absolute -bottom-[140px] -left-20 h-[340px] w-[340px] rounded-full bg-purple-200 opacity-25 blur-[80px]" />

        {floatingHearts.map(({ id, x, heart }) => (
          <span
            key={id}
            aria-hidden
            className="animate-rise pointer-events-none absolute -bottom-10 text-2xl"
            style={{ left: `${x}%` }}
          >
            {heart}
          </span>
        ))}

        {confettiPieces.map((piece) => (
          <div
            key={piece.id}
            className="pointer-events-none fixed z-20 rounded-sm"
            style={{
              left: `${piece.x}px`,
              top: `${piece.y}px`,
              width: `${piece.size}px`,
              height: `${piece.size * 0.55}px`,
              background: piece.color,
              ['--dx' as string]: piece.dx,
              ['--dy' as string]: piece.dy,
              ['--rot' as string]: piece.rot,
              animation: 'confetti-burst 1s ease-out forwards',
            }}
          />
        ))}

        <div
          className="z-[1] flex flex-col items-center gap-5 rounded-2xl border border-white/60 bg-white/80 px-6 py-8 text-center backdrop-blur-md md:px-10 md:py-10"
          style={{ boxShadow: '0 20px 60px rgba(214, 67, 120, 0.2)' }}
        >
          <span className="animate-pulse-heart text-[4rem]">❤️</span>
          <h1 className="font-heading text-xl font-medium text-gray-700 md:text-2xl">
            {displayedAcceptedTitle || ' '}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{ background: PROPOSAL_BG }}
    >
      <div className="pointer-events-none absolute -right-[100px] -top-[120px] h-[340px] w-[340px] rounded-full bg-pink-200 opacity-[0.28] blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-[140px] -left-[120px] h-[360px] w-[360px] rounded-full bg-purple-200 opacity-[0.22] blur-[90px]" />

      <div className="z-[1] mx-4 flex w-full max-w-[760px] flex-col items-center gap-4 text-center">
        <div
          className="flex w-full flex-col items-center gap-6 rounded-2xl border border-white/70 bg-white/80 px-5 py-8 backdrop-blur-md md:px-10 md:py-10"
          style={{ boxShadow: '0 20px 60px rgba(214, 67, 120, 0.18)' }}
        >
          <span className="text-[3rem]">❤️</span>

          <h1 className="font-heading text-xl font-medium text-gray-700 md:text-2xl">
            Will you be my Valentine?
          </h1>

          <div className="mt-3 flex items-center justify-center gap-4">
            <button
              onClick={handleAccept}
              className="animate-yes-glow bg-linear-to-r from-pink-500 to-red-400 px-8 py-3 font-bold tracking-[0.2px] text-white transition-all duration-[250ms] hover:to-red-500 active:from-pink-600 active:to-red-600"
              style={{ borderRadius: '8px', transform: `scale(${yesScale})` }}
            >
              Yes
            </button>

            {/* Invisible placeholder to reserve space in flex layout */}
            <div ref={noPlaceholderRef} className="invisible h-10 w-[72px]" />
          </div>
        </div>

        <div className="min-h-[44px] px-2 md:min-h-[52px]">
          {noCount > 0 && (
            <p className="text-sm font-medium text-pink-700 md:text-base">
              {noCount >= EASTER_EGG_THRESHOLD
                ? EASTER_EGG_MESSAGE
                : DEADPAN_MESSAGES[Math.min(noCount - 1, DEADPAN_MESSAGES.length - 1)]}
            </p>
          )}
        </div>
      </div>

      {noPos !== null && (
        <button
          onMouseEnter={(e) => moveNoButton({ x: e.clientX, y: e.clientY })}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            moveNoButton(touch ? { x: touch.clientX, y: touch.clientY } : undefined);
          }}
          className="fixed z-10 border border-pink-300 bg-white px-6 py-2 text-pink-400 hover:bg-pink-50"
          style={{
            left: `${noPos.x}px`,
            top: `${noPos.y}px`,
            borderRadius: '8px',
            boxShadow: '0 4px 16px rgba(236, 72, 153, 0.25)',
            transition: `left ${noTransitionMs}ms cubic-bezier(0.34, 1.56, 0.64, 1), top ${noTransitionMs}ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
          }}
        >
          No
        </button>
      )}
    </div>
  );
}

export default Valentine;
