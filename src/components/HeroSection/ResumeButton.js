import React, { useState, useEffect } from 'react';
import { calculateTypewriterText } from './hooks/useTypewriter';
import { animationTimeline } from './heroData';
import { trackResumeDownload } from '../../services/analyticsService';
import ResumeIcon from './icons/ResumeIcon';

const TEXT_PHASE_1 = 'OR JUST';
const TEXT_FINAL = 'Resume';

/**
 * ResumeButton component
 * Types "or just" -> pauses -> deletes -> types "Download Resume".
 * Keyboard focusable and operable via Enter/Space key.
 * In reduced motion mode, displays "Download Resume" immediately.
 */
export function ResumeButton({
  isActive = false,
  isReducedMotion = false,
  onComplete,
  resumeUrl,
}) {
  const [displayText, setDisplayText] = useState(() =>
    isReducedMotion ? TEXT_FINAL : ''
  );
  const [currentStep, setCurrentStep] = useState(() =>
    isReducedMotion ? 4 : 1
  );
  const [isFinished, setIsFinished] = useState(isReducedMotion);

  useEffect(() => {
    if (isReducedMotion) {
      setDisplayText(TEXT_FINAL);
      setIsFinished(true);
      setCurrentStep(4);
      if (onComplete) onComplete();
      return;
    }

    if (!isActive) return;

    let isMounted = true;
    let animationFrameId = null;

    const { typePhase1, pauseDuration, deletePhase, typePhase2 } = animationTimeline.button;
    let startTime = null;

    const animate = (now) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;

      if (elapsed < typePhase1) {
        // Step 1: Type "OR JUST"
        if (isMounted) setCurrentStep(1);
        const res = calculateTypewriterText(TEXT_PHASE_1, typePhase1, elapsed, 'forward');
        if (isMounted) setDisplayText(res.displayText);
        animationFrameId = requestAnimationFrame(animate);
      } else if (elapsed < typePhase1 + pauseDuration) {
        // Step 2: Pause on "OR JUST"
        if (isMounted) {
          setCurrentStep(2);
          setDisplayText(TEXT_PHASE_1);
        }
        animationFrameId = requestAnimationFrame(animate);
      } else if (elapsed < typePhase1 + pauseDuration + deletePhase) {
        // Step 3: Delete "OR JUST"
        if (isMounted) setCurrentStep(3);
        const deleteElapsed = elapsed - (typePhase1 + pauseDuration);
        const res = calculateTypewriterText(TEXT_PHASE_1, deletePhase, deleteElapsed, 'reverse');
        if (isMounted) setDisplayText(res.displayText);
        animationFrameId = requestAnimationFrame(animate);
      } else if (elapsed < typePhase1 + pauseDuration + deletePhase + typePhase2) {
        // Step 4: Type "Resume" (Icon appears here)
        if (isMounted) setCurrentStep(4);
        const type2Elapsed = elapsed - (typePhase1 + pauseDuration + deletePhase);
        const res = calculateTypewriterText(TEXT_FINAL, typePhase2, type2Elapsed, 'forward');
        if (isMounted) setDisplayText(res.displayText);
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Complete
        if (isMounted) {
          setCurrentStep(4);
          setDisplayText(TEXT_FINAL);
          setIsFinished(true);
          if (onComplete) onComplete();
        }
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      isMounted = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isActive, isReducedMotion, onComplete]);

  if (!isActive && !isReducedMotion) {
    return null;
  }

  const showIcon = isReducedMotion || currentStep === 4;

  return (
    <div className="hero-button-container">
      <a
        href={resumeUrl}
        download="Shivansh_Gaur_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="hero-resume-button"
        aria-label="Download Resume PDF"
        tabIndex={0}
        onClick={() => trackResumeDownload('hero')}
      >
        {showIcon && <ResumeIcon size={18} className="hero-resume-icon" />}
        <span className="hero-resume-text">{displayText || (isActive ? '' : TEXT_FINAL)}</span>
        {isActive && !isFinished && !isReducedMotion && (
          <span className="hero-typewriter-cursor" aria-hidden="true">|</span>
        )}
      </a>
    </div>
  );
}

export default ResumeButton;
