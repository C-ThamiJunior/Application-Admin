import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManagePostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    closingDate: '',
    postType: '',
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get('https://b-t-backend.onrender.com/api/post/visible', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setPosts(res.data);
  };

const handleHide = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(`https://b-t-backend.onrender.com/api/hide/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });

    fetchPosts();
  } catch (error) {
    console.error("Failed to hide post:", error);
  }
};




  const handleEditClick = (post) => {
    setEditingPostId(post.id);
    setFormData({
      title: post.title,
      description: post.description,
      location: post.location,
      closingDate: post.closingDate?.substring(0, 10),
      postType: post.postType,
    });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    await axios.put(`https://b-t-backend.onrender.com/api/post/update/${editingPostId}`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setEditingPostId(null);
    setFormData({ title: '', description: '', location: '', closingDate: '', postType: '' });
    fetchPosts();
  };

  return (
    <div className="container py-5 bg-light min-vh-100">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Manage Created Posts</h2>
        <p className="text-muted">Edit or delete any post created for job, internship, or learnership.</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-center">No posts available.</p>
      ) : (
        <div className="row g-4">
          {posts.map((post) => (
            <div className="col-md-6" key={post.id}>
              <div className="card shadow-sm border-0 rounded-4">
                <div className={`card-header ${post.postType === 'Job' ? 'bg-dark' : 'bg-danger'} text-white rounded-top-4`}> 
                  <h5 className="fw-bold mb-0">{post.title}</h5>
                </div>
                <div className="card-body">
                  <p><strong>Type:</strong> {post.postType}</p>
                  <p><strong>Location:</strong> {post.location}</p>
                  <p><strong>Description:</strong> {post.description}</p>
                  <p><strong>Closing Date:</strong> {new Date(post.closingDate).toLocaleDateString()}</p>

                  {editingPostId === post.id ? (
                    <div className="mt-3">
                      <input
                        className="form-control mb-2"
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleFormChange}
                      />
                      <textarea
                        className="form-control mb-2"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleFormChange}
                      ></textarea>
                      <input
                        className="form-control mb-2"
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleFormChange}
                      />
                      <input
                        className="form-control mb-2"
                        type="date"
                        name="closingDate"
                        value={formData.closingDate}
                        onChange={handleFormChange}
                      />
                      <select
                        className="form-select mb-2"
                        name="postType"
                        value={formData.postType}
                        onChange={handleFormChange}
                      >
                        <option value="">Select Type</option>
                        <option value="Internship">Internship/Learnership</option>
                        <option value="Job">Job</option>
                      </select>
                      <button className="btn btn-success me-2" onClick={handleUpdate}>Save</button>
                      <button className="btn btn-secondary" onClick={() => setEditingPostId(null)}>Cancel</button>
                    </div>
                  ) : (
                    <div className="d-flex gap-2">
                      <button className="btn btn-outline-primary btn-sm" onClick={() => handleEditClick(post)}>Edit</button>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => handleHide(post.id)}>Delete</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ManagePostsPage;