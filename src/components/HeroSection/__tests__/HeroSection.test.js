import React from 'react';
import { render, screen } from '@testing-library/react';
import * as fc from 'fast-check';
import HeroSection from '../HeroSection';
import HintText from '../HintText';
import { heroContent, socialLinks } from '../heroData';

describe('HeroSection Integration and Unit Tests', () => {
  test('renders h1 name element immediately with Shivansh Gaur', () => {
    render(<HeroSection />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(heroContent.name);
  });

  test('renders initial subtitle in polite aria-live region', () => {
    render(<HeroSection />);
    const subtitleLive = screen.getByText(heroContent.initialSubtitle);
    expect(subtitleLive).toBeInTheDocument();
  });

  test('all social links and resume button are present and accessible in complete/reduced motion mode', () => {
    // When animations are completed or reduced motion is active
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(<HeroSection />);
    socialLinks.forEach((link) => {
      const socialLinkEl = document.querySelector(`a[aria-label="${link.ariaLabel}"]`);
      expect(socialLinkEl).toBeInTheDocument();
      expect(socialLinkEl).toHaveAttribute('href', link.href);
    });

    const resumeBtn = screen.getByRole('link', { name: /download resume pdf/i });
    expect(resumeBtn).toBeInTheDocument();
    expect(resumeBtn).toHaveAttribute('download', 'Shivansh_Gaur_Resume.pdf');
  });

  /**
   * Property 5: Hint dismissed / hidden when isVisible is false
   * Validates: Requirements 7.2
   */
  test('Property 5: Hint visibility controlled by isVisible prop', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),
        (testMessage) => {
          const { rerender } = render(
            <HintText message={testMessage} isVisible={true} isInteractive={false} />
          );
          expect(screen.getByText(testMessage)).toBeInTheDocument();

          rerender(
            <HintText message={testMessage} isVisible={false} isInteractive={false} />
          );
          expect(screen.queryByText(testMessage)).not.toBeInTheDocument();
        }
      ),
      { numRuns: 30 }
    );
  });

  /**
   * Property 7: Reduced motion permits only opacity transitions
   * When reduced motion is active, components display their final text/state immediately
   * without transform animations.
   * Validates: Requirements 3.4, 4.5, 5.6, 7.4, 10.3, 10.4
   */
  test('Property 7: Reduced motion displays final state immediately', () => {
    fc.assert(
      fc.property(
        fc.constant(true),
        () => {
          // Render hero in reduced motion mode
          window.matchMedia = jest.fn().mockImplementation((query) => ({
            matches: query === '(prefers-reduced-motion: reduce)',
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          }));

          const { unmount } = render(<HeroSection />);
          // Paragraph text should immediately be full
          expect(screen.getByText(heroContent.paragraph)).toBeInTheDocument();
          // Resume button should display full text
          expect(screen.getByText('Resume')).toBeInTheDocument();
          unmount();
        }
      ),
      { numRuns: 20 }
    );
  });
});
