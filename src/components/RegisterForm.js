// import NavigationBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { registerUser } from "./service/apiUser";
import { loginUser } from "./service/apiUser";

//const setTokenFromLocalStorage = () => {
//return localStorage.setItem("token");
//};

function RegisterForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [token, setToken] = useState("");
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

  const handleSave = (e) => {
    const register = async () => {
      try {
        const response = await registerUser(user);
        console.log("User registered successfully", response);
      } catch (error) {
        console.error("Error registering user", error);
        return;
      }

      try {
        const response2 = await loginUser(user.email, user.password);
        localStorage.setItem("token", response2);

        navigate("/CardListPage");
      } catch (error) {
        console.error("Error logging in:", error);
      }
    };

    e.preventDefault();
    register();
  };
  useEffect(() => {
    // This code will run after the state has been updated
    localStorage.setItem("token", token);
  }, [token]);

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleCheckboxChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      isBusiness: e.target.checked, // Update isBusiness based on checkbox status
    }));
  };

  return (
    <>
      {/* <NavigationBar /> */}
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <form className="center w-75">
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

          <button className="btn btn-primary w-100 mt-2" onClick={handleSave}>
            SUBMIT
          </button>
        </form>
      </div>
    </>
  );
}
export default RegisterForm;
