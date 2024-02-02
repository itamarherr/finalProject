// import NavigationBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { registerUser } from "./service/apiUser";
import { loginUser } from "./service/apiUser";

//const setTokenFromLocalStorage = () => {
//return localStorage.setItem("token");
//};

function RegisterForm() {
  const navigate = useNavigate();
  // const { id } = useParams();
  // const [token, setToken] = useState("");
  const [user, setUser] = useState({
    first: "",
    middle: "",
    last: "",
    email: "",
    phone: "",
    password: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
    isBusiness: true,
  });

  const handleSave = async (e) => {
    e.preventDefault();
      try {
        const response = await registerUser(user);
        console.log("User registered successfully", response);

        const loginResponse = await loginUser(user.email, user.password);
        console.log("User logged in successfully", loginResponse);

        navigate("/CardListPage");
      } catch (error) {
        console.error("Error registering user", error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up request:", error.message);
        }
        throw error;
      }
    };

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleCheckboxChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      isBusiness: e.target.checked,
    }));
  };

  return (
    <>
      {/* <NavigationBar /> */}
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <form className="center w-75" onSubmit={handleSave}>
          <h1 className="text-center">REGISTER</h1>
          <div className="row">
            <div className="col">
              <label className="form-label">first name:</label>
              <input
                type="text"
                className="form-control"
                value={user.first}
                onChange={handleInputChange}
                name="first"
              />
            </div>
            <div className="col">
              <label className="form-label">middle name:</label>
              <input
                type="text"
                className="form-control"
                value={user.middle}
                onChange={handleInputChange}
                name="middle"
              />
            </div>
            <div className="col">
              <label className="form-label">last name:</label>
              <input
                type="text"
                className="form-control"
                value={user.last}
                onChange={handleInputChange}
                name="last"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label">phone:</label>
              <input
                type="text"
                className="form-control"
                value={user.phone}
                onChange={handleInputChange}
                name="phone"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label">Email:</label>
              <input
                type="text"
                className="form-control"
                value={user.email}
                onChange={handleInputChange}
                name="email"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label">Password:</label>
              <input
                type="text"
                className="form-control"
                value={user.password}
                onChange={handleInputChange}
                name="password"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label">url:</label>
              <input
                type="text"
                className="form-control"
                value={user.url}
                onChange={handleInputChange}
                name="url"
              />
            </div>
            <div className="col">
              <label className="form-label">alt:</label>
              <input
                type="text"
                className="form-control"
                value={user.alt}
                onChange={handleInputChange}
                name="alt"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label">state:</label>
              <input
                type="text"
                className="form-control"
                value={user.state}
                onChange={handleInputChange}
                name="state"
              />
            </div>
            <div className="col">
              <label className="form-label">country:</label>
              <input
                type="text"
                className="form-control"
                value={user.country}
                onChange={handleInputChange}
                name="country"
              />
            </div>
            <div className="col">
              <label className="form-label">city:</label>
              <input
                type="text"
                className="form-control"
                value={user.city}
                onChange={handleInputChange}
                name="city"
              />
            </div>
            <div className="col">
              <label className="form-label">street:</label>
              <input
                type="text"
                className="form-control"
                value={user.street}
                onChange={handleInputChange}
                name="street"
              />
            </div>
            <div className="col">
              <label className="form-label">houseNumber:</label>
              <input
                type="number"
                className="form-control"
                value={user.houseNumber}
                onChange={handleInputChange}
                name="houseNumber"
              />
            </div>
            <div className="col">
              <label className="form-label">zip:</label>
              <input
                type="number"
                className="form-control"
                value={user.zip}
                onChange={handleInputChange}
                name="zip"
              />
            </div>
          </div>

          <br />
          <div className="row">
            <div className="col">
              <div className="mb-5 form-check form-switch">
                <input
                  type="checkbox"
                  id="onOff2"
                  className="form-check-input"
                  checked={user.isBusiness}
                  onChange={handleCheckboxChange}
                  name="isBusiness"
                />
                <label htmlFor="onOff2" className="form-check-label">
                  Singnup as business
                </label>
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
              onClick={() => navigate("/RegisterForm")}
            >
              CANCEL
            </button>
            <button
              type="button"
              className="btn btn-info m-2"
              onClick={() => navigate("/RegisterForm")}
            >
              <i className="bi bi-arrow-clockwise"></i>
            </button>
          </div>

          <button className="btn btn-primary w-100 mt-2" type="submit">
            SUBMIT
          </button>
        </form>
      </div>
    </>
  );
}
export default RegisterForm;
