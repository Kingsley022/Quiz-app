import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import map from '../../../utils/images/map.png';
import Menu from '../menu';
import '../../../styles/analytics.css';
import NavBar from './../nav';
import ColorfulHeader from './../../../common/colorfulHeader';

const Analytics = () => {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);

  useEffect(() => {
    // create chart 1
    if (chartRef1.current) {
      chartRef1.current.destroy();
    }
    const ctx1 = document.getElementById('myChart1').getContext('2d');
    const myChart1 = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['Nigeria', 'USA', 'India', 'UK', 'Germany'],
        datasets: [{
          label: 'Most User Location',
          data: [5000, 3500, 2000, 1500, 1000],
          backgroundColor: [
            '#4CAF50',
            '#F44336',
            '#FFC107',
            '#3F51B5',
            '#009688'
          ],
          borderColor: [
            '#4CAF50',
            '#F44336',
            '#FFC107',
            '#3F51B5',
            '#009688'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    chartRef1.current = myChart1;

    // create chart 2
    if (chartRef2.current) {
      chartRef2.current.destroy();
    }
    const ctx2 = document.getElementById('myChart2').getContext('2d');
    const myChart2 = new Chart(ctx2, {
      type: 'line',
      data: {
        labels: ['Science', 'Math', 'History', 'Entertainment', 'Sports'],
        datasets: [{
          label: 'Most Category Taken',
          data: [450, 1200, 300, 800, 400],
          backgroundColor: '#098976',
          borderColor: '#FFC107',
          borderWidth: 2,
          pointBackgroundColor: '#009688',
          pointBorderColor: '#009688',
          pointRadius: 4,
          pointHoverRadius: 6,
          cubicInterpolationMode: 'monotone'
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: true
          }
        }
      }
    });
    chartRef2.current = myChart2;
  }, []);

  return (
    <div className="dashboard">
      <Menu/>
      <div className="main">
        <NavBar/>
        <div className="analytics">
          <div className="chart-container">
            <ColorfulHeader placeholder='Most Location'/>
            <canvas id="myChart1"></canvas>
            <ColorfulHeader placeholder='Most category'/>
            <canvas id="myChart2"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
