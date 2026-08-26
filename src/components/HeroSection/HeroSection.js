import React, { useState, useEffect } from 'react';
import './HeroSection.css';
import { heroContent, animationTimeline, descriptorItems, endMessages } from './heroData';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useAnimationOrchestrator, PHASES } from './hooks/useAnimationOrchestrator';
import { useDescriptorQueue } from './hooks/useDescriptorQueue';
import { trackSubtitleGameInteraction } from '../../services/analyticsService';
import StaticContent from './StaticContent';
import SubtitleShuffler from './SubtitleShuffler';
import HintText from './HintText';
import TypewriterParagraph from './TypewriterParagraph';
import SocialIcons from './SocialIcons';
import ResumeButton from './ResumeButton';
import ProfilePhoto from './ProfilePhoto';

const HINT_INITIAL = heroContent.hintText; // "tap to discover more about me"
const HINT_REDIRECT = 'No, please tap on the title above ↗';

/**
 * HeroSection Container Component
 * Orchestrates entrance timeline, manages coordinated hint/subtitle game mechanics,
 * and lays out text content and background profile photo.
 */
export function HeroSection() {
  const isReducedMotion = useReducedMotion();
  const { currentPhase, advancePhase } = useAnimationOrchestrator(isReducedMotion);

  const {
    current: currentSubtitle,
    currentIndex: subtitleIndex,
    currentEndMessage,
    isGameOver,
    next: advanceSubtitle,
  } = useDescriptorQueue(descriptorItems, endMessages);

  const [hasStartedGame, setHasStartedGame] = useState(false);
  const [hintMessage, setHintMessage] = useState(HINT_INITIAL);
  const [isHintVisible, setIsHintVisible] = useState(false);

  // When orchestrator enters 'complete' phase, show initial hint after delay
  useEffect(() => {
    if (currentPhase === PHASES.COMPLETE && !hasStartedGame) {
      const timer = setTimeout(() => {
        setIsHintVisible(true);
        setHintMessage(HINT_INITIAL);
      }, animationTimeline.hint.appearDelay);
      return () => clearTimeout(timer);
    }
  }, [currentPhase, hasStartedGame]);

  // When currentEndMessage changes (items 7, 8, 9, 10), update hint text
  useEffect(() => {
    if (currentEndMessage) {
      setHintMessage(currentEndMessage);
      setIsHintVisible(true);
    }
  }, [currentEndMessage]);

  // User taps on the hint itself before subtitle is tapped
  const handleHintClick = () => {
    if (!hasStartedGame) {
      setHintMessage(HINT_REDIRECT);
      setIsHintVisible(true);
    }
  };

  // User taps on the subtitle
  const handleSubtitleTap = () => {
    if (!hasStartedGame) {
      setHasStartedGame(true);
      if (subtitleIndex < 5) {
        setIsHintVisible(false);
      }
    } else {
      if (subtitleIndex < 5) {
        setIsHintVisible(false);
      }
    }

    advanceSubtitle();
    trackSubtitleGameInteraction(currentSubtitle, subtitleIndex + 1);
  };

  const isTypewriterActive = currentPhase === PHASES.TYPEWRITER;
  const isIconsActive =
    currentPhase === PHASES.ICONS ||
    currentPhase === PHASES.BUTTON ||
    currentPhase === PHASES.COMPLETE;
  const isButtonActive =
    currentPhase === PHASES.BUTTON ||
    currentPhase === PHASES.COMPLETE;

  return (
    <section className="hero-section" id="hero">
      <div className="hero-text-container">
        <StaticContent />

        <SubtitleShuffler
          isReducedMotion={isReducedMotion}
          current={currentSubtitle}
          isGameOver={isGameOver}
          onSubtitleTap={handleSubtitleTap}
        />

        <HintText
          message={hintMessage}
          isVisible={isHintVisible}
          onHintClick={handleHintClick}
          isInteractive={!hasStartedGame && !isGameOver}
        />

        <TypewriterParagraph
          text={heroContent.paragraph}
          isActive={isTypewriterActive || isIconsActive}
          isReducedMotion={isReducedMotion}
          onComplete={advancePhase}
        >
          <SocialIcons
            isActive={currentPhase === PHASES.ICONS || isButtonActive}
            isReducedMotion={isReducedMotion}
            onComplete={advancePhase}
          />
        </TypewriterParagraph>

        <div className="hero-actions-container">
          <ResumeButton
            isActive={isButtonActive}
            isReducedMotion={isReducedMotion}
            onComplete={advancePhase}
            resumeUrl={heroContent.resumeUrl}
          />
        </div>
      </div>

      <ProfilePhoto />
    </section>
  );
}

export default HeroSection;
