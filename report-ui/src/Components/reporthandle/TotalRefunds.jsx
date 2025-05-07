import React, { useEffect, useState } from 'react';
import Icon from './Icons';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Chart } from 'primereact/chart';
import "./TotalRefund.css";

const TotalRefunds = () => {
  const [totalrefundcount, setTotalRefundCount] = useState(null);
  const [refundStatusCounts, setRefundStatusCounts] = useState({});
  const [chartData, setChartData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getTotalRefundCount = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8083/api/refund/getall', {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const refunds = response.data;
        setTotalRefundCount(refunds.length);

        // Count refund statuses
        const statusMap = {};
        refunds.forEach((refund) => {
          const status = refund.refundStatus || 'UNKNOWN';
          statusMap[status] = (statusMap[status] || 0) + 1;
        });
        setRefundStatusCounts(statusMap);

        // Prepare doughnut chart data
        const labels = Object.keys(statusMap);
        const data = Object.values(statusMap);

        setChartData({
          labels,
          datasets: [
            {
              data,
              backgroundColor: ['#28a745', '#ffc107', '#dc3545', '#6c757d'], // success, pending, fail, other
              hoverBackgroundColor: ['#218838', '#e0a800', '#c82333', '#5a6268'],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching refund data:", error);
      }
    };

    getTotalRefundCount();
  }, []);

  return (
    <div className="report-card">
      <div className="report-card-header">
        <Icon name="arrow-counterclockwise" size="25px" color="#007bff" />
        <h3 className="report-title">Total Refunds Given</h3>
        <button className='btn btn-primary' onClick={() => navigate("/detail-refunds")}>Details</button>
      </div>

      <div className="card-body">
        <div>
          <h2>{totalrefundcount !== undefined && totalrefundcount !== null ? totalrefundcount : "No data available"}</h2>
        </div>

        <div>
          <p>Overall Refund Given...</p>
        </div>

        <div style={{ maxWidth: '100%', margin: '0 auto' }}>
          {chartData.labels && chartData.labels.length > 0 ? (
            <Chart type="doughnut" data={chartData}  style={{ width: '100%', height: '350px' }} />
          ) : (
            <p className="text-muted text-center">No chart data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalRefunds;
