import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove user data from localStorage or sessionStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username')

    // Redirect the user to the login page, replacing the current history entry
    navigate('/', { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="logo">Admin Panel</div>
      <ul></ul>
      <div className="user-actions">
        <Link to="/add-discount" title="Add Discounts">
          <i className="fas fa-chart-line"></i> Add Discounts
        </Link>
        <Link to="/report-dashboard" title="View Reports">
          <i className="fas fa-chart-line"></i> Reports
        </Link>
        <Link to="/profile" title="Your Profile">
          <i className="fas fa-user-circle"></i> Profile
        </Link>
        <a href="/" onClick={handleLogout} title="Logout">
          <i className="fas fa-sign-out-alt"></i> Logout
        </a>
      </div>
    </nav>
  );
  
};

export default Navbar;
