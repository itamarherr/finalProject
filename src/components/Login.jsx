import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/AuthProvider";
import { loginUser } from "../components/service/apiUser";
import Loader from "./Loader";

function Login() {
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    if (!email || !password) {
      setError("Email and Password are required");
      setLoading(false);
      return;
    }
    if (!validateEmailFormat(email)) {
      setError("Invalid email format");
      setLoading(false);
      return;
    }
    try {
      await login(email, password);
      navigate("/CardListPage");
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleClearFields = () => {
    setEmail("");
    setPassword("");
    setError(null);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6"></div>
        <h2 className="text-center mb-5 mt-3">LOGIN</h2>
        <form className="center w-50" onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              placeholder="Enter your email"
              autoComplete="off"
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
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              placeholder="Enter your password"
              autoComplete="new-password"
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
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

          <button
            className="btn btn-primary w-100 mt-2"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "SUBMIT"}
          </button>
        </form>
        <div style={{ height: "50vh", marginTop: "2rem" }}>
          <p className="text-center text-muted">
            Welcome to our application. Please log in to access your account.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
