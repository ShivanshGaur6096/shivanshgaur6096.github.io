import React from "react";
import { achievements } from "../data";

const Achievements = () => (
  <section id="achievements">
    <h2>Achievements</h2>
    <div className="carousel">
      {achievements.map((achievement, index) => (
        <div key={index} className="carousel-item">
          <img src={achievement.badge} alt={achievement.title} />
          <p>
            {achievement.title}
            <br />
            {achievement.details}
          </p>
        </div>
      ))}
    </div>
  </section>
);

export default Achievements;