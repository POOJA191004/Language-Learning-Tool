// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import Practice from "./pages/Practice";
import Quiz from "./pages/Quiz";
import "./App.css";

// LoginPage Component
const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
      onLogin(username); // Pass the username to the parent component
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(""); // Store username here

  // Function to handle login - updates login status and stores username
  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user); // Set the username or ID from login
  };

  // Function to handle logout - resets login status and clears username
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <Router>
      <div className="container">
        {/* Show LoginPage if not logged in, else show main app */}
        {!isLoggedIn ? (
          <LoginPage onLogin={handleLogin} />
        ) : (
          <>
            <nav className="navbar navbar-expand-lg navbar-light">
              <Link className="navbar-brand" to="/">
                Language Learning Tool
              </Link>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/lessons">
                      Lessons
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/practice">
                      Practice
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/quiz">
                      Quiz
                    </Link>
                  </li>
                  {/* Display username in top right corner */}
                  <li className="nav-item">
                    <span className="navbar-text">Welcome, {username}</span>
                  </li>
                  {/* Add Logout button */}
                  <li className="nav-item">
                    <button onClick={handleLogout} className="btn btn-link nav-link">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes to Home */}
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
