import React from "react";
import { experiences } from "../data";

const Experience = () => (
  <section id="experience">
    <h2>Experience</h2>
    <div className="carousel">
      {experiences.map((exp, index) => (
        <div key={index} className="carousel-item">
          <img src={exp.logo} alt={exp.title} />
          <p>
            {exp.title}
            <br />
            {exp.position}
            <br />
            {exp.period}
          </p>
        </div>
      ))}
    </div>
  </section>
);

export default Experience;