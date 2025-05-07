import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router";
import { CSVLink } from "react-csv";


function CancellationDetails() {
  const [cancellationDetail, setCancellationDetail] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const detailCancellation = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8083/api/cancellationrequest/getall",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data)
        setCancellationDetail(response.data);
        setFilteredData(response.data);
      } catch (err) {
        console.log(err + " error fetching the list of Cancellations");
      }
    };
    detailCancellation();
  }, []);

  const applyFilters = () => {
    let filtered = [...cancellationDetail];

    if (statusFilter) {
      filtered = filtered.filter(
        (item) => item.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (startDate) {
      filtered = filtered.filter((item) => {
        const reqDate = new Date(item.requestDate).setHours(0, 0, 0, 0);
        const start = new Date(startDate).setHours(0, 0, 0, 0);
        return reqDate >= start;
      });
    }

    if (endDate) {
      filtered = filtered.filter((item) => {
        const reqDate = new Date(item.requestDate).setHours(0, 0, 0, 0);
        const end = new Date(endDate).setHours(23, 59, 59, 999);
        return reqDate <= end;
      });
    }

    setFilteredData(filtered);
  };

  const resetFilters = () => {
    setStatusFilter("");
    setStartDate("");
    setEndDate("");
    setFilteredData(cancellationDetail);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "#20c997";
      case "REJECTED":
        return "#dc3545";
      case "REQUESTED":
        return "#ffc107";
      default:
        return "#6c757d";
    }
  };
  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "Request Date", key: "requestDate" },
    { label: "Reason", key: "reason" },
    { label: "Details", key: "details" },
    { label: "Status", key: "status" }
  ];


  return (
    <div className="container-fluid p-4" style={{ backgroundColor: "#f4f7f9", minHeight: "100vh" }}>
      <div className="row">
        <Navbar />
      </div><br />

      <div className="row">
        <div className="col-sm-3">
          <button className="btn btn-primary" onClick={() => navigate('/report-dashboard')}>Back</button>
        </div>
      </div>
      <div className="mb-4 mt-5">
        <h2 className="text-center mb-4">Cancellation Requests</h2>
        <div className='col-sm-3'></div>
        <div className='col-sm-2'>
          <CSVLink
            data={filteredData}
            headers={csvHeaders}
            filename={"cancellation_requests.csv"}
            className="btn btn-success"
            target="_blank"
          >
            Download CSV
          </CSVLink>

        </div>
        <div className="d-flex flex-wrap gap-3 mb-3 justify-content-center">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-select w-auto"
          >
            <option value="">Filter by Status</option>
            <option value="REQUESTED">Requested</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="form-control w-auto"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="form-control w-auto"
          />
          <button className="btn btn-primary" onClick={applyFilters}>Search</button>
          <button className="btn btn-secondary" onClick={resetFilters}>Reset</button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-striped shadow-sm bg-white">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Request Date</th>
                <th>Reason</th>
                <th>Details</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.requestDate.split("T")[0]}</td>
                    <td>{item.reason}</td>
                    <td>{item.details}</td>
                    <td>
                      <span
                        style={{
                          backgroundColor: getStatusColor(item.status),
                          color: "white",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          fontWeight: "500",
                        }}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CancellationDetails;
