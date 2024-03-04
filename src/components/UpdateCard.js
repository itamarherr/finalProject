import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { updateCard } from "./service/apiCard";
import { Card } from "react-bootstrap";
import axios from "axios";

export const getCardById = async (id) => {
  try {
    const response = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`);
    console.log("itamar:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

function UpdateCard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [card, setCard] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    image: {
      url: "",
      alt: "",
    },
    address: {
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: 5,
      zip: 0,
      url: "",
      alt: "",

    }

  });
  const [errors, setErrors] = useState({});
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [webError, setWebError] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await updateCard(token, card, id);
      navigate("/CardListPage");
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await getCardById(id);
        setCard(response);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };
    fetchCardData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCard({
      ...card,
      [name]: value,
    });
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const israeliPhoneRegex = /^(?:0(?:5[^7]|[2-4689]|7[0-9])[ -]?(?:(?:(?:[2-9]|[2-9][0-9])[ -]?\d{3}[ -]?\d{4})|(?:7(?:(?:[0-9]{2}[ -]?\d{3}[ -]?\d{2})|(?:[0-9][ -]?\d{3}[ -]?\d{3}))))|(?:(?:\+972|972)[ -]?(?:(?:(?:[2-9]|[2-9][0-9])[ -]?\d{3}[ -]?\d{4})|(?:7(?:(?:[0-9]{2}[ -]?\d{3}[ -]?\d{2})|(?:[0-9][ -]?\d{3}[ -]?\d{3}))))))$/;

    const webAddressRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(\/\S*)?$/;

    const imageUrlRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;






    if (name === "email" && !emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
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





    if (!value.trim()) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: `${name} is required`,
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: null,
      }));
    }
  };


  return (
    <>
      <Card className="card flex justify-content-center">
        <div className="row">
          <div className="col">
            <label className="form-label">title:</label>
            <input
              type="text"
              className="form-control"
              value={card.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          <div className="col">
            <label className="form-label">subtitle:</label>
            <input
              type="text"
              className="form-control"
              value={card.subtitle}
              onChange={handleInputChange}
              name="subtitle"

            />
          </div>
          <div className="col">
            <label className="form-label">description:</label>
            <input
              type="text"
              className="form-control"
              value={card.description}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              value={card.address.url}
              onChange={handleInputChange}
              name="url"
            />
            {imageUrlError && <div style={{ color: 'red' }}>{imageUrlError}</div>}
          </div>
          <div className="col">
            <label className="form-label">alt:</label>
            <input
              type="text"
              className="form-control"
              value={card.address.alt}
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
              value={card.address.state}
              onChange={handleInputChange}
              name="state"
            />
          </div>
          <div className="col">
            <label className="form-label">country:</label>
            <input
              type="text"
              className="form-control"
              value={card.address.country}
              onChange={handleInputChange}
              name="country"
            />
          </div>
          <div className="col">
            <label className="form-label">city:</label>
            <input
              type="text"
              className="form-control"
              value={card.address.city}
              onChange={handleInputChange}
              name="city"
            />
          </div>
          <div className="col">
            <label className="form-label">street:</label>
            <input
              type="text"
              className="form-control"
              value={card.address.street}
              onChange={handleInputChange}
              name="street"
            />
          </div>
          <div className="col">
            <label className="form-label">houseNumber:</label>
            <input
              type="number"
              className="form-control"
              value={card.houseNumber}
              onChange={handleInputChange}
              name="houseNumber"
            />
          </div>
          <div className="col">
            <label className="form-label">zip:</label>
            <input
              type="number"
              className="form-control"
              value={card.zip}
              onChange={handleInputChange}
              name="zip"
            />
          </div>
        </div>
      </Card>
      <div>
        {Object.keys(errors).map((key, index) => (
          <div key={index} style={{ color: 'red' }}>
            {errors[key]}
          </div>
        ))}
        <button className="btn btn-primary me-2 px-2" onClick={handleUpdate}>
          update
        </button>
        <button
          className="btn btn-danger px-2"
          onClick={() => navigate("/CardListPage")}
        >
          cancel
        </button>
      </div>
    </>
  );
}

export default UpdateCard;