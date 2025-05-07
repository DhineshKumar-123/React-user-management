import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Icon from './Icons';
import { Chart } from 'primereact/chart';
import axios from 'axios';
import { useNavigate } from 'react-router';

function TotalRevenueCard() {

  const [totalRevenue, setTotalRevenue] = useState(null);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getTotalRevenue = async () => {
      try {
        const token = localStorage.getItem('token')
        const resp = await axios.get('http://localhost:8083/api/report/getamountlist',
           {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTotalRevenue(resp.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getBarChartData = async () => {
      try {
        const token = localStorage.getItem('token')
        const resp = await axios.get('http://localhost:8083/api/report/monthly-revenue',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        // setMonthyData(resp.data)
        // console.log(resp.data);
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: 'Monthly Revenue',
              backgroundColor: documentStyle.getPropertyValue('--blue-500'),
              borderColor: documentStyle.getPropertyValue('--blue-500'),
              data: resp.data
            }
          ]
        };
        const options = {
          indexAxis: 'y',
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          plugins: {
            legend: {
              labels: {
                fontColor: textColor
              }
            }
          },
          scales: {
            x: {
              ticks: {
                color: textColorSecondary,
                font: {
                  weight: 500
                }
              },
              grid: {
                display: false,
                drawBorder: false
              }
            },
            y: {
              ticks: {
                color: textColorSecondary
              },
              grid: {
                color: surfaceBorder,
                drawBorder: false
              }
            }
          }
        };
  
        setChartData(data)
        setChartOptions(options);
      } 
      catch (err) {
        console.log(err);
      }
      
    }
    getBarChartData();
    getTotalRevenue();

  }, []);

  return (
    <div className="report-card">
      <div className="report-card-header">
        <Icon name="bi bi-bar-chart-fill" size="25px" color="#007bff" />
        <h3 className="report-title">Total Revenue</h3>
        <button className='btn btn-primary' onClick={()=>navigate("/detail-revenue")}>Details</button>
      </div>
      <div>
        <h2>₹ {totalRevenue ? totalRevenue : "No Revenue available Yet!!!!!"}</h2>
      </div>
      <div>
        <p>Overall Revenue through website...</p>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Chart type="bar" data={chartData} options={chartOptions} style={{ width: '100%', height: '350px' }} />
        </div>
      </div>
    </div>
  );
}

export default TotalRevenueCard;
