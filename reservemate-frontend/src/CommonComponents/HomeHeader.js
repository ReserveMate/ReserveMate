import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import CommonService from "../Services/CommonService";

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = CommonService.isAuthenticated();
  const isRestaurant = CommonService.isRestaurant();

  const handleLogout = () => {
    CommonService.logout();
    navigate('/customer-signup'); // Redirect to the signup page after logout
  };

  return (
    <header className="bg-danger text-white p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="mb-0">
          <span style={{ color: 'black' }}>Reserve</span>
          <span className="text-white">Mate</span>
        </h1>
        <div>
          {!isAuthenticated ? (
            <>
              <Link to="/restaurant-registration" className="btn btn-light mx-2">Register</Link>
              <Link to="/login" className="btn btn-light mx-2">Login</Link>
            </>
          ) : (
            <>
              {isRestaurant ? (
                <Link to="/login" className="btn btn-light mx-2" onClick={handleLogout}>Logout</Link>
              ) : (
                <>
                  <Link to="/restaurant-registration" className="btn btn-light mx-2">Register</Link>
                  <Link to="/login" className="btn btn-light mx-2" onClick={handleLogout}>Logout</Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
