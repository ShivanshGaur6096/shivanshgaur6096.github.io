import React, { useState } from 'react';
import { useCharacterShuffle } from './hooks/useCharacterShuffle';
import { animationTimeline } from './heroData';

/**
 * SubtitleShuffler component
 * Interactive subtitle with character shuffle animation on click/tap.
 * After ~8 items, rotates through end messages and shows restart ⟳ button.
 * Accessible with aria-live="polite".
 */
export function SubtitleShuffler({
  isReducedMotion = false,
  current,
  isGameOver = false,
  onSubtitleTap,
}) {
  const [shuffleTrigger, setShuffleTrigger] = useState(false);

  const { displayText } = useCharacterShuffle(
    current,
    animationTimeline.shuffle.duration,
    shuffleTrigger && !isReducedMotion
  );

  const handleShuffle = () => {
    if (isGameOver) return; // locked

    if (onSubtitleTap) {
      onSubtitleTap();
    }

    if (!isReducedMotion) {
      setShuffleTrigger(false);
      requestAnimationFrame(() => {
        setShuffleTrigger(true);
      });
    }
  };

  const displayedSubtitle = isReducedMotion ? current : (shuffleTrigger ? displayText : current);

  return (
    <div className="hero-subtitle-wrapper">
      <div
        className={`hero-subtitle-interactive ${isGameOver ? 'hero-subtitle-locked' : ''}`}
        onClick={handleShuffle}
        role={isGameOver ? 'text' : 'button'}
        tabIndex={isGameOver ? -1 : 0}
        aria-label={isGameOver ? `Current title: ${current}` : `Current title: ${current}. Tap to shuffle.`}
        onKeyDown={(e) => {
          if (!isGameOver && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleShuffle();
          }
        }}
      >
        <span className="hero-subtitle-text" aria-live="polite">
          {displayedSubtitle}
        </span>
        {!isGameOver && (
          <span className="hero-subtitle-cursor" aria-hidden="true"> ⤾</span>
        )}
      </div>
    </div>
  );
}

export default SubtitleShuffler;
