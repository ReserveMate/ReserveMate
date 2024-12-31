import React from "react";
import "../styles/HomeHeader.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">
          <span className="logo-highlight">Reserve</span>Mate
        </h1>
      </div>
      <nav className="header-right">
        <a href="/list-your-restaurant" className="nav-link">
          List Your Restaurant
        </a>
        <button className="btn register-btn">Register</button>
        <button className="btn login-btn">Login</button>
      </nav>
    </header>
  );
};

export default Header;
