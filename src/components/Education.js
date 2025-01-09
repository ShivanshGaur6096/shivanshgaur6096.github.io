import React from "react";
import { educations } from "../data";

const Education = () => (
  <section id="education">
    <h2>Education</h2>
    <div className="carousel">
      {educations.map((edu, index) => (
        <div key={index} className="carousel-item">
          <img src={edu.logo} alt={edu.title} />
          <p>
            {edu.title}
            <br />
            {edu.degree}
            <br />
            {edu.period}
          </p>
        </div>
      ))}
    </div>
  </section>
);

export default Education;