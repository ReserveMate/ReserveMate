import React, { useState } from 'react';
import RestaurantService from '../Services/RestaurantService';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import placeholderIcon from '../assets/placeholder-icon.png';


function RestauranRegistration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    district: '',
    city: '',
    address: '',
    operationHours: '',
    description: '',
    picture: '',
    menu: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMenuUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, menu: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const dataToSend = { ...formData, menu: formData.menu?.name };
      await RestaurantService.registerRestaurant(dataToSend, token);
      setFormData({
        name: '',
        email: '',
        password: '',
        mobile: '',
        district: '',
        city: '',
        address: '',
        operationHours: '',
        description: '',
        picture: '',
        menu: null,
      });
      alert('Registered successfully');
      navigate('/restaurant-profile');
    } catch (error) {
      console.error('Error Registering', error);
      alert('An error occurred while Registering');
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

      <div className="header">
        <h1>
          <span style={{ color: 'black' }}>Reserve</span>
          <span className="brand-red">Mate</span>
        </h1>
      </div>

      {/* Logo Section */}
      <div className="d-flex flex-column justify-content-center align-items-center bg-light p-4">
        <h1>
          <span className="brand-red">Register</span>
        </h1>
        <img src={logo} className="img-fluid" alt="Logo" />
      </div>

      {/* Form Section */}
      <div className="p-4 bg-white flex-grow-1 vh-100 mt-5">

        <div className="form-container shadow-lg p-4 rounded mt-4">
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

              <div className="row g-3 mt-2">
                <div className="col-md-6">
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

                <div className="col-md-6">
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
              </div>

              <div className="row g-3 mt-2">
                <div className="col-md-6">
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

                <div className="col-md-6">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input
                    type="address"
                    id="address"
                    name="address"
                    className="form-control"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter Address"
                  />
                </div>
              </div>

              <div className="row g-3 mt-2">
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

              <div className="row g-3 mt-2">
                <div className="col-md-12">
                  <label htmlFor="operationHours" className="form-label">Operation Hours</label>
                  <input
                    type="text"
                    id="operationHours"
                    name="operationHours"
                    className="form-control"
                    value={formData.operationHours}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 9 AM - 9 PM (Monday to Sunday)"
                  />
                </div>
              </div>

              <div className="row g-3 mt-2">
                <div className="col-md-12">
                  <label htmlFor="menuPicture" className="form-label">Menu Picture</label>
                  <input
                    type="file"
                    id="menuPicture"
                    name="menuPicture"
                    accept="image/*"
                    className="form-control"
                    onChange={handleMenuUpload}
                  />
                </div>
              </div>

              <div className="row g-3 mt-2">
                <div className="col-md-12">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter Description"
                    rows="3"
                    style={{ height: 'auto', resize: 'none', width: '100%' }}
                  />
                </div>
              </div>

              <div className="row g-3 mt-2">
                <div className="col-md-12">
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
              </div>

              <div className="mb-1 text-center terms mt-3">
                <p className="small text-muted">
                  By registering you agree to <a href="#" className="link-primary">terms and conditions</a>.
                </p>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-danger">Register</button>
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

        </div>
      </div>
    </div>
  );
}

export default RestauranRegistration;
