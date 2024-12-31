import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Add styles for the header

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        {/* Link wrapping the logo text */}
        <Link to="/" className="logo">ReserveMate</Link>
      </div>
      <div className="header-right">
        <Link to="/list-restaurant" className="header-btn">List Your Restaurant</Link>
        <Link to="/register" className="header-btn">Register</Link>
        <Link to="/login" className="header-btn">Login</Link>
      </div>
    </header>
  );
};

export default Header;
