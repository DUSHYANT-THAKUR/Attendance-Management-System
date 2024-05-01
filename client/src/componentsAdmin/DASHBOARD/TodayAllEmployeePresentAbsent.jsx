import React, { useEffect, useState } from "react";
import "./BirthdayCard.css";
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import axios from "axios";
import baseUrl from '../config/baseUrl';

const Backlog = () => {
  let auth = localStorage.getItem("admin");
  let [data,setData] = useState([])
 async function totalPresentAbsent(){
  try {
    let config = {
     headers : {
      "Content-type" : "application/json",
      accept : "application/json",
      Authorization : `Bearer ${auth}`
     }
    }
let result = await axios.post(`${baseUrl}/employeeTotalAbsentPresentWeek`,{},config)
console.log(result.data.result);
 setData(result.data.result)
  } catch (error) {
    console.log(error)
  }
 }
useEffect(()=>{
  totalPresentAbsent();
},[])
  return (
    <div className="backlogCard mt-4">
      <div className="heading">
        <p className="backlogTitle">This Week</p>
        <p className="viewDetails">View details</p>
      </div>
      <div className="dataTable">
        <table>
          <thead>
            <tr>
              {/* <th></th> */}
              <th>Name</th>
              <th>No. days(Present)</th>
              <th>No. days(Absent)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="name">{item.name}</div>
                  <div className="designation">{item.team}</div>
                </td>
                <td>{item.present_count}</td>
                <td>{item.absent_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Backlog;