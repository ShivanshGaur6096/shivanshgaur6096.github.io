import React from 'react';
import { CheckIcon, ExternalLinkIcon } from './icons/ProjectIcons';
import GitHubIcon from '../HeroSection/icons/GitHubIcon';

/**
 * GitHubProjectsCard Component
 * High-contrast capsule card with repository list items and visited indicators.
 */
export function GitHubProjectsCard({ cardData, visitedLinks, onMarkVisited }) {
  const { title, role, description, repos = [], profileUrl } = cardData;

  const handleRepoClick = (url) => {
    if (onMarkVisited) {
      onMarkVisited(url);
    }
  };

  return (
    <article className="project-card github-projects-card" tabIndex={0} aria-label={title}>
      <div className="project-card-header">
        <div className="project-card-branding">
          <div className="github-card-logo-badge">
            <GitHubIcon size={24} />
          </div>
          <div className="project-card-meta">
            <h3 className="project-card-title">{title}</h3>
            <span className="project-card-role">{role}</span>
          </div>
        </div>
      </div>

      <p className="project-card-description">{description}</p>

      <div className="github-card-repo-list">
        {repos.map((repo) => {
          const isVisited = visitedLinks.has(repo.url);

          return (
            <a
              key={repo.id || repo.url}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`github-repo-capsule ${isVisited ? 'github-repo-visited' : ''}`}
              onClick={() => handleRepoClick(repo.url)}
              aria-label={`Open repository ${repo.name}`}
            >
              <div className="github-repo-indicator">
                {isVisited ? <CheckIcon size={12} /> : <span className="github-repo-dot" />}
              </div>
              <div className="github-repo-info">
                <span className="github-repo-name">{repo.name}</span>
                <span className="github-repo-desc">{repo.description}</span>
              </div>
              <ExternalLinkIcon size={14} className="github-repo-external-icon" />
            </a>
          );
        })}
      </div>

      <div className="github-card-footer">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="github-card-more-link"
          aria-label="View all repositories on GitHub"
        >
          <span>More on GitHub</span>
          <ExternalLinkIcon size={14} />
        </a>
      </div>
    </article>
  );
}

export default GitHubProjectsCard;
