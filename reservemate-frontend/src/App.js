// App.js
import React from 'react';
import './App.css';
import Header from "./CommonComponents/HomeHeader";
import Footer from "./CommonComponents/Footer";
import Home from "./Customer/CustomerHome"
import RestaurantRegistration from './Restaurant/RestaurantRegistration'; 
import CustomerSignup from './Customer/CustomerSignup';
import Login from './CommonComponents/login';
import RestaurantProfile from './components/RestaurantProfile'; 

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <Header/>
      <Home /> {/* Use Register component */}
      <Footer/>
=======
      <RestaurantProfile /> {/* Use Register component */}
>>>>>>> aa76bcbd0032031fc0cc2be418159c351165bf1d
    </div>
  );
}

export default App;