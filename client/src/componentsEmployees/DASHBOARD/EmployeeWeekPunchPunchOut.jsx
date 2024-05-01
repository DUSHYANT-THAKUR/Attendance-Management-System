import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from '../config/baseUrl';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const Backlog = () => {
  let auth = localStorage.getItem("user");
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
let result = await axios.post(`${baseUrl}/EmployeeThisWeekPunchInPunchOut`,{},config)
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
              <th>Day</th>
              <th>Punch In</th>
              <th>Punch Out</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.Day}</td>
                <td>{item.First_in}</td>
                <td>{item.Last_out}</td>
                <td> {item.Status === 'Present' ? (   
                      <button type="button" class="btn btn-outline-info"><HowToRegIcon  style={{ color: 'green' }} /></button>
                    ) : (   
                      <button type="button" class="btn btn-outline-danger"><HowToRegIcon  style={{ color: 'red' }} /></button>
                    )}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Backlog;