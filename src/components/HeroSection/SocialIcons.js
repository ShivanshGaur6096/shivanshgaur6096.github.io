import React, { useEffect, useState } from 'react';
import { socialLinks, animationTimeline } from './heroData';
import { trackContactClick } from '../../services/analyticsService';
import GitHubIcon from './icons/GitHubIcon';
import LinkedInIcon from './icons/LinkedInIcon';
import EmailIcon from './icons/EmailIcon';

const iconMap = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Email: EmailIcon,
};

/**
 * SocialIcons component
 * Renders GitHub, LinkedIn, Email inline.
 * When active, performs sequential pulse animation (~150ms stagger per icon).
 * Resting state is gray/muted; on hover turns brand color + single pulse.
 */
export function SocialIcons({
  isActive = false,
  isReducedMotion = false,
  onComplete,
}) {
  const [visibleCount, setVisibleCount] = useState(() => (isReducedMotion ? socialLinks.length : 0));
  const [pulsingIndex, setPulsingIndex] = useState(-1);

  useEffect(() => {
    if (isReducedMotion) {
      setVisibleCount(socialLinks.length);
      if (onComplete) onComplete();
      return;
    }

    if (!isActive) return;

    const stagger = animationTimeline.icons.stagger;
    const pulseDuration = animationTimeline.icons.pulseDuration;
    const totalIcons = socialLinks.length;

    socialLinks.forEach((_, idx) => {
      setTimeout(() => {
        setVisibleCount((prev) => Math.max(prev, idx + 1));
        setPulsingIndex(idx);
      }, idx * stagger);
    });

    const finishTimeout = setTimeout(() => {
      setPulsingIndex(-1);
      if (onComplete) onComplete();
    }, totalIcons * stagger + pulseDuration);

    return () => clearTimeout(finishTimeout);
  }, [isActive, isReducedMotion, onComplete]);

  // If not active, not reduced motion, and no icons revealed yet, don't render or show empty container
  if (!isActive && !isReducedMotion && visibleCount === 0) {
    return null;
  }

  return (
    <span className="hero-social-icons" role="list">
      {socialLinks.map((link, index) => {
        const IconComponent = iconMap[link.name] || GitHubIcon;
        const isVisible = isReducedMotion || index < visibleCount;
        const isCurrentlyPulsing = !isReducedMotion && pulsingIndex === index;

        if (!isVisible) return null;

        return (
          <a
            key={link.name}
            href={link.href}
            target={link.name === 'Email' ? undefined : '_blank'}
            rel={link.name === 'Email' ? undefined : 'noopener noreferrer'}
            aria-label={link.ariaLabel}
            className={`hero-social-link ${isCurrentlyPulsing ? 'hero-icon-pulsing' : ''}`}
            style={{ '--brand-color': link.brandColor }}
            role="listitem"
            onClick={() => trackContactClick(link.name)}
          >
            <IconComponent size={18} className="hero-social-svg" />
          </a>
        );
      })}
    </span>
  );
}

export default SocialIcons;
