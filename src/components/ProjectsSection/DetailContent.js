import React from 'react';
import ScreenshotCarousel from './ScreenshotCarousel';
import { AppStoreIcon, ExternalLinkIcon } from './icons/ProjectIcons';
import { trackAppStoreClick } from '../../services/analyticsService';
import { useAppStoreData } from './hooks/useAppStoreData';

/**
 * SubProjectItem Component
 * Renders individual ecosystem app card with auto-hydrated store details.
 */
function SubProjectItem({ sub }) {
  const { data: storeData } = useAppStoreData(sub.appStoreId, sub.storeCountry);
  const logo = storeData?.artworkUrl100 || sub.logo;
  const storeLink = storeData?.trackViewUrl || sub.appStoreLink;

  return (
    <div className="project-subproject-card">
      {logo ? (
        <img src={logo} alt={`${sub.name} logo`} className="project-subproject-logo" />
      ) : (
        <div className="project-subproject-logo-fallback">{sub.name.charAt(0)}</div>
      )}
      <div className="project-subproject-info">
        <div className="project-subproject-header">
          <h4 className="project-subproject-title">{sub.name}</h4>
          {storeData?.formattedRating && (
            <span className="project-subproject-rating">
              ★ {storeData.formattedRating}
            </span>
          )}
        </div>
        {sub.description && (
          <p className="project-subproject-desc">{sub.description}</p>
        )}
      </div>
      {storeLink && (
        <a
          href={storeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="project-subproject-link"
          aria-label={`Get ${sub.name} on App Store`}
        >
          <span className="subproject-link-desktop">
            <AppStoreIcon size={13} />
            <span>App Store</span>
          </span>
          <span className="subproject-link-mobile" aria-hidden="true">
            <ExternalLinkIcon size={14} />
          </span>
        </a>
      )}
    </div>
  );
}

/**
 * DetailContent Component
 * Bento Grid presentation for project detail modal and bottom sheet.
 */
export function DetailContent({ project, detail }) {
  const appStoreId = detail?.appStoreId || project?.appStoreId;
  const storeCountry = detail?.storeCountry || project?.storeCountry;

  // Fetch live App Store telemetry unconditionally at top
  const { data: storeData, loading } = useAppStoreData(appStoreId, storeCountry);

  if (!project || !detail) return null;

  const {
    heading,
    body,
    screenshots = [],
    appStoreLink = project.appStoreLink,
    subProjects = [],
  } = detail;

  // Dynamic screenshot sources: Apple CDN live screenshots fallback to local screenshots
  const displayScreenshots =
    storeData?.screenshots && storeData.screenshots.length > 0
      ? storeData.screenshots
      : screenshots;

  const directStoreUrl = storeData?.trackViewUrl || appStoreLink;

  return (
    <div className="bento-modal-container">
      {/* Bento Row 1: Left Media Column & Right Engineering Story */}
      <div className="bento-hero-grid">
        {/* Left Column: Bento Cell 1 Carousel + External Download Button underneath */}
        <div className="bento-media-column">
          <div className="bento-card bento-carousel-card">
            <div className="bento-card-inner">
              {displayScreenshots.length > 0 ? (
                <ScreenshotCarousel
                  screenshots={displayScreenshots}
                  title={project.title}
                />
              ) : (
                <div className="bento-empty-preview">
                  {project.previewImage && (
                    <img
                      src={project.previewImage}
                      alt={project.title}
                      className="bento-single-preview-img"
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Download on App Store Action Button - Anchored neatly under Cell 1 */}
          {directStoreUrl && (
            <div className="bento-media-cta-wrap">
              <a
                href={directStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="screenshot-appstore-btn"
                onClick={() => trackAppStoreClick(project.title, directStoreUrl)}
              >
                <AppStoreIcon size={16} />
                <span>Download on App Store</span>
              </a>
            </div>
          )}
        </div>

        {/* Cell 2: Engineering Accomplishments & Tech Stack */}
        <div className="bento-card bento-story-card">
          <div className="bento-story-header">
            <div className="bento-title-group">
              <h2 className="bento-heading">{heading}</h2>
              {project.role && <span className="bento-role-badge">{project.role}</span>}
            </div>
            {storeData?.primaryGenreName && (
              <span className="bento-category-pill">{storeData.primaryGenreName}</span>
            )}
          </div>

          <div className="bento-story-body">
            {body.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="bento-story-paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          {project.techStack && (
            <div className="bento-tech-section">
              <span className="bento-section-label">Engineering Stack</span>
              <div className="bento-tech-tags">
                {project.techStack.map((tech) => (
                  <span key={tech} className="project-card-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bento Row 2: Telemetry Metrics Strip (4 Columns for App Store, or Fallback Tech Stats) */}
      <div className="bento-card bento-telemetry-card">
        {appStoreId ? (
          <div className="bento-telemetry-grid">
            {/* Metric 1: Rating */}
            <div className="bento-telemetry-pillar">
              <span className="telemetry-label">Store Rating</span>
              <div className="telemetry-value-wrap">
                {loading && !storeData ? (
                  <div className="telemetry-shimmer" />
                ) : storeData?.formattedRating ? (
                  <>
                    <span className="telemetry-val highlight-gold">★ {storeData.formattedRating}</span>
                    <span className="telemetry-sub">
                      {storeData.formattedReviewCount ? `${storeData.formattedReviewCount} reviews` : 'Storefront'}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="telemetry-val">4.5+</span>
                    <span className="telemetry-sub">App Store</span>
                  </>
                )}
              </div>
            </div>

            {/* Metric 2: Min OS Requirement */}
            <div className="bento-telemetry-pillar">
              <span className="telemetry-label">Minimum iOS</span>
              <div className="telemetry-value-wrap">
                {loading && !storeData ? (
                  <div className="telemetry-shimmer" />
                ) : (
                  <>
                    <span className="telemetry-val">
                      {storeData?.minimumOsVersion ? `iOS ${storeData.minimumOsVersion}+` : 'iOS 15.0+'}
                    </span>
                    <span className="telemetry-sub">
                      {storeData?.contentAdvisoryRating ? `Rated ${storeData.contentAdvisoryRating}` : 'Universal'}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Metric 3: App Size */}
            <div className="bento-telemetry-pillar">
              <span className="telemetry-label">Package Size</span>
              <div className="telemetry-value-wrap">
                {loading && !storeData ? (
                  <div className="telemetry-shimmer" />
                ) : (
                  <>
                    <span className="telemetry-val">{storeData?.formattedSize || 'Native'}</span>
                    <span className="telemetry-sub">Swift Binary</span>
                  </>
                )}
              </div>
            </div>

            {/* Metric 4: Latest Version & Date */}
            <div className="bento-telemetry-pillar">
              <span className="telemetry-label">Latest Release</span>
              <div className="telemetry-value-wrap">
                {loading && !storeData ? (
                  <div className="telemetry-shimmer" />
                ) : (
                  <>
                    <span className="telemetry-val">v{storeData?.version || '1.0'}</span>
                    <span className="telemetry-sub">
                      {storeData?.formattedReleaseDate ? `Updated ${storeData.formattedReleaseDate}` : 'Production'}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bento-telemetry-grid">
            <div className="bento-telemetry-pillar">
              <span className="telemetry-label">Architecture</span>
              <span className="telemetry-val">Native Swift / React</span>
              <span className="telemetry-sub">Modern Stack</span>
            </div>
            <div className="bento-telemetry-pillar">
              <span className="telemetry-label">Platform</span>
              <span className="telemetry-val">iOS / Web</span>
              <span className="telemetry-sub">High Performance</span>
            </div>
            <div className="bento-telemetry-pillar">
              <span className="telemetry-label">Code Quality</span>
              <span className="telemetry-val">100% Client-Side</span>
              <span className="telemetry-sub">Zero Framework Lock-in</span>
            </div>
            <div className="bento-telemetry-pillar">
              <span className="telemetry-label">Status</span>
              <span className="telemetry-val highlight-green">Active</span>
              <span className="telemetry-sub">Open Source / Portfolio</span>
            </div>
          </div>
        )}
      </div>

      {/* Bento Row 3: Developer Ecosystem Apps (NatWest / Bell Family) */}
      {subProjects.length > 0 && (
        <div className="bento-card bento-ecosystem-card">
          <h3 className="bento-ecosystem-heading">Apps in this ecosystem</h3>
          <div className="project-subprojects-grid">
            {subProjects.map((sub) => (
              <SubProjectItem key={sub.name} sub={sub} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailContent;
