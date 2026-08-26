import React from 'react';
import { ExternalLinkIcon } from './icons/ProjectIcons';
import { useAppStoreData } from './hooks/useAppStoreData';

/**
 * ProjectCard Component
 * Displays a single project card with brand color accents, logo fallback,
 * live rating badges (hydrated from App Store API), and tech stack tags.
 */
export function ProjectCard({ project, onOpenDetail }) {
  const {
    id,
    title,
    role,
    ecosystemCount,
    description,
    brandColor = 'var(--accent)',
    techStack = [],
    logo,
    appStoreId,
    storeCountry,
    customLink,
  } = project;

  // Asynchronously fetch live App Store telemetry
  const { data: storeData, loading } = useAppStoreData(appStoreId, storeCountry);

  const handleCardClick = (e) => {
    // If user clicked directly on an external action link, don't open modal
    if (e.target.closest('a') || e.target.closest('button')) {
      return;
    }
    if (onOpenDetail) {
      onOpenDetail(id);
    }
  };

  // Determine logo source (Store artwork or local logo)
  const displayLogo = storeData?.artworkUrl100 || logo;

  // Country Code to Full Name Mapping
  const countryNameMap = {
    gb: 'Great Britain (UK)',
    ca: 'Canada',
    us: 'United States',
    in: 'India',
  };
  const countryFullName = storeCountry
    ? countryNameMap[storeCountry.toLowerCase()] || storeCountry.toUpperCase()
    : 'App Store';
  const ratingTooltipText = `Live rating from App Store ${countryFullName}`;

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
            {displayLogo ? (
              <img src={displayLogo} alt={`${title} logo`} className="project-card-logo" />
            ) : (
              <div className="project-card-logo-fallback" style={{ backgroundColor: brandColor }}>
                {title.charAt(0)}
              </div>
            )}
            <div className="project-card-meta">
              <div className="project-card-title-row">
                <h3 className="project-card-title">{title}</h3>
                {/* Live App Store Rating Badge */}
                {appStoreId && (
                  <div
                    className="project-card-rating-badge"
                    title={ratingTooltipText}
                  >
                    {loading && !storeData ? (
                      <span className="rating-badge-shimmer" />
                    ) : storeData?.formattedRating ? (
                      <>
                        <span className="rating-star">★</span>
                        <span className="rating-val">{storeData.formattedRating}</span>
                        {storeData.formattedReviewCount && (
                          <span className="rating-count">({storeData.formattedReviewCount})</span>
                        )}
                        {storeCountry && (
                          <span className="store-country-flag">{storeCountry.toUpperCase()}</span>
                        )}
                      </>
                    ) : (
                      <span className="rating-verified">App Store</span>
                    )}
                  </div>
                )}
              </div>
              <div className="project-card-subtitle-row">
                <span className="project-card-role">{role}</span>
                {ecosystemCount && (
                  <span
                    className="project-card-ecosystem-badge"
                    title={`Includes ${ecosystemCount} companion ecosystem apps`}
                  >
                    +{ecosystemCount} Ecosystem Apps
                  </span>
                )}
              </div>
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
