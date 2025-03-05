import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import Toolbar from "./components/Toolbar";
import SkillsRain from "./components/SkillsRain";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./styles.css";

// TODO: New Landing
import LandingPage from "./components/LandingPage"

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
        <LandingPage /> 
      </div>
      <main>
        <SkillsRain />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Achievements />
      </main>
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
