import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from "axios"
import baseUrl from '../config/baseUrl';

const EmployeeThisWeek = () => {
  let auth = localStorage.getItem("user");
  let [data, setData] = useState([]);

  async function totalPresentAbsent() {
    try {
      let config = {
        headers: {
          "Content-type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${auth}`
        }
      }
      let result = await axios.post(`${baseUrl}/GraphWeekData`, {}, config);
      console.log(result.data.result)
      setData(result.data.result);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    totalPresentAbsent();
  }, [])

  return (
    <div>
      <div className='charts '>
        <BarChart width={400} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Day"/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Present" fill="#8884d8" name="Present" />
          <Bar dataKey="Absent" fill="red" name="Absent" />
        </BarChart>
      </div>
    </div>
  );
};

export default EmployeeThisWeek;
