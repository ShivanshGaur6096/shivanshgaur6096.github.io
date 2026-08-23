import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  EXPERIENCE_HEADING,
  EXPERIENCE_SUBHEADING,
  experiencesData,
  educationData,
} from './experienceData';
import './ExperienceSection.css';

/**
 * ExperienceSection Component (Clean Bento Grid with Capsule Cards)
 * Full-width pure glass Bento Grid inspired by the GitHub capsule card design.
 */
export function ExperienceSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

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

        {/* Bento Grid Architecture */}
        <div className="experience-bento-grid">
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
      </div>
    </section>
  );
}

export default ExperienceSection;
