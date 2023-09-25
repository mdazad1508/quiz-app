import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/emails";
    const userData = {
      address: email,
    };
    try {
      const response = await axios.post(url, userData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

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
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
