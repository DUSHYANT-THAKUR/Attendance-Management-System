import React, { useState, useEffect} from 'react';
import { useStateContext } from "../../context/ContextProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import baseUrl from "../config/baseUrl.js";
const token = localStorage.getItem("user");


const DownloadTable = () => {
  const [profile, setProfile] = useState([]);

  const ReadData = async () => {
    try {
      let formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/downloadInfo`,
        formData,
        config
      );
      setProfile(result.data.default[0])
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    ReadData()
  },[])

  return (
    <>
      <table className="table" style={{ border: "2px solid #000" }}>
        <thead>
          <tr style={{ background: "#000", color: "#fff" }}>
            <th scope="col" colSpan={4}>
              <b>Profile</b>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody style={{ borderBottom: "1px solid rgb(51 51 51 / 18%)" }}>
          <tr>
            <th colSpan={4} className="tableHead">Name</th>
            <td>{profile.name}</td>
          </tr>
          <tr>
            <th colSpan={4} className="tableHead">Email</th>
            <td>{profile.email}</td>
          </tr>
          <tr>
            <th colSpan={4} className="tableHead">Employee ID</th>
            <td>{profile.empid}</td>
          </tr>
          <tr>
            <th colSpan={4} className="tableHead">Secret Key</th>
            <td>{profile.secretkey}</td>
          </tr>
          <tr>
            <th colSpan={4} className="tableHead">Gender</th>
            <td>{profile.gender}</td>
          </tr>
          <tr>
            <th colSpan={4} className="tableHead">Casualleave</th>
            <td>{profile.casualleave}</td>
          </tr>
          <tr>
            <th colSpan={4} className="tableHead">Sickleave</th>
            <td>{profile.sickleave}</td>
          </tr>
          <tr>
            <th colSpan={4} className="tableHead">Leaves</th>
            <td>{profile.leaves}</td>
          </tr>
          <tr>
            <th colSpan={4} className="tableHead">Team</th>
            <td>{profile.team}</td>
          </tr>
          <tr>
            <th colSpan={4} className="tableHead">Device</th>
            <td>{profile.device}</td>
          </tr>
          <tr>
            <th colSpan={4} className="tableHead">IP Address</th>
            <td>{profile.ipaddress}</td>
          </tr>
          <tr>
            <th colSpan={4} className="tableHead">Phone</th>
            <td>{profile.phone}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

function DownloadSetting() {
  const { downloadStatement } = useStateContext();

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="row containerdownlodSett my-4">
        <div className="row mb-3">
          <div className="col-6">
            <button
              className="print"
              onClick={() => window.print()}
            >
              🖶 Print
            </button>
          </div>
          <div className="col-6">
            <button className="backButton">
              <Link to="/bankconnect/merchant/Myinfo" style={{ color: "#fff" }}>
                Back
              </Link>
            </button>
          </div>
        </div>
        <div className="col-12">
          <DownloadTable downloadStatement={downloadStatement} />
        </div>
      </div>
    </div>
  );
}

export default DownloadSetting