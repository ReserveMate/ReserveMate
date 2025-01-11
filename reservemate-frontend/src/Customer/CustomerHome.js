import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Axios for API calls
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import '../styles/CustomerHome.css';

const CustomerHome = () => {
  const [restaurants, setRestaurants] = useState([]); // State for restaurants
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch restaurants from backend
  useEffect(() => {
    axios.get('/public/restaurants') // Replace with your backend endpoint
      .then((response) => {
        setRestaurants(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* Header */}
      <header className="bg-danger text-white p-3">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="mb-0">
            <span style={{ color: 'black' }}>Reserve</span>
            <span className="text-white">Mate</span>
          </h1>
          <div>
            <Link to="/" className="btn btn-light mx-2">List Your Restaurant</Link>
            <Link to="/customer-signup" className="btn btn-light mx-2">Register</Link>
            <Link to="/" className="btn btn-light mx-2">Login</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-light text-center py-5">
        <div className="container">
          <h2>Find Your Next Reservation...</h2>
          <p>Sign in and Save Money</p>
          <button className="btn btn-danger my-3">
            <Link to="/customer-signup" className="text-white text-decoration-none">Sign Up</Link>
          </button>
          <div className="input-group mt-4">
            <input type="text" className="form-control" placeholder="Find Your Restaurant" />
            <input type="text" className="form-control" placeholder="Select Location" />
            <input type="text" className="form-control" placeholder="Select Type" />
            <button className="btn btn-danger">Search</button>
          </div>
        </div>
      </section>

      {/* Suggested Restaurants Section */}
      <section className="container my-5">
        <h2>Suggested for you...</h2>

        {/* Handle loading, error, and restaurant display */}
        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">Error: {error}</p>}
        {!loading && !error && (
          <div className="row">
            {restaurants.map((restaurant) => (
              <div className="col-md-4 mb-4" key={restaurant.id}>
                <div className="card">
                  <img
                    src={restaurant.picture || "https://via.placeholder.com/300x200"}
                    className="card-img-top"
                    alt={restaurant.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{restaurant.name}</h5>
                    <p className="card-text">{restaurant.address}</p>
                    <p className="card-text">
                      Rating: {restaurant.rating || "N/A"} | {restaurant.reviews || 0} reviews
                    </p>
                    <button className="btn btn-danger">View</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <div className="container">
          <p className="mb-0">ReserveMate. We deliver your moments instantly and memorably.</p>
          <button className="btn btn-danger mt-2">Become Restaurant Owner</button>
          <p className="mt-3 mb-0">Copyright © 2024 - All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CustomerHome;
