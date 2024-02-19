import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { getCard } from "./service/apiCard";

function FavoriteCardsPage() {
  const [favoriteCards, setFavoriteCards] = useState([]);

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

  return (
    <div className="container">
      <h1 className="text-center">Favorite Cards</h1>
      <Row xs={1} md={2} lg={3} xl={4} className="row">
        {favoriteCards.map((card) => (
          <Col key={card._id} className="mb-4">
            <Card border="primary">
              <Card.Header>Business card</Card.Header>
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Subtitle>{card.subtitle}</Card.Subtitle>
                <Card.Text>{card.description}</Card.Text>
                <Card.Text>{card.phone}</Card.Text>
                <Card.Text>{card.email}</Card.Text>
                <Card.Img variant="top" src={card.image.url} />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default FavoriteCardsPage;
