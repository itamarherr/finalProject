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

  const handleInputChange = (e) => {
    setCard({
      ...card,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      console.log("Card object:", card);
      if (!card.title || !card.description) {
        alert("Title and Description are required fields.");
        return;
      }
      console.log("API Request Payload:", { token, card });
      await createNewCard(token, card);
      navigate("/CardListPage");
    } catch (error) {
      console.error("Error while saving card:", error);
      alert("An error occurred while saving the card. Please try again.");
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
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label className="form-label">url:</label>
          <input
            type="text"
            className="form-control"
            value={card.url}
            onChange={handleInputChange}
            name="url"
          />
        </div>
        <div className="col">
          <label className="form-label">alt:</label>
          <input
            type="text"
            className="form-control"
            value={card.alt}
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
            value={card.state}
            onChange={handleInputChange}
            name="state"
          />
        </div>
        <div className="col">
          <label className="form-label">country:</label>
          <input
            type="text"
            className="form-control"
            value={card.country}
            onChange={handleInputChange}
            name="country"
          />
        </div>
        <div className="col">
          <label className="form-label">city:</label>
          <input
            type="text"
            className="form-control"
            value={card.city}
            onChange={handleInputChange}
            name="city"
          />
        </div>
        <div className="col">
          <label className="form-label">street:</label>
          <input
            type="text"
            className="form-control"
            value={card.street}
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
  );
}
export default AddCard;
