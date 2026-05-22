import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import './FloatingActionButton.css';

function FloatingActionButton({ to = '/users/add' }) {
  return (
    <Link to={to} className="fab" aria-label="Add new user">
      <FiPlus className="fab-icon" />
    </Link>
  );
}

export default FloatingActionButton;
