import React from "react";
import githubIcon from "../assets/github.png";
import linkedinIcon from "../assets/linkedin.png";
import gmailIcon from "../assets/gmail.png";
import resumeIcon from "../assets/resumeView.png";
import "./Contact.css"; // Import styles

const Contact = () => (
  <section id="contact" className="contact-section">
    <div className="container">
      <h2 className="contact-title">Let's Connect! 🤝</h2>
      <p className="contact-subtext">Feel free to reach out. Let’s build something awesome together!</p>
      
      <div className="social-links">
        <a href="https://github.com/ShivanshGaur6096" target="_blank" rel="noopener noreferrer" className="social-item">
          <img src={githubIcon} alt="GitHub" className="social-icon" />
          <span className="social-label">GitHub</span>
        </a>
        
        <a href="https://linkedin.com/in/shivanshgaur" target="_blank" rel="noopener noreferrer" className="social-item">
          <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
          <span className="social-label">LinkedIn</span>
        </a>
        
        <a href="mailto:shivanshgaur96@gmail.com" className="social-item">
          <img src={gmailIcon} alt="Email" className="social-icon" />
          <span className="social-label">Email</span>
        </a>

        <a href="https://drive.google.com/file/d/1IIdHd0nwVnz-EvSTIVoJOfcF1x6D6vlI/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="social-item">
          <img src={resumeIcon} alt="Resume" className="social-icon" />
          <span className="social-label">Resume</span>
        </a>
      </div>
    </div>
  </section>
);

export default Contact;
