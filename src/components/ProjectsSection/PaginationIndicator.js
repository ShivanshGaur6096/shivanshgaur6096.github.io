import React from 'react';

/**
 * PaginationIndicator Component
 * Frosted glass capsule with accessible interactive dots.
 */
export function PaginationIndicator({
  totalCount,
  activeIndex,
  onDotClick,
  projectNames = [],
}) {
  return (
    <nav className="project-pagination-wrapper" aria-label="Projects carousel pagination">
      <div className="project-pagination-pill">
        {Array.from({ length: totalCount }).map((_, index) => {
          const isActive = index === activeIndex;
          const projectName = projectNames[index] || `Project ${index + 1}`;

          return (
            <button
              key={index}
              type="button"
              className={`project-pagination-dot ${isActive ? 'project-pagination-dot-active' : ''}`}
              onClick={() => onDotClick(index)}
              aria-label={`Go to slide ${index + 1}: ${projectName}`}
              aria-current={isActive ? 'true' : 'false'}
            />
          );
        })}
      </div>
    </nav>
  );
}

export default PaginationIndicator;
