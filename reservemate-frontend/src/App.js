// App.js
import React from 'react';
import './App.css';
import Register from './components/Register'; // Import Register component
import SignIn from './components/SignIn';
import RestaurantProfile from './components/RestaurantProfile';
import RestaurantDetails from './components/RestaurantDetails';



function App() {
  return (
    <div className="app">
      <RestaurantDetails />
    </div>
  );
}

export default App;