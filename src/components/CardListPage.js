import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createNewCard, updateCard, deleteCard } from "./service/apiCard";
import { getCard } from "./service/apiCard";
import { ThemeContext } from "../Context/ThemeContext";

function CardListPage() {
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


  const toggleFavorite = (cardId, e) => {
    e.stopPropagation();
    const updatedCards = cards.map((card) =>
      card._id === cardId ? { ...card, isFavorite: !card.isFavorite } : card
    );
    setCards(updatedCards);
    const favoriteCardIds = updatedCards.filter((card) => card.isFavorite).map((card) => card._id);
    localStorage.setItem("favoriteCardIds", JSON.stringify(favoriteCardIds));
  };

  const handleCardClick = (cardId) => {
    navigate(`/business/${cardId}`);
  };




  return (
    <div className="container" style={{ backgroundColor: '#fff' }}>
      <div className="text-center">
        <h1>Cards Page</h1>
      </div>

      <button
        className={`btn ${theme === 'dark' ? 'btn-dark' : 'btn-primary'} mb-3 mt-3 m-5`}
        onClick={() => navigate("/AddCard", { createNewCard })}
      >
        Add Card
      </button>

      <Row xs={1} md={2} lg={3} xl={4} className="row">
        {cards.map((card, index) => (
          <Col key={index} className="mb-4">
            <Card border="primary" style={{ backgroundColor: theme === 'dark' ? '#121212' : '#fff', borderWidth: '3px', color: textColor, height: "100%", cursor: "pointer" }} onClick={() => handleCardClick(card._id)}>
              <Card.Header className={`${textColor}`}>Business card</Card.Header>
              <Card.Body className={`${textColor}`} style={{ overflow: "auto" }}>
                <div style={{ maxHeight: "150px", overflow: "hidden" }}></div>
                <Card.Title className={`${textColor}`} >{card.title}</Card.Title>
                <Card.Subtitle className={`${textColor}`}>{card.subtitle}</Card.Subtitle>
                <Card.Text>{card.phone}</Card.Text>
                <Card.Text>{card.email}</Card.Text>
                <Card.Img
                  variant="top"
                  src={card.image.url}
                  style={{ maxWidth: "100%", marginBottom: "10px", marginLeft: "10px" }}
                />
                <Row>
                  <Col>
                    <Button
                      variant={card.isFavorite ? "warning" : "outline-warning"}
                      size="sm"
                      onClick={(e) => toggleFavorite(card._id, e)}>
                      {card.isFavorite ? <i class="bi bi-star-fill"></i> : <i class="bi bi-star"></i>}
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="danger" size="sm" onClick={() => deleteCard(card._id).then(fetchCards)}>
                      <i class="bi bi-trash-fill"></i>
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/UpdateCard/${card._id}`)}
                    >
                      <i class="bi bi-pencil-fill"></i>
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
export default CardListPage;
