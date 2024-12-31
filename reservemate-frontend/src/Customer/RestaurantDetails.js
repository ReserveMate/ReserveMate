import React from 'react';
import '../styles/RestaurantDetails.css'; // Import your styles
import restaurantImage from '../assets/restaurant-image.jpg'; // Replace with your image path

function RestaurantDetails() {
    return (
      <div className="restaurant-details">
        {/* Header Section */}
        <header className="header">
          <div className="logo">ReserveMate</div>
          <nav>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#login">Login</a></li>
            </ul>
          </nav>
        </header>
  
        {/* Restaurant Info Section */}
        <section className="restaurant-info">
          <div className="restaurant-image">
            <img src={restaurantImage} alt="Restaurant" />
          </div>
          <div className="restaurant-details-text">
            <h1>Royal Bar & Hotel Restaurant</h1>
            <p>Kandy, Sri Lanka</p>
            <h3>About the place</h3>
            <p>Minimal techno is a minimalist subgenre of techno music...</p>
            <div className="buttons">
              <button className="btn view-menu">View Menus</button>
              <button className="btn reserve-dine">Reserve for Dine In Now!</button>
            </div>
          </div>
        </section>
  
        {/* Reservation Section */}
        <section className="reserve-section">
          <h3>Reserve For Your Events</h3>
          <div className="reserve-form">
            <select>
              <option value="select">Select Type</option>
              <option value="dine-in">Dine In</option>
              <option value="takeaway">Takeaway</option>
            </select>
            <input type="number" placeholder="People count" />
            <button className="btn check-availability">Check Availability</button>
          </div>
        </section>
  
        {/* Facilities and Reviews Section */}
        <section className="facilities-reviews">
          <div className="facilities">
            <h4>Facilities</h4>
            <div className="facilities-box">
              <textarea placeholder="Facility 1" />
              <textarea placeholder="Facility 2" />
              <textarea placeholder="Facility 3" />
            </div>
          </div>
          <div className="reviews">
            <h4>Reviews</h4>
            <textarea placeholder="Write your review..." />
            <div className="rating">
              <label>Food:</label><input type="range" />
              <label>Service:</label><input type="range" />
              <label>Cleanliness:</label><input type="range" />
              <button className="btn submit-review">Add Review</button>
            </div>
          </div>
        </section>
  
        {/* Footer */}
        <footer className="footer">
          <p>ReserveMate - We capture your moments instantly and memorably.</p>
          <button className="btn become-owner">Become Restaurant Owner</button>
        </footer>
      </div>
    );
  }
  
  export default RestaurantDetails;
