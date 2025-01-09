import React, { useState } from "react";
import { skillsData } from "../data";

const Skills = () => {
  const [selectedFilters, setSelectedFilters] = useState(new Set());
  const [showMoreSkills, setShowMoreSkills] = useState(false);

  const toggleFilter = (category) => {
    const newFilters = new Set(selectedFilters);
    if (newFilters.has(category)) {
      newFilters.delete(category);
    } else {
      newFilters.add(category);
    }
    setSelectedFilters(newFilters);
  };

  const highlightedSkills = [
    { name: "Swift", img: `${process.env.PUBLIC_URL}/assets/skill-images/swift.png` },
    { name: "SwiftUI", img: `${process.env.PUBLIC_URL}/assets/skill-images/swiftui.png` },
    { name: "Objective-C", img: `${process.env.PUBLIC_URL}/assets/skill-images/objective-c.png` },
    { name: "Apple Vision Pro", img: `${process.env.PUBLIC_URL}/assets/skill-images/apple-vision-pro.png` },
    { name: "Apple Developer Account", img: `${process.env.PUBLIC_URL}/assets/skill-images/appstore-connect.svg` },
    { name: "GitLab", img: `${process.env.PUBLIC_URL}/assets/skill-images/gitlab.png` },
    { name: "Publishing SDK", img: `${process.env.PUBLIC_URL}/assets/skill-images/sdk-framework.png` },
    { name: "Xcode", img: `${process.env.PUBLIC_URL}/assets/skill-images/xcode.png` },
  ];

  const filteredSkills = Array.from(selectedFilters).flatMap(
    (category) => skillsData[category] || []
  );

  return (
    <section id="skills">
      <h2>Skills</h2>
      {/* Filter Button View */}
      <div className="filter-buttons">
        {Object.keys(skillsData).map((category) => (
          <button
            key={category}
            className={`filter-button ${selectedFilters.has(category) ? "active" : ""}`}
            onClick={() => toggleFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Highlighted Skills */}
      {!selectedFilters.size && !showMoreSkills && (
        <div className="highlighted-skills">
          {highlightedSkills.map((skill, idx) => (
            <div key={idx} className="skill">
              <img src={skill.img} alt={skill.name} />
              <p>{skill.name}</p>
            </div>
          ))}
        </div>
      )}

      {/* Filtered Skills */}
      {!selectedFilters.size && !showMoreSkills && (
        <ul className="filtered-skills">
          <li>Firebase</li>
          <li>Memory Management</li>
          <li>MVVM</li>
          <li>Combine Framework</li>
          <li className="show-more" onClick={() => setShowMoreSkills(true)}>
            Show more...
          </li>
        </ul>
      )}

      {/* Filtered Skills */}
      {selectedFilters.size > 0 && (
        <ul className="filtered-skills">
          {filteredSkills.map((skill, idx) => (
            <li key={idx}>{skill}</li>
          ))}
        </ul>
      )}

      {/* Full Skills View */}
      {showMoreSkills && (
        <div className="full-skills-view">
          <button className="close-btn" onClick={() => setShowMoreSkills(false)}>
            &times;
          </button>
          <h2>Skills</h2>
          {Object.entries(skillsData).map(([category, skills], idx) => (
            <div key={idx}>
              <h3>{category}</h3>
              <ul>
                {skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Skills;
