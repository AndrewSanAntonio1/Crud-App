import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import UserTable from '../components/UserTable';
import FloatingActionButton from '../components/FloatingActionButton';
import initialUsers from '../data/users';
import './Home.css';

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load users from backend API
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await axios.get("http://localhost:8080/users");
      console.log('Loaded users from API:', result.data);
      setUsers(result.data);
      setLoading(false);
    } catch (err) {
      console.error('Error loading users from API:', err);
      // Fallback to local data if API fails
      console.log('Falling back to local data');
      setUsers(initialUsers);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Delete from backend API
      await axios.delete(`http://localhost:8080/user/${id}`);
      // Remove user from local state
      setUsers(users.filter(user => user.id !== id));
      console.log(`User ${id} deleted successfully`);
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user. Please try again.');
    }
  };

  const handleRetry = () => {
    loadUsers();
  };

  return (
    <main id="main-content" className="home-page">
      {/* Hero Section */}
      <section className="hero-section" aria-labelledby="hero-title">
        <Container>
          <h1 id="hero-title" className="hero-title">TaskFlow System</h1>
          <p className="hero-subtitle">Manage your users efficiently</p>
        </Container>
      </section>

      {/* Main Content */}
      <section className="main-content" aria-labelledby="users-heading">
        <Container>
          <div className="table-card">
            <div className="card-header">
              <h2 id="users-heading" className="card-title">All Users</h2>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="loading-state" role="status" aria-live="polite">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="loading-text">Loading users...</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="error-banner" role="alert" aria-live="assertive">
                <div className="error-content">
                  <svg 
                    className="error-icon" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  <div className="error-text">
                    <h4 className="error-title">Unable to load users</h4>
                    <p className="error-message">{error.message}</p>
                  </div>
                </div>
                <button 
                  className="btn btn-primary retry-btn"
                  onClick={handleRetry}
                  aria-label="Retry loading users"
                >
                  Retry
                </button>
              </div>
            )}

            {/* User Table */}
            {!loading && !error && (
              <UserTable users={users} onDelete={handleDelete} />
            )}
          </div>
        </Container>
      </section>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </main>
  );
}

export default Home;
