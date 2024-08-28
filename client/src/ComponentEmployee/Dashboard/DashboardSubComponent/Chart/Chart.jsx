import React, { useEffect, useState } from 'react';
import {
  Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart
} from 'recharts';
import axios from 'axios';
import baseUrl from '../../../config/baseUrl';
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
const Chart = ({ totalCommissions, setTotalCommissions,todayCommission,setTodayCommission }) => {
  const [selectedView, setSelectedView] = useState('weekly');
  const [data, setData] = useState({});
  const auth = localStorage.getItem('user');
  const fetchData = async () => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${auth}`,
        },
      };
      // const result = await axios.post(`${baseUrl}/commissionCalculation`, {}, config);
      // const apiData = result.data.result;
      // console.log(apiData);
      // let todayData = !apiData.todays ? 0 : apiData.todays;
      // setTodayCommission(todayData);
      // const formattedData = {
      //   weekly: apiData.weekly.map(item => ({
      //     name: item.day,
      //     revenue: parseFloat(item.commission),
      //   })),
      //   monthly: apiData.monthly.map(item => ({
      //     name: item.month, 
      //     revenue: parseFloat(item.commission),
      //   })),
      //   yearly: apiData.yearly.map(item => ({
      //     name: item.year,
      //     revenue: parseFloat(item.commission),
      //   })),
      // };
      // setData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
     fetchData();
  }, []);
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