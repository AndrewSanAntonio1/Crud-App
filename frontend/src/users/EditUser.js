import React, { useState, useEffect, useCallback } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FiArrowLeft } from 'react-icons/fi';
import './EditUser.css';

function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const { name, username, email } = user;

  const loadUser = useCallback(async () => {
    try {
      setLoading(true);
      setLoadError(null);
      const response = await axios.get(`http://localhost:8080/user/${id}`);
      console.log('Loaded user for editing:', response.data);
      setUser(response.data);
    } catch (err) {
      console.error('Error loading user:', err);
      setLoadError('Failed to load user details. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Send PUT request to backend
      await axios.put(`http://localhost:8080/user/${id}`, user);
      console.log('User updated successfully:', user);
      
      // Show success message
      alert('User updated successfully!');
      
      // Navigate back to home page
      navigate('/');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="edit-user-page">
        <Container>
          <div className="loading-container">
            <Spinner animation="border" variant="primary" />
            <p className="loading-text">Loading user details...</p>
          </div>
        </Container>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="edit-user-page">
        <Container>
          <div className="error-card">
            <h3 className="text-danger mb-3">Error</h3>
            <p>{loadError}</p>
            <Button variant="primary" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="edit-user-page">
      <Container>
        <Button 
          variant="link" 
          className="back-button"
          onClick={() => navigate('/')}
        >
          <FiArrowLeft /> Back to Home
        </Button>

        <div className="form-card">
          <div className="form-header">
            <h2 className="form-title">Edit User</h2>
            <p className="form-subtitle">Update user information</p>
          </div>

          <Form onSubmit={handleSubmit} className="user-form">
            {/* Name Field */}
            <Form.Group className="mb-4" controlId="formName">
              <Form.Label className="form-label">
                Name <span className="required">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                name="name"
                value={name}
                onChange={handleInputChange}
                isInvalid={!!errors.name}
                className="form-input"
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Username Field */}
            <Form.Group className="mb-4" controlId="formUsername">
              <Form.Label className="form-label">
                Username <span className="required">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={username}
                onChange={handleInputChange}
                isInvalid={!!errors.username}
                className="form-input"
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Email Field */}
            <Form.Group className="mb-4" controlId="formEmail">
              <Form.Label className="form-label">
                Email <span className="required">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email address"
                name="email"
                value={email}
                onChange={handleInputChange}
                isInvalid={!!errors.email}
                className="form-input"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Action Buttons */}
            <div className="form-actions">
              <Button 
                variant="secondary" 
                onClick={handleCancel}
                className="btn-cancel"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                className="btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Update'}
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default EditUser;
