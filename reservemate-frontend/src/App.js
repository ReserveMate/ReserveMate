// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"; // Your Header component
import Home from "./pages/Home"; // Home page
import Register from "./pages/Register"; // Register page
//import Login from "./pages/Login"; // Login page
//import ListRestaurant from "./pages/ListRestaurant"; // List Restaurant page

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Always show the header */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page */}
          <Route path="/register" element={<Register />} /> {/* Register page */}
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
