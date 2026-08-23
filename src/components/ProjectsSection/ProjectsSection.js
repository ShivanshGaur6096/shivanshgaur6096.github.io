import React, { useState } from 'react';
import './ProjectsSection.css';
import { PROJECTS_HEADING, PROJECTS_SUBHEADING } from './projectsData';
import { useScrollReveal } from './hooks/useScrollReveal';
import ProjectCarousel from './ProjectCarousel';
import DetailOverlay from './DetailOverlay';

/**
 * ProjectsSection Container Component
 * Renders section header, horizontal project carousel, and adaptive detail overlay.
 */
export function ProjectsSection() {
  const { ref, inView } = useScrollReveal({ threshold: 0.1, triggerOnce: true });
  const [openProjectId, setOpenProjectId] = useState(null);

  const handleOpenDetail = (projectId) => {
    setOpenProjectId(projectId);
  };

  const handleCloseDetail = () => {
    setOpenProjectId(null);
  };

  return (
    <section className="projects-section" id="projects" ref={ref}>
      <div className="projects-container">
        <header className="projects-header">
          <h2 className="projects-title">{PROJECTS_HEADING}</h2>
          <p className="projects-subtitle">{PROJECTS_SUBHEADING}</p>
        </header>

        {inView && (
          <ProjectCarousel onOpenDetail={handleOpenDetail} />
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
