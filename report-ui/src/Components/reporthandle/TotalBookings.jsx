import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import Icon from './Icons';
import axios from 'axios';
import { Chart } from 'primereact/chart';
import { useNavigate } from 'react-router';
function TotalBooking() {

  const [totalBooking, setTotalBooking] = useState();
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    
    const getTotalBooking = async () => {
      try {
        const token = localStorage.getItem('token');
        const resp = await axios.get('http://localhost:8083/api/report/countofbookings',
          {
          headers:
          {
              "Authorization":`Bearer ${token}`
          }
        });
        setTotalBooking(resp.data);
        // console.log(resp.data);
      }
      catch (err) {
        console.log(err);
      }
    }
    const getDoughnutChartData = async () => {
      try {
        const token = localStorage.getItem('token');
        const resp = await axios.get('http://localhost:8083/api/report/monthly-bookings',
          {
            headers:
            {
                "Authorization":`Bearer ${token}`
            }
          }
        ); 
        // console.log(resp.data); 
        const darkColors = [
          '#1E88E5', // Dark Blue
          '#D32F2F', // Dark Red
          '#388E3C', // Dark Green
          '#F57C00', // Dark Orange
          '#7B1FA2', // Dark Purple
          '#1976D2', // Steel Blue
          '#C2185B', // Dark Pink
          '#455A64', // Blue Grey
          '#5D4037', // Dark Brown
          '#0288D1', // Cyan
          '#512DA8', // Deep Indigo
          '#00796B'  // Teal
        ];        
        const data = {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              data: resp.data,
              backgroundColor: darkColors,
              hoverBackgroundColor: darkColors
            }
          ]
        };

        const options = {
          cutout: '60%',
          plugins: {
            legend: {
              labels: {
                color: '#333'
              }
            }
          }
        };

        setChartData(data);
        setChartOptions(options);
      } catch (err) {
        console.error("Failed to fetch doughnut chart data:", err);
      }
    };

    getDoughnutChartData();
    getTotalBooking();
  }, [])

  return (
    <div className="report-card">
    <div className="report-card-header" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Icon name="calendar-check" size="25px" color="green" />
      <h3 className="report-title">Total Booking</h3>
      <button className='btn btn-primary' onClick={()=>navigate("/detail-bookings")}>Details</button>
    </div>
  
    <div className="card-body">
      <div>
        <h2>{totalBooking !== undefined && totalBooking !== null ? totalBooking : "No data available"}</h2>
      </div>
  
      <div>
        <p>Overall booking through website...</p>
      </div>
  
      <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
        <Chart
          type="doughnut"
          data={chartData}
          options={chartOptions}
          style={{ width: '100%', height: '350px' }}
        />
      </div>
    </div>
  </div>
  
  );
};

export default TotalBooking;
