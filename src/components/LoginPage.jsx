import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './RegistrationForm.css';
import logo from '/images/logo.png'; 

const LoginPage = ({ handleLogin, loading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleLogin(email, password); 
    if (success) {
      navigate('/adminLandingPage'); 
    }
  };

  return (
      <div className="login-page-container d-flex flex-column justify-content-center align-items-center min-vh-100 py-5 px-3">
        <div className="form-container bg-white text-dark border rounded-4 shadow-lg p-5 w-100">
       <div className="text-center text-muted mb-4">
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" className="img-fluid" style={{ height: '50px' }} />
          </div>
          <p>Please enter your credentials to continue</p>
        </div>

          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-danger text-center small mt-2">{error}</p>}
            <button
              type="submit"
              className="register-btn btn btn-danger mt-3 w-100"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
      </form>
    </div>
  </div>    
  );
};
export default LoginPage;