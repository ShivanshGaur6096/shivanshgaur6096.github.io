import React from 'react';
import { projectCards, githubCard } from './projectsData';
import ProjectCard from './ProjectCard';
import GitHubProjectsCard from './GitHubProjectsCard';
import PaginationIndicator from './PaginationIndicator';
import { useCarouselPosition } from './hooks/useCarouselPosition';
import { useVisitedLinks } from './hooks/useVisitedLinks';
import { ChevronLeftIcon, ChevronRightIcon } from './icons/ProjectIcons';

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
      {/* Desktop Prev/Next Quick Navigation Buttons */}
      <button
        type="button"
        className="project-nav-arrow project-nav-arrow-left"
        onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
        aria-label="Previous project slide"
        disabled={activeIndex === 0}
      >
        <ChevronLeftIcon size={18} />
      </button>

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

      <button
        type="button"
        className="project-nav-arrow project-nav-arrow-right"
        onClick={() => scrollToIndex(Math.min(totalSlides - 1, activeIndex + 1))}
        aria-label="Next project slide"
        disabled={activeIndex >= totalSlides - 1}
      >
        <ChevronRightIcon size={18} />
      </button>

      <PaginationIndicator
        totalCount={totalSlides}
        activeIndex={activeIndex}
        onDotClick={scrollToIndex}
        projectNames={slideNames}
      />
    </div>
  );
}

export default ProjectCarousel;
