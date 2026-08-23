import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Timeline phases:
 * 'idle' -> 'typewriter' -> 'icons' -> 'button' -> 'complete'
 */
export const PHASES = {
  IDLE: 'idle',
  TYPEWRITER: 'typewriter',
  ICONS: 'icons',
  BUTTON: 'button',
  COMPLETE: 'complete',
};

const PHASE_ORDER = [
  PHASES.IDLE,
  PHASES.TYPEWRITER,
  PHASES.ICONS,
  PHASES.BUTTON,
  PHASES.COMPLETE,
];

/**
 * useAnimationOrchestrator hook
 * Manages the sequence of entrance animations.
 * Ensures the animation plays at most once per component mount (using useRef).
 * When reduced motion is preferred, immediately completes.
 *
 * @param {boolean} isReducedMotion
 */
export function useAnimationOrchestrator(isReducedMotion = false) {
  const hasPlayedRef = useRef(false);
  const [currentPhase, setCurrentPhase] = useState(() =>
    isReducedMotion ? PHASES.COMPLETE : PHASES.TYPEWRITER
  );

  useEffect(() => {
    if (isReducedMotion) {
      setCurrentPhase(PHASES.COMPLETE);
      hasPlayedRef.current = true;
    }
  }, [isReducedMotion]);

  const advancePhase = useCallback(() => {
    if (isReducedMotion) {
      setCurrentPhase(PHASES.COMPLETE);
      return;
    }

    setCurrentPhase((prevPhase) => {
      if (prevPhase === PHASES.COMPLETE) {
        hasPlayedRef.current = true;
        return PHASES.COMPLETE;
      }
      const currentIndex = PHASE_ORDER.indexOf(prevPhase);
      const nextIndex = Math.min(currentIndex + 1, PHASE_ORDER.length - 1);
      const nextPhase = PHASE_ORDER[nextIndex];
      if (nextPhase === PHASES.COMPLETE) {
        hasPlayedRef.current = true;
      }
      return nextPhase;
    });
  }, [isReducedMotion]);

  return {
    currentPhase,
    advancePhase,
    hasPlayed: hasPlayedRef.current,
  };
}

export default useAnimationOrchestrator;
