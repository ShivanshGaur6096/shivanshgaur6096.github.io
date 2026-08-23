import { render, screen } from '@testing-library/react';
import App from './App';
import { heroContent } from './components/HeroSection/heroData';

test('renders App and HeroSection with heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { level: 1, name: heroContent.name });
  expect(heading).toBeInTheDocument();
});

test('renders initial subtitle and resume download CTA in App', () => {
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

  render(<App />);
  const subtitle = screen.getByText(heroContent.initialSubtitle);
  expect(subtitle).toBeInTheDocument();

  const resumeBtn = screen.getByRole('link', { name: /download resume pdf/i });
  expect(resumeBtn).toBeInTheDocument();
  expect(resumeBtn).toHaveAttribute('download', 'Shivansh_Gaur_Resume.pdf');
});
