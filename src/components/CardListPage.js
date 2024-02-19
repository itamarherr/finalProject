import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Row, Col} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createNewCard, updateCard, deleteCard } from "./service/apiCard";
import { getCard } from "./service/apiCard";
import { ThemeContext } from "../Context/ThemeContext";

function CardListPage() {
 // const [users, setUsers] = useState([]);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const  textColor = theme === "dark" ? "text-light"  : "text-dark";
  const  titleTextColor = theme === "dark" ?  "text-dark" : "text-light";

  

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await getCard();
      
      console.log("Full response:", response);
      setCards(response);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  
  const toggleFavorite = (cardId) => {
    const updatedCards = cards.map((card) =>
      card._id === cardId ? { ...card, isFavorite: !card.isFavorite } : card
    );
    setCards(updatedCards);
    // Update local storage with favorite card IDs
    const favoriteCardIds = updatedCards.filter((card) => card.isFavorite).map((card) => card._id);
    localStorage.setItem("favoriteCardIds", JSON.stringify(favoriteCardIds));
  };

 

  return (
    <div className={`container ${theme === 'dark' ? 'btn-light' : 'btn-dark'}`} style={{ backgroundColor: theme === 'dark' ? '#fff' : '#343a40' }}>
      <div className="text-center">
        <h1  className={`${titleTextColor}`}  > Cards Page</h1>
        </div>
      
      <button
         className={`btn ${theme === 'dark' ? 'btn-light' : 'btn-primary'} mb-3 mt-3 m-5`}
        onClick={() => navigate("/AddCard", { createNewCard })}
      >
        Add Card
      </button>

      <Row xs={1} md={2} lg={3} xl={4} className="row">
        {cards.map((card, index) => (
          <Col key={index} className="mb-4">
            <Card border="primary" style={{ backgroundColor: theme === 'dark' ? '#343a40' : '#fff' }}>
             <Card.Header >Business card</Card.Header>
              <Card.Body className={`${textColor}`}>
                <Card.Title className={`${textColor}`} >{card.title }</Card.Title>
                <Card.Subtitle className= {`${textColor}`}>{card.subtitle}</Card.Subtitle>
                <Card.Text>{card.description}</Card.Text>
                <Card.Text>{card.phone}</Card.Text>
                <Card.Text>{card.email}</Card.Text>
                <Card.Img  
                  variant="top"
                  src={card.image.url}
                  style={{ marginBottom: "10px", marginLeft: "10px" }}
                />
                <Row>
                 <Col>
                 <Button
                  variant={card.isFavorite ? "warning" : "outline-warning"} 
                  size="sm" 
                  onClick={() => toggleFavorite(card._id)}>
                    {card.isFavorite ? "Remove from favorites" : "Add to favorites"}
                  </Button>
                </Col>
                <Col>
                    <Button variant="danger" size="sm" onClick={() => deleteCard(card._id).then(fetchCards)}>
                      Delete card
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/UpdateCard/${card._id}`)}
                    >
                      Update card
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
