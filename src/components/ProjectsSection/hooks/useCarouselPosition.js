import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useCarouselPosition hook
 * Tracks scroll position of the carousel container and updates activeIndex.
 * Provides scrollToIndex function to smooth-scroll to any card.
 */
export function useCarouselPosition(totalCount) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const isProgrammaticScroll = useRef(false);

  const updateActiveIndex = useCallback(() => {
    if (isProgrammaticScroll.current) return;
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('.project-carousel-item');
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

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Convert vertical mouse wheel into horizontal scroll when cursor is over carousel
    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      const maxScroll = container.scrollWidth - container.clientWidth;
      const isAtLeft = container.scrollLeft <= 0 && e.deltaY < 0;
      const isAtRight = container.scrollLeft >= maxScroll && e.deltaY > 0;

      if (!isAtLeft && !isAtRight) {
        e.preventDefault();
        container.scrollLeft += e.deltaY * 1.8;
      }
    };

    // 2. Click & Drag to scroll for mouse users
    let isDown = false;
    let startX = 0;
    let scrollStartLeft = 0;

    const handleMouseDown = (e) => {
      // Don't drag if clicking interactive child elements (links/buttons)
      if (e.target.closest('a') || e.target.closest('button')) return;

      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollStartLeft = container.scrollLeft;
      container.style.cursor = 'grabbing';
      container.style.userSelect = 'none';
    };

    const handleMouseLeaveOrUp = () => {
      isDown = false;
      container.style.cursor = 'grab';
      container.style.removeProperty('user-select');
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollStartLeft - walk;
    };

    container.addEventListener('scroll', updateActiveIndex, { passive: true });
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseleave', handleMouseLeaveOrUp);
    container.addEventListener('mouseup', handleMouseLeaveOrUp);
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('scroll', updateActiveIndex);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseleave', handleMouseLeaveOrUp);
      container.removeEventListener('mouseup', handleMouseLeaveOrUp);
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [updateActiveIndex]);

  const scrollToIndex = useCallback((index) => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('.project-carousel-item');
    const targetItem = items[index];
    if (targetItem) {
      isProgrammaticScroll.current = true;
      setActiveIndex(index);

      // Exact scrollLeft positioning to center the target item
      const targetScrollLeft =
        targetItem.offsetLeft - (container.offsetWidth - targetItem.offsetWidth) / 2;

      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth',
      });

      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 500);
    }
  }, []);

  return { containerRef, activeIndex, scrollToIndex };
}

export default useCarouselPosition;
