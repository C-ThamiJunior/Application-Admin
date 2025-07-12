import React from "react";
import { useState } from "react";
import './RegistrationForm.css';

const LoginPage = ({ setCurrentPage, handleLogin, loading, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };
  const handleRegisterClick = () => {
    navigate('register');
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 py-5 px-3">
      <div className="bg-white text-dark border border rounded-4 shadow-lg p-5 w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center fw-bold text-muted mb-4">Login</h2>
        <p className="text-center text-muted mb-4">Please enter your credentials to continue</p>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-danger text-center small mt-2">{error}</p>}
          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-muted small">
            Don't have an account?
            <button className="btn btn-link text-danger p-0 ms-1" onClick={handleRegisterClick}>Register</button>
          </p>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;