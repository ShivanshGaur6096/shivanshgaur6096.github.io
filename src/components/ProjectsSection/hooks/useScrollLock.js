import { useEffect } from 'react';

/**
 * useScrollLock hook
 * Disables background body scrolling when modal/bottom-sheet is open.
 * Uses the iOS Safari position: fixed pattern to prevent scroll jump.
 */
export function useScrollLock(isLocked = false) {
  useEffect(() => {
    if (!isLocked) return;

    // Prevent body and html scrolling without repositioning the document
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Compensate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isLocked]);
}

export default useScrollLock;
