import React, { useState, useEffect } from 'react';
import { projectCards, projectDetails } from './projectsData';
import { useScrollLock } from './hooks/useScrollLock';
import BottomSheet from './BottomSheet';
import Modal from './Modal';
import DetailContent from './DetailContent';

/**
 * DetailOverlay Component
 * Adaptive container determining BottomSheet (<=768px) vs Modal (>768px) at open time.
 */
export function DetailOverlay({ openProjectId, onClose }) {
  const [isMobile, setIsMobile] = useState(false);
  const isOpen = Boolean(openProjectId);

  // Lock background scroll when open
  useScrollLock(isOpen);

  // Determine viewport layout when opening
  useEffect(() => {
    if (isOpen) {
      setIsMobile(window.innerWidth <= 768);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const project = projectCards.find((p) => p.id === openProjectId);
  const detail = projectDetails[openProjectId];

  if (!project || !detail) return null;

  const content = <DetailContent project={project} detail={detail} />;

  if (isMobile) {
    return (
      <BottomSheet isOpen={isOpen} onClose={onClose}>
        {content}
      </BottomSheet>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {content}
    </Modal>
  );
}

export default DetailOverlay;
