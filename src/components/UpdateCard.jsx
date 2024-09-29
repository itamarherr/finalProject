import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { updateCard } from "./service/apiCard";
import { Card } from "react-bootstrap";
import axios from "axios";

export const getCardById = async (id) => {
  try {
    const response = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`);
    console.log("itamar:", response.data, id);
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
      houseNumber: 0,
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
      navigate("/MyCardsPage");
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
  
    setCard((prevCard) => {
      let updatedCard = { ...prevCard };

      if (name.includes('.')) {
        const [outerKey, innerKey] = name.split('.');
        updatedCard[outerKey] = {
          ...updatedCard[outerKey],
          [innerKey]: value
        };
      } else {
        updatedCard[name] = value;
      }
      
  
    



    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const israeliPhoneRegex = /^(?:0(?:5[^7]|[2-4689]|7[0-9])[ -]?(?:(?:(?:[2-9]|[2-9][0-9])[ -]?\d{3}[ -]?\d{4})|(?:7(?:(?:[0-9]{2}[ -]?\d{3}[ -]?\d{2})|(?:[0-9][ -]?\d{3}[ -]?\d{3}))))|(?:(?:\+972|972)[ -]?(?:(?:(?:[2-9]|[2-9][0-9])[ -]?\d{3}[ -]?\d{4})|(?:7(?:(?:[0-9]{2}[ -]?\d{3}[ -]?\d{2})|(?:[0-9][ -]?\d{3}[ -]?\d{3}))))))$/;

    const webAddressRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(\/\S*)?$/;

    const imageUrlRegex =  /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;;


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
    return updatedCard;
  });
};

  return (
    <>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card p-4">
              <h3 className="text-center mb-4">Update Card</h3>
              <div className="row">
                <div className="col-md-6 mb-3">
            <label className="form-label">Title: *</label>
            <input
              type="text"
              className="form-control"
              value={card.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          <div className="col">
            <label className="form-label">Subtitle: *</label>
            <input
              type="text"
              className="form-control"
              value={card.subtitle}
              onChange={handleInputChange}
              name="subtitle"

            />
          </div>
          <div className="col">
            <label className="form-label">Description: *</label>
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
            <label className="form-label">Phone: *</label>
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
            <label className="form-label">Email: *</label>
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
            <label className="form-label">Web: *</label>
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
    <label className="form-label">Image URL: *</label>
    <input
      type="text"
      className="form-control"
      value={card.image.url}
      onChange={handleInputChange}
      name="image.url"
    />
    {imageUrlError && <div style={{ color: 'red' }}>{imageUrlError}</div>}
  </div>
  <div className="col">
    <label className="form-label">Image Alt:</label>
    <input
      type="text"
      className="form-control"
      value={card.image.alt}
      onChange={handleInputChange}
      name="image.alt"
    />
  </div>
</div>
<div className="row">
  <div className="col">
    <label className="form-label">State:</label>
    <input
      type="text"
      className="form-control"
      value={card.address.state}
      onChange={handleInputChange}
      name="address.state"
    />
  </div>
  <div className="col">
    <label className="form-label">Country: *</label>
    <input
      type="text"
      className="form-control"
      value={card.address.country}
      onChange={handleInputChange}
      name="address.country"
    />
  </div>
  <div className="col">
    <label className="form-label">City: *</label>
    <input
      type="text"
      className="form-control"
      value={card.address.city}
      onChange={handleInputChange}
      name="address.city"
    />
  </div>
  <div className="col">
    <label className="form-label">Street: *</label>
    <input
      type="text"
      className="form-control"
      value={card.address.street}
      onChange={handleInputChange}
      name="address.street"
    />
  </div>
  <div className="col">
    <label className="form-label">HouseNumber: *</label>
    <input
      type="number"
      className="form-control"
      value={card.address.houseNumber}
      onChange={handleInputChange}
      name="address.houseNumber"
    />
  </div>
  <div className="col">
    <label className="form-label">Zip: *</label>
    <input
      type="number"
      className="form-control"
      value={card.address.zip}
      onChange={handleInputChange}
      name="address.zip"
    />
  </div>
</div>
     
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
      </div>
      </div>
      </div>
      </div>
    </>
  )
}

export default UpdateCard;