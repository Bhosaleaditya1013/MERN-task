import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import ExcelUpload from './components/ExcelUpload';
import CandidateDashboard from './components/CandidateDashboard';
import Login from './components/Login';
import "./App.css";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">HR Tracker</h1>
          {loggedInUser && (
            <div className="auth-info">
              <span>Welcome, {loggedInUser.name}</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </header>

        <nav className="app-nav">
          <Link to="/" className="nav-link">Upload Candidates</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<ExcelUpload />} />
            <Route
              path="/dashboard"
              element={
                loggedInUser ? (
                  <CandidateDashboard user={loggedInUser} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={<Login setLoggedInUser={setLoggedInUser} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;