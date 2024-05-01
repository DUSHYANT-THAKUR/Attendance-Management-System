import React, { useState, useEffect } from "react";
// import "./Myinfo.css";
import { Grid } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";
import axios from "axios";
import baseUrl from "../config/baseUrl.js";
import Aos from "aos";
import { Link } from "react-router-dom";

import download from "./imgs/dl.png"
// import wrong from "./imgs/wrong.gif"

function Myinfo() {
  const [comp, setComp] = useState(0);
  const [Token, setToken] = useState(localStorage.getItem("user"));
  let [message, setMessage] = useState("");

 
  useEffect(() => {
    Aos.init();

  }, []);

  return (
    <>
      <h4 className="heading">My Information</h4>
      <br />
      <Grid container spacing={2} style={{ width: "100%" }}>
        <Grid item xs={3} className="firstBlock mx-4">
          <ul>
            <li
              onClick={() => setComp(0)}
              className={comp === 0 ? "activetab" : ""}
            >
              Employee Details
            </li>
            <li
              onClick={() => setComp(4)}
              className={comp === 4 ? "activetab" : ""}
            >
              System Information
            </li>
            <li
              onClick={() => setComp(10)}
              className={comp === 10 ? "activetab" : ""}
            >
              Download
            </li> 
          </ul>
        </Grid>

        <Grid item xs={8} className="secondBlock" style={{ height: "37rem" }}>
          {comp === 0 ? (
            <CompanyProfile
              Token={Token}
              message={message}
              setMessage={setMessage}
            />
          )  
          : comp === 4 ? (
            <BusinessProfile
              Token={Token}
              message={message}
              setMessage={setMessage}
            />
          )  
          : (
            <Download Token={Token} />
          )}
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
}

// COMMON COMPONENTE ********^^^^^^_______+++++

const InputComp = ({ label, type, value, onChange, required = false }) => {
  return (
    <>
      <div className="mb-3">
        <label className="form-label loginlable ">{label}</label>
        <input
          type={type}
          className="form-control "
          placeholder={label}
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
    </>
  );
};

// COMPANY PROFILE ******_____+++++++##@@@@@

const CompanyProfile = ({ Token }) => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [gender, setGender] = useState("");
  const [team, setTeam] = useState("");
  const [leaves, setLeaves] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [TeamName, setTeamName] = useState([]);
  const onSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("emp_name", employeeName);
    formData.append("emp_employeeid", employeeId);
    formData.append("emp_secretkey", secretKey);
    formData.append("emp_gender", gender);
    formData.append("emp_team", team);
    formData.append("emp_leaves", leaves);
    formData.append("emp_emailaddress", emailAddress);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${Token}`,
      },
    };

    axios
      .post(`${baseUrl}/updateInfo`, formData, config)
      .then((response) => {
        toast.success("Successfully Update", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        toast.error("Somthing went wrong", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        let formData = new FormData();
        formData.append("tab", 1);
        const config = {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${Token}`,
          },
        };
        const { data } = await axios.post(
          `${baseUrl}/defaultInfo`,
          formData,
          config
        );

        setEmployeeName(data?.result?.name);
        setEmployeeId(data?.result?.empid);
        setSecretKey(data?.result?.secretkey);
        setGender(data?.result?.gender);
        setTeam(data?.result?.team);
        setLeaves(data?.result?.leaves);
        setEmailAddress(data?.result?.email);
        setTeamName(data?.country);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [Token]);
  return (
    <>
      <form action="" onSubmit={onSubmit} className="formBlock mx-3 " style={{height: "35.5rem"}}>
        {/* <h6 className="profileHeading">Employee Information</h6> */}

        <InputComp
          label="Employee Name"
          type="text"
          name="CompanyName"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          required={true}
        />
        <InputComp
          label="Employee ID"
          type="text"
          name="employeeId"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required={true}
        />
        <InputComp
          label="Secret Key"
          type="text"
          name="secretKey"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          required={true}
        />
        <InputComp
          label="Gender"
          type="text"
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required={true}
        />

        <label className="form-label loginlable mb-3">
          Team
        </label>

        <select
          className="form-select form-select mb-3"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          required={true}
          style={{ border: "1px solid #ced4da" }}
        >
          <option className="" value="Country of Incorporation">
            Pick your Team          </option>
          {TeamName?.map((item, i) => (
            <option value={item.id} key={i}>
              {item.name + "-" + item.sortname}
            </option>
          ))}
        </select>

        <InputComp
          label="Leaves"
          type="text"
          name="leaves"
          value={leaves}
          onChange={(e) => setLeaves(e.target.value)}
          required={true}
        />
        <InputComp
          label="Email Address 	"
          type="text"
          name="emailAddress"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
          required={true}
        />

        <div className="d-flex justify-content-start mt-3 mb-3">
          <button className="saveButton " type="submit">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

const BusinessProfile = ({ Token, message, setMessage }) => {
  const [company_website_processing_url, setWebsite] = useState("");
  const [company_nature_of_business, setNatureofbusiness] = useState("");
  // const [company_estimated_monthly_volume, setEstimatedMonthly] = useState("");
  // const [company_avarage_ticket_size, setAverageTicket] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let formData = new FormData();
        formData.append("tab", 2);
        const config = {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${Token}`,
          },
        };
        const { data } = await axios.post(
          `${baseUrl}/defaultInfo`,
          formData,
          config
        );

        setWebsite(data?.result?.website);
        setNatureofbusiness(data?.result?.job_title);
        // setEstimatedMonthly(data?.result?.company_estimated_monthly_volume);
        // setAverageTicket(data?.result?.company_avarage_ticket_size);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [Token]);

  const onSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append(
      "company_website_processing_url",
      company_website_processing_url
    );
    formData.append("company_nature_of_business", company_nature_of_business);
    // formData.append(
    //   "company_estimated_monthly_volume",
    //   company_estimated_monthly_volume
    // );
    // formData.append("company_avarage_ticket_size", company_avarage_ticket_size);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${Token}`,
      },
    };

    axios
      .post(`${baseUrl}/save_business_info`, formData, config)
      .then((response) => {
        setMessage((message = response.data.message));

        if (response.status === 200) {
          console.log("success");
        } else {
          toast.error(message, {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        toast.error(message, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  return (
    <>
      <form
        action=""
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="2000"
        style={{ width: "100%", height: "100%", overflow: "auto" }}
        onSubmit={onSubmit}
      >
        {/* <h6 className="logintext">Business Info </h6> */}

        <InputComp
          label="Device"
          type="url"
          value={company_website_processing_url}
          onChange={(e) => setWebsite(e.target.value)}
          required={true}
        />
        <InputComp
          label="IPV4 Address 	"
          type="text"
          value={company_nature_of_business}
          onChange={(e) => setNatureofbusiness(e.target.value)}
          required={true}
        />

        <div className="d-flex  mt-3">
          <button className="Nextbtn2 " type="submit">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

const Download = () => {
  return (
    <>
      <div className="formBlock mx-3">
        <h6 className="profileHeading">Download Profile </h6>
        <br />
        <br />
        <Link to="/bankconnect/merchant/DownloadInfo">
          <div className="downloadimg">
            <img src={download} alt="downloadimg"/>
          </div>
          <div className="d-flex mx-4">
            Download
          </div>
        </Link>
      </div>
    </>
  );
};

// <><><><><><><><><>  Secuirty Question  <><><><><><><><><><><><><><><>


// <><><><><><><><><><><> Customer Block <><><><><><><><><><><><><><><><>


// <><><><><><><><><><><> KYC DOCUMENT <><><><><><><><><><><><><><><><>

export default Myinfo;
