import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import baseUrl from "../config/baseUrl.js";
import "./signup.css";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useStateContext } from "../../context/ContextProvider.jsx";
import ubankconnect from "./imgs/UBankConnect.svg";

const LogInForm = () => {
  useEffect(() => {
    AOS.init();
    // IpAddress();
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [Token, setToken] = useState();
  let [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const { setIsLoginUser } = useStateContext();
  // const [ip,setIp] = useState("");

  const natigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    // formData.append("ip",ip);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios
      .post(`${baseUrl}/login-employees`, formData, config)
      .then((response) => {
        setMessage((message = response.data.message));
        console.log(response.data.data.token);
        if (response.data.data.complete_profile == 1) {
          setToken(response.data.data.token);
          setUserName(response.data.data.name);

          setIsLoginUser(response.data.data.token);
          localStorage.setItem("user", response.data.data.token);
          localStorage.setItem(
            "timeZone",
            JSON.stringify({ name: "India", timeZone: "Asia/Kolkata" })
          );
          localStorage.setItem("userName", response.data.data.name);

          async function createReport(auth) {
            try {
              const config = {
                headers: {
                  "content-type": "multipart/form-data",
                  Authorization: `Bearer ${auth}`,
                },
              };

              let result = await axios.post(
                `${baseUrl}/createReport`,
                {},
                config
              );
              console.log(result);
            } catch (error) {
              console.log(error);
            }
          }
          natigate("/bankconnect/employee/dashboard");
          createReport(response.data.data.token);
        }
        else if (response.data.data.complete_profile == 0) {
          toast.error(message, {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          natigate(`/bankconnect/employee/InCompleteProfile/${response.data.data.token}`);
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
        toast.error("Somthing went wrong🔗🖇️", {
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
        onSubmit={handleSubmit}
      >
        <h6 className="logintext">Login to Dashboard</h6>
        <div className="mb-3">
          <label className="form-label loginlable mb-3 "> Email ID</label>
          <input
            type="email"
            className="form-control inputField2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label loginlable mb-3 ">Password</label>
          <input
            type="password"
            className="form-control inputField2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="text-end">
          <Link to="/bankconnect/forgot-password" className="alink">Forgot Password</Link>
        </div>

        <div className="d-flex justify-content-center mt-5">
          <button className="next " type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

function Login() {
  return (
    <div className="sighnContainer">
      <div className="row main ">
        <header className="col-12 row">
          <div className="col-6 d-flex justify-content-end align-items-center offset-6">
            <span className="text1">New to UBank Connect ?</span>
            <Link to="/bankconnect/signup-employee" className="button1">
              Sign Up
            </Link>
          </div>
        </header>

        <div className="col-12 secondblock container">
          <div className="col-md-7 p-4">
            <img
              src="https://i.postimg.cc/8zVCDCmm/attendance.jpg"
              alt="not found"
              className=""
              width="300px"
            />
            <h6 className="firstline">Make Attendance Management Easier</h6>
            <p className="secondline">
              Your Trusted Partner for Simplified Attendance Management</p>
              <Link to="/bankconnect/employee/LearnMore">
            <button className="learnMoreSign mb-4">Learn More</button>
            </Link> 
            <div>
              Need help? <Link to="/bankconnect/employee/Contact" className="alink"> Contact Us</Link>
            </div>
          </div>
          <div className="col-md-5">
            <LogInForm />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
