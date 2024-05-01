import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import AOS from "aos";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";
import axios from "axios";
import "./signup.css";
import { Link,useNavigate,useParams } from "react-router-dom";
import { Radio, RadioGroup, FormControlLabel,Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import baseUrl from "../config/baseUrl.js";
function InCompleteProfile() {
  const [comp, setComp] = useState(0);
  const [Token, setToken] = useState();
  let [message, setMessage] = useState("");
  const navigatetologin = useNavigate();
   const { key } = useParams();
  useEffect(() => {
    AOS.init();
    setToken(key);
  }, [comp,key]);

 console.log(Token);

  const InputComp = ({ label, type, value, onChange,required=false }) => {
    return (
      <>
        <div className="mb-3">
          <label className="form-label loginlable mb-3 ">{label}</label>
          <input
            type={type}
            className="form-control inputField2"
            placeholder={label}
            value={value}
            onChange={onChange}
            required={required}
          />
        </div>
      </>
    );
  };

  
  const EmployeesDetail = () => {
    const [empid, setEmpid] = useState("");
    const [gender, setGender] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [team, setTeam] = useState();
    const [photo, setPhoto] = useState(null); // State for photo
  
    const onSubmit = async (e) => {
      e.preventDefault();
  
      let formData = new FormData();
  
      formData.append("empid", empid);
      formData.append("gender", gender);
      formData.append("doj", joiningDate);
      formData.append("dob", dateOfBirth);
      formData.append("team", team);
      formData.append("image", photo); // Append photo to formData
  
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${Token}`,
        },
      };
  
      axios
        .post(`${baseUrl}/updateProfile`, formData, config)
        .then((response) => {
          setMessage((message = response.data.message));
  
          if (response.status === 200) {
            setComp((pre) => pre + 1);
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
          console.log(error);
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
    useEffect(()=>
  {
let fetchData = async() =>
{
try {
  let formData = new FormData();
  formData.append("tab", 1);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `Bearer ${Token}`,
    },
  };
  let result = await axios.post( `${baseUrl}/defaultInfo`,
  formData,
  config)
  console.log(result.data.result)
setEmpid(result.data.result.empid);
setGender(result.data.result.gender);
setJoiningDate(result.data.result.doj);
setDateOfBirth(result.data.result.dob);
setTeam(result.data.result.team);
setPhoto(result.data.result.profile_img);

} catch (error) {
  console.log(error)
}
}
fetchData();
  },[Token])
    return (
      <>
        <form
          action=""
          className="logindash"
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="2000"
          data-aos-easing="ease-in-out"
          onSubmit={onSubmit}
        >
          <h6 className="logintext">Employee Details</h6>
  
          <InputComp
            label="Employee ID"
            type="text"
            name="EmployeeID"
            value={empid}
            onChange={(e) => setEmpid(e.target.value)}
            required="required"
          />
          <Typography variant="subtitle1">Gender</Typography>
          <RadioGroup
            aria-label="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>
          <InputComp
            label="Date Of Birth"
            type="Date"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required="required"
          />
          <InputComp
            label="Joining Date"
            type="Date"
            name="joiningDate"
            value={joiningDate}
            onChange={(e) => setJoiningDate(e.target.value)}
            required="required"
          />
          {/* Upload Photo */}
          <label className="form-label loginlable mb-3">
           Upload Profile Image
          </label>
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            accept="image/*"
            required
          />
          {/* <br />{
          photo ? <img src={photo}  style={{ maxWidth: '100px' }} />:""
          } */}
        
          <br ></br>
          {/* Team Selection */}
          <label className="form-label loginlable mb-3">
            Team
          </label>
          <select
            className="form-select form-label mb-3 overflow-auto"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            required
          >
            <option value={""}>Select</option>
            <option value={"Frontend Developer"}>Frontend Developer</option>
            <option value={"Backend Developer"}>Backend Developer</option>
            <option value={"PHP Developer"}>PHP Developer</option>
            <option value={"Full Stack Developer (MERN)"}>Full Stack Developer (MERN)</option>
          </select>

          {/* Buttons */}
          <div className="d-flex justify-content-center mt-3">
            <button
              className="back"
              onClick={() => {
                setComp(comp - 1);
              }}
            >
              Back
            </button>
            <button className="Nextbtn2" type="submit">
              Next <ArrowForwardIcon/>
            </button>
          </div>
        </form>
      </>
    );
  };
  var SystemInformation = () => {
    const [clientIp, setClientIp] = useState("");
    const [deviceName,setDeviceName] = useState("")
    const onSubmit = async (e) => {
      e.preventDefault();

      let formData = new FormData();

      formData.append("deviceName",deviceName)
      formData.append("ipaddress", clientIp);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${Token}`,
        },
      };

      axios
        .post(`${baseUrl}/SystemDetails`, formData, config)
        .then((response) => {
          console.log(response);
          setMessage((message = response.data.message));

          if (response.status === 200) {
            setComp((pre) => pre + 1);
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
          console.log(error);
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
    useEffect(()=>
    {
  let fetchData = async() =>
  {
  try {
    let formData = new FormData();
    formData.append("tab", 2);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${Token}`,
      },
    };
    let result = await axios.post( `${baseUrl}/defaultInfo`,
    formData,
    config)

    console.log(result.data.result)
    setDeviceName(result.data.result.device);
    setClientIp(result.data.result.ipaddress);
  
  } catch (error) {
    console.log(error)
  }
  }
  fetchData();
    },[Token])
    return (
      <>
        <form
          action=""
          className="logindash"
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="2000"
          data-aos-easing="ease-in-out"
          onSubmit={onSubmit}
        >
          <h6 className="logintext">Employee Details</h6>

          <InputComp
            label="Device Name"
            type="text"
            name="deviceName"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            required="required"
          />
          <InputComp
            label="Client Ip"
            type="text"
            name="ClientIp"
            value={clientIp}
            onChange={(e) => setClientIp(e.target.value)}
            required="required"
          />

          <div className="d-flex justify-content-center mt-3">
            <button
              className=" back "
              onClick={() => {
                setComp(comp - 1);
              }}
            >
              Back
            </button>
            <button className="Nextbtn2 " type="submit">
              Next <ArrowForwardIcon/>
            </button>
          </div>
        </form>
      </>
    );
  }
  const EndPage = () => {
    return (
      <>
        <div className="lastPage">
          <div className="lastpageBlock">
            <h4 className="lastpagesucces">SUCCESS!</h4>
            <p className=" lastPcolor">
              Your registration and profile completed successfully. <br /> Your
              account is under review. Please contact on{" "}
              <strong>sales@ubankconnect.com</strong> if not activated within
              next 24 hours. <br />
              Mail sent on your registered email id, verify your email id if not
              verify.
            </p>
            <button className="lastloginbutton">
              {" "}
              <Link to="/bankconnect/employee/login-employee"> Login</Link>{" "}
            </button>
            <div>
              <span>
                {" "}
                <b>Need Help ?</b>{" "}
              </span>{" "}
              <a href="https://ubankconnect.com/#contact">Contact Us</a>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="sighnContainer">
        <div className="row main">
          <header className="col-12 row ">
            <div className="col-6 ">
              <div className="ubank-logo">
                {/* <img
                  src="https://www.bankconnect.online/assets/ubankconnect/img/logo.svg"
                  alt=""
                  className="me-auto ubank"
                /> */}
              </div>
            </div>
            <div className="col-6 d-flex justify-content-end align-items-center">
              <span className="text1">
                Have a UBank Connect account already ?
              </span>
              <Link to="/bankconnect/employee/login-employee" className="button1">
                Log In
              </Link>
            </div>
          </header>

          <div className="col-12 secondblock container">
            <div className="col-md-7 p-4">
              <img
                src="https://i.postimg.cc/8zVCDCmm/attendance.jpg"
                alt=""
                className=""
                width="300px"
              />
              <h6 className="firstline">
              Innovating Attendance, Inspiring Punctuality Always
              </h6>
              <p className="secondline">
                Capture every check-in with flawless fidelity.
              </p>
              <button className="learnMoreSign mb-4">Learn More</button>
              <div>
                Need help? <a href="bb" className="alink"> Contact Us</a>
              </div>
            </div>
            <div className="col-md-5">
              {comp === 0 ? (<EmployeesDetail />) 
              : comp ===1 ? (<SystemInformation />) 
              : (
                <EndPage />
              )}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default InCompleteProfile