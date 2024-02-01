import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import NavigationBar from "../layout/NavigationBar";
import { updateCard } from "./service/apiCard";
import { Card } from "react-bootstrap";
import axios from "axios";

 export const getCardById = async (id) => {
     try {
       const response = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`);
       console.log("itamar:" + response);
       return response.data;
     } catch (error) {
       throw error;
     }
  };

function UpdateCard() {
  const navigate = useNavigate();
  const {id} = useParams();
  const location = useLocation();
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [card, setCard] = useState({
    title:"",
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
    houseNumber: 5,
    zip: 0,
  });
 
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log( location);
    try {
           const response = await updateCard(token, card, id);
           console.log("Card updated successfully", response);
            navigate("/CardListPage");
          } catch (error) {
            console.error("Error updating item:", error);
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


  // useEffect(() => {
  
  //   const fetchCardData= async () => {
  //     try {
  //       const response = await getCardById(id);
  //       console.log("itamar:" + response);
  //     } catch (error) {
  //       console.error("Error fetching card data:", error);
  //     }
  //   };
  //     fetchCardData();
  //   }, [id]);
  const handleInputChange = (e) => {
    setCard({
      ...card,
      [e.target.name]: e.target.value,
    });
  };
  
  return (
    <>
     <Card className="card flex justify-content-center">
            
        </Card>
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
