import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/register.css";
import Footer from "../../component/Footer";

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (!firstName || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // Save user to localStorage
    const user = { firstName, lastName, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration Successful!");
    navigate("/login");
  };



  return (
    <div className="register-page">
      {/* Header */}
      <div className="register-header">
        <h1>JCS Enterprises</h1>
      </div>

      {/* Register Form */}
      <div className="register-form-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="First Name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}

          />
          <input
            type="text"
            placeholder="Last Name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}

          />
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
          <button type="submit">Create</button>
        </form>
        <div className="register-login">
          <a href="/login">Login</a>
        </div>
      </div>

    </div>
  );
};

export default Register;
