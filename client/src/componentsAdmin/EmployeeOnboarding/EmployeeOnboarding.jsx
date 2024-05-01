
import { Table, Button, Form } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions'
import CloseIcon from '@mui/icons-material/Close';
import PaginationComp from "../../commonAdminComponents/Pagination/PaginationComp"
import baseUrl from "../config/baseUrl";
import Search from "../../commonAdminComponents/SearchBox/Search";
import {useNavigate} from "react-router-dom"

function EmployeeOnboarding() {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [message, setMessage] = useState("");



  let auth = localStorage.getItem("admin")

  async function fetchData() {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      let value = {
        page: page,
        searchitem: search

      }
      // console.log("value is ")
      // console.log(value)
      let result = await axios.post(`${baseUrl}/viewDetails`, value, config);
      setData(result.data.data);
      setMessage(result.data.message);
      setTotalPage(Number(result.data.totalPage));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [page, search]);

  // const handleInputChange = (event) => {
  //   setSearch(event.target.value);
  // };
  // const handleSubmit = (event) => {
  //   event.preventDefault(); 
  // };


  const handleButtonClick = async (item) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };
    let value = {
      id: item
    }
    let result = await axios.post(`${baseUrl}/changestatusemployee`, value, config)
    console.log(result.data)
    fetchData();

  };

  const DialogOpen = ({ formData }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div>
        <button className="btn btn-outline-primary" onClick={handleClickOpen}>
          View
        </button>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth={false}
          maxWidth={'md'}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              top: '0',
              margin: '0',
              borderRadius: '30px',
            },
          }}
        >
          <button className="btn btn-outline-primary shadow-none" onClick={handleClose}>
            <CloseIcon />
          </button>
          <DialogTitle style={{ fontWeight: '700', fontSize: '20px' }}>Employee Details</DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-md-12 swapBox">
                <form className="row justify-content-around">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={formData.name} readOnly />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input type="text" className="form-control" value={formData.email} readOnly />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">EmployeeId</label>
                    <input type="text" className="form-control" value={formData.empid} readOnly />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Gender</label>
                    <input type="text" className="form-control" value={formData.gender} readOnly />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">DOB</label>
                    <input type="text" className="form-control" value={formData.dob} readOnly />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">DOJ</label>
                    <input type="text" className="form-control" value={formData.doj} readOnly />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nationality</label>
                    <input type="text" className="form-control" value={formData.nationality} readOnly />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Team</label>
                    <input type="text" className="form-control" value={formData.team} readOnly />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">DeviceName</label>
                    <input type="text" className="form-control" value={formData.device} readOnly />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">ClientIp</label>
                    <input type="text" className="form-control" value={formData.ipaddress} readOnly />
                  </div>

                </form>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  const EmployeeDetailsDialog = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [empid, setEmpid] = useState("")
    const [gender, setGender] = useState("")
    const [dob, setDob] = useState("")
    const [doj, setDoj] = useState("")
    const [team, setTeam] = useState("");
    const [nationality, setNationality] = useState("")
    const [device, setDevice] = useState("")
    const [clientip, setClientip] = useState("")
    const Navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${auth}`,
          },
        };
  
        let value = {
          name: name,
          email: email,
          empid: empid,
          gender: gender,
          dob: dob,
          doj: doj,
          team: team,
          nationality: nationality,
          device: device,
          ipaddress: clientip,
        };
        let result = await axios.post(`${baseUrl}/createNewEmployee`, value, config);
        console.log(result.data);
        fetchData()
        Navigate("/bankconnect/EmployeeOnboarding")
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div>
        <button className="btn btn-primary" onClick={handleClickOpen}>
          Add New
        </button>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth={false}
          maxWidth={'md'}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              top: '0',
              margin: '0',
              borderRadius: '30px',
            },
          }}
        >
          <button className="btn btn-outline-primary shadow-none" onClick={handleClose}>
            <CloseIcon />
          </button>
          <DialogTitle style={{ fontWeight: '700', fontSize: '20px' }}>New Employee </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-md-12 swapBox">
                <form className="row justify-content-around" onSubmit={handleSubmit}>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => {setName(e.target.value)}} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => {setEmail(e.target.value) }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">EmployeeId</label>
                    <input type="text" className="form-control" value={empid} onChange={(e) => { setEmpid(e.target.value) }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Gender</label>
                    <input type="text" className="form-control" value={gender} onChange={(e) => { setGender(e.target.value) }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" >DOB</label>
                    <input type="text" className="form-control" placeholder="YYYY-MM-DD" value={dob} onChange={(e) => { setDob(e.target.value) }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">DOJ</label>
                    <input type="text" className="form-control" placeholder="YYYY-MM-DD" value={doj} onChange={(e) => { setDoj(e.target.value) }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nationality</label>
                    <input type="text" className="form-control" value={nationality} onChange={(e) => { setNationality(e.target.value) }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Team</label>
                    <input type="text" className="form-control" value={team} onChange={(e) => { setTeam(e.target.value) }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">DeviceName</label>
                    <input type="text" className="form-control" value={device} onChange={(e) => { setDevice(e.target.value) }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">ClientIp</label>
                    <input type="text" className="form-control" value={clientip} onChange={(e) => { setClientip(e.target.value) }} />
                  </div>


                  <div className="col-md-12 text-center">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
                </form>
              </div>
            </div>
          </DialogContent>

        </Dialog>
      </div>
    );
  };



  return (
    <div className="container">


      <div className="row mb-4">
        <div className="serachbox col-md-6">
          <Search searchItem={search} setSearchval={setSearch} />
        </div>
        <div className="col-md-6 text-end">
          {/* <button
        style={{
          background: "#ff6600",
          borderRadius: "30px",
          color: "#fff",
          width: "100px",
          height: "36px",
          cursor: "pointer",
          
        }}
    // onClick={EmployeeDetailsDialog }
      >
       <EmployeeDetailsDialog />
      </button> */}
          <EmployeeDetailsDialog />
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>EmployeeId</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>DOJ</th>
              <th>Team</th>
              <th>Nationality</th>
              <th>DeviceName</th>
              <th>Client IP</th>
              <th>Actions</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>

            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.empid}</td>
                <td>{item.gender}</td>
                <td>{item.dob}</td>
                <td>{item.doj}</td>
                <td>{item.team}</td>
                <td>{item.nationality}</td>
                <td>{item.device}</td>
                <td>{item.ipaddress}</td>
                <td>
                  <Button
                    variant={item.status === 0 ? "danger" : "success"}
                    onClick={() => handleButtonClick(item.id)}
                  >
                    {item.status === 0 ? "Disabled" : "Enabled"}
                  </Button>
                </td>
                <td><DialogOpen formData={item} /></td>
              </tr>
            ))
            }
          </tbody>
        </Table>
      </div>
      <PaginationComp
        setPage={setPage}
        page={page}
        totalPage={totalPage}
        message={message}
      />
    </div>
  );
}

export default EmployeeOnboarding;
