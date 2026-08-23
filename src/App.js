import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import Toolbar from "./components/Toolbar";
import HeroSection from "./components/HeroSection/HeroSection";
import Skills from "./components/Skills";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection/ExperienceSection";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./styles.css";

function App() {
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);

  // Use IntersectionObserver to track the Hero visibility
  const { ref: heroRef } = useInView({
    threshold: [0.2, 0], // 80% and 100% visibility triggers
    onChange: (inView, entry) => {
      setIsToolbarVisible(!inView && entry.boundingClientRect.top < 20);
    },
  });

  return (
    <div>
      <Toolbar isVisible={isToolbarVisible} />
      <div ref={heroRef}>
        <HeroSection /> 
      </div>
      <main>
        <ProjectsSection />
        <ExperienceSection />
        <Skills />
      </main>
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
