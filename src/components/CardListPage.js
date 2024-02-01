import { useEffect, useState } from "react";
import { Card, Button, Row, Col} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { createNewCard, updateCard, deleteCard } from "./service/apiCard";
import { getCard } from "./service/apiCard";
import axios from "axios";

function CardListPage() {
  const [users, setUsers] = useState([]);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    console.log("Before getCard call");
    try {
      const response = await getCard();
      
      console.log("Full response:", response);
      setCards(response);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };
 

  return (
    <div className="container">
      <div className="text-center">
        <h1 > Cards Page</h1>
        </div>
      
      <button
        className="btn btn-primary mb-3 mt-3 m-5"
        onClick={() => navigate("/AddCard", { createNewCard })}
      >
        Add Card
      </button>

      <Row xs={1} md={2} lg={3} xl={4} className="row">
        {cards.map((card, index) => (
          <Col key={index} className="mb-4">
            <Card border="primary">
            <Card.Header>Business card</Card.Header>
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {card.subtitle}
                </Card.Subtitle>
          
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
                 <Button variant="danger" size="sm" onClick={() => {
                  console.log('Card:', card);
                 if (card && card._id) {
                  deleteCard(card._id);
                  fetchCards();
                } else {
                  console.error('Invalid card object or card ID');
                }
                 }}
                 >
                  delete card
                  </Button>
                 </Col>
                 <Col>
                  <Button variant="primary" size="sm" onClick={() => navigate(`/UpdateCard/${card._id}`, { updateCard })}>update card</Button>
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
