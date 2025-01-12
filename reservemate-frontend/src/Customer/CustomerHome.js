import React, { useState, useEffect } from "react";
import CommonService from "../Services/CommonService";
import { Link } from 'react-router-dom';


const CustomerHome = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await CommonService.getAllRestaurants();
        setRestaurants(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const convertBase64ToImage = (base64String) => {
    if (base64String && base64String.startsWith("data:image")) {
      return base64String;
    }
    return `data:image/jpeg;base64,${base64String}`;
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
        {!loading && !error && restaurants.length === 0 && <p>No restaurants found.</p>}
        {!loading && !error && restaurants.length > 0 && (
          <div className="row">
            {restaurants.map((restaurant) => (
              <div className="col-md-4 mb-4" key={restaurant.id}>
                <div className="card">
                  <img
                    src={convertBase64ToImage(restaurant.picture)}
                    className="card-img-top"
                    alt={restaurant.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{restaurant.name}</h5>
                    <p className="card-text">Mobile: {restaurant.mobile}</p>
                    <p className="card-text">Operation Hours: {restaurant.operationHours}</p>
                    <p className="card-text">{restaurant.address}</p>
                    <Link
                      to={`/restaurant-details/${restaurant.id}`}
                      className="btn btn-danger text-white text-decoration-none"
                    >
                      View
                    </Link>
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
