import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEdit, FiTrash2, FiUserPlus } from 'react-icons/fi';
import './UserTable.css';

function UserTable({ users, onDelete }) {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/users/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/users/edit/${id}`);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      onDelete(id);
    }
  };

  if (!users || users.length === 0) {
    return (
      <div className="empty-state">
        <FiUserPlus className="empty-state-icon" />
        <h3 className="empty-state-title">No users yet</h3>
        <p className="empty-state-message">
          Add your first user to get started!
        </p>
        <button 
          className="btn btn-primary empty-state-btn"
          onClick={() => navigate('/users/add')}
        >
          <FiUserPlus className="me-2" />
          Add User
        </button>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-responsive">
        <table className="table user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="user-row">
                <td className="index-cell">{index + 1}</td>
                <td className="name-cell">{user.name}</td>
                <td className="username-cell">{user.username}</td>
                <td className="email-cell">{user.email}</td>
                <td className="actions-cell">
                  <div className="action-buttons">
                    <button
                      className="btn btn-action btn-view"
                      onClick={() => handleView(user.id)}
                      aria-label={`View ${user.name}`}
                    >
                      <FiEye className="action-icon" />
                      <span>View</span>
                    </button>
                    <button
                      className="btn btn-action btn-edit"
                      onClick={() => handleEdit(user.id)}
                      aria-label={`Edit ${user.name}`}
                    >
                      <FiEdit className="action-icon" />
                      <span>Edit</span>
                    </button>
                    <button
                      className="btn btn-action btn-delete"
                      onClick={() => handleDelete(user.id, user.name)}
                      aria-label={`Delete ${user.name}`}
                    >
                      <FiTrash2 className="action-icon" />
                      <span>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
