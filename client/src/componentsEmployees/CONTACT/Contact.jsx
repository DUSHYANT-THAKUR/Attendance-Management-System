import axios from "axios";
import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from "react-toastify";


function Contact() {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [message, setMessage] = useState("");
    let navigate = useNavigate();

   async function handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("message", message);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                },
            };
            let result =await axios.post(`http://localhost:9241/createContact`, formData, config);
            console.log(result.data)
            toast.success(result.data.message, {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              navigate("/bankconnect/employee/login-employee");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="contact-container" style={{ backgroundColor: "#fdcb5b", height: "100vh", width: "100hw", overflowX: "hidden" }}>
                <div className="row">
                <div className="col-md-11 ms-5 mt-4">
                    <Link to = "/bankconnect/employee/login-employee">
                    <button className="btn btn-danger">
                       <ArrowBackIcon /> Back
                    </button>
                    </Link>
                </div>
                </div>
                <div className="contact-form-container card m-auto mt-2" style={{height:"500px",width:"700px"}}>
                    <span className="lines"></span>
                    <form>
                        <h6 className="logintext mt-4 text-center">Contact Us</h6>
                        <div className="mb-2 mt-3" style={{marginLeft:"10%",marginRight:"10%"}}>
                            <label className="form-label loginlable mb-1 mt-3">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control inputField2"
                                placeholder="Name"
                                required
                             onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-2" style={{marginLeft:"10%",marginRight:"10%"}}>
                            <label className="form-label loginlable mb-1 mt-3">
                            Email
                            </label>
                            <input
                                type="email"
                                className="form-control inputField2"
                                placeholder="email"
                                required
                             onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-2" style={{marginLeft:"10%",marginRight:"10%"}}>
                            <label className="form-label loginlable mb-1 mt-3">
                                Message
                            </label>
                            <input
                                type="textarea"
                                className="form-control inputField2"
                                placeholder="Message"
                                required
                             onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>

                        <div className="d-flex justify-content-center mt-5" style={{marginLeft:"10%",marginRight:"10%"}}>
                            <button className="next" onClick={(e) => handleSubmit(e)}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Contact;
