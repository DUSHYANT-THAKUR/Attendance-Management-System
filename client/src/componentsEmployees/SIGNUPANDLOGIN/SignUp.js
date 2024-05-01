import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import AOS from "aos";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";
import axios from "axios";
import "./signup.css";
import { Link } from "react-router-dom";
import baseUrl from "../config/baseUrl.js";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Radio, RadioGroup, FormControlLabel,Typography } from '@mui/material';

function SignUp() {
  const [comp, setComp] = useState(0);
  const [Token, setToken] = useState();
  let [message, setMessage] = useState("");
  useEffect(() => {
    AOS.init();
  }, [comp]);


  const InputComp = ({ label, type, value, onChange, required, pattern }) => {
    return (
      <>
        <div className="mb-3">
          <label className="form-label loginlable mb-1 ">{label}</label>
          <input
            type={type}
            className="form-control inputField2"
            placeholder={label}
            value={value}
            onChange={onChange}
            required={required}
            pattern={pattern}
          />
        </div>
      </>
    );
  };

  const RegisterDash = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");

    const onSubmit = async (e) => {
      e.preventDefault();
      let formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirmpassword", confirm_password);
      formData.append("name",name);

      const config = {
        headers: { "content-type": "multipart/form-data" },
      };

      axios
        .post(`${baseUrl}/register`, formData, config)
        .then((response) => {
          setMessage((message = response.data.message));
          console.log(response.data.data);
          setToken(response.data.data.token);
          console.log(response.data.message);

          if (response.status === 200) {
            toast.success(message, {
              position: "bottom-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setComp((pre) => pre + 1);
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
          <h6 className="logintext">Register / Create Account</h6>
          <br />
          <InputComp
            label="Name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required="required"
          />
          <InputComp
            label="Email"
            type="email"
            name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
            required="required"
          />
          <InputComp
            label="Password"
            type="password"
            name="Password"
            value={password}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            onChange={(e) => setPassword(e.target.value)}
            required="required"
          />
          <InputComp
            label="Confirm Password"
            type="password"
            name="ConfirmPassword"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="mb-5 note">
            Note: Your password must be 8-20 characters long, contain letters
            and numbers, one of these special characters: "$@#^|!~=+-_." and
            must not conatin spaces.
          </div>
          <button className="next mt-1" type="submit">
            Next <ArrowForwardIcon/>
          </button>
        </form>
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
          <br />
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            accept="image/*"
            required
          />
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
    <div className="sighnContainer">
      <div className="row main">
        <header className="col-12 row ">
          <div className="col-6 d-flex justify-content-end align-items-center offset-6">
            <span className="text1">
              Have a Employee account already ?
            </span>
            <Link to="/bankconnect/employee/login-employee" className="button1">
              Log In
            </Link>
          </div>
        </header>

        <div className="col-12 secondblock container">
          {comp <= 7 ? (
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
              <Link to="/bankconnect/employee/LearnMore">
    <button className="learnMoreSign mb-4">Learn More</button>
</Link>
              <div>
                Need help? <a href="bb" className="alink"> Contact Us</a>
              </div>
            </div>
          ) : null}

          <div className="col-md-5">
            {comp === 0 ? (
              <RegisterDash />
            ) : comp === 1 ? (
              <EmployeesDetail />
            ) : comp === 2 ? (<SystemInformation />):(
              <EndPage />
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
