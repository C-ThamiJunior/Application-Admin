import React, { useState } from 'react';
import './RegistrationForm.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleLoginClick = () => {
    navigate('/'); // Navigate to the login page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('${import.meta.env.VITE_API_URL}/api/auth/register', {
        firstname: formData.firstname,  // Assuming backend uses `username`
        email: formData.email,
        password: formData.password,
        surname: formData.surname, // Assuming backend uses `surname`
        contactNumber: formData.contactNumber, // Assuming backend uses `contactNumber`
        role: "ADMIN" // or let backend default to STUDENT if role is optional
      });

      alert('Registration successful!');
      navigate('/'); // ✅ Go to login page
    } catch (error) {
      console.error('Registration failed:', error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };


  return (
    <div className="form-container">
      <h2>REGISTER</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">FIRST NAME</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="surname">SURNAME</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">EMAIL</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactNumber">CONTACT NUMBER</label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">CREATE PASSWORD</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="register-btn">
          REGISTER
        </button>
      </form>
       <div className="text-center mt-4">
          <p className="text-muted small">
            Already have an account?
              <button className="btn btn-link text-danger p-0 ms-1" onClick={handleLoginClick}>Login</button>
          </p>
        </div>
    </div>
  );
};

export default RegistrationPage;