import React from 'react';
import { AppStoreIcon, ExternalLinkIcon } from './icons/ProjectIcons';

/**
 * ProjectCard Component
 * Displays a single project card with brand color accents, logo fallback,
 * tech stack tags, and App Store / custom link triggers.
 */
export function ProjectCard({ project, onOpenDetail }) {
  const {
    id,
    title,
    role,
    description,
    brandColor = 'var(--accent)',
    techStack = [],
    logo,
    appStoreLink,
    customLink,
  } = project;

  const handleCardClick = (e) => {
    // If user clicked directly on an external action link, don't open modal
    if (e.target.closest('a') || e.target.closest('button')) {
      return;
    }
    if (onOpenDetail) {
      onOpenDetail(id);
    }
  };

  return (
    <article
      className="project-card"
      style={{ '--project-brand-color': brandColor }}
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick(e);
        }
      }}
    >
      {/* Desktop Left / Mobile Top Image Preview */}
      <div className="project-card-preview-area">
        {project.previewImage ? (
          <picture className="project-card-picture">
            {project.mobilePreviewImage && (
              <source
                media="(max-width: 899px)"
                srcSet={project.mobilePreviewImage}
              />
            )}
            <img
              src={project.previewImage}
              alt={`${title} preview`}
              className="project-card-preview-img"
              loading="lazy"
            />
          </picture>
        ) : (
          <div className="project-card-preview-placeholder">
            <div className="project-card-placeholder-glow" />
          </div>
        )}
      </div>

      {/* Text Details Content */}
      <div className="project-card-content">
        <div className="project-card-header">
          <div className="project-card-branding">
            {logo ? (
              <img src={logo} alt={`${title} logo`} className="project-card-logo" />
            ) : (
              <div className="project-card-logo-fallback" style={{ backgroundColor: brandColor }}>
                {title.charAt(0)}
              </div>
            )}
            <div className="project-card-meta">
              <h3 className="project-card-title">{title}</h3>
              <span className="project-card-role">{role}</span>
            </div>
          </div>
        </div>

        <p className="project-card-description">{description}</p>

        <div className="project-card-footer">
          <div className="project-card-tags" aria-label="Technologies used">
            {techStack.map((tech) => (
              <span key={tech} className="project-card-tag">
                {tech}
              </span>
            ))}
          </div>

          <div className="project-card-actions">
            {appStoreLink && (
              <a
                href={appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-action-btn"
                aria-label={`Download ${title} on App Store`}
                onClick={(e) => e.stopPropagation()}
              >
                <AppStoreIcon size={16} />
                <span>App Store</span>
              </a>
            )}

            {customLink && (
              <a
                href={customLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-action-btn"
                aria-label={customLink.label}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLinkIcon size={15} />
                <span>{customLink.label}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
