import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { registerUser } from "./service/apiUser";
import { loginUser } from "./service/apiUser";



function RegisterForm() {
  const navigate = useNavigate();
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
  const [passwordError, setPasswordError] = useState("");


  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Regular expression for password validation
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d.*\d.*\d)(?=.*[*&^%$#@!]).{8,}$/;

      // Check if the password matches the regex pattern
      if (!passwordRegex.test(user.password)) {
        throw new Error("Password must contain one uppercase, one lowercase, four numbers, and one special character (*-&^%$#@!)");
      }
      const response = await registerUser(user);

      const loginResponse = await loginUser(user.email, user.password);

      navigate("/CardListPage");
    } catch (error) {
      console.error("Error registering user", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {

        console.error("Error setting up request:", error.message);
      }
      throw error;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });

    // Regular expression for password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d.*\d.*\d)(?=.*[*&^%$#@!]).{8,}$/;

    // Check if the password matches the regex pattern
    if (name === "password" && !passwordRegex.test(value)) {
      setPasswordError("Password must contain one uppercase, one lowercase, four numbers, and one special character (*-&^%$#@!), and be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };
  const handleCheckboxChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      isBusiness: e.target.checked,
    }));
  };

  return (
    <>
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
                type="password"
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
          {passwordError && <div className="alert alert-danger">{passwordError}</div>}

          <button className="btn btn-primary w-100 mt-2" type="submit">
            SUBMIT
          </button>
        </form>
      </div>
    </>
  );
}
export default RegisterForm;
