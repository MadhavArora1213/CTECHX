import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getStudentActivity } from '../../utils/helpers';
import { Chart, registerables } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

// Register all Chart.js components
Chart.register(...registerables);

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [activityData, setActivityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('month'); // 'week', 'month', 'year'

  useEffect(() => {
    const fetchData = async () => {
      try {
        // For demo purposes, create some mock data
        const mockData = {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              label: 'Student Activity',
              data: [12, 19, 3, 5, 2, 3, 7],
              backgroundColor: 'rgba(129, 140, 248, 0.6)',
              borderColor: 'rgb(129, 140, 248)',
              borderWidth: 1
            }
          ]
        };
        
        setActivityData(mockData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  const attendanceData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        label: 'Attendance',
        data: [85, 15],
        backgroundColor: [
          'rgba(52, 211, 153, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          'rgb(52, 211, 153)',
          'rgb(239, 68, 68)'
        ],
        borderWidth: 1
      }
    ]
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1 rounded-md ${timeRange === 'week' ? 'bg-indigo-600' : 'bg-gray-700'}`}
          >
            Week
          </button>
          <button 
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1 rounded-md ${timeRange === 'month' ? 'bg-indigo-600' : 'bg-gray-700'}`}
          >
            Month
          </button>
          <button 
            onClick={() => setTimeRange('year')}
            className={`px-3 py-1 rounded-md ${timeRange === 'year' ? 'bg-indigo-600' : 'bg-gray-700'}`}
          >
            Year
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-medium mb-4">Student Activity</h3>
          {activityData && <Bar 
            data={activityData}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: { color: 'white' }
                }
              },
              scales: {
                x: {
                  ticks: { color: 'white' },
                  grid: { color: 'rgba(255, 255, 255, 0.1)' }
                },
                y: {
                  ticks: { color: 'white' },
                  grid: { color: 'rgba(255, 255, 255, 0.1)' }
                }
              }
            }}
            height={250}
          />}
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-medium mb-4">Attendance Overview</h3>
          <div className="h-[250px]">
            <Line
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                  {
                    label: 'Attendance %',
                    data: [88, 92, 85, 89, 94, 90],
                    fill: false,
                    borderColor: 'rgb(52, 211, 153)',
                    tension: 0.1
                  }
                ]
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    labels: { color: 'white' }
                  }
                },
                scales: {
                  x: {
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                  },
                  y: {
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    min: 0,
                    max: 100
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-medium mb-2">Total Students</h3>
          <p className="text-3xl font-bold text-indigo-400">124</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-medium mb-2">Average XP</h3>
          <p className="text-3xl font-bold text-purple-400">432</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-medium mb-2">Avg. Attendance</h3>
          <p className="text-3xl font-bold text-green-400">89%</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-medium mb-2">Badges Awarded</h3>
          <p className="text-3xl font-bold text-yellow-400">286</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;