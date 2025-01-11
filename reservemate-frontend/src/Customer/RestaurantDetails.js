import React from "react";

const RestaurantDetails = () => {
  return (
    <div className="container my-4">
      {/* Header */}
      <header className="text-center mb-5">
        <h1 className="fw-bold">ReserveMate</h1>
        <nav className="d-flex justify-content-center gap-3 mt-3">
          <a href="/" className="text-decoration-none text-dark">Home</a>
          <a href="/about" className="text-decoration-none text-dark">About</a>
          <a href="/contact" className="text-decoration-none text-dark">Contact</a>
          <button className="btn btn-outline-dark">Login</button>
        </nav>
      </header>

      {/* Restaurant Details */}
      <section className="mb-5">
        <h2 className="text-danger fw-bold">Royal Bar & Hotel Restaurant</h2>
        <p className="text-muted">Kandy, Sri Lanka</p>

        {/* Images */}
        <div className="row mb-4">
          <div className="col-md-6">
            <img
              src="https://via.placeholder.com/400x250"
              alt="Restaurant Exterior"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-6">
            <img
              src="https://via.placeholder.com/400x250"
              alt="Food Dish"
              className="img-fluid rounded"
            />
          </div>
        </div>

        {/* About Section */}
        <div className="mb-4">
          <h3 className="fw-bold">About the Place</h3>
          <p>
            Minimal techno is a minimalist subgenre of techno music...
            (Include full text about the place here.)
          </p>
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-between mb-4">
          <button className="btn btn-danger px-4 py-2">View Menus</button>
          <button className="btn btn-dark px-4 py-2">Reserve for Dine In Now!</button>
        </div>

        {/* Reservation Form */}
        <div className="p-4 bg-light border rounded mb-4">
          <h4 className="fw-bold mb-3">Reserve For Your Events</h4>
          <div className="row g-3">
            <div className="col-md-4">
              <select className="form-select">
                <option value="">Select Type</option>
                <option value="birthday">Birthday</option>
                <option value="corporate">Corporate Event</option>
              </select>
            </div>
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                placeholder="People Count"
              />
            </div>
            <div className="col-md-4">
              <button className="btn btn-primary w-100">Check Availability</button>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities & Reviews */}
      <section className="row">
        <div className="col-md-6 mb-4">
          <h4 className="fw-bold">Facilities</h4>
          <ul className="list-unstyled">
            <li>✔️ Parking</li>
            <li>✔️ WiFi</li>
            <li>✔️ Air Conditioning</li>
          </ul>
        </div>
        <div className="col-md-6">
          <h4 className="fw-bold">Reviews</h4>
          <textarea
            className="form-control mb-3"
            rows="3"
            placeholder="Add your review..."
          ></textarea>
          <button className="btn btn-success">Submit Review</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center mt-5 pt-3 border-top">
        <p className="text-muted mb-0">
          &copy; 2024 ReserveMate - All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default RestaurantDetails;
