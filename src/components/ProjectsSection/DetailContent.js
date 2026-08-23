import React from 'react';
import ScreenshotCarousel from './ScreenshotCarousel';
import { AppStoreIcon } from './icons/ProjectIcons';

/**
 * DetailContent Component
 * Renders the inside of the Modal or Bottom Sheet.
 */
export function DetailContent({ project, detail }) {
  if (!project || !detail) return null;

  const { heading, body, screenshots = [], appStoreLink, subProjects = [] } = detail;

  return (
    <div className="project-detail-content">
      {/* Top Split Section: Screenshots on Left, Details on Right (Desktop) */}
      <div className={`project-detail-hero-split ${screenshots.length === 0 ? 'no-screenshots' : ''}`}>
        {screenshots.length > 0 && (
          <div className="project-detail-media-column">
            <ScreenshotCarousel
              screenshots={screenshots}
              appStoreLink={appStoreLink}
              title={project.title}
            />
          </div>
        )}

        <div className="project-detail-info-column">
          <div className="project-detail-header-block">
            <h2 className="project-detail-heading">{heading}</h2>
            {project.role && <span className="project-detail-role-badge">{project.role}</span>}
          </div>

          <p className="project-detail-description">{body}</p>

          {project.techStack && (
            <div className="project-detail-tech-stack">
              <span className="project-detail-tech-label">Technologies:</span>
              <div className="project-detail-tags">
                {project.techStack.map((tech) => (
                  <span key={tech} className="project-card-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* If no screenshots and no subprojects, show single CTA in info column */}
          {appStoreLink && screenshots.length === 0 && subProjects.length === 0 && (
            <div className="project-detail-footer-action">
              <a
                href={appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="project-detail-cta-btn"
                aria-label={`Download ${project.title} on App Store`}
              >
                <AppStoreIcon size={18} />
                <span>Download on App Store</span>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Full-Width Subprojects Ecosystem (Bottom Row) */}
      {subProjects.length > 0 && (
        <div className="project-detail-subprojects">
          <h3 className="project-detail-subheading">Apps in this ecosystem</h3>
          <div className="project-subprojects-grid">
            {subProjects.map((sub) => (
              <div key={sub.name} className="project-subproject-card">
                {sub.logo && (
                  <img
                    src={sub.logo}
                    alt={`${sub.name} logo`}
                    className="project-subproject-logo"
                  />
                )}
                <div className="project-subproject-info">
                  <h4 className="project-subproject-title">{sub.name}</h4>
                  {sub.description && (
                    <p className="project-subproject-desc">{sub.description}</p>
                  )}
                </div>
                {sub.appStoreLink && (
                  <a
                    href={sub.appStoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-subproject-link"
                    aria-label={`Get ${sub.name} on App Store`}
                  >
                    <AppStoreIcon size={14} />
                    <span>App Store</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailContent;
