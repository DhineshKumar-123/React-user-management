import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { CSVLink } from "react-csv";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router";
import './BookingDetail.css';

function BookingDetails() {
  const [bookingDetails, setBookingDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const navigate = useNavigate()
  useEffect(() => {
    const getBookingDetails = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get("http://localhost:8083/api/report/listofbookings",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBookingDetails(response.data);
        setFilteredDetails(response.data);
      } catch (err) {
        console.error("Failed to fetch booking details", err);
      }
    };
    getBookingDetails();
  }, []);

  // Filter handler by booking date and location
  const handleFilter = ({ fromDate, toDate, location }) => {
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
  
    const filtered = bookingDetails.filter((b) => {
      const bookedAt = new Date(b.bookedAt); // ISO string from backend converting the date
      const cityMatch = location
        ? b.room.hotel.city.toLowerCase().includes(location.toLowerCase())
        : true;
  
      return (
        cityMatch &&
        (!from || bookedAt >= from) &&
        (!to || bookedAt <= to)
      );
    });
  
    setFilteredDetails(filtered);
    setCurrentPage(1);
  };
  
  const handleReset = () => {
    setFilteredDetails(bookingDetails);
    setCurrentPage(1);
  };
  
  

  // Pagination logic goes heere
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredDetails.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredDetails.length / recordsPerPage);

  const headers = [
    { label: "Booking Id", key: "id" },
    { label: "Booked At", key: "bookedAt" },
    { label: "Hotel Name", key: "room.hotel.name" },
    { label: "Hotel City", key: "room.hotel.city" },
    { label: "Room Id", key: "room.id" },
    { label: "Check In", key: "checkIn" },
    { label: "Check Out", key: "checkOut" },
    { label: "Customer Name", key: "customer.name" },
    { label: "Customer Email", key: "customer.email" },
    { label: "Customer Phone", key: "customer.contact" },
    { label: "Customer Address", key: "customer.address" },
  ];

  const csvData = filteredDetails.map(b => ({
    id: b.id,
    bookedAt: b.bookedAt,
    "room.hotel.name": b.room.hotel.name,
    "room.hotel.city": b.room.hotel.city,
    "room.id": b.room.id,
    checkIn: b.checkIn,
    checkOut: b.checkOut,
    "customer.name": b.customer.name,
    "customer.email": b.customer.email,
    "customer.contact": b.customer.contact,
    "customer.address": b.customer.address,
  }));

  return (
    <div className="container-fluid">
      <div className="row"><Navbar /></div><br />
      <div className="row">
        <div className="col-sm-3">
        <button className="btn btn-primary" onClick={()=>navigate('/report-dashboard')}>Back</button>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-5"><h2>Booking Details</h2></div>
        <div className="col-sm-3"></div>
        <div className="col-sm-2">
          <CSVLink
            data={csvData}
            headers={headers}
            filename="booking_report.csv"
            className="btn btn-success mb-3"
          >
            Download CSV
          </CSVLink>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <SearchBar onSearch={handleFilter} onReset={handleReset} />
        </div>
        <div className="col-md-4"></div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <table className="table table-bordered table-striped mt-4">
            <thead className="bg-primary text-white">
              <tr>
                <th>Booking Id</th>
                <th>Booking Date</th>
                <th>Hotel Name</th>
                <th>Hotel City</th>
                <th>Room Id</th>
                <th>CheckIn</th>
                <th>CheckOut</th>
                <th>Customer Name</th>
                <th>Customer Email</th>
                <th>Customer Phone</th>
                <th>Customer Address</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.length > 0 ? (
                currentRecords.map((b, index) => (
                  <tr key={index}>
                    <td>{b.id}</td>
                    <td>{b.bookedAt.split("T")[0]}</td>
                    <td>{b.room.hotel.name}</td>
                    <td>{b.room.hotel.city}</td>
                    <td>{b.room.id}</td>
                    <td>{b.checkIn}</td>
                    <td>{b.checkOut}</td>
                    <td>{b.customer.name}</td>
                    <td>{b.customer.email}</td>
                    <td>{b.customer.contact}</td>
                    <td>{b.customer.address}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center">No matching records found</td>
                </tr>
              )}
            </tbody>
          </table>

          <nav>
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
              </li>
              {
                Array.from({ length: totalPages }, (_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                  </li>
                ))
              }
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
