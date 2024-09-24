import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { registerUser } from "./service/apiUser";




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
  const [errors, setErrors] = useState({});
  const [passwordError, setPasswordError] = useState("");
  const [registrationError, setRegistrationError] = useState("");


  const validateInput = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d.*\d.*\d)(?=.*[*&^%$#@!]).{8,}$/;

    if (!user.first) newErrors.first = "First name is required.";
    if (!user.last) newErrors.last = "Last name is required.";
    if (!emailRegex.test(user.email)) newErrors.email = "Invalid email address.";
    if (!phoneRegex.test(user.phone)) newErrors.phone = "Phone must be 10-15 digits.";
    if (!passwordRegex.test(user.password))
      newErrors.password = "Password must contain one uppercase, one lowercase, four numbers, and one special character (*-&^%$#@!).";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateInput()) return; 

    try {
      const response = await registerUser(user);
      if (response && (response.status === 200 || response.status === 201)) {
        navigate("/CardListPage");
      } else {
        setRegistrationError("Registration failed. Please try again.");
      }
    } catch (error) {
      setRegistrationError(
        error.response ? error.response.data : "Registration failed. Please try again."
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
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
         
          {registrationError && (
            <div className="alert alert-danger">{registrationError}</div>
          )}
         
          <div className="row">
            <div className="col">
              <label className="form-label">First Name: *</label>
              <input
                type="text"
                className={`form-control ${errors.first ? "is-invalid" : ""}`}
                value={user.first}
                onChange={handleInputChange}
                name="first"
               
              />
               {errors.first && <div className="invalid-feedback">{errors.first}</div>}
            </div>
            <div className="col">
              <label className="form-label">Middle Name:</label>
              <input
                type="text"
                className="form-control"
                value={user.middle}
                onChange={handleInputChange}
                name="middle"
               
              />
            </div>
            <div className="col">
              <label className="form-label">Last Name: *</label>
              <input
                type="text"
                className={`form-control ${errors.last ? "is-invalid" : ""}`}
                value={user.last}
                onChange={handleInputChange}
                name="last"
             
              />
                {errors.last && <div className="invalid-feedback">{errors.last}</div>}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label">phone: *</label>
              <input
                type="text"
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                value={user.phone}
                onChange={handleInputChange}
                name="phone"
                
              />
               {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
               <small className="form-text text-muted">Enter 10-15 digits.</small>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label">Email: *</label>
              <input
                type="text"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={user.email}
                onChange={handleInputChange}
                name="email"
                autoComplete="off" 
               
              />
               {errors.email && <div className="invalid-feedback">{errors.email}</div>}
               <small className="form-text text-muted">A valid email is required.</small>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label">Password: *</label>
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                value={user.password}
                onChange={handleInputChange}
                name="password"
                autoComplete="new-password" 
                
              />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                <small className="form-text text-muted">
                Must be at least 8 characters, with uppercase, lowercase, four numbers, and a special character (*-&^%$#@!).
              </small>
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
                 placeholder="Enter an image URL (optional)"
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
                placeholder="Enter ALT text for the image (optional)"
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
              <label className="form-label">country: *</label>
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
                <small className="form-text text-muted">Check this if you're registering as a business.</small>
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

          <button 
          className="btn btn-primary w-100 mt-2" 
          type="submit"
          disabled={Object.keys(errors).length > 0}
          >
            SUBMIT
          </button>
        </form>
      </div>
    </>
  );
}
export default RegisterForm;
