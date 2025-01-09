import React, { useEffect, useState } from "react";
import { skills } from "../data";

const SkillsRain = () => {
    const [fallingSkills, setFallingSkills] = useState([]);
    const [remainingSkills, setRemainingSkills] = useState([]);
  
    useEffect(() => {
      // Shuffle the skill list at the start
      const shuffledSkills = [...skills].sort(() => Math.random() - 0.5);
      setRemainingSkills(shuffledSkills);
  
      // Start the rain
      const interval = setInterval(() => {
        if (shuffledSkills.length === 0) {
          clearInterval(interval); // Stop the interval when no skills remain
          return;
        }
  
        // Add the next skill to the fallingSkills list
        setFallingSkills((prev) => [
          ...prev,
          {
            id: Date.now(),
            src: `/assets/skill-images/${shuffledSkills[0]}`,
            left: Math.random() * 100, // Random horizontal position
          },
        ]);
  
        // Remove the skill from the remainingSkills list
        shuffledSkills.shift();
      }, 500); // Adjust the interval for falling frequency
  
      return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);
  
    // Remove a skill when its animation ends
    const handleAnimationEnd = (id) => {
      setFallingSkills((prev) => prev.filter((skill) => skill.id !== id));
    };
  
    return (
      <div className="skills-rain-container">
        {fallingSkills.map((skill) => (
          <img
            key={skill.id}
            src={skill.src}
            alt="Skill"
            className="falling-skill"
            style={{ left: `${skill.left}%` }}
            onError={() => setFallingSkills((prev) => prev.filter((s) => s.src !== skill.src))}
            // onError={() => console.error(`Broken image: ${skill.src}`)} // Log the broken image
            onAnimationEnd={() => handleAnimationEnd(skill.id)}
          />
        ))}
      </div>
    );
  };
  
  export default SkillsRain;