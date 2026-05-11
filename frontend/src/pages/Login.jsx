import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AnalyticsIcon from "@mui/icons-material/Analytics";
import GoogleIcon from "@mui/icons-material/Google";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      navigate("/dashboard");
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        
        <div className="brand-section">
          <AnalyticsIcon className="brand-icon" />

          <h1>MarketLens AI</h1>
        </div>

        <h2>Welcome Back</h2>

        <p className="subtitle">
          Sign in to continue to your analytics dashboard
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br></br>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br></br>

        <button type="submit" className="login-btn">
          Sign In
        </button>

        <br></br>


      </form>
    </div>
  );
};

export default Login;