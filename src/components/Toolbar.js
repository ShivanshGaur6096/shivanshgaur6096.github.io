import React from "react";
import profile from "../assets/profile.png";
import "./Toolbar.css";

const Toolbar = ({ isVisible }) => {
  return (
    <div className={`toolbar ${isVisible ? "visible" : ""}`}>
      <div className="toolbar-left">
        <img src={profile} alt="Shivansh Gaur" className="profile-pic" />
        <span className="name">Shivansh Gaur</span>
      </div>
      <div className="toolbar-right">
        <a href="#contact" className="btn primary">Let’s Connect</a>
        <a
          href="assets/resume/Shivansh_Gaur_Resume.pdf"
          className="btn secondary"
          download
        >
          Download Resume
        </a>
      </div>
    </div>
  );
};

export default Toolbar;
