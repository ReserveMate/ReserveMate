
import React, { useState } from "react";
import '../styles/Login.css';
import facebookIcon from '../assets/facebook-icon.png';
import googleIcon from '../assets/google-icon.png';
import appleIcon from '../assets/apple-icon.png';
import { useNavigate } from "react-router-dom";
import CommonService from '../Services/CommonService';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await CommonService.login(email, password)
      console.log(userData)
      if (userData.token) {
        localStorage.setItem('token', userData.token)
        localStorage.setItem('role', userData.role)
        

        if (userData.role === 'RESTAURANT') {
          navigate('/restaurant-profile');
        } else if (userData.role === 'CUSTOMER') {
          navigate('/customer-home');
        }else if (userData.role === 'ADMIN') {
           navigate('/admin-home');
        } else {
          setError('Invalid role');
        }

      } else {
        setError(userData.message)
      }

    } catch (error) {
      console.log(error)
      setError(error.message)
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  }


  return (
    <div className="sign-in-container">
      
      <div className="header">
        <h1>
          <span className="brand-red">Reserve</span>Mate
        </h1>
      </div>

      <div className="sign-in-content">

        <h2>Log in </h2>
	
	{error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" />

          <label htmlFor="password">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />

          <button type="submit" className="primary-btn">Log In</button>
        </form>

        <div className="divider">
          <hr />
          <span>or use one of these options</span>
          <hr />
        </div>

        <div className="social-options">

          <button className="social-btn">
            <img src={facebookIcon} alt="Facebook" />
          </button>
          <button className="social-btn">
            <img src={googleIcon} alt="Google" />
          </button>
          <button className="social-btn">
            <img src={appleIcon} alt="Apple" />
          </button>

        </div>
        
        <p className="terms">
          By signing in or creating an account, you agree with our{' '}
          <a href="#">Terms & conditions</a> and <a href="#">Privacy statement</a>.
        </p>

      </div>
    </div>
  )

}

export default Login;