import React from "react";
import profile from "../assets/profile.png";
import connectIcon from "../assets/connect.png";
import downloadIcon from "../assets/resumeView.png";
import "./Toolbar.css";

const Toolbar = ({ isVisible }) => {
  return (
    <div className={`toolbar ${isVisible ? "visible" : ""}`}>
      {/* Left Section - Profile */}
      <div className="toolbar-left">
        <img src={profile} alt="Shivansh Gaur" className="profile-pic" />
        <span className="name">Shivansh Gaur</span>
      </div>

      {/* Right Section - Icons with Hover Effect */}
      <div className="toolbar-right">
        {/* Connect Button */}
        <a href="#contact" className="toolbar-item">
          <img src={connectIcon} alt="Connect" className="icon" />
          <span className="label">Meet</span>
        </a>

        {/* Download Resume Button */}
        <a
          href="https://drive.google.com/file/d/1IIdHd0nwVnz-EvSTIVoJOfcF1x6D6vlI/view?usp=sharing"
          className="toolbar-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={downloadIcon} alt="Download Resume" className="icon" />
          <span className="label">Resume</span>
        </a>
      </div>
    </div>
  );
};

export default Toolbar;
