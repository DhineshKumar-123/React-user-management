import React, { useState, useEffect } from "react";

function SearchBar({ onSearch, onReset }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [location, setLocation] = useState("");

  // Live filtering on location change
  useEffect(() => {
    onSearch({ fromDate, toDate, location });
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ fromDate, toDate, location });
  };

  const handleReset = () => {
    setFromDate("");
    setToDate("");
    setLocation("");
    if (onReset) onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="row g-2">
      <div className="col-md-3">
        <label className="form-label">From Date:</label>
        <input
          type="date"
          className="form-control"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </div>
      <div className="col-md-3">
        <label className="form-label">To Date:</label>
        <input
          type="date"
          className="form-control"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>
      <div className="col-md-3">
        <label className="form-label">Location:</label>
        <input
          type="text"
          placeholder="Enter Location or HotelName"
          className="form-control"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="col-md-1 d-flex align-items-end">
        <button type="submit" className="btn btn-primary w-100">Search</button>
      </div>
      <div className="col-md-2 d-flex align-items-end">
        <button type="button" className="btn btn-secondary w-90" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
