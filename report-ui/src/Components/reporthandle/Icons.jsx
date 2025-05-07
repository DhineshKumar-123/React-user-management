// Icon.js
import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

const Icon = ({ name, size, color, onClick }) => {
  const iconStyle = {
    fontSize: size || '40px',  // Default size
    color: color || '#333',    // Default color
    transition: 'color 0.3s ease, transform 0.3s ease',
    cursor: onClick ? 'pointer' : 'default',
  };

  return (
    <i
      className={`bi bi-${name}`}
      style={iconStyle}
      onClick={onClick}
    ></i>
  );
};

export default Icon;
