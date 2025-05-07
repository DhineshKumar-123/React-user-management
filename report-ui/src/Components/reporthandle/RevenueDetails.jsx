import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { CSVLink } from 'react-csv';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router';

function RevenueDetails() {
  const [revenuedetails, setRevenueDetails] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const navigate = useNavigate()

  useEffect(() => {
    const getRevenueDetails = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:8083/api/report/getlistofpayment',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRevenueDetails(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRevenueDetails();
  }, []);

  const handleSearch = ({ fromDate, toDate, location }) => {
    let filtered = revenuedetails;

    if (fromDate) {
      filtered = filtered.filter(r => new Date(r.paymentDate) >= new Date(fromDate));
    }

    if (toDate) {
      filtered = filtered.filter(r => new Date(r.paymentDate) <= new Date(toDate));
    }

    if (location) {
      filtered = filtered.filter(r =>
        r.booking.room.hotel.name.toLowerCase().includes(location.toLowerCase())
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  };
  const handleReset = () => {
    setFilteredData([]);
    setCurrentPage(1);
  };
  

  // Decide which data to display
  const dataToDisplay = filteredData.length > 0 ? filteredData : revenuedetails;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = dataToDisplay.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(dataToDisplay.length / recordsPerPage);

  const headers = [
    { label: "Payment Id", key: "id" },
    { label: "Payment Date", key: "paymentDate" },
    { label: "Total Amount", key: "totalAmount" },
    { label: "Amount Paid", key: "amountPaid" },
    { label: "Payment Type", key: "paymentMethod" },
    { label: "Booking Id", key: "booking.id" },
    { label: "Hotel Name", key: "booking.room.hotel.name" },
    { label: "Room Id", key: "booking.room.id" },
    { label: "CheckIn", key: "booking.checkIn" },
    { label: "CheckOut", key: "booking.checkOut" },
    { label: "Customer Id", key: "booking.customer.id" },
    { label: "Customer Name", key: "booking.customer.name" },
    { label: "Customer Email", key: "booking.customer.email" }
  ];

  const csvData = dataToDisplay.map(r => ({
    id: r.id,
    paymentDate: r.paymentDate.split('T')[0],
    totalAmount: r.totalAmount,
    amountPaid: r.amountPaid,
    paymentMethod: r.paymentMethod,
    "booking.id": r.booking.id,
    "booking.room.hotel.name": r.booking.room.hotel.name,
    "booking.room.id": r.booking.room.id,
    "booking.checkIn": r.booking.checkIn,
    "booking.checkOut": r.booking.checkOut,
    "booking.customer.id": r.booking.customer.id,
    "booking.customer.name": r.booking.customer.name,
    "booking.customer.email": r.booking.customer.email,
  }));

  return (
    <div className='container-fluid'>
      <div className='row'>
        <Navbar />
      </div>
      <br />
      <div className="row">
        <div className="col-sm-3">
        <button className="btn btn-primary" onClick={()=>navigate('/report-dashboard')}>Back</button>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-5'>
          <h2>Revenue Details</h2>
        </div>
        <div className='col-sm-3'></div>
        <div className='col-sm-2'>
          <CSVLink
            data={csvData}
            headers={headers}
            filename="revenue_report.csv"
            className="btn btn-success mb-3"
          >
            Download CSV
          </CSVLink>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-8'>
          <SearchBar onSearch={handleSearch}  onReset={handleReset}/>
        </div>
        <div className='col-md-4'></div>
      </div>

      <div className='row'>
        <div className='col-lg-12'>
          <table className="table table-bordered table-striped mt-4">
            <thead className='bg-primary text-white'>
              <tr>
                <th>Payment Id</th>
                <th>Payment Date</th>
                <th>Total Amount</th>
                <th>Amount Paid</th>
                <th>Payment Type</th>
                <th>Booking Id</th>
                <th>Hotel Name</th>
                <th>Room Id</th>
                <th>CheckIn</th>
                <th>CheckOut</th>
                <th>Customer Id</th>
                <th>Customer Name</th>
                <th>Customer Email</th>
              </tr>
            </thead>
            <tbody>
              {
                currentRecords.map((r, index) => (
                  <tr key={index}>
                    <td>{r.id}</td>
                    <td>{r.paymentDate.split('T')[0]}</td>
                    <td>{r.totalAmount}</td>
                    <td>{r.amountPaid}</td>
                    <td>{r.paymentMethod}</td>
                    <td>{r.booking.id}</td>
                    <td>{r.booking.room.hotel.name}</td>
                    <td>{r.booking.room.id}</td>
                    <td>{r.booking.checkIn}</td>
                    <td>{r.booking.checkOut}</td>
                    <td>{r.booking.customer.id}</td>
                    <td>{r.booking.customer.name}</td>
                    <td>{r.booking.customer.email}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>

          {/* Pagination Controls */}
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

export default RevenueDetails;
