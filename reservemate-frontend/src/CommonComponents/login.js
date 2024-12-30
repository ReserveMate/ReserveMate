import React from 'react';
import '../styles/Login.css';
import facebookIcon from '../assets/facebook-icon.png';
import googleIcon from '../assets/google-icon.png';
import appleIcon from '../assets/apple-icon.png';

const login = () => {
  return (
    <div className="sign-in-container">
      <div className="header">
        <h1>
          <span className="brand-red">Reserve</span>Mate
        </h1>
      </div>
      <div className="sign-in-content">
        <h2>Log in </h2>
        <form>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" placeholder="Enter your email address" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />
          <button type="submit" className="primary-btn">Log In</button>
        </form>
        <div className="divider">
          <hr />
          <span>or use one of these options</span>
          <hr />
        </div>
        <div className="social-options">
          <button className="social-btn">
            <img src={facebookIcon} alt="Facebook" />
          </button>
          <button className="social-btn">
            <img src={googleIcon} alt="Google" />
          </button>
          <button className="social-btn">
            <img src={appleIcon} alt="Apple" />
          </button>
        </div>
        <p className="terms">
          By signing in or creating an account, you agree with our{' '}
          <a href="#">Terms & conditions</a> and <a href="#">Privacy statement</a>.
        </p>
      </div>
    </div>
  );
};

export default login;