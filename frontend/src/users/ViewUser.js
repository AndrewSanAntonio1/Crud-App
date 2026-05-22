import React, { useState, useEffect, useCallback } from 'react';
import { Container, Card, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FiUser, FiMail, FiPhone, FiGlobe, FiArrowLeft } from 'react-icons/fi';
import './ViewUser.css';

function ViewUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://localhost:8080/user/${id}`);
      console.log('Loaded user:', response.data);
      setUser(response.data);
    } catch (err) {
      console.error('Error loading user:', err);
      setError('Failed to load user details. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (loading) {
    return (
      <div className="view-user-page">
        <Container>
          <div className="loading-container">
            <Spinner animation="border" variant="primary" />
            <p className="loading-text">Loading user details...</p>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="view-user-page">
        <Container>
          <Card className="error-card">
            <Card.Body className="text-center">
              <h3 className="text-danger mb-3">Error</h3>
              <p>{error}</p>
              <Button variant="primary" onClick={() => navigate('/')}>
                Back to Home
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="view-user-page">
        <Container>
          <Card className="error-card">
            <Card.Body className="text-center">
              <h3 className="mb-3">User Not Found</h3>
              <p>The user you're looking for doesn't exist.</p>
              <Button variant="primary" onClick={() => navigate('/')}>
                Back to Home
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }

  return (
    <div className="view-user-page">
      <Container>
        <Button 
          variant="link" 
          className="back-button"
          onClick={() => navigate('/')}
        >
          <FiArrowLeft /> Back to Home
        </Button>

        <Card className="user-detail-card">
          <Card.Header className="card-header-custom">
            <h2 className="card-title-custom">User Details</h2>
          </Card.Header>
          <Card.Body className="card-body-custom">
            <Row className="user-info-row">
              <Col md={6} className="mb-4">
                <div className="info-item">
                  <div className="info-icon">
                    <FiUser />
                  </div>
                  <div className="info-content">
                    <label className="info-label">Name</label>
                    <p className="info-value">{user.name}</p>
                  </div>
                </div>
              </Col>

              <Col md={6} className="mb-4">
                <div className="info-item">
                  <div className="info-icon">
                    <FiUser />
                  </div>
                  <div className="info-content">
                    <label className="info-label">Username</label>
                    <p className="info-value">{user.username}</p>
                  </div>
                </div>
              </Col>

              <Col md={6} className="mb-4">
                <div className="info-item">
                  <div className="info-icon">
                    <FiMail />
                  </div>
                  <div className="info-content">
                    <label className="info-label">Email</label>
                    <p className="info-value">{user.email}</p>
                  </div>
                </div>
              </Col>

              {user.phone && (
                <Col md={6} className="mb-4">
                  <div className="info-item">
                    <div className="info-icon">
                      <FiPhone />
                    </div>
                    <div className="info-content">
                      <label className="info-label">Phone</label>
                      <p className="info-value">{user.phone}</p>
                    </div>
                  </div>
                </Col>
              )}

              {user.website && (
                <Col md={6} className="mb-4">
                  <div className="info-item">
                    <div className="info-icon">
                      <FiGlobe />
                    </div>
                    <div className="info-content">
                      <label className="info-label">Website</label>
                      <p className="info-value">{user.website}</p>
                    </div>
                  </div>
                </Col>
              )}
            </Row>

            <div className="action-buttons-view">
              <Button 
                variant="primary" 
                onClick={() => navigate(`/users/edit/${id}`)}
              >
                Edit User
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => navigate('/')}
              >
                Back to List
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default ViewUser;
