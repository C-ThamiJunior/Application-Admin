import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './RegistrationForm.css'; // ✅ Still using same CSS file for shared background & logo styling

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
    <div className="page-with-watermark d-flex flex-column justify-content-center align-items-center min-vh-100 py-5 px-3">
      <div className="form-container bg-white text-dark border rounded-4 shadow-lg p-5 w-100" style={{ maxWidth: '700px' }}>
        <div className="text-center mb-4">
          <img src="/images/logo.png" alt="Logo" className="logo" style={{ width: '120px' }} />
        </div>

        <p className="text-center text-muted mb-4">Please enter your credentials to continue</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-danger text-center small mt-2">{error}</p>}

          <button
            type="submit"
            className="btn btn-danger w-100"
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
