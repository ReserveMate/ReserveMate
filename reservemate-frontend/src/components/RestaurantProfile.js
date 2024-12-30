// RestaurantProfile.js
import React, { useState } from 'react';
import '../styles/RestaurantProfile.css';
import restaurantImage from '../assets/restaurant-image.jpg'; // Import the image

function RestaurantProfile() {
    const [restaurantName, setRestaurantName] = useState("Bubby's");
    const [restaurantDescription, setRestaurantDescription] = useState(
      "Bubby’s opened on Thanksgiving Day 1990. Chef / Owner Ron Silver began baking pies and selling them to restaurants and his neighbors out of a small kitchen at the corner of Hudson and North Moore St. in Tribeca. Today, NYC’s beloved restaurant and pie shop celebrates 27 years of classic, made-from-scratch American cooking."
    );
  
    
    // Handle edit actions for name, description, and image
    const handleEdit = (field) => {
      if (field === 'name') {
        const newName = prompt("Enter new restaurant name", restaurantName);
        if (newName) setRestaurantName(newName);
      }
      if (field === 'description') {
        const newDescription = prompt("Enter new description", restaurantDescription);
        if (newDescription) setRestaurantDescription(newDescription);
      }
      if (field === 'image') {
        const newImage = prompt("Enter new image URL", restaurantImage);
        if (newImage) restaurantImage(newImage);
      }
    };
  
    return (
      <div className="restaurant-profile">
        {/* Header Section */}
        <header className="header">
          <div className="logo">ReserveMate</div>
          <nav className="nav">
            <ul>
              <li><a href="#profile">Profile</a></li>
              <li><a href="#reservation">Reservation</a></li>
              <li><a href="#analytics">Analytics</a></li>
              <li><a href="#payments">Payments</a></li>
              <li><a href="#ads">Ads</a></li>
            </ul>
          </nav>
        </header>
  
        {/* Profile Section for Restaurant Profile */}
        <div className="profile-section">
          <div className="restaurant-container">
            <div className="left-container">
              {/* Restaurant Name */}
              <div className="restaurant-name">
                <h1>{restaurantName}</h1>
                <button className="edit-button" onClick={() => handleEdit('name')}>Edit</button>
              </div>
  
              {/* Restaurant Description */}
              <div className="restaurant-description">
                <h2>Restaurant Description</h2>
                <p>{restaurantDescription}</p>
                <button className="edit-button" onClick={() => handleEdit('description')}>Edit</button>
              </div>
            </div>
  
            {/* Right Container for Image */}
            <div className="right-container">
              <div className="restaurant-image-container">
                <img src={restaurantImage} alt="Restaurant" className="restaurant-image" />
                <button className="edit-button" onClick={() => handleEdit('image')}>Edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default RestaurantProfile;
