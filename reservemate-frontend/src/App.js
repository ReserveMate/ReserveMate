// App.js
import React from 'react';
import './App.css';
import Header from "./CommonComponents/HomeHeader";
import Footer from "./CommonComponents/Footer";
import Home from "./Customer/CustomerHome"
import RestaurantRegistration from './Restaurant/RestaurantRegistration'; 
import CustomerSignup from './Customer/CustomerSignup';
import Login from './CommonComponents/login';


function App() {
  return (
    <div className="App">
      <Header/>
      <Home /> {/* Use Register component */}
      <Footer/>
    </div>
  );
}

export default App;