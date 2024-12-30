// App.js
import React from 'react';
import './App.css';
import RestaurantRegistration from './Restaurant/RestaurantRegistration'; 
import CustomerSignup from './Customer/CustomerSignup';
import Login from './CommonComponents/login';


function App() {
  return (
    <div className="App">
      <CustomerSignup /> {/* Use Register component */}
    </div>
  );
}

export default App;
