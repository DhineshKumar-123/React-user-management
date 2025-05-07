import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router";

function AddDiscount() {
  const [listofhotels, setListofHotels] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDiscounts, setShowDiscounts] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [discount, setDiscount] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [coupon, setCoupon] = useState("");
  const [description, setDescription] = useState("");
  const [hotelDiscounts, setHotelDiscounts] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const getListofHotels = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8083/api/report/allhotels", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setListofHotels(response.data);
      } catch (err) {
        console.log("Error fetching hotels");
      }
    };
    getListofHotels();
  }, []);

  const handleAddDiscountClick = async (hotel) => {
    setSelectedHotel(hotel);
    setShowForm(false);
    setShowDiscounts(false);
    setSelectedSeason(null);
    setDiscount("");
    setValidUntil("");
    setValidFrom("");
    setCoupon("");
    setDescription("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8083/api/season/getall", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSeasons(res.data);
    } catch (error) {
      console.log("Error fetching seasons", error);
      setSeasons([]);
    }
  };

  const handleViewDiscountsClick = async (hotel) => {
    setSelectedHotel(hotel);
    setShowForm(false);
    setSeasons([]);
    setSelectedSeason(null);
    setShowDiscounts(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8083/api/discount/get-discount-hotel/${hotel.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHotelDiscounts(response.data);
    } catch (error) {
      console.log("Error fetching discounts", error);
      setHotelDiscounts([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:8083/api/discount/add/${selectedHotel.id}/${selectedSeason.id}`,
        {
          hotelId: selectedHotel.id,
          seasonId: selectedSeason.id,
          coupon,
          description,
          percentage: discount,
          validFromm: validFrom,
          validTo: validUntil,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Discount added successfully");

      // Reset form
      setShowForm(false);
      setSelectedSeason(null);
      setDiscount("");
      setValidUntil("");
      setValidFrom("");
      setCoupon("");
      setDescription("");
      setSeasons([]);
    } catch (error) {
      console.error("Error submitting discount", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar />
      </div><br />
      <div className="row">
      <div className="col-sm-3">
          <button className="btn btn-primary" onClick={() => navigate('/report-dashboard')}>Back</button>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <table className="table table-bordered table-striped bg-white mt-3">
            <thead className="table-dark">
              <tr>
                <td>S.No</td>
                <td>Hotel Name</td>
                <td>Hotel City</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {listofhotels.map((l, index) => (
                <tr key={index}>
                  <td>{l.id}</td>
                  <td>{l.name}</td>
                  <td>{l.city}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-info btn-sm" onClick={() => handleViewDiscountsClick(l)}>View Discounts</button>
                      <button className="btn btn-success btn-sm" onClick={() => handleAddDiscountClick(l)}>Add Discounts</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Season Selection */}
          {seasons.length > 0 && !selectedSeason && selectedHotel && (
            <div className="card mt-4 p-4 shadow-sm">
              <h5>Select Season for: {selectedHotel.name}</h5>
              <ul className="list-group">
                {seasons.map((s, i) => (
                  <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                    {s.name} ({s.startDate} to {s.endDate})
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => {
                        setSelectedSeason(s);
                        setShowForm(true);
                      }}
                    >
                      Select
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Discount Form with Event Handleer */}
          {showForm && selectedHotel && selectedSeason && (
            <div className="card mt-4 p-4 shadow-sm">
              <h5>Add Discount for {selectedHotel.name} - {selectedSeason.name}</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Coupon Code</label>
                  <input
                    type="text"
                    className="form-control"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Discount Percentage</label>
                  <input
                    type="number"
                    className="form-control"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Valid From</label>
                  <input
                    type="date"
                    className="form-control"
                    value={validFrom}
                    onChange={(e) => setValidFrom(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Valid Until</label>
                  <input
                    type="date"
                    className="form-control"
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Submit Discount</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => {
                  setShowForm(false);
                  setSelectedSeason(null);
                }}>
                  Cancel
                </button>
              </form>
            </div>
          )}

          {/* Discount View Section */}
          {showDiscounts && selectedHotel && (
            <div className="card mt-4 p-4 shadow-sm">
              <h5 className="mb-3">Discounts for: {selectedHotel.name}</h5>
              {hotelDiscounts.length > 0 ? (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Coupon Code</th>
                      <th>Description</th>
                      <th>Discount %</th>
                      <th>Valid From</th>
                      <th>Valid To</th>
                      <th>Season Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotelDiscounts.map((d, idx) => (
                      <tr key={idx}>
                        <td>{d.coupon}</td>
                        <td>{d.description}</td>
                        <td>{d.percentage}%</td>
                        <td>{d.validFromm}</td>
                        <td>{d.validTo}</td>
                        <td>{d.season.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No discounts available for this hotel.</p>
              )}
              <button
                className="btn btn-secondary mt-2"
                onClick={() => {
                  setShowDiscounts(false);
                  setHotelDiscounts([]);
                }}
              >
                Close
              </button>
            </div>
          )}
        </div>
        <div className="col-sm-2"></div>
      </div>
    </div>
  );
}

export default AddDiscount;
