import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./service/apiUser";
import { Form, Button, Card, Alert } from "react-bootstrap";
import useLogin from "../hooks/useLogin";
import { LoginContext } from "../Context/AuthProvider";

const setTokenInLocalStorage = (token) => {
  localStorage.setItem("token", token);
};

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

function Login() {
  const { login } = useContext(LoginContext);
  // const {login}=useLogin()
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(email, password);
      console.log(response);

      setToken(response);

      setTokenInLocalStorage(response);
      navigate("/CardListPage");
      console.log(token);
    } catch (error) {
      console.error("Error logging in:", error);

      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <h1 className="center">Login</h1>
      <form className="center w-50" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <div className="form-grope">
              <label className="form-label">Email:</label>
              <input
                name="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="col">
            <div className="form-grope">
              <label className="form-label">Password:</label>
              <input
                name="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
              />
              {/* <button type="submit">Login</button> */}
            </div>
          </div>
        </div>
        <div
          className="btn-group w-100"
          role="group"
          aria-label="Basic example"
        >
          <button
            type="button"
            className="btn btn-danger m-2"
            onClick={() => navigate("/Login")}
          >
            CANCEL
          </button>
          <button
            type="button"
            className="btn btn-info m-2"
            onClick={() => navigate("/HomePage")}
          >
            <i className="bi bi-arrow-clockwise"></i>
          </button>
        </div>

        <button className="btn btn-primary w-100 mt-2" onClick={handleSubmit}>
          SUBMIT
        </button>
      </form>
      {token && (
        <div>
          <label>Token:</label>
          <textarea readOnly value={token} />
        </div>
      )}
    </div>
  );
}

export default Login;
