import React, { useEffect } from 'react';
import { useTypewriter } from './hooks/useTypewriter';
import { animationTimeline } from './heroData';

/**
 * TypewriterParagraph component
 * Reveals the intro paragraph character by character (~800ms).
 * In reduced motion mode, displays full text immediately and calls onComplete.
 */
export function TypewriterParagraph({
  text,
  isActive = false,
  isReducedMotion = false,
  onComplete,
  children,
}) {
  const duration = animationTimeline.typewriter.duration;
  const { displayText, isComplete } = useTypewriter(
    text,
    duration,
    isActive && !isReducedMotion,
    'forward'
  );

  useEffect(() => {
    if (isReducedMotion && onComplete) {
      onComplete();
    }
  }, [isReducedMotion, onComplete]);

  useEffect(() => {
    if (!isReducedMotion && isComplete && onComplete) {
      onComplete();
    }
  }, [isComplete, isReducedMotion, onComplete]);

  const displayedContent = isReducedMotion ? text : displayText;
  const showCursor = isActive && !isReducedMotion && !isComplete;

  return (
    <p className="hero-paragraph">
      <span>{displayedContent}</span>
      {showCursor && <span className="hero-typewriter-cursor" aria-hidden="true">|</span>}
      {children}
    </p>
  );
}

export default TypewriterParagraph;
