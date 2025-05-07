import React, { useEffect, useState } from 'react';
import Icon from './Icons';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Chart } from 'primereact/chart';
const ReviewAnalysis = () => {

  const [totalReviews, setTotalReviews] = useState(null);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const getTotalReviews = async () => {
      try {
        const token = localStorage.getItem('token')
        const resp = await axios.get('http://localhost:8083/api/report/all-reviews-count',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTotalReviews(resp.data);
        // console.log(resp.data);
      }
      catch (err) {
        console.log(err);
      }
    }
    const getDoughnutChartData = async () => {
      try {
        const token = localStorage.getItem('token')
        const resp = await axios.get('http://localhost:8083/api/report/ratings-count',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // console.log(resp.data); 
        const darkColors = [
          "#D32F2F", // 1 Star  
          "#F57C00", // 2 Stars  
          "#FBC02D", // 3 Stars  
          "#388E3C", // 4 Stars  
          "#2E7D32"  // 5 Stars


        ];
        const data = {
          labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
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
    getTotalReviews();
  }, [])


  return (
    <div className="report-card">
      <div className="report-card-header">
        <Icon name="star" size="25px" color="gold" ></Icon>
        <h3 className="report-title">Reviews Analysis</h3>
        <button className='btn btn-primary' onClick={()=>navigate("/detail-reviews")}>Details</button>
      </div>
       <div className="card-body">
            <div>
              <h2>{totalReviews !== undefined && totalReviews !== null ? totalReviews : "No data available"}</h2>
            </div>
        
            <div>
              <p>Overall Reviews through website...</p>
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

export default ReviewAnalysis;
