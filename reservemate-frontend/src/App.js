// App.js
import React from 'react';
import './App.css';
import RestaurantRegistration from './Restaurant/RestaurantRegistration'; 
import CustomerSignup from './Customer/CustomerSignup';
import Login from './CommonComponents/login';
import RestaurantProfile from './components/RestaurantProfile'; 

function App() {
  return (
    <div className="App">
      <RestaurantProfile /> {/* Use Register component */}
    </div>
  );
}

export default App;