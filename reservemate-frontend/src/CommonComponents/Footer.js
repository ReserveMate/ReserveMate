import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>ReserveMate. We deliver your moments instantly and memorably.</p>
      </div>
      <div className="footer-right">
        <a href="/register-restaurant" className="footer-link">
          Become Restaurant Owner
        </a>
      </div>
      <div className="footer-bottom">
        <p>Copyright © 2024 - All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
