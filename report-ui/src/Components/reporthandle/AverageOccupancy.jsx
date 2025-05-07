import React, { useEffect, useState } from 'react';
import Icon from './Icons';
import axios from 'axios';
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';

const AverageOccupancy = () => {
  const [totalRooms, setTotalRooms] = useState(0);
  const [availableRooms, setAvailableRooms] = useState(0);
  const [bookedRooms, setBookedRooms] = useState(0);
  const [bookingPercentage, setBookingPercentage] = useState(0);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    const getAllRooms = async () => {
      try {
        const response = await axios.get("http://localhost:8083/api/room/getall");
        const rooms = response.data;

        const total = rooms.length;
        const available = rooms.filter(room => room.availabilityStatus === "AVAILABLE").length;
        const booked = total - available;
        const percentage = total > 0 ? ((booked / total) * 100).toFixed(2) : 0;

        setTotalRooms(total);
        setAvailableRooms(available);
        setBookedRooms(booked);
        setBookingPercentage(percentage);

        setChartData({
          labels: ['Booked', 'Available'],
          datasets: [
            {
              data: [booked, available],
              backgroundColor: ['#FF6384', '#36A2EB'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB']
            }
          ]
        });

        setChartOptions({
          plugins: {
            legend: {
              labels: {
                color: '#495057'
              }
            }
          }
        });
      }
      catch (err) {
        console.log(err);
      }
    }
    getAllRooms()
  }, [])


  return (
    <div className="report-card">
      <div className="report-card-header">
        <Icon name="graph-up-arrow" size="25px" color="#007bff"></Icon>
        <h3 className="report-title">Average Occupancy Rooms</h3>
      </div>
      <div className="p-col">
        <h3>Total Rooms: <Tag value={totalRooms} severity="info" /></h3>
        <p>Booked Rooms: <Tag value={bookedRooms} severity="danger" /></p>
        <p>Available Rooms: <Tag value={availableRooms} severity="success" /></p>
        <p>Occupancy Rate: <Tag value={`${bookingPercentage}%`} severity="warning" /></p>
      </div>
      <div className="p-col" style={{ maxWidth: '400px', maxHeight: '250px' }}>
        <Chart type="pie" data={chartData} options={chartOptions} style={{ width: '100%', height: '250px' }} />
      </div>
    </div>
  );
};

export default AverageOccupancy;
