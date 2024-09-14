import React, { useState } from 'react';
import './UserSettings.css'; // Import CSS for styling and animations

const UserSettings = ({ user, onSave }) => {
  const [settings, setSettings] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(settings);
    }
  };

  return (
    <div className="user-settings-container">
      <h1 className="settings-title">User Settings</h1>
      <div className="settings-form">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={settings.name}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={settings.email}
          onChange={handleChange}
        />
        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          name="bio"
          value={settings.bio}
          onChange={handleChange}
        />
        <button className="settings-save" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default UserSettings;
