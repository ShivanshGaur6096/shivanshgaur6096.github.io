import React, { useState, useEffect, useRef } from 'react';
import PaginationIndicator from './PaginationIndicator';

/**
 * ScreenshotCarousel Component
 * Horizontal scroll-snap screenshot carousel with auto-advance and unified geometric pagination.
 */
export function ScreenshotCarousel({ screenshots = [], appStoreLink, title }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
  const isProgrammatic = useRef(false);

  // Preload all screenshot images and track loading completion
  useEffect(() => {
    if (!screenshots || screenshots.length === 0) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    let loadedCount = 0;
    let isCancelled = false;

    screenshots.forEach((src) => {
      const img = new Image();
      img.src = src;
      const onDone = () => {
        if (isCancelled) return;
        loadedCount += 1;
        if (loadedCount >= screenshots.length) {
          setIsLoading(false);
        }
      };
      if (img.complete) {
        onDone();
      } else {
        img.onload = onDone;
        img.onerror = onDone;
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [screenshots]);

  // Scroll listener to update activeSlide only during natural user scrolling
  useEffect(() => {
    if (isLoading) return;
    const container = containerRef.current;
    if (!container) return;

    let timeoutId;
    const handleScroll = () => {
      if (isProgrammatic.current) return;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (!container) return;
        const width = container.clientWidth || 1;
        const index = Math.round(container.scrollLeft / width);
        const clampedIndex = Math.max(0, Math.min(screenshots.length - 1, index));
        setActiveSlide(clampedIndex);
      }, 50);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [screenshots.length, isLoading]);

  const scrollToSlide = (index) => {
    if (isLoading) return;
    const container = containerRef.current;
    if (!container) return;

    const clampedIndex = Math.max(0, Math.min(screenshots.length - 1, index));
    isProgrammatic.current = true;
    setActiveSlide(clampedIndex);

    const targetLeft = clampedIndex * container.clientWidth;
    container.scrollTo({
      left: targetLeft,
      behavior: 'smooth',
    });

    setTimeout(() => {
      isProgrammatic.current = false;
    }, 600);
  };

  // Predictable 4s auto-advance carousel timer (runs only when fully loaded)
  useEffect(() => {
    if (screenshots.length <= 1 || isPaused || isLoading) return;

    const timer = setInterval(() => {
      setActiveSlide((current) => {
        const next = (current + 1) % screenshots.length;
        const container = containerRef.current;
        if (container) {
          isProgrammatic.current = true;
          container.scrollTo({
            left: next * container.clientWidth,
            behavior: 'smooth',
          });
          setTimeout(() => {
            isProgrammatic.current = false;
          }, 600);
        }
        return next;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [screenshots.length, isPaused, isLoading]);

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <div
      className={`screenshot-carousel-wrapper ${isLoading ? 'is-loading-media' : ''}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Blurred container with images */}
      <div
        className={`screenshot-carousel-container ${isLoading ? 'screenshot-blurred' : ''}`}
        ref={containerRef}
      >
        {screenshots.map((src, index) => (
          <div key={index} className="screenshot-carousel-slide">
            <img
              src={src}
              alt={`${title} screenshot ${index + 1}`}
              className="screenshot-carousel-image"
              loading="eager"
            />
          </div>
        ))}
      </div>

      {/* Floating Glass Loader Overlay during image downloading */}
      {isLoading && (
        <div className="screenshot-loader-overlay" aria-label="Loading screenshots...">
          <div className="screenshot-spinner-ring" />
          <span className="screenshot-loader-text">Syncing Apple Media...</span>
        </div>
      )}

      {/* Floating Bottom-Center Geometric Pagination with Frosted Bubbles */}
      {screenshots.length > 1 && (
        <div className={`screenshot-pagination-capsule ${isLoading ? 'pagination-disabled' : ''}`}>
          <PaginationIndicator
            totalCount={screenshots.length}
            activeIndex={activeSlide}
            onDotClick={isLoading ? () => {} : scrollToSlide}
            onPrev={isLoading ? undefined : () => scrollToSlide(Math.max(0, activeSlide - 1))}
            onNext={isLoading ? undefined : () => scrollToSlide(Math.min(screenshots.length - 1, activeSlide + 1))}
            bubbleSize={30}
            shapeSize={13}
          />
        </div>
      )}
    </div>
  );
}

export default ScreenshotCarousel;
