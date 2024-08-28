import React,{useState} from "react";
import { useNavigate,Link } from "react-router-dom";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStateContext } from "../../context/ContextProvider";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import label from "./images/3886130-removebg-preview.png";
import image from "./images/Mask group.svg";
import axios from "axios";
import { toast } from "react-toastify";
import baseUrl from "../config/baseUrl";

function Login() {
  const {setIsLoginUser} = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      let formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };

          // setMessage((message = response.data.message));
          let response = "hello"
          if (response) {
            toast.success(<span style={{ fontWeight: 'bold', color: '#2626e8' }}>Hey ,Welcome To Ubankconnect</span>, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              closeButton: false
            });
            setTimeout(()=>{
              // setIsLoginUser(response.data.data.token);
              //  localStorage.setItem("user", );
              // localStorage.setItem(
              //   "timeZone",
              //   JSON.stringify({ name: "India", timeZone: "Asia/Kolkata" })
              // );
              // localStorage.setItem("userName", response.data.data.name)
                navigate("/bankconnect/employee/dashboard");
            },2000)
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


    };
  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={handleSubmit}>
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} />
              <input type="text" placeholder="Email Address" onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} />
              <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <input type="submit" value="Login" className="btn-loggedIn solid" />
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <img style={{ height: "90px" }} src={image} alt="Logo" />
            <p>Better Payment Experience, Boost Your Business Sales!</p>
          </div>
          <img src={label} className="image" alt="Background" />
        </div>
      </div>
    </div>
  );
}
export default Login;
