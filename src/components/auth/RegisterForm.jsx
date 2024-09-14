import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterForm.css"; // Assuming you have some styles for form animations

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
      // Handle register logic here
    }
  };

  return (
    <div className="register-form-container">
      <h2 className="form-title">Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          p
        </div>
        <div className="form-group">
          <label htmlFor="email">Username:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          p
        </div>
        <div className="form-group">
          <label htmlFor="password">Username:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          p
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Username:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          p
        </div>
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>
      <div className="form-footer">
        <p>
          Already have an account?{" "}
          <Link to="/login" className="form-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;