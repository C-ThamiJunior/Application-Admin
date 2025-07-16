import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FileText, Users } from 'lucide-react';

const AdminLandingPage = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="bg-white shadow rounded p-5 text-center" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="mb-4 text-danger fw-bold">Admin Dashboard</h2>
        <p className="text-muted mb-4">Welcome! Choose an action below:</p>

        <div className="d-grid gap-3">
          <Link to="/jobPostForm" className="btn btn-outline-danger d-flex align-items-center justify-content-center gap-2">
            <FileText size={20} /> Create Job Post
          </Link>

          <Link to="/applicants" className="btn btn-outline-danger d-flex align-items-center justify-content-center gap-2">
            <Users size={20} /> View Applicants
          </Link>

           <Link to="/managePostsPage" className="btn btn-outline-danger d-flex align-items-center justify-content-center gap-2">
            <Users size={20} /> Manage Posts
          </Link>
          <Link to="/register" className="btn btn-outline-danger d-flex align-items-center justify-content-center gap-2">
            <Users size={20} /> Register Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLandingPage;