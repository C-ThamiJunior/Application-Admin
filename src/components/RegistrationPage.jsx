import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegistrationForm.css'; 

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    surname: '',
    email: '',
    contactNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      console.log("Sending registration data..."); // Debug log

      // ✅ FIX: Changed http to https
      const response = await axios.post('https://b-t-backend-production-1580.up.railway.app/api/auth/register', {
        firstname: formData.firstname,
        surname: formData.surname,
        email: formData.email,
        contactNumber: formData.contactNumber,
        password: formData.password,
        role: 'ADMIN', // Note: Ideally this is handled on backend, but ok for demo
      });

      console.log("Response:", response.data);
      alert('Registration successful!');
      navigate('/');
      
    } catch (err) {
      console.error('Registration failed:', err);
      // Detailed error alert
      const errorMessage = err.response?.data?.message || err.message || 'Something went wrong!';
      alert(`Registration Failed: ${errorMessage}`);
    }
  };

  return (
    <div className="page-with-watermark d-flex flex-column justify-content-center align-items-center min-vh-100 py-5 px-3">
      <div className="form-container bg-white text-dark border rounded-4 shadow-lg p-5 w-100" style={{ maxWidth: '700px' }}>
        <div className="text-center mb-4">
          <img src="/images/logo.png" alt="Logo" className="logo" style={{ width: '120px' }} />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                name="firstname"
                className="form-control"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mt-3 mt-md-0">
              <input
                type="text"
                name="surname"
                className="form-control"
                placeholder="Surname"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mt-3 mt-md-0">
              <input
                type="tel"
                name="contactNumber"
                className="form-control"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mt-3 mt-md-0">
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-danger w-100">
            Register
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-muted small">
            Already have an account?
            <button className="btn btn-link text-danger p-0 ms-1" onClick={() => navigate('/')}>
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;