import React, { useState, useEffect, useRef } from 'react';
import PaginationIndicator from './PaginationIndicator';
import { AppStoreIcon } from './icons/ProjectIcons';

/**
 * ScreenshotCarousel Component
 * Horizontal scroll-snap screenshot carousel with auto-advance and unified geometric pagination.
 */
export function ScreenshotCarousel({ screenshots = [], appStoreLink, title }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const isProgrammatic = useRef(false);

  // Accurate active index detection on user scroll/swipe
  const handleScroll = () => {
    if (isProgrammatic.current) return;
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('.screenshot-carousel-slide');
    if (!items.length) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    items.forEach((item, index) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;
      const distance = Math.abs(containerCenter - itemCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveSlide(closestIndex);
  };

  const scrollToSlide = (index) => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('.screenshot-carousel-slide');
    const targetItem = items[index];
    if (targetItem) {
      isProgrammatic.current = true;
      setActiveSlide(index);

      const targetLeft =
        targetItem.offsetLeft - (container.offsetWidth - targetItem.offsetWidth) / 2;

      container.scrollTo({
        left: targetLeft,
        behavior: 'smooth',
      });

      setTimeout(() => {
        isProgrammatic.current = false;
      }, 500);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // 4s auto-advance
  useEffect(() => {
    if (screenshots.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => {
        const next = (prev + 1) % screenshots.length;
        scrollToSlide(next);
        return next;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [screenshots.length, isPaused]);

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <div
      className="screenshot-carousel-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="screenshot-carousel-container" ref={containerRef}>
        {screenshots.map((src, index) => (
          <div key={index} className="screenshot-carousel-slide">
            <img
              src={src}
              alt={`${title} screenshot ${index + 1}`}
              className="screenshot-carousel-image"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Floating Bottom-Center Geometric Pagination with Frosted Bubbles */}
      {screenshots.length > 1 && (
        <div className="screenshot-pagination-capsule">
          <PaginationIndicator
            totalCount={screenshots.length}
            activeIndex={activeSlide}
            onDotClick={scrollToSlide}
            onPrev={() => scrollToSlide(Math.max(0, activeSlide - 1))}
            onNext={() => scrollToSlide(Math.min(screenshots.length - 1, activeSlide + 1))}
            bubbleSize={30}
            shapeSize={13}
          />
        </div>
      )}

      {appStoreLink && (
        <div className="screenshot-carousel-actions">
          <a
            href={appStoreLink}
            target="_blank"
            rel="noopener noreferrer"
            className="screenshot-appstore-btn"
            aria-label={`Download ${title} on the App Store`}
          >
            <AppStoreIcon size={16} />
            <span>Download on App Store</span>
          </a>
        </div>
      )}
    </div>
  );
}

export default ScreenshotCarousel;
