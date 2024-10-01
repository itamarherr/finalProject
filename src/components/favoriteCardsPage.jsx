import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { getCard } from "./service/apiCard";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";

function FavoriteCardsPage() {
  const [favoriteCards, setFavoriteCards] = useState([]);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const textColor = theme === "dark" ? "text-light" : "text-dark";
  const titleTextColor = theme === "dark" ? "text-dark" : "text-light";

  useEffect(() => {
    const fetchFavoriteCards = async () => {
      const favoriteCardIds = JSON.parse(localStorage.getItem("favoriteCardIds")) || [];
      try {
        const response = await getCard();
        const filteredFavoriteCards = response.filter((card) => favoriteCardIds.includes(card._id));
        setFavoriteCards(filteredFavoriteCards);
      } catch (error) {
        console.error("Error fetching favorite cards:", error);
      }
    };

    fetchFavoriteCards();
  }, []);

  const removeCardFromFavorites = (cardId, e) => {
    e.stopPropagation();
    const updatedFavoriteCards = favoriteCards.filter((card) => card._id !== cardId);
    setFavoriteCards(updatedFavoriteCards);

    const favoriteCardIds = updatedFavoriteCards.map((card) => card._id);
    localStorage.setItem("favoriteCardIds", JSON.stringify(favoriteCardIds));
  };
  const handleCardClick = (cardId) => {
    navigate(`/business/${cardId}`);
  };

  return (
    <div className="container" style={{ backgroundColor: '#fff' }}>
      <h1 className="text-center">Favorite Cards</h1>
      {favoriteCards.length === 0 ? (
            <div style={{ 
              height: '80vh', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center',      
              marginTop: 'auto' 
              }} 
              className="text-center text-muted">
                <h3 style={{ marginBottom: '10px' }}>You don't have any cards yet!</h3>
                
            </div>
        ) : (
             <>
      <Row xs={1} md={2} lg={3} xl={4} className="row">
        {favoriteCards.map((card) => (
          <Col key={card._id} className="mb-4">
            <Card border="primary" style={{
              backgroundColor: theme === 'dark' ? '#343a40' : '#fff', borderWidth: '3px', color: textColor, height: "100%",
              cursor: "pointer",
            }} onClick={() => handleCardClick(card._id)}
            >
              <Card.Header className={`${textColor}`}>Business card</Card.Header>
              <Card.Body className={`${textColor}`} style={{ overflow: "auto" }}>
                <div style={{ maxHeight: "150px", overflow: "hidden" }}></div>
                <Card.Title className={`${textColor}`}>{card.title}</Card.Title>
                <Card.Subtitle className={`${textColor}`}>{card.subtitle}</Card.Subtitle>
               
                <Card.Img 
                  variant="top"
                  src={card.image.url}
                  style={{ 
                      width: "100%", 
                      height: "150px", 
                      objectFit: "cover", 
                      marginBottom: "10px", 
                      marginTop: "20px", 
                      marginRight: "10px", 
                      marginLeft: "10px" 
                  }}
                />
                <Row>
  <Col className="flex flex-col justify-end items-center">
    <Button
      variant="outline-danger"
      size="lg"
      className="mt-3 mb-2 mr-2 px-3 py-1 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-300"
      onClick={(e) => {
        e.stopPropagation();
        removeCardFromFavorites(card._id, e);
      }}
    >
      Remove from Favorites
    </Button>
  </Col>
</Row>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div style={{ height: '50vh', marginTop: '2rem' }} className="text-center"> 
               <h2 className="lead text-center text-muted mb-3">Click on the cards to view more detailed information</h2>
                 </div>
            </> )}
      
    </div>
  );
}

export default FavoriteCardsPage;
