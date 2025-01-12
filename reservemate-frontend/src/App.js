import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Header from "./CommonComponents/HomeHeader"; 
import Footer from "./CommonComponents/Footer";
import RestaurantRegistration from './Restaurant/RestaurantRegistration'; 
import CustomerSignup from './Customer/CustomerSignup';
import Login from './CommonComponents/login';
import RestaurantProfile from './Restaurant/RestaurantProfile';
import RestaurantDetails from './Customer/RestaurantDetails'; 
import CustomerHome from './Customer/CustomerHome';
import AdminHome from './Admin/AdminHome';

function App() {
  return (
    <div className="App">
      <Header /> 
      
      <div className="content">
      <Routes>
        <Route path="/" element={<CustomerHome />} />
        <Route path="/customer-signup" element={<CustomerSignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/restaurant-registration" element={<RestaurantRegistration />} />
        <Route path="/restaurant-profile" element={<RestaurantProfile />} />
        <Route path="/admin-profile" element={<AdminHome />} />
        <Route path="/restaurant-details/:id" element={<RestaurantDetails />} />
      </Routes>

      </div>
      <Footer /> 
    </div>
  );
}

export default App;
