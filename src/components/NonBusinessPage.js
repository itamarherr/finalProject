import React, { useContext, useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getCard, updateCard } from "./service/apiCard";
import { ThemeContext } from "../Context/ThemeContext";

function NonBusinessPage() {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "dark" ? "text-light" : "text-dark";
  const titleTextColor = theme === "dark" ? "text-dark" : "text-light";

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await getCard();
      setCards(response);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  const toggleFavorite = async (cardId) => {
    const updatedCards = cards.map((card) =>
      card._id === cardId ? { ...card, isFavorite: !card.isFavorite } : card
    );
    setCards(updatedCards);
    try {
      // Update favorite status in the backend
      await updateCard(localStorage.getItem("token"), updatedCards.find(card => card._id === cardId), cardId);
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };
  const handleCardClick = (cardId) => {
    // Navigate to the detailed information page passing cardId as a parameter
    navigate(`/business/${cardId}`);
  };

  return (
    <div className={`container ${theme === 'dark' ? 'btn-light' : 'btn-dark'}`} style={{ backgroundColor: theme === 'dark' ? '#fff' : '#343a40' }}>
      <div className="text-center">
        <h1 className={`${titleTextColor}`}> Cards Page</h1>
      </div>

      <Row xs={1} md={2} lg={3} xl={4} className="row">
        {cards.map((card, index) => (
          <Col key={index} className="mb-4">
            <Card border="primary" style={{
              backgroundColor: theme === 'dark' ? '#343a40' : '#fff',
              cursor: "pointer",
            }} onClick={() => handleCardClick(card._id)}

            >
              <Card.Header>Business card</Card.Header>
              <Card.Body className={`${textColor}`}>
                <Card.Title className={`${textColor}`}>{card.title}</Card.Title>
                <Card.Subtitle className={`${textColor}`}>{card.subtitle}</Card.Subtitle>
                <Card.Text>{card.description}</Card.Text>
                <Card.Text>{card.phone}</Card.Text>
                <Card.Text>{card.email}</Card.Text>
                <Card.Img
                  variant="top"
                  src={card.image.url}
                  style={{ marginBottom: "10px", marginLeft: "10px" }}

                />
                <Button
                  variant={card.isFavorite ? "warning" : "outline-warning"}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(card._id);
                  }}
                >
                  {card.isFavorite ? <i class="bi bi-star-fill"></i> : <i class="bi bi-star"></i>}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default NonBusinessPage;