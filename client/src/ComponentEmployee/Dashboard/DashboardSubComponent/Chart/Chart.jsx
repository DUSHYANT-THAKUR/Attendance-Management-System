import React, { useEffect, useState } from 'react';
import {
  Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart
} from 'recharts';
import './Chart.css';
// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Revenue: $${payload[0].value}`}</p>
        <p className="intro">{label}</p>
      </div>
    );
  }
  return null;
};
const Chart = ({ totalCommissions, setTotalCommissions, todayCommission, setTodayCommission }) => {
  const [selectedView, setSelectedView] = useState('weekly');
  const [data, setData] = useState({});
  // Setting static data
  useEffect(() => {
    const staticData = {
      weekly: [
        { name: 'Monday', revenue: 1200 },
        { name: 'Tuesday', revenue: 2100 },
        { name: 'Wednesday', revenue: 800 },
        { name: 'Thursday', revenue: 1600 },
        { name: 'Friday', revenue: 900 },
        { name: 'Saturday', revenue: 3000 },
        { name: 'Sunday', revenue: 1500 },
      ],
      monthly: [
        { name: 'January', revenue: 10000 },
        { name: 'February', revenue: 8500 },
        { name: 'March', revenue: 12000 },
        { name: 'April', revenue: 7500 },
        { name: 'May', revenue: 9500 },
        { name: 'June', revenue: 8000 },
        { name: 'July', revenue: 11000 },
        { name: 'August', revenue: 9000 },
        { name: 'September', revenue: 10500 },
        { name: 'October', revenue: 11500 },
        { name: 'November', revenue: 9500 },
        { name: 'December', revenue: 13000 },
      ],
      yearly: [
        { name: '2021', revenue: 95000 },
        { name: '2022', revenue: 120000 },
        { name: '2023', revenue: 110000 },
        { name: '2024', revenue: 140000 },
      ],
    };
    setData(staticData);
    setTodayCommission(staticData.weekly[0].revenue); // Example: setting today's commission
  }, [setTodayCommission]);
  useEffect(() => {
    if (data[selectedView]) {
      const totalRevenue = data[selectedView].reduce((acc, cur) => acc + cur.revenue, 0);
      setTotalCommissions(totalRevenue);
    }
  }, [selectedView, data, setTotalCommissions]);
  const handleButtonClick = (view) => {
    setSelectedView(view);
  };
  return (
    <div>
      <div className="chart-container card mt-4">
        <div className="buttons mt-4">
          <button onClick={() => handleButtonClick('weekly')}>Week</button>
          <button onClick={() => handleButtonClick('monthly')}>Month</button>
          <button onClick={() => handleButtonClick('yearly')}>Year</button>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={data[selectedView]}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Area
              dataKey="revenue"
              stroke="#00AAFF"
              fill="#00AAFF"
              fillOpacity={0.2}
              activeDot={{ r: 8 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default Chart;







