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

  const removeCardFromFavorites = (cardId) => {
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
                <Card.Text>{card.description}</Card.Text>
                <Card.Text>{card.phone}</Card.Text>
                <Card.Text>{card.email}</Card.Text>
                <Card.Img variant="top" src={card.image.url} />
                <Row>
                  <Col>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeCardFromFavorites(card._id)}>
                      Remove from Favorites
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default FavoriteCardsPage;
