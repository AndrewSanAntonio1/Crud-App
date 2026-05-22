import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddUser.css';

function AddUser() {
  const navigate = useNavigate();
  
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { name, username, email } = user;

  
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
      // Send POST request to backend
      await axios.post('http://localhost:8080/user', user);
      console.log('User registered successfully:', user);
      
      // Show success message
      alert('User registered successfully!');
      
      // Navigate back to home page
      navigate('/');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Failed to register user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="add-user-page">
      <Container>
        <div className="form-card">
          <div className="form-header">
            <h2 className="form-title">Register New User</h2>
            <p className="form-subtitle">Fill in the details to add a new user</p>
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
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default AddUser;
