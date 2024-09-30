import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import NavigationBar from "../layout/NavigationBar";
import { createNewCard } from "./service/apiCard";
import { Card } from "react-bootstrap";
import React from 'react';

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
    houseNumber: 0,
    zip: 0,
  });

  const [errors, setErrors] = useState({});
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [webError, setWebError] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");
  
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    } else {
      console.log("No token found in localStorage");
    }
  }, []);

  const handleInputEnter = (e) => {
    const { name, value } = e.target;
    console.log("Input Change:", name, value);
    setCard({
      ...card,
      [name]: value,
    });
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const israeliPhoneRegex = /^(?:0(?:5[^7]|[2-4689]|7[0-9])[ -]?(?:(?:(?:[2-9]|[2-9][0-9])[ -]?\d{3}[ -]?\d{4})|(?:7(?:(?:[0-9]{2}[ -]?\d{3}[ -]?\d{2})|(?:[0-9][ -]?\d{3}[ -]?\d{3}))))|(?:(?:\+972|972)[ -]?(?:(?:(?:[2-9]|[2-9][0-9])[ -]?\d{3}[ -]?\d{4})|(?:7(?:(?:[0-9]{2}[ -]?\d{3}[ -]?\d{2})|(?:[0-9][ -]?\d{3}[ -]?\d{3}))))))$/;

    const webAddressRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(\/\S*)?$/;

   const imageUrlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;;



    if (name === "email" && !emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }

    if (name === "phone" && !israeliPhoneRegex.test(value)) {
      setPhoneError("Please enter a valid isreali phone number")
    } else {
      setPhoneError("");
    }
    israeliPhoneRegex
    if (name === "web" && !webAddressRegex.test(value)) {
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
  }

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("handleSave called");  // Log this
    console.log("Card Data:", card);   // Log card data
    console.log("Token:", token);      // Log token
    if (Object.values(errors).some(error => error !== null)) {
      alert("Please correct the errors before submitting.");
      return;
    }
    try {
      const response = await createNewCard(token, card);
      navigate("/MyCardsPage");
    } catch (error) {
      alert("An error occurred while saving the card. Please try again.");
      throw error;
    }
  };


  return (
    <>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card p-4">
              <h3 className="text-center mb-4">Add New Card</h3>
              <div className="row">
                <div className="col-md-6 mb-3">
          <label className="form-label">Title:* </label>
          <input
            type="text"
            className="form-control"
            value={card.title}
            onChange={handleInputEnter}
            name="title"
            autoCapitalize="none"
            autoComplete="off"
            spellCheck="false"
          />
        {errors.title && <div style={{ color: 'red' }}>{errors.title}</div>}  
        </div>
        <div className="col">
          <label className="form-label">Subtitle: *</label>
          <input
            type="text"
            className="form-control"
            value={card.subtitle}
            onChange={handleInputEnter}
            name="subtitle"
          />
         {errors.subtitle && <div style={{ color: 'red' }}>{errors.subtitle}</div>}
        </div>
        <div className="col">
          <label className="form-label">Description: *</label>
          <input
            type="text"
            className="form-control"
            value={card.description}
            onChange={handleInputEnter}
            name="description"
          />
           {errors.description && <div style={{ color: 'red' }}>{errors.description}</div>}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label className="form-label">Phone: *</label>
          <input
            type="text"
            className="form-control"
            value={card.phone}
            onChange={handleInputEnter}
            name="phone"
          />
          {phoneError && <div style={{ color: 'red' }}>{phoneError}</div>}
          <small className="form-text text-muted">Enter 10-15 only digits.</small>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label className="form-label">Email: *</label>
          <input
            type="text"
            className="form-control"
            value={card.email}
            onChange={handleInputEnter}
            name="email"
          />
          {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
          <small className="form-text text-muted">A valid email is required.</small>

        </div>
      </div>
      <div className="row">
        <div className="col">
          <label className="form-label">Web: *</label>
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
          <label className="form-label">Image URL*:</label>
          <input
            type="text"
            className="form-control"
            value={card.url}
            onChange={handleInputEnter}
            name="url"
          />
          {imageUrlError && <div style={{ color: 'red' }}>{imageUrlError}</div>}    
           <small className="form-text text-muted">Enter valide Image Url.</small>
        </div>
        <div className="col">
          <label className="form-label">Image Alt:</label>
          <input
            type="text"
            className="form-control"
            value={card.alt}
            onChange={handleInputEnter}
            name="alt"
          />
            {errors.alt && <div style={{ color: 'red' }}>{errors.alt}</div>}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label className="form-label">State:</label>
          <input
            type="text"
            className="form-control"
            value={card.state}
            onChange={handleInputEnter}
            name="state"
          />
        </div>
        <div className="col">
          <label className="form-label">Country:</label>
          <input
            type="text"
            className="form-control"
            value={card.country}
            onChange={handleInputEnter}
            name="country"
          />
        </div>
        <div className="col">
          <label className="form-label">City:</label>
          <input
            type="text"
            className="form-control"
            value={card.city}
            onChange={handleInputEnter}
            name="city"
          />
        </div>
        <div className="col">
          <label className="form-label">Street:</label>
          <input
            type="text"
            className="form-control"
            value={card.street}
            onChange={handleInputEnter}
            name="street"
          />
        </div>
        <div className="col">
          <label className="form-label">HouseNumber:</label>
          <input
            type="number"
            className="form-control"
            value={card.houseNumber}
            onChange={handleInputEnter}
            name="houseNumber"
          />
        </div>
        <div className="col">
          <label className="form-label">Zip:</label>
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
      </div>
      </div>
      </div>
      </div>
    </>
  )
}
export default AddCard;
