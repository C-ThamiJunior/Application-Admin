import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './RegistrationForm.css';
import axios from 'axios';

const LoginPage = ({ handleLogin, loading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleLogin(email, password); // ✅ passed in from App
    if (success) {
      navigate('/adminLandingPage'); // ✅ redirect after login
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 py-5 px-3">
      <div className="bg-white text-dark border border rounded-4 shadow-lg p-5 w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center fw-bold text-muted mb-4">Login</h2>
        <p className="text-center text-muted mb-4">Please enter your credentials to continue</p>
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
