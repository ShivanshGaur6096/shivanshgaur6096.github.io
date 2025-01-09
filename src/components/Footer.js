import React from "react";
import { footerSkills } from "../data";
import "./Footer.css";

// const Footer = () => (
//   <footer>
//     <p>© 2025 Shivansh Gaur. All rights reserved.</p>
//     <p>Standing tall at 6ft, I bring a towering perspective to every challenge!</p>
//   </footer>
// );

// export default Footer;


const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <p>© 2025 Shivansh Gaur. All rights reserved.</p>
      <p>Standing tall at 6ft, I bring a towering perspective to every challenge!</p>
    </div>
    {/* Skill images in the background */}
    <div className="footer-skill-grid">
      {footerSkills.map((footerSkills, idx) => (
        <img
          key={idx}
          src={`/assets/skill-images/${footerSkills}`}
          alt={footerSkills}
          className="footer-skill"
        />
      ))}
    </div>
  </footer>
);

export default Footer;