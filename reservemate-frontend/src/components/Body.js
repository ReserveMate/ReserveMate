import React from 'react';
import '../styles/Body.css'; // Add styles for the body

const Body = () => {
  // Hardcoded array of restaurant details
  const restaurants = [
    {
      id: 1,
      name: 'Royal Bar & Hotel Restaurant',
      location: 'Kandy, Sri Lanka',
      rating: 9.0,
      reviews: 300,
      image: 'https://via.placeholder.com/150', // Replace with actual image URLs
    },
    {
      id: 2,
      name: 'Kandy House',
      location: 'Kandy, Sri Lanka',
      rating: 9.5,
      reviews: 250,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'White House Restaurant',
      location: 'Kandy, Sri Lanka',
      rating: 9.5,
      reviews: 230,
      image: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <div className="body">
      <section className="offers">
        <h2>Offers & Deals</h2>
        {/* Example Offer Cards */}
        <div className="offer-card">
          <h3>Kandy</h3>
          <button className="explore-btn">Explore Deals</button>
        </div>
        <div className="offer-card">
          <h3>Colombo</h3>
          <button className="explore-btn">Explore Deals</button>
        </div>
      </section>

      <section className="suggested">
        <h2>Suggested for you...</h2>
        <div className="restaurant-grid">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="restaurant-card">
              <img src={restaurant.image} alt={restaurant.name} />
              <h3>{restaurant.name}</h3>
              <p>{restaurant.location}</p>
              <p>
                Rating: {restaurant.rating} | {restaurant.reviews} reviews
              </p>
              <button className="view-btn">View</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Body;
