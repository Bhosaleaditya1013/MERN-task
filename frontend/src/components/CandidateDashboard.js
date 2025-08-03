import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./CandidateDashboard.css";

const CandidateDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchCandidates = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/candidates?status=${statusFilter}`
      );
      setCandidates(res.data || []);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      setCandidates([]);
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const updateCandidate = async (id, status, notes) => {
    try {
      await axios.put(`http://localhost:5000/api/candidates/${id}`, {
        status,
        notes,
      });
      setSuccessMessage("Candidate updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      fetchCandidates();
    } catch (error) {
      console.error("Error updating candidate:", error);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Shortlisted":
        return "status-select status-shortlisted";
      case "Rejected":
        return "status-select status-rejected";
      case "Interested":
        return "status-select status-interested";
      case "Not Connected":
        return "status-select status-not-connected";
      default:
        return "status-select";
    }
  };

  // Safe function to get first character of name
  const getInitial = (name) => {
    return name && typeof name === 'string' && name.length > 0 
      ? name.charAt(0).toUpperCase() 
      : '?';
  };

  // Safe function to split skills
  const getSkills = (skills) => {
    if (!skills) return [];
    if (typeof skills === 'string') return skills.split(',');
    return [];
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-content">
          <div className="dashboard-title">Candidate Dashboard</div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <select
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="">All Candidates</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Rejected">Rejected</option>
              <option value="Interested">Interested</option>
              <option value="Not Connected">Not Connected</option>
            </select>
          </div>

          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}

          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="candidates-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Experience</th>
                    <th>Skills</th>
                    <th>Status</th>
                    <th>Notes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((c) => (
                    <tr key={c._id || Math.random().toString(36).substr(2, 9)}>
                      <td>
                        <div className="candidate-info">
                          <div className="candidate-avatar">
                            {getInitial(c.name)}
                          </div>
                          <div>
                            <div className="candidate-name">{c.name || 'No name'}</div>
                            <div className="candidate-email">{c.email || 'No email'}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>{c.phone || 'No phone'}</div>
                        <div style={{ color: '#718096', fontSize: '13px' }}>{c.location || 'No location'}</div>
                      </td>
                      <td>{c.experience || '0'} years</td>
                      <td>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                          {getSkills(c.skills).map((skill, index) => (
                            <span key={index} className="skill-tag">
                              {skill.trim()}
                            </span>
                          ))}
                          {getSkills(c.skills).length === 0 && 'No skills'}
                        </div>
                      </td>
                      <td>
                        <select
                          defaultValue={c.status || ''}
                          onChange={(e) => updateCandidate(c._id, e.target.value, c.notes)}
                          className={getStatusClass(c.status)}
                        >
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Interested">Interested</option>
                          <option value="Not Connected">Not Connected</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={c.notes || ''}
                          onBlur={(e) => updateCandidate(c._id, c.status, e.target.value)}
                          className="notes-input"
                          placeholder="Add notes..."
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => updateCandidate(c._id, c.status, c.notes)}
                          className="save-button"
                          disabled={!c._id}
                        >
                          Save
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {candidates.length === 0 && !isLoading && (
                <div className="empty-state">
                  <svg
                    className="empty-state-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="empty-state-title">No candidates found</div>
                  <div className="empty-state-description">
                    Try changing your filter criteria
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;