import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminLandingPage.css';
import { FileText, Search, Settings, UserPlus, CloudUpload } from 'lucide-react';

const AdminLandingPage = () => {
  return (
    <div className="container-fluid bg-light py-5 min-vh-100">
      <h2 className="text-center text-danger fw-bold mb-4">Admin Dashboard</h2>
      <p className="text-center text-muted mb-5">Welcome! Choose an action below:</p>

      {/* ✅ Wrap all cards in a row */}
      <div className="row justify-content-center g-4 px-3">

        {/* Create Job Post */}
        <div className="col-md-4 col-lg-3">
          <Link to="/jobPostForm" className="text-decoration-none">
            <div className="dashboard-card text-center">
              <FileText size={40} className="text-danger mb-2" />
              <h5 className="fw-bold text-dark mb-2">Create Job Post</h5>
              <CloudUpload size={50} className="text-secondary" />
            </div>
          </Link>
        </div>

        {/* View Applicants */}
        <div className="col-md-4 col-lg-3">
          <Link to="/applicants" className="text-decoration-none">
            <div className="dashboard-card text-center">
              <Search size={48} className="text-danger mb-3" />
              <h5 className="fw-bold text-dark">View Applicants</h5>
            </div>
          </Link>
        </div>

        {/* Manage Posts */}
        <div className="col-md-4 col-lg-3">
          <Link to="/managePostsPage" className="text-decoration-none">
            <div className="dashboard-card text-center">
              <Settings size={48} className="text-danger mb-3" />
              <h5 className="fw-bold text-dark">Manage Posts</h5>
            </div>
          </Link>
        </div>

        {/* Register Admin */}
        <div className="col-md-4 col-lg-3">
          <Link to="/register" className="text-decoration-none">
            <div className="dashboard-card text-center">
              <UserPlus size={40} className="text-danger mb-2" />
              <h5 className="fw-bold text-dark mb-2">Register Admin</h5>
              <CloudUpload size={50} className="text-secondary" />
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AdminLandingPage;
