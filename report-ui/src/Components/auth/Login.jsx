import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";
import animationData from '../../assets/hotel-animation.json'
import './Login.css';
import Navbar from "../reporthandle/Navbar";
import LoginNavBar from '../reporthandle/LoginNavBar';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msgUsername, setMsgUsername] = useState(null);
  const [msgPassword, setMsgPassword] = useState(null);
  const navigate = useNavigate();

  const login = () => {
    if (!username) return setMsgUsername("Please Enter Username");
    if (!password) return setMsgPassword("Please Enter Password");

    let body = { username, password };

    axios.post("http://localhost:8083/api/auth/token/generate", body)
      .then(res => {
        let token = res.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);

        axios.get("http://localhost:8083/api/auth/user/details", {
          headers: { "Authorization": `Bearer ${token}` }
        })
          .then(resp => {
            switch (resp.data.role) {
              case 'Admin':
                navigate("/report-dashboard");
                break;
              case 'Customer':
                navigate("/customer-dashboard");
                break;
              default:
                break;
            }
          })
          .catch(() => setMsgUsername("Invalid Credentials"));
      })
      .catch(() => setMsgUsername("Invalid Credentials"));
  };

  return (
    <div className="container-fluid hotel-login">
      <LoginNavBar />
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-5 text-center mb-5">
          <Lottie animationData={animationData} style={{ height: 300 }} />
          <h3 className="welcome-text">Welcome to Cozy Heaven Admin Panel</h3>
        </div>
        <div className="col-md-5">
          <div className="card login-card">
            <div className="card-header">
              h3
            </div>
            <div className="card-body">
              {msgUsername && <div className="alert alert-danger">{msgUsername}</div>}
              {msgPassword && <div className="alert alert-danger">{msgPassword}</div>}

              <div className="mb-3">
                <label>Username</label>
                <input type="text" className="form-control"
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setMsgUsername(null);
                  }} />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input type="password" className="form-control"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setMsgPassword(null);
                  }} />
              </div>
              <div className="text-center">
                <button className="btn btn-primary px-5 rounded-pill" onClick={login}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
