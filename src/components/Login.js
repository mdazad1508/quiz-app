import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:5000/api/emails', {
        address:email
      })
      .then(function (response) {
        console.log(response);
        localStorage.setItem("user",email);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(`Email submitted: ${email}`);
    setEmail(""); // Clear the input field after submission
  };

  return (
    <div className="email-form-container">
        <h1 className="headers">CAUSAL FUNNEL QUIZ APP</h1>
      <h1>Email Submission</h1>
      <form className="forms" onSubmit={handleSubmit}>
        <div className="data">
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div>
            <button className="btn" type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
