import React, { useState } from "react";
import "../style/footer.css";

function Footer() {

  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      alert("Please enter a valid email");
      return;
    }
    alert(`Subscribed successfully with ${email}!`);
    setEmail(""); // clear input
  };
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Brand */}
        <div className="footer-section brand">
          <h1 style={{textAlign : "center" }}>JCS Enterprises</h1>
          <p style={{textAlign : "center"}}>Crafted for Durability.<br />Designed for You.</p>

          <div className="follow-us">
            <p style={{textAlign : "center",fontWeight : "bold"}}>Follow Us</p>
            <div className="social-icons" style={{ textAlign: "center" }}>
  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
    <i className="fa-brands fa-whatsapp"></i>
  </a>
  <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
    <i className="fa-brands fa-x-twitter"></i>
  </a>
  <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
    <i className="fa-brands fa-facebook-f"></i>
  </a>
  <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
    <i className="fa-brands fa-instagram"></i>
  </a>
</div>

          </div>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>
            Address:<br />
            No: 25, Main Street,<br />
            Chennai – 600028,<br />
            Tamil Nadu, India.
          </p>
          <p>Email: jcsenterprises@gmail.com</p>
          <p>Contact No: +91 98765 43210</p>
        </div>

        {/* Help */}
        <div className="footer-section">
          <h4>Help</h4>
          <p>Privacy & Policy</p>
          <p>Refund & Return</p>
          <p>Customer Care</p>
          <p>FAQs</p>
        </div>

        {/* Newsletter */}
<div className="footer-section">
  <h4>Newsletter</h4>
  <input
    type="email"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  <button type="button" onClick={handleSubscribe}>SUBSCRIBE</button>
</div>


      </div>

      {/* Bottom Right */}
      <div className="footer-bottom">
        All rights reserved
      </div>
    </footer>
  );
}

export default Footer;
