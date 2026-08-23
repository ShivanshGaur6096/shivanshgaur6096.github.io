import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseIcon } from './icons/ProjectIcons';

/**
 * Modal Component (Desktop View > 768px)
 * Centered modal overlay with scale/opacity entrance and frosted glass close button.
 */
export function Modal({ isOpen, onClose, children }) {
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
        <div className="project-overlay-portal project-modal-portal">
          <motion.div
            className="project-overlay-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            className="project-modal-container"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
          >
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

export default Modal;
