import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./LandingPage.css";

import mountain from "../assets/night-mountain.png"
import plant from "../assets/AdobeStock_525182382_Preview.png";
import iphoneHand from "../assets/profile-inhand.png";
import moon from "../assets/moon.png";
// import sampleVideo from "../assets/sample-video.mp4";

import githubIcon from "../assets/github.png";
import linkedinIcon from "../assets/linkedin.png";
import gmailIcon from "../assets/gmail.png";
import resumeIcon from "../assets/resumeView.png";
      
const LandingScreen = () => {
  // Scroll values from Framer Motion
  const { scrollY } = useScroll();
  const sampleVideo = null; 

  // Title size effect
  const titleSize = useTransform(scrollY, [0, 500], ["60px", "40px"]) // Shrinks from 80px to 40px

  // Refs for other elements
  const titleRef = useRef(null);
  const mountainRef = useRef(null);
  const iphoneRef = useRef(null);
  const moonRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Play video on hover
  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };
  
  // Pause video when mouse leaves (only if not unmuted)
  const handleMouseLeave = () => {
    if (videoRef.current && isMuted) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };
  
  // Toggle mute on click
  const handleVideoClick = () => {
    if (videoRef.current) {
      if (!isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      }
      setIsMuted((prevMuted) => !prevMuted);
      videoRef.current.muted = !isMuted;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const value = window.scrollY;

      requestAnimationFrame(() => {
        if (titleRef.current) titleRef.current.style.marginTop = `${value * 1.2}px`;

        if (moonRef.current) moonRef.current.style.marginTop = `${-value * 1.2}px`;
        if (mountainRef.current) mountainRef.current.style.marginLeft = `${-value * 3}px`;

        if (iphoneRef.current) iphoneRef.current.style.marginLeft = `${-value * 3}px`;
        if (iphoneRef.current) iphoneRef.current.style.marginBottom = `${-value * 3}px`;

        if (videoRef.current) videoRef.current.style.marginLeft = `${value * 3}px`;

      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="landing-container">
      {/* Social Icons */}
      <div className="social-icons">
        <a href="https://github.com/ShivanshGaur6096" target="_blank" rel="noopener noreferrer">
          <div className="icon">
            <img src={githubIcon} alt="GitHub" />
            <span className="icon-label">GitHub</span>
          </div>
        </a>
        <a href="https://www.linkedin.com/in/shivanshgaur" target="_blank" rel="noopener noreferrer">
          <div className="icon">
            <img src={linkedinIcon} alt="LinkedIn" />
            <span className="icon-label">LinkedIn</span>
          </div>
        </a>
        <a href="mailto:shivanshgaur96@gmail.com">
          <div className="icon">
            <img src={gmailIcon} alt="Gmail" />
            <span className="icon-label">Gmail</span>
          </div>
        </a>
        <a href="https://drive.google.com/file/d/1IIdHd0nwVnz-EvSTIVoJOfcF1x6D6vlI/view?usp=sharing" target="_blank" rel="noopener noreferrer">
          <div className="icon">
            <img src={resumeIcon} alt="Resume" />
            <span className="icon-label">Resume</span>
          </div>
        </a>
      </div>

      {/* Main content */}
      <section className="home">
        <img ref={moonRef} src={moon} className="moon" alt="moon" />
        <img ref={mountainRef} src={mountain} className="mountain" alt="mountain" />

        <motion.h1
          ref={titleRef}
          className="title"
          style={{ fontSize: titleSize }}
        >
          Shivansh Gaur
        </motion.h1>

      <div className="video-container">
        {sampleVideo ? (
          <video
            ref={videoRef}
            src={sampleVideo}
            className="video"
            controls // Enables full player UI
            muted={isMuted}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleVideoClick}
          />
        ) : (
          <div className="video-placeholder"
          ref={videoRef}
          >
            <p>🎬 Under Editing</p>
            <p>Coming Soon...</p>
          </div>
        )}
      </div>
        
        <img src={plant} className="plant" alt="plant" />
        <img ref={iphoneRef} src={iphoneHand} className="iphoneHand" alt="iphoneHand" />
      </section>
    </div>
  );
};

export default LandingScreen;
