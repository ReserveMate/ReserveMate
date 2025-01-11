import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CommonService from "../Services/CommonService";

const CustomerHome = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await CommonService.getAllRestaurants();
        setRestaurants(data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurants:", error); 
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const convertBase64ToImage = (base64String) => {
    if (!base64String.startsWith("data:image")) {
      return `data:image/jpeg;base64,${base64String}`;
    }
    return base64String;
  };

  return (
    <div>
      <section className="bg-light text-center py-5">
        <div className="container">
          <h2>Find Your Next Reservation...</h2>
          <p>Sign in and Save Money</p>

          {!CommonService.isAuthenticated() && (
            <button className="btn btn-danger my-3">
              <Link to="/customer-signup" className="text-white text-decoration-none">
                Sign Up
              </Link>
            </button>
          )}

          <div className="input-group mt-4">
            <input type="text" className="form-control" placeholder="Find Your Restaurant" />
            <input type="text" className="form-control" placeholder="Select Location" />
            <input type="text" className="form-control" placeholder="Select Type" />
            <button className="btn btn-danger">Search</button>
          </div>
        </div>
      </section>

      <section className="container my-5">
        <h2>Suggested for you...</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">Error: {error}</p>}
        {!loading && !error && (
          <div className="row">
            {restaurants.map((restaurant) => (
              <div className="col-md-4 mb-4" key={restaurant.id}>
                <div className="card">
                  <img
                    src={
                      restaurant.picture
                        ? convertBase64ToImage(restaurant.picture)
                        : "https://via.placeholder.com/300x200"
                    }
                    className="card-img-top"
                    alt={restaurant.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{restaurant.name}</h5>
                    <p className="card-text">{restaurant.address}</p>
                    <p className="card-text">
                      Rating: {restaurant.rating || "N/A"} | {restaurant.reviews || 0} reviews
                    </p>
                    <p className="card-text">Operating Hours: {restaurant.operationHours || "Not Available"}</p>
                    <button className="btn btn-danger">View</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CustomerHome;
