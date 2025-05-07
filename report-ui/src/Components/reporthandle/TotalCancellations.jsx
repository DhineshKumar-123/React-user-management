import React, { useEffect, useState } from 'react';
import Icon from './Icons'; 
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useNavigate } from 'react-router';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TotalCancellations = () => {
  const [statusCounts, setStatusCounts] = useState({});
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [count, setCount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getTotalCancelCount = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          "http://localhost:8083/api/cancellationrequest/getall",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;

        const counts = data.reduce((acc, curr) => {
          const status = curr.status;
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});
        setStatusCounts(counts);
        setCount(data.length);

        const chartLabels = Object.keys(counts);
        const chartValues = Object.values(counts);


        const colorMap = {
          REQUESTED: 'rgba(255, 205, 86, 0.8)',   // Yellow
          APPROVED: 'rgba(75, 192, 192, 0.8)',    // Teal
          REJECTED: 'rgba(255, 99, 132, 0.8)',    // Red
        };

        const backgroundColors = chartLabels.map(
          label => colorMap[label] || 'rgba(153, 102, 255, 0.8)' 
        );

        const borderColors = backgroundColors.map(color => color.replace("0.8", "1"));

        setChartData({
          labels: chartLabels,
          datasets: [
            {
              label: 'Cancellation Count',
              data: chartValues,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1,
              hoverBackgroundColor: backgroundColors.map(c => c.replace("0.8", "0.9")),
            },
          ],
        });

        setChartOptions({
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Cancellations by Status' },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { precision: 0 },
            },
          },
        });
      } catch (error) {
        console.error("Error fetching cancellation requests:", error);
      }
    };

    getTotalCancelCount();
  }, []);

  return (
    <div className="report-card">
      <div className="report-card-header">
        <Icon name="x-circle" size="25px" color="red" />
        <h3 className="report-title">Total Cancellations</h3>
        <button className='btn btn-primary' onClick={() => navigate("/detail-cancellations")}>Details</button>
      </div>

      <ul className="report-details">
        <div>
          <h2>{count !== null ? count : "No data available"}</h2>
        </div>
        {Object.entries(statusCounts).map(([status, count]) => (
          <li key={status}>
            <strong>{status}</strong>: {count}
          </li>
        ))}
      </ul>

      {chartData.labels && (
        <div style={{ marginTop: '150px' }}>
          <Bar data={chartData} options={chartOptions} style={{ width: '100%', height: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default TotalCancellations;
