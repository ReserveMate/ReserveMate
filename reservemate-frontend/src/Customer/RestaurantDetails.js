import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommonService from "../Services/CommonService";

const RestaurantDetails = () => {
  const { id } = useParams(); 
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      if (id) {
        try {
          const data = await CommonService.getRestaurantById(id);
          setRestaurant(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setError("Invalid restaurant ID.");
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  const convertBase64ToImage = (base64String) => {
    if (base64String && base64String.startsWith("data:image")) {
      return base64String;
    }
    return `data:image/jpeg;base64,${base64String}`;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">Error: {error}</p>;
  }

  if (!restaurant) {
    return <p>No restaurant details available.</p>;
  }

  return (
    <div className="container my-4">
      <section className="mb-5">
        <h2 className="text-danger fw-bold">{restaurant.name}</h2>
        <p className="text-muted">{restaurant.city}, {restaurant.district}</p>

        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card shadow-lg border-danger">
              <img
                src={convertBase64ToImage(restaurant.picture)}
                alt="Restaurant Exterior"
                className="img-fluid rounded"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow-lg p-3 border-danger mb-3">
              <p className="fw-bold text-danger">Description:</p>
              <p>{restaurant.description}</p>
            </div>
            <div className="card shadow-lg p-3 border-danger">
              <p className="fw-bold text-danger">Mobile:</p>
              <p>{restaurant.mobile}</p>
              <p className="fw-bold text-danger">Address:</p>
              <p>{restaurant.address}</p>
              <p className="fw-bold text-danger">Operation Hours:</p>
              <p>{restaurant.operationHours}</p>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between mb-4">
          <div className="card shadow-lg border-danger">
            <p className="fw-bold text-center text-danger">Menu</p>
            <img
              src={convertBase64ToImage(restaurant.menu)}
              alt="Restaurant Menu"
              className="img-fluid rounded border border-danger"
            />
          </div>
          <button className="btn btn-dark px-4 py-2">Reserve for Dine In Now!</button>
        </div>
      </section>

      {/* Reservation Section */}
      <section className="reserve-section">
        <h3 className="text-danger">Reserve For Your Events</h3>
        <div className="reserve-form">
          <select className="form-select mb-2">
            <option value="select">Select Type</option>
            <option value="dine-in">Dine In</option>
            <option value="takeaway">Takeaway</option>
          </select>
          <input type="number" placeholder="People count" className="form-control mb-2" />
          <button className="btn btn-danger">Check Availability</button>
        </div>
      </section>

      {/* Facilities and Reviews Section */}
      <section className="facilities-reviews mt-5">
        <div className="facilities mb-4">
          <h4 className="text-danger">Facilities</h4>
          <div className="facilities-box">
            <textarea placeholder="Facility 1" className="form-control mb-2" />
            <textarea placeholder="Facility 2" className="form-control mb-2" />
            <textarea placeholder="Facility 3" className="form-control mb-2" />
          </div>
        </div>
        <div className="reviews">
          <h4 className="text-danger">Reviews</h4>
          <textarea placeholder="Write your review..." className="form-control mb-2" />
          <div className="rating mt-2">
            <label>Food:</label>
            <input type="range" className="form-range mb-2" />
            <label>Service:</label>
            <input type="range" className="form-range mb-2" />
            <label>Cleanliness:</label>
            <input type="range" className="form-range mb-2" />
            <button className="btn btn-dark mt-2">Add Review</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RestaurantDetails;
