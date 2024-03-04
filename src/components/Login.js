import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/AuthProvider";
import { Alert } from "react-bootstrap";


function Login() {
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/CardListPage");
    } catch (error) {
      if (error.response) {
      } else if (error.request) {
      } else {
        console.error("Error setting up request:", error.message);
      }


      setError("Login failed. Please check your credentials.");
    }
  };
  const handleClearFields = () => {
    setEmail("");
    setPassword("");
  };


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6"></div>
        <h2 className="text-center mb-5 mt-3">LOGIN</h2>
        <form className="center w-50" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <div
            className="btn-group w-100"
            role="group"
            aria-label="Basic example"
          >
            <button
              type="button"
              className="btn btn-danger m-2"
              onClick={() => navigate("/")}
            >
              CANCEL
            </button>
            <button
              type="button"
              className="btn btn-info m-2"
              onClick={() => {
                navigate("/Login");
                handleClearFields();
              }}
            >
              <i className="bi bi-arrow-clockwise"></i>
            </button>
          </div>

          <button className="btn btn-primary w-100 mt-2" type="submit">
            SUBMIT
          </button>
        </form>
        {error && <Alert variant="danger">{error}</Alert>}
      </div>
    </div>
  );
}

export default Login;
