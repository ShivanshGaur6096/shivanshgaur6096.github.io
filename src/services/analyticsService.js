/**
 * Analytics Service (GA4 Event Dispatcher)
 * Safely dispatches custom portfolio interaction events to Google Analytics.
 * In development / offline mode, it logs gracefully without error.
 */

/**
 * Track custom interaction event in Google Analytics
 * @param {string} eventName - Custom event name (e.g., 'view_project', 'download_resume')
 * @param {Object} [params] - Key-value event metadata
 */
export function trackEvent(eventName, params = {}) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  } catch (err) {
    // Fail silently in development/blocked environments
  }
}

/**
 * Convenience helper: Track resume downloads
 * @param {string} source - 'hero' or 'toolbar'
 */
export function trackResumeDownload(source = 'hero') {
  trackEvent('download_resume', {
    event_category: 'Engagement',
    event_label: `Resume Clicked via ${source}`,
    source,
  });
}

/**
 * Convenience helper: Track project detail opens
 * @param {string} projectId - e.g., 'natwest', 'bell', 'magiccall'
 * @param {string} projectTitle - e.g., 'NatWest Bankline Mobile'
 */
export function trackProjectView(projectId, projectTitle) {
  trackEvent('view_project_detail', {
    event_category: 'Projects',
    project_id: projectId,
    project_title: projectTitle,
  });
}

/**
 * Convenience helper: Track external App Store clicks
 * @param {string} appName - Name of the application
 * @param {string} storeUrl - App Store URL
 */
export function trackAppStoreClick(appName, storeUrl) {
  trackEvent('click_appstore', {
    event_category: 'Outbound',
    app_name: appName,
    destination_url: storeUrl,
  });
}

/**
 * Convenience helper: Track Subtitle Game interactions in Hero
 * @param {string} descriptor - e.g., 'Swift Enthusiast', 'Good Cook'
 * @param {number} stepNumber - Step count in sequence
 */
export function trackSubtitleGameInteraction(descriptor, stepNumber) {
  trackEvent('interact_subtitle_game', {
    event_category: 'Gamification',
    descriptor_name: descriptor,
    step_number: stepNumber,
  });
}

/**
 * Convenience helper: Track expandable vault toggles in Experience & Education
 * @param {string} vaultName - 'previous_roles' or 'schooling'
 * @param {boolean} isOpen - Current state
 */
export function trackExpandVault(vaultName, isOpen) {
  if (isOpen) {
    trackEvent('expand_vault', {
      event_category: 'Experience',
      vault_name: vaultName,
    });
  }
}

/**
 * Convenience helper: Track Certification & Award clicks in Honors
 * @param {string} honorTitle - e.g. 'SAFe 6 Practitioner', 'Bravo Award'
 * @param {string} honorType - 'Certification' or 'Award'
 */
export function trackHonorClick(honorTitle, honorType) {
  trackEvent('view_honor_detail', {
    event_category: 'Honors',
    honor_title: honorTitle,
    honor_type: honorType,
  });
}

/**
 * Convenience helper: Track Testimonial card opens
 * @param {string} author - Name of testimonial author
 * @param {string} company - Company of author
 */
export function trackTestimonialView(author, company) {
  trackEvent('view_testimonial', {
    event_category: 'Testimonials',
    author_name: author,
    company,
  });
}

/**
 * Convenience helper: Track social / contact link clicks
 * @param {string} channel - 'LinkedIn', 'GitHub', or 'Email'
 */
export function trackContactClick(channel) {
  trackEvent('click_contact', {
    event_category: 'Contact',
    channel,
  });
}

/**
 * Convenience helper: Track section scroll visibility
 * @param {string} sectionName - 'hero', 'projects', 'experience', 'honors', 'contact'
 */
export function trackSectionView(sectionName) {
  trackEvent('view_section', {
    event_category: 'Navigation',
    section_name: sectionName,
  });
}
