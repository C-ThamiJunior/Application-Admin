import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import JobPostForm from './components/JobPostForm';
import AdminLandingPage from './components/AdminLandingPage';
import ApplicantsTable from './components/ApplicantsTable';
import ManagePostsPage from './components/ManagePostsPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Admin Dashboard</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/jobPostForm">Post Job</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/applicants">View Applicants</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
      <Route path="/" element={<AdminLandingPage />} />
      <Route path="/jobPostForm" element={<JobPostForm />} />
      <Route path="/applicants" element={<ApplicantsTable />} />  
      <Route path="/managePostsPage" element={<ManagePostsPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;