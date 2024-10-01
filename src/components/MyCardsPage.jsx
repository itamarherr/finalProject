import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";
import { createNewCard, deleteCard, getAllMyCards } from "./service/apiCard";

function MyCardsPage() {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "dark" ? "text-light" : "text-dark";

  useEffect(() => {
    fetchUserCards();
  }, []);

  const fetchUserCards = async () => {
    try {
      const response = await getAllMyCards();
      setCards(response);
    } catch (error) {
      console.error("Error fetching user cards:", error);
    }
  };
  const handleDeleteCard = async (cardId, e) => {
    e.stopPropagation();
    try {
      await deleteCard(cardId);
      await fetchUserCards();
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };
  const toggleFavorite = (cardId, e) => {
    console.log("Toggle favorite function invoked for card ID:", cardId);
    e.stopPropagation();
    const updatedCards = cards.map((card) =>
      card._id === cardId ? { ...card, isFavorite: !card.isFavorite } : card
    );
    setCards(updatedCards);
    const favoriteCardIds = updatedCards
      .filter((card) => card.isFavorite)
      .map((card) => card._id);
    localStorage.setItem("favoriteCardIds", JSON.stringify(favoriteCardIds));
  };
  const handleCardClick = (cardId) => {
    navigate(`/business/${cardId}`);
  };

  const handleUpdateButtonClick = (cardId, e) => {
    e.stopPropagation();
    navigate(`/UpdateCard/${cardId}`);
  };

  return (
    <div className="container" style={{ backgroundColor: "#fff" }}>
      <div className="text-center">
        <h1>My Cards</h1>
      </div>

      <button
        className={`btn ${
          theme === "dark" ? "btn-dark" : "btn-primary"
        } mb-3 mt-3 m-5`}
        onClick={() => navigate("/AddCard")}
      >
        Add Card
      </button>
      {cards.length === 0 ? (
        <div
          style={{ height: "50vh", marginTop: "2rem" }}
          className="text-center text-muted"
        >
          <h3 style={{ marginBottom: "10px" }}>
            You don't have any cards yet!
          </h3>
          <p style={{ marginBottom: "20px" }}>
            Click the 'Add Card' button above to create your first business
            card.
          </p>
        </div>
      ) : (
        <>
          <Row xs={1} md={2} lg={3} xl={4} className="row">
            {cards.map((card, index) => (
              <Col key={index} className="mb-4">
                <Card
                  border="primary"
                  style={{
                    backgroundColor: theme === "dark" ? "#121212" : "#fff",
                    borderWidth: "3px",
                    color: textColor,
                    height: "100%",
                    cursor: "pointer",
                  }}
                  onClick={() => handleCardClick(card._id)}
                >
                  <Card.Header className={`${textColor}`}>
                    Business card
                  </Card.Header>
                  <Card.Body
                    className={`${textColor}`}
                    // style={{ overflow: "auto" }}
                  >
                    <div
                      style={{ maxHeight: "150px", overflow: "hidden" }}
                    ></div>
                    <Card.Title className={`${textColor}`}>
                      {card.title}
                    </Card.Title>
                    <Card.Subtitle className={`${textColor}`}>
                      {card.subtitle}
                    </Card.Subtitle>
                    <Card.Img
                      variant="top"
                      src={card.image.url}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                        marginBottom: "10px",
                        marginTop: "20px",
                        marginLeft: "10px",
                        marginRight: "10px",
                      }}
                    />
                    <Row>
                      <Col>
                        <Button
                          variant={
                            card.isFavorite ? "warning" : "outline-warning"
                          }
                          size="sm"
                          onClick={(e) => toggleFavorite(card._id, e)}
                        >
                          {card.isFavorite ? (
                            <i class="bi bi-star-fill"></i>
                          ) : (
                            <i class="bi bi-star"></i>
                          )}
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={(e) => handleDeleteCard(card._id, e)}
                        >
                          <i class="bi bi-trash-fill"></i>
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={(e) => handleUpdateButtonClick(card._id, e)}
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
          <div style={{ height: "50vh", marginTop: "2rem" }} 
          className="text-center">
            <h2 className="lead text-center text-muted mb-3">
              Click on the cards to view more detailed information
            </h2>
          </div>
        </>
      )}
    </div>
  );
}

export default MyCardsPage;
