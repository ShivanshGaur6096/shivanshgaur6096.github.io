import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from './icons/ProjectIcons';

/**
 * Geometric SVG Shapes for Active Pagination Indicator
 * (Google Material / Apple playful geometric design language)
 */
export function GeometricShapeIcon({ index, size = 15 }) {
  // Shape set mapped across indices: 0: 4-Point Star, 1: Hexagon, 2: Diamond, 3: Rounded Triangle, 4: Octagon / Square
  switch (index % 5) {
    case 0: // 4-Point Sparkle Star
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4771 12 22C12 16.4771 16.4771 12 22 12C16.4771 12 12 7.52285 12 2Z" />
        </svg>
      );
    case 1: // Rounded Hexagon
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.5L20 7.2V16.8L12 21.5L4 16.8V7.2L12 2.5Z" rx="2" />
        </svg>
      );
    case 2: // Rounded Diamond / Rhombus
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3L21 12L12 21L3 12L12 3Z" />
        </svg>
      );
    case 3: // Smooth Rounded Triangle
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3.5L21.5 19.5C21.9 20.2 21.4 21 20.6 21H3.4C2.6 21 2.1 20.2 2.5 19.5L12 3.5Z" />
        </svg>
      );
    case 4: // Rounded Square
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        </svg>
      );
  }
}

/**
 * PaginationIndicator Component
 * Fixed-width 5-slot center-locked indicator.
 * - Center slot (offset 0): ALWAYS hosts the glowing active geometric shape [⬡]
 * - Inner slots (offset -1, +1): Standard neighbor dots (•)
 * - Outer slots (offset -2, +2): Micro preview dots (·)
 * - If at start/end boundary (e.g. index 0), unoccupied slots remain as invisible space buffers so the center never jumps!
 */
export function PaginationIndicator({
  totalCount,
  activeIndex,
  onDotClick,
  onPrev,
  onNext,
  projectNames = [],
  className = '',
  bubbleSize = 32,
  shapeSize = 14,
}) {
  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < totalCount - 1;

  if (totalCount <= 1) return null;

  // Fixed 5 slots relative to activeIndex: [-2, -1, 0, +1, +2]
  const slots = [-2, -1, 0, 1, 2];

  return (
    <nav
      className={`project-pagination-wrapper ${className}`}
      aria-label="Carousel pagination"
    >
      {/* Left Standalone Bubble Slot */}
      {onPrev && (
        <div
          className="project-nav-bubble-slot"
          style={{ width: bubbleSize, height: bubbleSize }}
        >
          <button
            type="button"
            className={`project-nav-bubble ${canGoPrev ? 'visible' : 'hidden'}`}
            style={{ width: bubbleSize, height: bubbleSize }}
            onClick={canGoPrev ? onPrev : undefined}
            aria-label="Previous slide"
            tabIndex={canGoPrev ? 0 : -1}
            aria-hidden={!canGoPrev}
          >
            <ChevronLeftIcon size={bubbleSize > 30 ? 15 : 12} />
          </button>
        </div>
      )}

      {/* Fixed Center-Locked Capsule: 5 permanent fixed-width slots */}
      <div className="project-pagination-pill">
        <div className="project-pagination-dots-track">
          {slots.map((offset) => {
            const targetIndex = activeIndex + offset;
            const exists = targetIndex >= 0 && targetIndex < totalCount;
            const isCenter = offset === 0;
            const isMini = Math.abs(offset) === 2;
            const projectName = exists
              ? projectNames[targetIndex] || `Slide ${targetIndex + 1}`
              : '';

            return (
              <div key={offset} className="project-pagination-slot">
                {exists ? (
                  <button
                    type="button"
                    className={`project-pagination-item ${isCenter ? 'project-pagination-item-active' : ''}`}
                    onClick={() => onDotClick(targetIndex)}
                    aria-label={`Go to slide ${targetIndex + 1}: ${projectName}`}
                    aria-current={isCenter ? 'true' : 'false'}
                  >
                    {isCenter ? (
                      <motion.div
                        key={`shape-${activeIndex}`}
                        className="project-pagination-active-shape"
                        initial={{ scale: 0.3, rotate: -35, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        exit={{ scale: 0.3, rotate: 35, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                      >
                        <GeometricShapeIcon index={activeIndex} size={shapeSize} />
                      </motion.div>
                    ) : (
                      <span
                        className={`project-pagination-dot ${isMini ? 'project-pagination-dot-mini' : ''}`}
                      />
                    )}
                  </button>
                ) : (
                  // Invisible space placeholder to keep the center slot 100% stable
                  <div className="project-pagination-empty-slot" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Standalone Bubble Slot */}
      {onNext && (
        <div
          className="project-nav-bubble-slot"
          style={{ width: bubbleSize, height: bubbleSize }}
        >
          <button
            type="button"
            className={`project-nav-bubble ${canGoNext ? 'visible' : 'hidden'}`}
            style={{ width: bubbleSize, height: bubbleSize }}
            onClick={canGoNext ? onNext : undefined}
            aria-label="Next slide"
            tabIndex={canGoNext ? 0 : -1}
            aria-hidden={!canGoNext}
          >
            <ChevronRightIcon size={bubbleSize > 30 ? 15 : 12} />
          </button>
        </div>
      )}
    </nav>
  );
}

export default PaginationIndicator;
