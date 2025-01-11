import React, { useState } from "react";
import facebookIcon from '../assets/facebook-icon.png';
import googleIcon from '../assets/google-icon.png';
import appleIcon from '../assets/apple-icon.png';
import { useNavigate } from "react-router-dom";
import CommonService from '../Services/CommonService';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await CommonService.login(email, password);
      console.log(userData);
      if (userData.token) {
        localStorage.setItem('token', userData.token);
        localStorage.setItem('role', userData.role);

        if (userData.role === 'RESTAURANT') {
          navigate('/restaurant-profile');
        } else if (userData.role === 'CUSTOMER') {
          navigate('/customer-home');
        } else if (userData.role === 'ADMIN') {
          navigate('/admin-home');
        } else {
          setError('Invalid role');
        }
      } else {
        setError(userData.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (

    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="header">
        <h1>
          <span style={{ color: 'black' }}>Reserve</span>
          <span className="brand-red">Mate</span>
        </h1>
      </div>
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>


        <h2 className="text-center mb-3">Log in</h2>

        {error && <div className="alert alert-danger" role="alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-danger">Log In</button>
          </div>
        </form>

        <div className="d-flex align-items-center my-3">
          <hr className="flex-grow-1" />
          <span className="px-2">or use one of these options</span>
          <hr className="flex-grow-1" />
        </div>

        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-outline-secondary p-2">
            <img src={facebookIcon} alt="Facebook" style={{ width: '24px', height: '24px' }} />
          </button>
          <button className="btn btn-outline-secondary p-2">
            <img src={googleIcon} alt="Google" style={{ width: '24px', height: '24px' }} />
          </button>
          <button className="btn btn-outline-secondary p-2">
            <img src={appleIcon} alt="Apple" style={{ width: '24px', height: '24px' }} />
          </button>
        </div>

        <p className="text-center mt-4 small">
          By signing in or creating an account, you agree with our{' '}
          <a href="#" className="text-decoration-none">Terms & Conditions</a> and{' '}
          <a href="#" className="text-decoration-none">Privacy Statement</a>.
        </p>
      </div>
    </div>
  );
}

export default Login;
