import React from 'react';
import '../styles/RestaurantRegistration.css'; 
import logo from '../assets/logo.png'; 

const RestaurantRegistration = () => {
  return (
    <div className="register-container">
      <div className="register-left">
        <div className="overlay">
          <img src={logo} alt="ReserveMate Logo" className="logo-image" />
        </div>
      </div>
      <div className="register-right">
        <div className="form-container">
          <h2>Create Account</h2>
          <form>
            <label>Name</label>
            <input type="text" placeholder="Enter your name" />

            <label>Email</label>
            <input type="email" placeholder="name@gmail.com" />

            <label>Phone No</label>
            <input type="tel" placeholder="With Country Code" />

            <label>Country</label>
            <input type="text" placeholder="Country Name" />

            <label>Username</label>
            <input type="text" placeholder="Username" />

            <label>Password</label>
            <input type="password" placeholder="6+ characters" />

            <div className="terms">
              <p>
                By signing up you agree to <span className="link">terms and conditions</span>.
              </p>
            </div>

            <button className="register-btn">Register</button>
            <p className="login-link">Login</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RestaurantRegistration;