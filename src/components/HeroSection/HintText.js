import React from 'react';

/**
 * HintText component
 * Subtle prompt inviting visitor to tap the subtitle.
 * Permanently dismissed once dismissed.
 */
export function HintText({
  message,
  isVisible = false,
  onHintClick,
  isInteractive = true,
}) {
  return (
    <div
      className={`hero-hint-container ${isInteractive ? 'hero-hint-interactive' : ''}`}
      onClick={isInteractive ? onHintClick : undefined}
      role={isInteractive ? 'button' : 'note'}
      tabIndex={isInteractive && isVisible ? 0 : -1}
      aria-label={isInteractive ? 'Hint - tap for instruction' : undefined}
      onKeyDown={(e) => {
        if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          if (onHintClick) onHintClick();
        }
      }}
    >
      {isVisible && message && (
        <div key={message} className="hero-hint-content">
          <span className="hero-hint-text">
            <span className="hero-hint-sparkle" aria-hidden="true">✦ </span>
            {message}
          </span>
        </div>
      )}
    </div>
  );
}

export default HintText;
