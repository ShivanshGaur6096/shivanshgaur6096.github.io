import React from "react";
import profile from "../assets/profile.jpg";
import { heroContent } from "./HeroSection/heroData";
import { trackResumeDownload } from "../services/analyticsService";
import "./Toolbar.css";

const Toolbar = ({ isVisible }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`toolbar ${isVisible ? "visible" : ""}`} role="banner">
      {/* Left Section - Brand / Logo */}
      <button
        type="button"
        className="toolbar-left"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <img src={profile} alt="Shivansh Gaur" className="toolbar-profile-pic" />
        <span className="toolbar-name">
          <span className="toolbar-name-full">Shivansh Gaur</span>
          <span className="toolbar-name-short">Shivansh</span>
        </span>
      </button>

      {/* Right Section - Action Pills */}
      <nav className="toolbar-right" aria-label="Quick actions">
        <a href="#contact" className="toolbar-action-btn toolbar-contact-btn">
          <span>Contact</span>
        </a>

        <a
          href={heroContent.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="toolbar-action-btn toolbar-resume-btn"
          aria-label="View Resume"
          onClick={() => trackResumeDownload('toolbar')}
        >
          <span>Resume</span>
        </a>
      </nav>
    </header>
  );
};

export default Toolbar;
