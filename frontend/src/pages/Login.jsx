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

    const ADMIN_EMAIL="admin@gmail.com";
    const ADMIN_PASSWORD="admin123";


    if (email===ADMIN_EMAIL && password===ADMIN_PASSWORD) {
      navigate("/dashboard");
    }
    else if(!email || !password){
      alert("Please enter email and password");
    } 
    else {
      alert("Invalid email or password. Please try again.");
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