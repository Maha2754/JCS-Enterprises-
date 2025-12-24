import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/login.css";
import Footer from "../../component/Footer";

const Login = () => {


  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: "admin@gmail.com",
        password: "123456",
      })
    );
  }, []);


  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No user found. Please register first.");
      navigate("/register");
      return;
    }

    if (
      storedUser.email === email.trim() &&
      storedUser.password === password.trim()
    ) {
      alert("Login Successful!");
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      alert("Invalid Credentials. Please try again or Register first.");
    }
  };

  return (
    <div className="login-page">
      {/* Top Title */}
      <div className="login-header">
        <h1>JCS Enterprises</h1>
      </div>

      {/* Login Form */}
      <div className="login-form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In</button>
        </form>
        <div className="login-links">
          <a href="#">Forgot password?</a>
          <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
