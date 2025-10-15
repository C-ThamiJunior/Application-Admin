import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import JobPostForm from './components/JobPostForm';
import AdminLandingPage from './components/AdminLandingPage';
import ApplicantsTable from './components/ApplicantsTable';
import ManagePostsPage from './components/ManagePostsPage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import RequireAuth from './components/RequireAuth';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('https://b-t-backend.onrender.com/api/auth/login', {
        email,
        password,
      });

      const { user } = response.data;

      localStorage.setItem('token', user.token); // optional
      localStorage.setItem('role', user.role);   // optional

      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
      setLoading(false);
      return false;
    }
  };

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<LoginPage handleLogin={handleLogin} loading={loading} error={error} />} />
        <Route path="/register" element={<RegistrationPage />} />
        
        {/* 🔒 Protected Routes */}
        <Route
          path="/adminLandingPage"
          element={
            <RequireAuth>
              <AdminLandingPage />
            </RequireAuth>
          }
        />
        <Route
          path="/jobPostForm"
          element={
            <RequireAuth>
              <JobPostForm />
            </RequireAuth>
          }
        />
        <Route
          path="/applicants"
          element={
            <RequireAuth>
              <ApplicantsTable />
            </RequireAuth>
          }
        />
        <Route
          path="/managePostsPage"
          element={
            <RequireAuth>
              <ManagePostsPage />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
