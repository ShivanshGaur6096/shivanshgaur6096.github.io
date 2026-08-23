import { useState, useEffect, useRef } from 'react';

/**
 * Pure helper to compute visible text given elapsed time and mode.
 */
export function calculateTypewriterText(text, duration, elapsedTime, mode = 'forward') {
  if (!text || duration <= 0) return { displayText: text || '', isComplete: true };

  const progress = Math.min(Math.max(elapsedTime / duration, 0), 1);
  const totalLength = text.length;

  if (mode === 'forward') {
    const charCount = Math.floor(progress * totalLength);
    const displayText = text.slice(0, charCount);
    return {
      displayText: progress >= 1 ? text : displayText,
      isComplete: progress >= 1,
    };
  } else {
    // reverse/deleting mode: starts with full text and deletes towards 0
    const charCount = Math.floor((1 - progress) * totalLength);
    const displayText = text.slice(0, charCount);
    return {
      displayText: progress >= 1 ? '' : displayText,
      isComplete: progress >= 1,
    };
  }
}

/**
 * useTypewriter hook
 * Uses requestAnimationFrame to calculate visible prefix based on elapsed time.
 * @param {string} text Target text to reveal or delete
 * @param {number} duration Total duration in ms
 * @param {boolean} isActive Whether typing is active
 * @param {'forward'|'reverse'} mode Typing direction
 */
export function useTypewriter(text, duration = 800, isActive = true, mode = 'forward') {
  const [state, setState] = useState(() => ({
    displayText: mode === 'reverse' ? text : '',
    isComplete: !isActive,
  }));

  const startTimeRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      setState({
        displayText: mode === 'reverse' ? text : '',
        isComplete: false,
      });
      return;
    }

    startTimeRef.current = null;

    const tick = (now) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = now;
      }
      const elapsed = now - startTimeRef.current;
      const result = calculateTypewriterText(text, duration, elapsed, mode);

      setState(result);

      if (!result.isComplete) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [text, duration, isActive, mode]);

  return state;
}

export default useTypewriter;
