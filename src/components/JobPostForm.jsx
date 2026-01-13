import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const JobPostForm = () => {
  const [job, setJob] = useState({
    title: '',
    description: '',
    location: '',
    closingDate: '',
    postType: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('https://b-t-backend-production-1580.up.railway.app/api/post/createpostform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job)
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Job post submitted successfully!' });
        setJob({ title: '', description: '', location: '', closingDate: '', postType: '' });
      } else {
        setMessage({ type: 'danger', text: 'Failed to submit job post.' });
      }
    } catch (error) {
      console.error('Error submitting job post:', error);
      setMessage({ type: 'danger', text: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-danger">Create Job Posting</h2>

      {message.text && (
        <div className={`alert alert-${message.type} mt-3`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label text-danger">Post Type</label>
          <select
            name="postType"
            className="form-select border-danger"
            value={job.postType}
            onChange={handleChange}
            required>
            <option value="">Select Post Type</option>
            <option value="Job">Job</option>
            <option value="Internship">Internship/Learnership</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label text-danger">Job Title</label>
          <input
            type="text"
            name="title"
            value={job.title}
            className="form-control border-danger"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-danger">Description</label>
          <textarea
            name="description"
            value={job.description}
            className="form-control border-danger"
            rows="3"
            onChange={handleChange}
            required></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label text-danger">Location</label>
          <input
            type="text"
            name="location"
            value={job.location}
            className="form-control border-danger"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-danger">Closing Date</label>
          <input
            type="date"
            name="closingDate"
            value={job.closingDate}
            className="form-control border-danger"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading} className="btn btn-danger w-100">
          {loading ? 'Posting...' : 'Post Job'}
        </button>
      </form>
    </div>
  );
};

export default JobPostForm;
