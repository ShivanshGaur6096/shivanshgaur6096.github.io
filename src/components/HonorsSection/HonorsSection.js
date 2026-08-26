import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  HONORS_HEADING,
  HONORS_SUBHEADING,
  certificationsList,
  awardsList,
  testimonialsList,
} from './honorsData';
import { trackHonorClick, trackTestimonialView } from '../../services/analyticsService';
import TestimonialDetailModal from './TestimonialDetailModal';
import './HonorsSection.css';

/**
 * Interactive Marquee Ticker Component for Testimonials
 * Supports:
 * - Continuous slow smooth horizontal ticker loop
 * - Pauses on hover
 * - Drag / scroll support via mouse and trackpad
 * - Resumes automatic slow scroll seamlessly when user stops interacting
 * - Click to open Desktop Modal / Mobile BottomSheet
 */
function TestimonialsMarquee({ testimonials, onSelectTestimonial }) {
  const marqueeRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  // Triple array for an infinite loop illusion
  const tickerItems = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    let animationFrameId;
    const speed = 0.6; // Slow, legible smooth ticker speed

    const step = () => {
      if (!isHovered && !isDragging && el) {
        el.scrollLeft += speed;
        if (el.scrollLeft >= (el.scrollWidth - el.clientWidth) * 0.66) {
          el.scrollLeft = (el.scrollWidth - el.clientWidth) * 0.33;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, isDragging]);

  // Mouse Drag Handlers
  const handleMouseDown = (e) => {
    const el = marqueeRef.current;
    if (!el) return;
    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeft(el.scrollLeft);
    setDragDistance(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const el = marqueeRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5;
    setDragDistance(Math.abs(walk));
    el.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleCardClick = (test) => {
    // Only open if the user clicked (didn't drag through)
    if (dragDistance < 6 && onSelectTestimonial) {
      onSelectTestimonial(test);
    }
  };

  return (
    <div
      className="testimonials-ticker-viewport"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsDragging(false);
      }}
    >
      {/* Left and Right Edge Vignettes */}
      <div className="testimonials-fade-edge fade-left" aria-hidden="true" />
      <div className="testimonials-fade-edge fade-right" aria-hidden="true" />

      <div
        className={`testimonials-ticker-track ${isDragging ? 'is-dragging' : ''}`}
        ref={marqueeRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
      >
        {tickerItems.map((test, index) => (
          <article
            key={`${test.id}-${index}`}
            className="honors-card testimonial-card-compact"
            style={{ '--honor-accent-color': '#10b981' }}
            onClick={() => handleCardClick(test)}
            tabIndex={0}
            role="button"
            aria-label={`Read full review from ${test.author}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectTestimonial(test);
              }
            }}
          >
            <div className="testimonial-quote-icon" aria-hidden="true">“</div>
            <p className="testimonial-text">{test.text}</p>

            <div className="testimonial-footer">
              <div className="testimonial-author-branding">
                <div className="testimonial-avatar-fallback">{test.avatarFallback}</div>
                <div>
                  <h4 className="testimonial-author-name">{test.author}</h4>
                  <span className="testimonial-author-role">{test.role} • {test.company}</span>
                </div>
              </div>
              <span className="testimonial-endorsement-pill">{test.badgeText}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/**
 * HonorsSection Component
 */
export function HonorsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  return (
    <section className="honors-section" id="honors" ref={ref}>
      {/* Seamless Ambient Mesh (Emerald / Teal -> Cyan / Blue Shift) */}
      <div className="honors-ambient-mesh" aria-hidden="true">
        <div className="honors-ambient-orb honors-orb-1" />
        <div className="honors-ambient-orb honors-orb-2" />
        <div className="honors-ambient-orb honors-orb-3" />
      </div>

      <div className="honors-container">
        {/* Section Header */}
        <header className="honors-header">
          <h2 className="honors-title">{HONORS_HEADING}</h2>
          <p className="honors-subtitle">{HONORS_SUBHEADING}</p>
        </header>

        {/* Top Split: Certifications & Performance Awards */}
        <div className="honors-credentials-grid">
          {/* SAFe 6 Practitioner Certificate Banner Card */}
          {certificationsList.map((cert, index) => (
            <motion.article
              key={cert.id}
              className="honors-card honors-card-featured"
              style={{ '--honor-accent-color': cert.brandColor }}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => trackHonorClick(cert.title, 'Certification')}
            >
              <div className="honors-card-header">
                <div className="honors-card-branding">
                  <img
                    src={cert.badge}
                    alt={`${cert.title} badge`}
                    className="honors-card-badge-img honors-cert-badge-large"
                    loading="lazy"
                  />
                  <div>
                    <div className="honors-title-row">
                      <h3 className="honors-card-name">{cert.title}</h3>
                      <span className="honors-verified-badge">
                        <span className="honors-verified-dot" />
                        Verified Active
                      </span>
                    </div>
                    <span className="honors-card-issuer">{cert.issuer} • {cert.category}</span>
                  </div>
                </div>
                <span className="honors-period-tag">{cert.period}</span>
              </div>

              <p className="honors-card-desc">{cert.description}</p>

              <div className="honors-tags-row">
                {cert.highlights.map((tag, tIndex) => (
                  <span key={tIndex} className="honors-tag honors-tag-cert">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}

          {/* Bravo Awards Grid */}
          <div className="honors-awards-subgrid">
            {awardsList.map((award, index) => (
              <motion.article
                key={award.id}
                className="honors-card honors-card-award"
                style={{ '--honor-accent-color': award.brandColor }}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.12 }}
                onClick={() => trackHonorClick(award.title, 'Award')}
              >
                <div className="honors-card-header">
                  <div className="honors-card-branding">
                    <img
                      src={award.badge}
                      alt={`${award.title} trophy`}
                      className="honors-card-badge-img honors-award-badge"
                      loading="lazy"
                    />
                    <div>
                      <h3 className="honors-card-name">{award.title}</h3>
                      <span className="honors-card-issuer">{award.issuer} • {award.category}</span>
                    </div>
                  </div>
                  <span className="honors-period-tag">{award.period}</span>
                </div>

                <p className="honors-card-desc">{award.description}</p>

                <div className="honors-tags-row">
                  {award.highlights.map((tag, tIndex) => (
                    <span key={tIndex} className="honors-tag honors-tag-award">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Testimonials Marquee Ticker Subsection */}
        <div className="testimonials-header-row">
          <div>
            <h3 className="testimonials-section-title">Peer & Client Testimonials</h3>
            <p className="testimonials-disclaimer-note">
              *Disclaimer: Purely illustrative placeholders for now... but let’s be honest, if you asked them, they’d probably say something even nicer! 😉
            </p>
          </div>
          <span className="testimonials-count-badge">Click card to view full feedback</span>
        </div>

        <TestimonialsMarquee
          testimonials={testimonialsList}
          onSelectTestimonial={(test) => {
            setSelectedTestimonial(test);
            trackTestimonialView(test.author, test.company);
          }}
        />
      </div>

      {/* Responsive Desktop Modal / Mobile BottomSheet */}
      <TestimonialDetailModal
        testimonial={selectedTestimonial}
        isOpen={Boolean(selectedTestimonial)}
        onClose={() => setSelectedTestimonial(null)}
      />
    </section>
  );
}

export default HonorsSection;
