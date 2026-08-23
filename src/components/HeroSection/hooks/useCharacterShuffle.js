import { useState, useEffect, useRef } from 'react';

export const CHAR_POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * Pure helper to compute shuffle text given targetText, duration, and elapsed time.
 */
export function calculateShuffleText(targetText, duration, elapsedTime) {
  if (!targetText) return { displayText: '', isComplete: true };
  if (duration <= 0 || elapsedTime >= duration) {
    return { displayText: targetText, isComplete: true };
  }

  const progress = Math.min(Math.max(elapsedTime / duration, 0), 1);
  const targetLength = targetText.length;
  const resolvedCount = Math.floor(progress * targetLength);

  let result = '';
  for (let i = 0; i < targetLength; i++) {
    if (targetText[i] === ' ') {
      result += ' ';
    } else if (i < resolvedCount) {
      result += targetText[i];
    } else {
      const randIndex = Math.floor(Math.random() * CHAR_POOL.length);
      result += CHAR_POOL[randIndex];
    }
  }

  return { displayText: result, isComplete: false };
}

/**
 * useCharacterShuffle hook
 * Resolves targetText left-to-right with random characters on trigger.
 * @param {string} targetText
 * @param {number} duration Duration in ms (~400ms)
 * @param {boolean} trigger
 */
export function useCharacterShuffle(targetText, duration = 400, trigger = false) {
  const [state, setState] = useState(() => ({
    displayText: targetText || '',
    isComplete: true,
  }));

  const startTimeRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!trigger) {
      setState({
        displayText: targetText || '',
        isComplete: true,
      });
      return;
    }

    startTimeRef.current = null;

    const tick = (now) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = now;
      }
      const elapsed = now - startTimeRef.current;
      const result = calculateShuffleText(targetText, duration, elapsed);

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
  }, [targetText, duration, trigger]);

  return state;
}

export default useCharacterShuffle;
