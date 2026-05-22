import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Container, Nav } from 'react-bootstrap';
import { FiHome, FiUserPlus, FiUsers } from 'react-icons/fi';
import './Navbar.css';

function Navbar() {
  const [expanded, setExpanded] = useState(false);

  const handleNavClick = () => {
    setExpanded(false);
  };

  return (
    <BootstrapNavbar 
      expand="lg" 
      className="custom-navbar" 
      fixed="top"
      expanded={expanded}
      onToggle={setExpanded}
      as="nav"
      role="navigation"
      aria-label="Main navigation"
    >
      <Container>
        <BootstrapNavbar.Brand as={NavLink} to="/" className="brand" aria-label="UserHub home">
          <FiUsers className="brand-icon" aria-hidden="true" />
          <span className="brand-text">UserHub</span>
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" aria-label="Toggle navigation menu" />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" as="ul">
            <Nav.Item as="li">
              <NavLink 
                to="/" 
                className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}
                onClick={handleNavClick}
                aria-current={({ isActive }) => isActive ? 'page' : undefined}
              >
                <FiHome className="nav-icon" aria-hidden="true" />
                <span>Home</span>
              </NavLink>
            </Nav.Item>
            
            <Nav.Item as="li">
              <NavLink 
                to="/users/add" 
                className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}
                onClick={handleNavClick}
                aria-current={({ isActive }) => isActive ? 'page' : undefined}
              >
                <FiUserPlus className="nav-icon" aria-hidden="true" />
                <span>Add User</span>
              </NavLink>
            </Nav.Item>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
