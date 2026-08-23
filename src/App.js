import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Toolbar from "./components/Toolbar";
import HeroSection from "./components/HeroSection/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection/ExperienceSection";
import HonorsSection from "./components/HonorsSection/HonorsSection";
import ContactFooterSection from "./components/ContactFooterSection/ContactFooterSection";
import "./styles.css";

function App() {
  const [isPastHero, setIsPastHero] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);

  // Reliable scroll position tracking for Hero exit / return
  useEffect(() => {
    const handleScroll = () => {
      // Hero section is approx first viewport height (use 220px threshold for early hide)
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsPastHero(scrollY > 180);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track Contact/Footer section visibility
  const { ref: contactRef } = useInView({
    threshold: 0.1,
    onChange: (inView) => {
      setIsContactVisible(inView);
    },
  });

  // Toolbar is visible ONLY when past Hero AND NOT in Contact section
  const isToolbarVisible = isPastHero && !isContactVisible;

  return (
    <div>
      <Toolbar isVisible={isToolbarVisible} />
      <div id="hero">
        <HeroSection /> 
      </div>
      <main>
        <ProjectsSection />
        <ExperienceSection />
        <HonorsSection />
        <div ref={contactRef}>
          <ContactFooterSection />
        </div>
      </main>
    </div>
  );
}

export default App;
