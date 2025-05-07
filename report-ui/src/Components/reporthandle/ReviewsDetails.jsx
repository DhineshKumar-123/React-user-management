import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router";
import { CSVLink } from "react-csv";

function ReviewDetails() {
  const [detailReview, setDetailReview] = useState([]);
  const [selectedRating, setSelectedRating] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 7;
  const navigate = useNavigate();

  useEffect(() => {
    const getReviewDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8083/api/report/reviews-list",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDetailReview(response.data);
      } catch (err) {
        console.log("Error fetching reviews: ", err);
      }
    };
    getReviewDetails();
  }, []);

  const getRatingColor = (rating) => {
    if (rating >= 4) return "#198754"; // green
    if (rating === 3) return "#ffc107"; // yellow
    return "#dc3545"; // red
  };

  const filteredReviews =
    selectedRating === "All"
      ? detailReview
      : detailReview.filter((r) => r.rating === parseInt(selectedRating));

  const searchedReviews = filteredReviews.filter(
    (r) =>
      r.booking.customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchText.toLowerCase()) ||
      r.booking.room.hotel.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = searchedReviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(searchedReviews.length / reviewsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const csvData = searchedReviews.map((review, index) => ({
    SNo: index + 1,
    Rating: review.rating,
    Comment: review.comment,
    ReviewDate: new Date(review.reviewDate).toLocaleDateString(),
    HotelName: review.booking.room.hotel.name,
    CustomerName: review.booking.customer.name,
  }));

  return (
    <div className="container-fluid">
      <div className="row"><Navbar /></div><br />

      <div className="row mb-3">
        <div className="col-sm-3">
          <button className="btn btn-primary" onClick={() => navigate('/report-dashboard')}>Back</button>
        </div>
        <div className="col-sm-3">
          <select
            className="form-select"
            value={selectedRating}
            onChange={(e) => {
              setSelectedRating(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Ratings</option>
            <option value="5">5 ★</option>
            <option value="4">4 ★</option>
            <option value="3">3 ★</option>
            <option value="2">2 ★</option>
            <option value="1">1 ★</option>
          </select>
        </div>
        <div className="col-sm-3">
          <CSVLink
            className="btn btn-success"
            data={csvData}
            filename={"review-report.csv"}
          >
            Download CSV
          </CSVLink>
        </div>
        <div className="col-sm-3 d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search by name, comment, hotel..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
          />
          <button className="btn btn-secondary" onClick={() => setSearchText("")}>
            Reset
          </button>
        </div>
      </div>

      <h2 className="mb-4 text-center">Customer Reviews</h2>
      <div className="table-responsive shadow-sm">
        <table className="table table-bordered table-striped bg-white">
          <thead className="table-dark">
            <tr>
              <th>S.No</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Review Date</th>
              <th>Hotel Name</th>
              <th>Customer Name</th>
            </tr>
          </thead>
          <tbody>
            {currentReviews.length > 0 ? (
              currentReviews.map((review, index) => (
                <tr key={review.id}>
                  <td>{indexOfFirstReview + index + 1}</td>
                  <td>
                    <span
                      style={{
                        backgroundColor: getRatingColor(review.rating),
                        color: "white",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      {review.rating} ★
                    </span>
                  </td>
                  <td>{review.comment}</td>
                  <td>{new Date(review.reviewDate).toLocaleDateString()}</td>
                  <td>{review.booking.room.hotel.name}</td>
                  <td>{review.booking.customer.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No reviews available.
                </td>
              </tr>
            )}
          </tbody>
        </table><br />
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>

              {[...Array(totalPages)].map((_, idx) => (
                <li
                  key={idx + 1}
                  className={`page-item ${currentPage === idx + 1 ? "active" : ""}`}
                >
                  <button className="page-link" onClick={() => handlePageChange(idx + 1)}>
                    {idx + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
      <div>
        <br />
      </div>
    </div>
  );
}

export default ReviewDetails;
