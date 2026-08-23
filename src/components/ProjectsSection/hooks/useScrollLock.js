import { useEffect, useRef } from 'react';

/**
 * useScrollLock hook
 * Disables background body scrolling when modal/bottom-sheet is open.
 * Uses the iOS Safari position: fixed pattern to prevent scroll jump.
 */
export function useScrollLock(isLocked = false) {
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    if (!isLocked) return;

    // Record current scroll offset
    scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop;

    // Apply scroll lock styles
    const originalStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPositionRef.current}px`;
    document.body.style.width = '100%';

    return () => {
      // Revert styles and restore scroll offset
      document.body.style.overflow = originalStyles.overflow;
      document.body.style.position = originalStyles.position;
      document.body.style.top = originalStyles.top;
      document.body.style.width = originalStyles.width;

      window.scrollTo(0, scrollPositionRef.current);
    };
  }, [isLocked]);
}

export default useScrollLock;
