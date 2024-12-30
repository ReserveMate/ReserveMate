import React, { useState } from 'react';
import '../styles/CustomerSignup.css';
import logo from '../assets/logo.png';
import placeholderIcon from '../assets/placeholder-icon.png'; // Replace with your placeholder icon path
import facebookIcon from '../assets/facebook-icon.png'; // Add the correct path to your icon
import googleIcon from '../assets/google-icon.png'; // Add the correct path to your icon
import appleIcon from '../assets/apple-icon.png'; // Add the correct path to your icon

const CustomerSignup = () => {
  const [profilePicture, setProfilePicture] = useState(null);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      mobile: formData.get("mobile"),
      district: formData.get("district"),
      city: formData.get("city"),
      profilePicture: profilePicture,
    };

    console.log(data);
    // Implement form submission logic here (e.g., API call)
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <div className="overlay">
          <img src={logo} alt="ReserveMate Logo" className="logo-image" />
        </div>
      </div>
      <div className="register-right">
        
        <div className="form-container">
          <h2>Sign Up</h2>
          <form>
          <div className="profile-picture-wrapper">
            <label htmlFor="profilePicture">
              <img
                src={profilePicture || placeholderIcon}
                alt="Profile"
                className="profile-picture-preview"
              />
            </label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleProfilePictureChange}
              style={{ display: 'none' }}
            />
          </div>
          
            <label>Name</label>
            <input type="name" placeholder="Enter your name" />

            <label>Email</label>
            <input type="email" placeholder="name@gmail.com" />

            <label>Mobile No</label>
            <input type="mobile" placeholder="Enter Mobile Number" />

            <label>District</label>
            <input type="district" placeholder="Enter District" />

            <label>City</label>
            <input type="city" placeholder="Enter City" />

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

        </div>
      </div>
    </div>
  );
};

export default CustomerSignup;
