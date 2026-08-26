import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  EXPERIENCE_HEADING,
  EXPERIENCE_SUBHEADING,
  experiencesData,
  educationData,
} from './experienceData';
import './ExperienceSection.css';

/**
 * ChevronDownIcon Component
 */
function ChevronDownIcon({ className = '', size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/**
 * ExperienceSection Component (Clean Bento Grid with Mobile Expandable Capsules)
 * Full-width pure glass Bento Grid on desktop (>768px),
 * and compact interactive expandable capsules on mobile (<=768px).
 */
export function ExperienceSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [isPastExpOpen, setIsPastExpOpen] = useState(false);
  const [isSchoolingOpen, setIsSchoolingOpen] = useState(false);

  const currentRole = experiencesData.find((e) => e.isCurrent) || experiencesData[0];
  const pastRoles = experiencesData.filter((e) => !e.isCurrent);
  const collegeEdu = educationData[0];
  const schoolEdu = educationData.slice(1);

  return (
    <section className="experience-section" id="experience" ref={ref}>
      {/* Seamless Ambient Mesh (Blue -> Emerald / Teal Transition) */}
      <div className="experience-ambient-mesh" aria-hidden="true">
        <div className="experience-ambient-orb experience-orb-1" />
        <div className="experience-ambient-orb experience-orb-2" />
        <div className="experience-ambient-orb experience-orb-3" />
      </div>

      <div className="experience-container">
        {/* Section Header */}
        <header className="experience-header">
          <h2 className="experience-title">{EXPERIENCE_HEADING}</h2>
          <p className="experience-subtitle">{EXPERIENCE_SUBHEADING}</p>
        </header>

        {/* =========================================================================
            DESKTOP VIEW (> 768px): Full Bento Grid Layout
            ========================================================================= */}
        <div className="experience-bento-grid desktop-only-bento">
          {/* Bento Tile 1: Current Flagship Role (NatWest Group - Violet Edge) */}
          <motion.article
            className="experience-bento-card bento-card-featured"
            style={{ '--bento-accent-color': currentRole.brandColor || '#7c3aed' }}
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bento-card-header">
              <div className="bento-card-branding">
                <img
                  src={currentRole.logo}
                  alt={`${currentRole.company} logo`}
                  className="bento-card-logo bento-card-logo-featured"
                  loading="lazy"
                />
                <div>
                  <div className="bento-company-row">
                    <h3 className="bento-card-title">{currentRole.company}</h3>
                    <span className="bento-active-badge">
                      <span className="bento-active-dot" />
                      Active Role
                    </span>
                  </div>
                  <span className="bento-card-role">{currentRole.role}</span>
                </div>
              </div>

              <div className="bento-card-meta">
                <span className="bento-period-tag">{currentRole.period}</span>
                <span className="bento-location-text">{currentRole.location}</span>
              </div>
            </div>

            <p className="bento-card-desc bento-desc-featured">{currentRole.description}</p>

            <div className="bento-card-tags">
              {currentRole.skills.map((skill, index) => (
                <span key={index} className="bento-tag bento-tag-highlight">
                  {skill}
                </span>
              ))}
            </div>
          </motion.article>

          {/* Bento Tile 2: Previous Enterprise Role (blackNgreen - Emerald Green Edge) */}
          <motion.article
            className="experience-bento-card bento-card-medium"
            style={{ '--bento-accent-color': pastRoles[0]?.brandColor || '#10b981' }}
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <div className="bento-card-header">
              <div className="bento-card-branding">
                <img
                  src={pastRoles[0]?.logo}
                  alt={`${pastRoles[0]?.company} logo`}
                  className="bento-card-logo"
                  loading="lazy"
                />
                <div>
                  <h3 className="bento-card-title">{pastRoles[0]?.company}</h3>
                  <span className="bento-card-role">{pastRoles[0]?.role}</span>
                </div>
              </div>
              <span className="bento-period-tag">{pastRoles[0]?.period}</span>
            </div>

            <p className="bento-card-desc">{pastRoles[0]?.description}</p>

            <div className="bento-card-tags">
              {pastRoles[0]?.skills.map((skill, index) => (
                <span key={index} className="bento-tag">
                  {skill}
                </span>
              ))}
            </div>
          </motion.article>

          {/* Bento Tile 3: Foundational Enterprise Role (Tech Mahindra - Red Edge) */}
          <motion.article
            className="experience-bento-card bento-card-medium"
            style={{ '--bento-accent-color': pastRoles[1]?.brandColor || '#e11d48' }}
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <div className="bento-card-header">
              <div className="bento-card-branding">
                <img
                  src={pastRoles[1]?.logo}
                  alt={`${pastRoles[1]?.company} logo`}
                  className="bento-card-logo"
                  loading="lazy"
                />
                <div>
                  <h3 className="bento-card-title">{pastRoles[1]?.company}</h3>
                  <span className="bento-card-role">{pastRoles[1]?.role}</span>
                </div>
              </div>
              <span className="bento-period-tag">{pastRoles[1]?.period}</span>
            </div>

            <p className="bento-card-desc">{pastRoles[1]?.description}</p>

            <div className="bento-card-tags">
              {pastRoles[1]?.skills.map((skill, index) => (
                <span key={index} className="bento-tag">
                  {skill}
                </span>
              ))}
            </div>
          </motion.article>

          {/* Bento Tile 4: Amity University (Yellow / Gold Edge) */}
          <motion.article
            className="experience-bento-card bento-card-edu-main"
            style={{ '--bento-accent-color': collegeEdu.brandColor || '#f59e0b' }}
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            <div className="bento-card-header">
              <div className="bento-card-branding">
                <img
                  src={collegeEdu.logo}
                  alt={`${collegeEdu.institution} logo`}
                  className="bento-card-logo"
                  loading="lazy"
                />
                <div>
                  <h3 className="bento-card-title">{collegeEdu.institution}</h3>
                  <span className="bento-card-role bento-edu-degree">{collegeEdu.degree}</span>
                </div>
              </div>
              <span className="bento-period-tag">{collegeEdu.period}</span>
            </div>

            <p className="bento-card-desc">{collegeEdu.description}</p>
          </motion.article>

          {/* Bento Tile 5: Schooling Foundation Milestones (Electric Blue Edge) */}
          <motion.article
            className="experience-bento-card bento-card-school"
            style={{ '--bento-accent-color': schoolEdu[0]?.brandColor || '#3b82f6' }}
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.4, delay: 0.45 }}
          >
            <div className="bento-card-header">
              <div className="bento-card-branding">
                <img
                  src={schoolEdu[0]?.logo}
                  alt="School logo"
                  className="bento-card-logo"
                  loading="lazy"
                />
                <div>
                  <h3 className="bento-card-title">Radiant Stars English School</h3>
                  <span className="bento-card-role">CBSE Board • Secondary & High School</span>
                </div>
              </div>
            </div>

            <div className="bento-school-capsules">
              {schoolEdu.map((school, index) => (
                <div key={school.id || index} className="bento-school-capsule">
                  <div className="bento-school-dot" style={{ backgroundColor: school.brandColor || '#3b82f6' }} />
                  <div className="bento-school-info">
                    <span className="bento-school-degree">{school.degree}</span>
                    <span className="bento-school-period">{school.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.article>
        </div>

        {/* =========================================================================
            MOBILE VIEW (<= 768px): Focused Hero + Expandable Vault Capsules
            ========================================================================= */}
        <div className="experience-mobile-stack mobile-only-stack">
          {/* 1. Featured Current Role (Always Visible) */}
          <article
            className="experience-bento-card bento-card-featured"
            style={{ '--bento-accent-color': currentRole.brandColor || '#7c3aed' }}
          >
            <div className="bento-card-header">
              <div className="bento-card-branding">
                <img
                  src={currentRole.logo}
                  alt={`${currentRole.company} logo`}
                  className="bento-card-logo bento-card-logo-featured"
                  loading="lazy"
                />
                <div>
                  <div className="bento-company-row">
                    <h3 className="bento-card-title">{currentRole.company}</h3>
                    <span className="bento-active-badge">
                      <span className="bento-active-dot" />
                      Active Role
                    </span>
                  </div>
                  <span className="bento-card-role">{currentRole.role}</span>
                </div>
              </div>

              <div className="bento-card-meta">
                <span className="bento-period-tag">{currentRole.period}</span>
                <span className="bento-location-text">{currentRole.location}</span>
              </div>
            </div>

            <p className="bento-card-desc bento-desc-featured">{currentRole.description}</p>

            <div className="bento-card-tags">
              {currentRole.skills.map((skill, index) => (
                <span key={index} className="bento-tag bento-tag-highlight">
                  {skill}
                </span>
              ))}
            </div>
          </article>

          {/* 2. Previous Commercial Roles (Expandable Capsule on Mobile) */}
          <div className="exp-expandable-vault">
            <div
              className={`exp-vault-summary ${isPastExpOpen ? 'is-open' : ''}`}
              onClick={() => setIsPastExpOpen((prev) => !prev)}
              role="button"
              tabIndex={0}
              aria-expanded={isPastExpOpen}
              aria-label="Toggle previous commercial roles"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsPastExpOpen((prev) => !prev);
                }
              }}
            >
              <div className="exp-vault-summary-content">
                <span className="exp-vault-title">Previous Commercial Roles</span>
                
                {/* Subheadings visible only in collapsed preview state */}
                {!isPastExpOpen && (
                  <div className="exp-vault-subheadings-group">
                    {/* Subheading Item 1: blackNgreen */}
                    <div className="exp-subheading-item">
                      <img
                        src={pastRoles[0]?.logo}
                        alt={`${pastRoles[0]?.company} logo`}
                        className="exp-micro-avatar"
                        loading="lazy"
                      />
                      <span className="exp-subheading-name">{pastRoles[0]?.shortName || pastRoles[0]?.company}</span>
                      <span className="exp-subheading-tenure">{pastRoles[0]?.tenure}</span>
                    </div>

                    {/* Subheading Item 2: Tech Mahindra */}
                    <div className="exp-subheading-item">
                      <img
                        src={pastRoles[1]?.logo}
                        alt={`${pastRoles[1]?.company} logo`}
                        className="exp-micro-avatar"
                        loading="lazy"
                      />
                      <span className="exp-subheading-name">{pastRoles[1]?.shortName || pastRoles[1]?.company}</span>
                      <span className="exp-subheading-tenure">{pastRoles[1]?.tenure}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Wave Effect Action Button */}
              <div className="exp-wave-trigger-wrap">
                <button
                  type="button"
                  className={`exp-wave-trigger ${isPastExpOpen ? 'is-open' : ''}`}
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  <span className="exp-wave-ripple" />
                  <ChevronDownIcon className="exp-wave-chevron" size={16} />
                </button>
              </div>
            </div>

            {/* Expandable Content Container */}
            <AnimatePresence>
              {isPastExpOpen && (
                <motion.div
                  className="exp-vault-accordion-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="exp-vault-cards-stack">
                    {pastRoles.map((role) => (
                      <article
                        key={role.id}
                        className="experience-bento-card bento-card-medium"
                        style={{ '--bento-accent-color': role.brandColor || '#10b981' }}
                      >
                        <div className="bento-card-header">
                          <div className="bento-card-branding">
                            <img
                              src={role.logo}
                              alt={`${role.company} logo`}
                              className="bento-card-logo"
                              loading="lazy"
                            />
                            <div>
                              <h3 className="bento-card-title">{role.company}</h3>
                              <span className="bento-card-role">{role.role}</span>
                            </div>
                          </div>
                          <span className="bento-period-tag">{role.period}</span>
                        </div>

                        <p className="bento-card-desc">{role.description}</p>

                        <div className="bento-card-tags">
                          {role.skills.map((skill, index) => (
                            <span key={index} className="bento-tag">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. Higher Education (Amity University - Always Visible) */}
          <article
            className="experience-bento-card bento-card-edu-main"
            style={{ '--bento-accent-color': collegeEdu.brandColor || '#f59e0b' }}
          >
            <div className="bento-card-header">
              <div className="bento-card-branding">
                <img
                  src={collegeEdu.logo}
                  alt={`${collegeEdu.institution} logo`}
                  className="bento-card-logo"
                  loading="lazy"
                />
                <div>
                  <h3 className="bento-card-title">{collegeEdu.institution}</h3>
                  <span className="bento-card-role bento-edu-degree">{collegeEdu.degree}</span>
                </div>
              </div>
              <span className="bento-period-tag">{collegeEdu.period}</span>
            </div>

            <p className="bento-card-desc">{collegeEdu.description}</p>
          </article>

          {/* 4. Secondary & High Schooling (Expandable Capsule on Mobile) */}
          <div className="exp-expandable-vault">
            <div
              className={`exp-vault-summary ${isSchoolingOpen ? 'is-open' : ''}`}
              onClick={() => setIsSchoolingOpen((prev) => !prev)}
              role="button"
              tabIndex={0}
              aria-expanded={isSchoolingOpen}
              aria-label="Toggle schooling foundation"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsSchoolingOpen((prev) => !prev);
                }
              }}
            >
              <div className="exp-vault-summary-content">
                <span className="exp-vault-title">Secondary & High Schooling</span>
                
                {/* Schooling Subheading visible only in collapsed state */}
                {!isSchoolingOpen && (
                  <div className="exp-vault-subheadings-group">
                    <div className="exp-subheading-item">
                      <img
                        src={schoolEdu[0]?.logo}
                        alt="School logo"
                        className="exp-micro-avatar"
                        loading="lazy"
                      />
                      <span className="exp-subheading-name">{schoolEdu[0]?.shortName || schoolEdu[0]?.institution}</span>
                      <span className="exp-subheading-tenure">{schoolEdu[0]?.tenure}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Wave Effect Action Button */}
              <div className="exp-wave-trigger-wrap">
                <button
                  type="button"
                  className={`exp-wave-trigger ${isSchoolingOpen ? 'is-open' : ''}`}
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  <span className="exp-wave-ripple" />
                  <ChevronDownIcon className="exp-wave-chevron" size={16} />
                </button>
              </div>
            </div>

            {/* Expandable Content Container */}
            <AnimatePresence>
              {isSchoolingOpen && (
                <motion.div
                  className="exp-vault-accordion-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="exp-vault-cards-stack">
                    <article
                      className="experience-bento-card bento-card-school"
                      style={{ '--bento-accent-color': schoolEdu[0]?.brandColor || '#3b82f6' }}
                    >
                      <div className="bento-card-header">
                        <div className="bento-card-branding">
                          <img
                            src={schoolEdu[0]?.logo}
                            alt="School logo"
                            className="bento-card-logo"
                            loading="lazy"
                          />
                          <div>
                            <h3 className="bento-card-title">Radiant Stars English School</h3>
                            <span className="bento-card-role">CBSE Board • Secondary & High School</span>
                          </div>
                        </div>
                      </div>

                      <div className="bento-school-capsules">
                        {schoolEdu.map((school, index) => (
                          <div key={school.id || index} className="bento-school-capsule">
                            <div className="bento-school-dot" style={{ backgroundColor: school.brandColor || '#3b82f6' }} />
                            <div className="bento-school-info">
                              <span className="bento-school-degree">{school.degree}</span>
                              <span className="bento-school-period">{school.period}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </article>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
