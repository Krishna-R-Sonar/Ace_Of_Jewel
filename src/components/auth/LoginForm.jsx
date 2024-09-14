import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css"; // assuming you have some styles for form animations

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
    } else {
      setError("");
      // Handle login logic here
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="form-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="submit-btn">
          Login
        </button>
      </form>
      <div className="form-footer">
        <Link to="/forgot-password" className="form-link">
          Forgot Password?
        </Link>
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="form-link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
