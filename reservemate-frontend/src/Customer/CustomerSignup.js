import React, { useState } from 'react';
import CustomerService from '../Services/CustomerService';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import placeholderIcon from '../assets/placeholder-icon.png';
import facebookIcon from '../assets/facebook-icon.png';
import googleIcon from '../assets/google-icon.png';
import appleIcon from '../assets/apple-icon.png';

function CustomerSignup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    district: '',
    city: '',
    picture: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await CustomerService.customerSignup(formData, token);
      setFormData({
        name: '',
        email: '',
        password: '',
        mobile: '',
        district: '',
        city: '',
        picture: '',
      });
      alert('Sign up successfully');
      navigate('/customer-home');
    } catch (error) {
      console.error('Error Signing up :', error);
      alert('An error occurred while Signing up');
    }
  };

  const [profilePicture, setProfilePicture] = useState(null);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        setFormData({ ...formData, picture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="d-flex">

      <div className="header d-flex justify-content-center align-items-center">
        <h1>
          <span style={{ color: 'black' }}>Reserve</span>
          <span className="brand-red">Mate</span>
        </h1>
      </div>

      {/* Logo Section */}
      <div className="d-flex flex-column justify-content-center align-items-center bg-light p-4">
        <h1>
          <span className="brand-red">Sign</span>Up
        </h1>
        <img src={logo} className="img-fluid" alt="Logo" />
      </div>

      {/* Form Section */}
      <div className="p-4 bg-white flex-grow-1 vh-100">

        <div className="form-container shadow-lg p-4 rounded mt-5">
          <div className="d-flex justify-content-center">
            <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow-sm col-md-8 col-lg-9">

              <div className="text-center mb-2">
                <label htmlFor="profilePicture">
                  <img
                    src={profilePicture || placeholderIcon}
                    alt="Profile"
                    className="profile-picture-preview img-thumbnail img-fluid"
                    style={{ maxWidth: '120px', maxHeight: '120px' }}
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


              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="name@gmail.com"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">Mobile No</label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  className="form-control"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter Mobile Number"
                />
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="district" className="form-label">District</label>
                  <input
                    type="text"
                    id="district"
                    name="district"
                    className="form-control"
                    value={formData.district}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter District"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="city" className="form-label">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-control"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter City"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter Password"
                />
              </div>

              <div className="mb-1 text-center terms">
                <p className="small text-muted">
                  By signing up you agree to <a href="#" className="link-primary">terms and conditions</a>.
                </p>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-danger">Sign Up</button>
              </div>

            </form>
          </div>


          <button
            type="button"
            className="btn btn-link mt-3 w-100"
            onClick={() => navigate('/login')}
          >
            Already have an account? Login
          </button>

          <div className="divider mt-4 d-flex align-items-center">
            <hr className="flex-grow-1" />
            <h6 className="mx-3 text-center">or use one of these options</h6>
            <hr className="flex-grow-1" />
          </div>

          <div className="social-options d-flex justify-content-center gap-3 mt-3">
            <button className="btn btn-outline-secondary p-2">
              <img src={facebookIcon} alt="Facebook" style={{ width: '24px', height: '24px' }} />
            </button>
            <button className="btn btn-outline-secondary p-2">
              <img src={googleIcon} alt="Google" style={{ width: '24px', height: '24px' }} />
            </button>
            <button className="btn btn-outline-secondary p-2">
              <img src={appleIcon} alt="Apple" style={{ width: '24px', height: '24px' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerSignup;
