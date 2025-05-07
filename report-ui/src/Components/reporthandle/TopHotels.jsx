import React, { useEffect, useState } from 'react';
import Icon from './Icons';
import axios from 'axios';
import './TopHotels.css'; 

function TopHotelsByRevenue() {
  const [hotellist, setHotelList] = useState([]);
  const [revenuelist, setRevenueList] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchHotelsRevenue = async () => {
      try {
        const token = localStorage.getItem('token');
        const hotelResponse = await axios.get(
          'http://localhost:8083/api/report/allhotels',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setHotelList(hotelResponse.data);

        const hotelRevenueData = [];

        for (const hotel of hotelResponse.data) {
          const revenueResponse = await axios.get(
            `http://localhost:8083/api/report/totalamount/${hotel.id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          hotelRevenueData.push({
            id: hotel.id,
            name: hotel.name,
            revenue: revenueResponse.data,
          });
        }

        hotelRevenueData.sort((a, b) => b.revenue - a.revenue);
        setRevenueList(hotelRevenueData);

      } catch (error) {
        console.error('Error fetching hotels with revenues:', error);
      }
    };

    fetchHotelsRevenue();
  }, []);

  const displayedHotels = showAll ? revenuelist : revenuelist.slice(0, 5);

  return (
    <div className="report-card">
      <div className="report-card-header">
        <Icon name="house-door" size="25px" color="#007bff" />
        <h3 className="report-title">Top Hotels By Revenue</h3>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Hotel Name</th>
              <th>(₹) Revenue</th>
            </tr>
          </thead>
          <tbody>
            {displayedHotels.map((hotel) => (
              <tr key={hotel.id}>
                <td>{hotel.name}</td>
                <td>₹ {hotel.revenue ? hotel.revenue.toFixed(2).toLocaleString() : "0"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {revenuelist.length > 5 && (
          <button
            className="toggle-btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Top 5" : "Show All"}
          </button>
        )}
      </div>
    </div>
  );
}

export default TopHotelsByRevenue;
