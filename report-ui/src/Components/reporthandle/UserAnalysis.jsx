import React from 'react';
import Icon from './Icons';
const UserAnalysis = ({ userAnalysis, description }) => {
  return (
    <div className="report-card">
      <div className="report-card-header">
      <Icon name="person-circle" size="25px" color="#007bff" ></Icon>
        <h3 className="report-title">Customer Analysis</h3>
      </div>
      <p className="report-value">${userAnalysis}</p>
      <p className="report-description">{description}</p>
    </div>
  );
};

export default UserAnalysis;
