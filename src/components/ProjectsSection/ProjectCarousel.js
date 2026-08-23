import React from 'react';
import { projectCards, githubCard } from './projectsData';
import ProjectCard from './ProjectCard';
import GitHubProjectsCard from './GitHubProjectsCard';
import PaginationIndicator from './PaginationIndicator';
import { useCarouselPosition } from './hooks/useCarouselPosition';
import { useVisitedLinks } from './hooks/useVisitedLinks';

/**
 * ProjectCarousel Component
 * Responsive flex container with native CSS scroll-snap and active dot indicator.
 */
export function ProjectCarousel({ onOpenDetail }) {
  const totalSlides = projectCards.length + 1; // Project cards + GitHub card
  const { containerRef, activeIndex, scrollToIndex } = useCarouselPosition(totalSlides);
  const { visitedLinks, markVisited } = useVisitedLinks();

  const slideNames = [...projectCards.map((p) => p.title), githubCard.title];

  return (
    <div className="project-carousel-wrapper">
      <div className="project-carousel-container" ref={containerRef}>
        {projectCards.map((project) => (
          <div key={project.id} className="project-carousel-item">
            <ProjectCard project={project} onOpenDetail={onOpenDetail} />
          </div>
        ))}

        <div className="project-carousel-item">
          <GitHubProjectsCard
            cardData={githubCard}
            visitedLinks={visitedLinks}
            onMarkVisited={markVisited}
          />
        </div>
      </div>

      {/* Integrated Frosted Glass Navigation Pill with Chevrons & Dots */}
      <PaginationIndicator
        totalCount={totalSlides}
        activeIndex={activeIndex}
        onDotClick={scrollToIndex}
        onPrev={() => scrollToIndex(Math.max(0, activeIndex - 1))}
        onNext={() => scrollToIndex(Math.min(totalSlides - 1, activeIndex + 1))}
        projectNames={slideNames}
      />
    </div>
  );
}

export default ProjectCarousel;
