import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import NavigationBar from "../layout/NavigationBar";
import { createNewCard } from "./service/apiCard";
import Branch from "../NotRelevent/Branch";
import { Card } from "react-bootstrap";

function AddCard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [token, setToken] = useState("");
  const [card, setCard] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: 3,
    zip: 0,
  });

  const [errors, setErrors] = useState({});
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [webError, setWebError] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");
  // const [validationErrors, setValidationErrors] = useState({
  //   title: false,
  //   description: false,

  // });

  // const handleInputChange = (e) => {
  //   setCard({
  //     ...card,
  //     [e.target.name]: e.target.value,
  //   });

  //   setValidationErrors({
  //     ...validationErrors,
  //     [e.target.name]: false,
  //   });
  // };
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const handleInputEnter = (e) => {
    const { name, value } = e.target;
    console.log("Input enter:", name, value);
    setCard({
      ...card,
      [name]: value,
    });
    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const israeliPhoneRegex = /^(?:0(?:5[^7]|[2-4689]|7[0-9])[ -]?(?:(?:(?:[2-9]|[2-9][0-9])[ -]?\d{3}[ -]?\d{4})|(?:7(?:(?:[0-9]{2}[ -]?\d{3}[ -]?\d{2})|(?:[0-9][ -]?\d{3}[ -]?\d{3}))))|(?:(?:\+972|972)[ -]?(?:(?:(?:[2-9]|[2-9][0-9])[ -]?\d{3}[ -]?\d{4})|(?:7(?:(?:[0-9]{2}[ -]?\d{3}[ -]?\d{2})|(?:[0-9][ -]?\d{3}[ -]?\d{3}))))))$/;

    const webAddressRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(\/\S*)?$/;

    const imageUrlRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;



    // Check if the input is for the email field and validate against the regex pattern
    if (name === "email" && !emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
      console.log("Email error:", emailError);
    } else {
      setEmailError("");
    }

    if (name === "phone" && !webAddressRegex.test(value)) {
      setPhoneError("Please enter a valid isreali phone number")
    } else {
      setPhoneError("");
    }

    if (name === "web" && !israeliPhoneRegex.test(value)) {
      setWebError("Please enter a valid web address")
    } else {
      setWebError("");
    }

    if (name === "url" && !imageUrlRegex.test(value)) {
      setWebError("Please enter a valid image url address")
    } else {
      setWebError("");
    }

    // Validate the input and update errors
    if (!value.trim()) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: `${name} is required`,
      }));
    } else {
      // If the field is not empty, remove the error message
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: null,
      }));
    }
  }

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await createNewCard(token, card);
      navigate("/CardListPage");
    } catch (error) {
      console.error("Error while saving card:", error);
      alert("An error occurred while saving the card. Please try again.");
      throw error;
    }
  };


  return (
    <>
      <div className="row">
        <div className="col">
          <label className="form-label">title:</label>
          <input
            type="text"
            className="form-control"
            value={card.title}
            onChange={handleInputEnter}
            name="title"
          />

        </div>
        <div className="col">
          <label className="form-label">subtitle:</label>
          <input
            type="text"
            className="form-control"
            value={card.subtitle}
            onChange={handleInputEnter}
            name="subtitle"
          />

        </div>
        <div className="col">
          <label className="form-label">description:</label>
          <input
            type="text"
            className="form-control"
            value={card.description}
            onChange={handleInputEnter}
            name="description"
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label className="form-label">phone:</label>
          <input
            type="text"
            className="form-control"
            value={card.phone}
            onChange={handleInputEnter}
            name="phone"
          />
          {phoneError && <div style={{ color: 'red' }}>{phoneError}</div>}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label className="form-label">Email:</label>
          <input
            type="text"
            className="form-control"
            value={card.email}
            onChange={handleInputEnter}
            name="email"
          />
          {emailError && <div style={{ color: 'red' }}>{emailError}</div>}

        </div>
      </div>
      <div className="row">
        <div className="col">
          <label className="form-label">web:</label>
          <input
            type="text"
            className="form-control"
            value={card.web}
            onChange={handleInputEnter}
            name="web"
          />
          {webError && <div style={{ color: 'red' }}>{webError}</div>}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label className="form-label">url:</label>
          <input
            type="text"
            className="form-control"
            value={card.url}
            onChange={handleInputEnter}
            name="url"
          />
          {imageUrlError && <div style={{ color: 'red' }}>{imageUrlError}</div>}
        </div>
        <div className="col">
          <label className="form-label">alt:</label>
          <input
            type="text"
            className="form-control"
            value={card.alt}
            onChange={handleInputEnter}
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
            value={card.state}
            onChange={handleInputEnter}
            name="state"
          />
        </div>
        <div className="col">
          <label className="form-label">country:</label>
          <input
            type="text"
            className="form-control"
            value={card.country}
            onChange={handleInputEnter}
            name="country"
          />
        </div>
        <div className="col">
          <label className="form-label">city:</label>
          <input
            type="text"
            className="form-control"
            value={card.city}
            onChange={handleInputEnter}
            name="city"
          />
        </div>
        <div className="col">
          <label className="form-label">street:</label>
          <input
            type="text"
            className="form-control"
            value={card.street}
            onChange={handleInputEnter}
            name="street"
          />
        </div>
        <div className="col">
          <label className="form-label">houseNumber:</label>
          <input
            type="number"
            className="form-control"
            value={card.houseNumber}
            onChange={handleInputEnter}
            name="houseNumber"
          />
        </div>
        <div className="col">
          <label className="form-label">zip:</label>
          <input
            type="number"
            className="form-control"
            value={card.zip}
            onChange={handleInputEnter}
            name="zip"
          />
        </div>
      </div>

      <div>
        <button className="btn btn-primary me-2 px-2" onClick={handleSave}>
          add
        </button>
        <button
          className="btn btn-danger px-2"
          onClick={() => navigate("/CardListPage")}
        >
          cancel
        </button>
      </div>
    </>
  )
}
export default AddCard;
