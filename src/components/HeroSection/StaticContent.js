import React from 'react';
import { heroContent } from './heroData';

/**
 * StaticContent component
 * Renders the primary h1 name immediately on mount with no entrance animation delay.
 */
export function StaticContent() {
  return (
    <div className="hero-static-content">
      <h1 className="hero-name">{heroContent.name}</h1>
    </div>
  );
}

export default StaticContent;
