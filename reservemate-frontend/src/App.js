// App.js
import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Header from "./CommonComponents/HomeHeader";
import Footer from "./CommonComponents/Footer";
import Home from "./Customer/CustomerHome"
import RestaurantRegistration from './Restaurant/RestaurantRegistration'; 
import CustomerSignup from './Customer/CustomerSignup';
import Login from './CommonComponents/login';
import RestaurantProfile from './Restaurant/RestaurantProfile';
import RestaurantDetails from './Customer/RestaurantDetails'; 
import CustomerHome from './Customer/CustomerHome';
import AdminHome from './Admin/AdminHome';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Header /> {/* Always show the header */}
//         <Routes>
//           <Route path="/" element={<Home />} /> {/* Home page */}
//           <Route path="/register" element={<Register />} /> {/* Register page */}
          
//         </Routes>
//       </div>
//     </Router>
//   );
// }

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/customer-signup" element={<CustomerSignup />} />
      <Route path="/restaurant-registration" element={<RestaurantRegistration />} />
      <Route path="/customer-home" element={<CustomerHome />} />
      <Route path="/restaurant-profile" element={<RestaurantProfile />} />
      <Route path="/admin-profile" element={<AdminHome />} />
    </Routes>
  );
}


export default App;