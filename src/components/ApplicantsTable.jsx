import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

const ApplicantsTable = () => {
  const [filters, setFilters] = useState({
    search: '',
    race: '',
    gender: '',
    minAge: '',
    maxAge: '',
    date: ''
  });
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      const token = localStorage.getItem('token'); // ✅ get token from storage

      try {
        const res = await fetch('https://b-t-backend.onrender.com/api/post/all-applications', {
          headers: {
            'Authorization': `Bearer ${token}` // ✅ send token to backend
          }
        });

        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        setApplicants(data);
      } catch (err) {
        console.error("Error fetching applicants:", err);
        setError("Could not load applicants.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);


  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters(prev => ({ ...prev, [id]: value }));
  };

  const isFiltering = Object.values(filters).some(val => val);

  const filteredApplicants = isFiltering
    ? applicants.filter(app => {
        const searchMatch = app.fullnames?.toLowerCase().includes(filters.search.toLowerCase()) ||
                            app.surname?.toLowerCase().includes(filters.search.toLowerCase());
        const raceMatch = !filters.race || app.race === filters.race;
        const genderMatch = !filters.gender || app.gender === filters.gender;
        const ageMatch = (!filters.minAge || app.age >= parseInt(filters.minAge)) &&
                         (!filters.maxAge || app.age <= parseInt(filters.maxAge));
        const dateMatch = !filters.date || app.createdDate?.startsWith(filters.date);
        return searchMatch && raceMatch && genderMatch && ageMatch && dateMatch;
      })
    : applicants;

  const downloadCSV = () => {
    const headers = 'Name,Surname,Gender,Age,Phone,Email,Race,Date Applied,CV Link\n';
    const rows = filteredApplicants.map(app => [
      app.fullnames, app.surname, app.gender, app.age, app.phoneNumber,
      app.email, app.race, app.createdDate, app.cv || ''
    ].map(field => `"${field}"`).join(',')).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'applicants.csv';
    link.click();
  };

  if (loading) return <div className="container py-5">Loading applicants...</div>;
  if (error) return <div className="container py-5 text-danger">{error}</div>;

  return (
    <>
      <div className="container py-4">
        <h1 className="text-danger mb-4">Applicant Dashboard</h1>

        <div className="row g-2 mb-4">
          <div className="col"><input id="search" className="form-control" placeholder="Search name or surname" onChange={handleFilterChange} /></div>
          <div className="col"><select id="race" className="form-select" onChange={handleFilterChange}>
            <option value="">All Races</option><option>Black</option><option>White</option><option>Asian</option><option>Coloured</option><option>Indian</option>
          </select></div>
          <div className="col"><select id="gender" className="form-select" onChange={handleFilterChange}>
            <option value="">All Genders</option><option>Male</option><option>Female</option><option>Other</option>
          </select></div>
          <div className="col"><input id="minAge" className="form-control" placeholder="Min Age" type="number" onChange={handleFilterChange} /></div>
          <div className="col"><input id="maxAge" className="form-control" placeholder="Max Age" type="number" onChange={handleFilterChange} /></div>
          <div className="col"><input id="date" className="form-control" type="date" onChange={handleFilterChange} /></div>
          <div className="col"><button onClick={downloadCSV} className="btn btn-danger w-100"><Download size={18} className="me-2" />Download CSV</button></div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-danger">
              <tr>
                <th>Name</th><th>Surname</th><th>Gender</th><th>Age</th><th>Phone</th>
                <th>Email</th><th>Race</th><th>Date Applied</th><th>CV</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplicants.length > 0 ? (
                filteredApplicants.map((app, i) => (
                  <tr key={app.id || i}>
                    <td>{app.fullnames}</td>
                    <td>{app.surname}</td>
                    <td>{app.gender}</td>
                    <td>{app.age}</td>
                    <td>{app.phoneNumber}</td>
                    <td>{app.email}</td>
                    <td>{app.race}</td>
                    <td>{app.createdDate?.split('T')[0]}</td>
                    <td>{app.fileNames?.length > 0 ? (
                    <a
                      href={`https://b-t-backend.onrender.com/files/${encodeURIComponent(app.fileNames[0])}`}
                      className="text-danger"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Preview
                    </a>

                    ) : "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="9" className="text-center text-muted">No applicants found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ApplicantsTable;
