import React from 'react';
import { CloseIcon } from '../ProjectsSection/icons/ProjectIcons';
import './TestimonialModal.css';

/**
 * TestimonialDetailModal Component (Responsive Desktop Modal / Mobile BottomSheet)
 * Displays rich verified feedback details, date, author role, organization, and endorsement badge.
 */
export function TestimonialDetailModal({ testimonial, isOpen, onClose }) {
  if (!isOpen || !testimonial) return null;

  return (
    <div className="testimonial-overlay-portal" role="dialog" aria-modal="true">
      {/* Frosted Backdrop */}
      <div className="testimonial-overlay-backdrop" onClick={onClose} aria-hidden="true" />

      {/* Responsive Sheet Container (Bottom sheet on mobile, centered modal on desktop) */}
      <div className="testimonial-overlay-container">
        {/* Mobile Drag Handle Bar */}
        <div className="testimonial-drag-handle" aria-hidden="true" />

        {/* Close Button */}
        <button
          type="button"
          className="testimonial-close-btn"
          onClick={onClose}
          aria-label="Close testimonial details"
        >
          <CloseIcon size={18} />
        </button>

        {/* Modal / BottomSheet Scrollable Body */}
        <div className="testimonial-modal-body">
          {/* Header Branding */}
          <div className="testimonial-modal-header">
            <div className="testimonial-modal-avatar-wrapper">
              <div className="testimonial-modal-avatar">{testimonial.avatarFallback}</div>
              <div className="testimonial-modal-author-info">
                <div className="testimonial-modal-title-row">
                  <h3 className="testimonial-modal-name">{testimonial.author}</h3>
                  <span className="testimonial-modal-endorsement-badge">{testimonial.badgeText}</span>
                </div>
                <span className="testimonial-modal-role">
                  {testimonial.role} • {testimonial.company}
                </span>
              </div>
            </div>

            <div className="testimonial-modal-meta">
              <span className="testimonial-modal-date">{testimonial.date}</span>
              <span className="testimonial-modal-rel">{testimonial.relationship}</span>
            </div>
          </div>

          {/* Full Testimonial Review Text */}
          <div className="testimonial-modal-content">
            <div className="testimonial-modal-quote-icon" aria-hidden="true">“</div>
            <p className="testimonial-modal-fulltext">{testimonial.fullReview || testimonial.text}</p>
          </div>

          {/* Verified Badge Footer */}
          <div className="testimonial-modal-footer">
            <div className="testimonial-verified-stamp">
              <span className="testimonial-verified-icon">✓</span>
              <span>Verified Professional Endorsement for Shivansh Gaur</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialDetailModal;
