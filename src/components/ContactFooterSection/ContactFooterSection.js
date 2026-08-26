import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  CONTACT_HEADING,
  CONTACT_SUBTITLE,
  contactLinks,
  backgroundSkills,
  FOOTER_COPYRIGHT,
  FOOTER_TAGLINE,
} from './contactFooterData';
import GitHubIcon from '../HeroSection/icons/GitHubIcon';
import LinkedInIcon from '../HeroSection/icons/LinkedInIcon';
import EmailIcon from '../HeroSection/icons/EmailIcon';
import { ExternalLinkIcon } from '../ProjectsSection/icons/ProjectIcons';
import { trackContactClick, trackResumeDownload } from '../../services/analyticsService';
import './ContactFooterSection.css';

/**
 * Helper to render React SVG icons
 */
function ContactIcon({ name, size = 22 }) {
  switch (name) {
    case 'github':
      return <GitHubIcon size={size} />;
    case 'linkedin':
      return <LinkedInIcon size={size} />;
    case 'email':
      return <EmailIcon size={size} />;
    case 'resume':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
    default:
      return <ExternalLinkIcon size={size} />;
  }
}

/**
 * Unified ContactFooterSection Component
 * Features an interactive fixed-size uniform grid of skills in the background (UICollectionView / Grid style),
 * which light up when hovered, overlaid by the floating liquid glass contact card.
 */
export function ContactFooterSection() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: false });

  // 48 uniform tiles to fill the matrix grid evenly
  const repeatedSkills = [
    ...backgroundSkills,
    ...backgroundSkills,
    ...backgroundSkills,
    ...backgroundSkills,
  ];

  return (
    <section className="contact-footer-section" id="contact" ref={ref}>
      {/* 1. Ambient Lighting Layer */}
      <div className="contact-ambient-mesh" aria-hidden="true">
        <div className="contact-ambient-orb contact-orb-1" />
        <div className="contact-ambient-orb contact-orb-2" />
      </div>

      {/* 2. Uniform Interactive Skills Grid (Fixed size, equal small spacing, hover to light up) */}
      <div className="skills-matrix-backdrop" aria-hidden="true">
        <div className="skills-matrix-grid">
          {repeatedSkills.map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className="skill-matrix-item"
              title={skill.name}
            >
              <img
                src={skill.icon}
                alt=""
                className="skill-matrix-icon"
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Forefront Content: Floating Liquid Glass Contact Card */}
      <div className="contact-content-container">
        <motion.div
          className="contact-liquid-card"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, type: 'spring', damping: 25 }}
        >
          {/* Header */}
          <header className="contact-card-header">
            <span className="contact-status-chip">
              <span className="contact-status-dot" />
              Open to Opportunities
            </span>
            <h2 className="contact-card-title">{CONTACT_HEADING}</h2>
            <p className="contact-card-subtitle">{CONTACT_SUBTITLE}</p>
          </header>

          {/* Action Links Grid */}
          <div className="contact-actions-grid">
            {contactLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target={link.id !== 'email' ? '_blank' : '_self'}
                rel={link.id !== 'email' ? 'noopener noreferrer' : undefined}
                className="contact-action-capsule"
                style={{ '--contact-accent': link.accentColor }}
                aria-label={`Connect via ${link.label}`}
                onClick={() => {
                  if (link.id === 'resume') {
                    trackResumeDownload('footer');
                  } else {
                    trackContactClick(link.label);
                  }
                }}
              >
                <div className="contact-action-icon-wrapper">
                  <ContactIcon name={link.iconName} size={20} />
                </div>
                <div className="contact-action-info">
                  <span className="contact-action-label">{link.label}</span>
                  <span className="contact-action-handle">{link.handle}</span>
                </div>
                <ExternalLinkIcon size={14} className="contact-action-arrow" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* 4. Unified Integrated Footer */}
        <footer className="integrated-footer">
          <p className="footer-copyright">{FOOTER_COPYRIGHT}</p>
          <p className="footer-tagline">{FOOTER_TAGLINE}</p>
        </footer>

        {/* 5. Smooth Scroll-To-Top Button (Appears ONLY when this last section is in view) */}
        <AnimatePresence>
          {inView && (
            <motion.button
              type="button"
              className="scroll-to-top-btn"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll smoothly back to top"
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 15 }}
              transition={{ duration: 0.25, type: 'spring', damping: 20 }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="18 15 12 9 6 15" />
              </svg>
              <span className="scroll-to-top-tooltip">Back to Top</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default ContactFooterSection;
