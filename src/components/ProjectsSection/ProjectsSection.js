import React, { useState } from 'react';
import './ProjectsSection.css';
import { PROJECTS_HEADING, PROJECTS_SUBHEADING, PROJECTS_LIVE_BADGE, projectCards } from './projectsData';
import { useScrollReveal } from './hooks/useScrollReveal';
import { trackProjectView } from '../../services/analyticsService';
import ProjectCarousel from './ProjectCarousel';
import DetailOverlay from './DetailOverlay';

/**
 * ProjectsSection Container Component
 * Renders section header with disappearing hint prompt, horizontal project carousel, and Bento detail overlay.
 */
export function ProjectsSection() {
  const { ref, inView } = useScrollReveal({ threshold: 0.1, triggerOnce: true });
  const [openProjectId, setOpenProjectId] = useState(null);
  const [isHintDismissed, setIsHintDismissed] = useState(false);

  const handleOpenDetail = (projectId) => {
    setIsHintDismissed(true);
    setOpenProjectId(projectId);

    // Dispatch custom GA4 telemetry for project modal open
    const foundProject = projectCards.find((p) => p.id === projectId);
    trackProjectView(projectId, foundProject?.title || projectId);
  };

  const handleCloseDetail = () => {
    setOpenProjectId(null);
  };

  return (
    <section className="projects-section" id="projects" ref={ref}>
      {/* Ambient Fluid Glow Background Orbs */}
      <div className="projects-ambient-mesh" aria-hidden="true">
        <div className="ambient-orb ambient-orb-1" />
        <div className="ambient-orb ambient-orb-2" />
        <div className="ambient-orb ambient-orb-3" />
      </div>

      <div className="projects-container">
        <header className="projects-header">
          <h2 className="projects-title">{PROJECTS_HEADING}</h2>
          <p className="projects-subtitle">{PROJECTS_SUBHEADING}</p>

          {/* Radiating Hint Text directly below subtitle (collapses seamlessly when dismissed) */}
          <div className={`projects-hint-container ${isHintDismissed ? 'is-dismissed' : ''}`}>
            <div className="projects-hint-content">
              <span className="projects-hint-text">
                <span className="projects-hint-sparkle" aria-hidden="true">✦ </span>
                {PROJECTS_LIVE_BADGE}
              </span>
            </div>
          </div>
        </header>

        {inView && (
          <ProjectCarousel
            onOpenDetail={handleOpenDetail}
          />
        )}

        <DetailOverlay
          openProjectId={openProjectId}
          onClose={handleCloseDetail}
        />
      </div>
    </section>
  );
}

export default ProjectsSection;
