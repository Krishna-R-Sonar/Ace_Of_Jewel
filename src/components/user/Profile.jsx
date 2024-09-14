import React from 'react';
import './Profile.css'; // Import CSS for styling and animations

const Profile = ({ user }) => {
  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.profilePicture} alt={user.name} className="profile-picture" />
        <h1 className="profile-name">{user.name}</h1>
        <p className="profile-email">{user.email}</p>
      </div>
      <div className="profile-details">
        <h2>About Me</h2>
        <p>{user.bio}</p>
      </div>
    </div>
  );
};

export default Profile;
