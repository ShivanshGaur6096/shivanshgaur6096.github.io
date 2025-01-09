import React, { useState } from "react";
import { projects } from "../data";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const openProjectDetails = (project) => {
    setSelectedProject(project);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects">
      <h2>Projects</h2>

      {/* Project Carousel */}
      <div className="carousel">
        {projects.map((project, index) => (
          <div
            key={index}
            className="carousel-item"
            onClick={() => openProjectDetails(project)}
          >
            <img src={project.logo} alt={project.name} />
            <p>{project.name}</p>
          </div>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="project-modal">
          <button className="close-btn" onClick={closeProjectDetails}>
            &times;
          </button>
          <h2>{selectedProject.name}</h2>
          <p dangerouslySetInnerHTML={{ __html: selectedProject.description }}></p>
          
          <a id="ios-download" href={selectedProject.iosLink} target="_blank" rel="noopener noreferrer" class="download-btn">
            Download for iOS
          </a>

          <div className="project-carousel">
            {selectedProject.screenshots.map((screenshot, idx) => (
              <img key={idx} src={screenshot} alt={`${selectedProject.name} screenshot`} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
