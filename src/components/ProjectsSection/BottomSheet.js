import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseIcon } from './icons/ProjectIcons';

/**
 * BottomSheet Component (Mobile View <= 768px)
 * Slides up from bottom with smooth swipe and close button.
 */
export function BottomSheet({ isOpen, onClose, children }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="project-overlay-portal">
          <motion.div
            className="project-overlay-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            className="project-bottomsheet-container"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            role="dialog"
            aria-modal="true"
          >
            <div className="project-bottomsheet-drag-handle" aria-hidden="true" />
            <button
              type="button"
              className="project-overlay-close-btn"
              onClick={onClose}
              aria-label="Close project details"
            >
              <CloseIcon size={18} />
            </button>

            <div className="project-overlay-scroll-body">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default BottomSheet;
