import React from "react";
import "../styles/Footer.css";
import CommonService from "../Services/CommonService";
import { Link, useNavigate } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4">
      <div className="container">
        <p className="mb-0">ReserveMate. We deliver your moments instantly and memorably.</p>
        {(!CommonService.isAuthenticated() || CommonService.isCustomer()) && (
          <button className="btn btn-danger mt-2">
            <Link to="/restaurant-registration" className="text-white text-decoration-none">
              Become Restaurant Owner
            </Link>
          </button>
        )}

        <p className="mt-3 mb-0">Copyright © 2024 - All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
