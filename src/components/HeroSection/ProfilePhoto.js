import React from 'react';
import profileImage from '../../assets/profile.jpg';

/**
 * ProfilePhoto component
 * Displays profile photo at ~75% opacity with a left-edge gradient overlay
 * fading smoothly into the main background color.
 */
export function ProfilePhoto() {
  return (
    <div className="hero-photo-container">
      <img
        src={profileImage}
        alt="Shivansh Gaur - Profile"
        className="hero-photo"
        loading="eager"
      />
      <div className="hero-photo-overlay" aria-hidden="true" />
    </div>
  );
}

export default ProfilePhoto;
