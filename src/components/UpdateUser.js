import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { updateUser } from "./service/apiUser";
import { useNavigate } from "react-router-dom";

function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const inputRef = useRef();
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
        const response = await updateUser(user);
      } catch (error) {
        console.error("Error registering user", error);
        return;
      }
    };
    e.preventDefault();
    register();
  };
  useEffect(() => {
    localStorage.setItem("token", token);
  }, []);

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <form className="center w-75">
          <h1 className="text-center">update user</h1>
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
                type="text"
                className="form-control"
                value={user.houseNumber}
                onChange={handleInputChange}
                name="houseNumber"
              />
            </div>
            <div className="col">
              <label className="form-label">zip:</label>
              <input
                type="text"
                className="form-control"
                value={user.zip}
                onChange={handleInputChange}
                name="zip"
              />
            </div>
          </div>

          <button
            type="button"
            className="btn btn-danger m-2"
            onClick={() => navigate("/CardListPage")}
          >
            CANCEL
          </button>
          <button className="btn btn-primary w-100 mt-2" onClick={handleSave}>
            Save
          </button>
        </form>
      </div>
    </>
  );
}
export default UpdateUser;
