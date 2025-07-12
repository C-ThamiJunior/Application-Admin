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

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Job posted:', job);
    // Add your API call  here
try {
    const response = await fetch('http://localhost:8081/api/post/createpostform', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(job)
    });

    if (response.ok) {
      alert('Job post submitted successfully!');
      setJob({
        title: '',
        description: '',
        location: '',
        closingDate: '',
        postType: ''
      });
    } else {
      alert('Failed to submit job post.');
    }
  } catch (error) {
    console.error('Error submitting job post:', error);
    alert('An error occurred. Please try again.');
  }
  }; 
        

  return (
    <div className="container mt-5">
      <h2 className="text-danger">Create Job Posting</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label text-danger">Post Type</label>
          <select name="postType" className="form-select border-danger" onChange={handleChange} required>
            <option value="">Select Post Type</option>
            <option value="Job">Job</option>
            <option value="Internship">Internship/Learnership</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label text-danger">Job Title</label>
          <input type="text" name="title" className="form-control border-danger" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label text-danger">Description</label>
          <textarea name="description" className="form-control border-danger" rows="3" onChange={handleChange} required></textarea>
        </div>
        <div c
        lassName="mb-3">
          <label className="form-label text-danger">Location</label>
          <input type="text" name="location" className="form-control border-danger" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label text-danger">Closing Date</label>
          <input type="date" name="closingDate" className="form-control border-danger" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-danger">Post Job</button>
      </form>
    </div>
  );
};

export default JobPostForm;