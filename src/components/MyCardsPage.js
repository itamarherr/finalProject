import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";
import { getCard, deleteCard, getAllMyCards } from "./service/apiCard";
import { getUser } from "./service/apiUser";


function MyCardsPage() {
    const [cards, setCards] = useState([]);
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const textColor = theme === "dark" ? "text-light" : "text-dark";
    const titleTextColor = theme === "dark" ? "text-dark" : "text-light";

    useEffect(() => {
        fetchUserCards();
    }, []);

    const fetchUserCards = async () => {
        try {
            const response = await getAllMyCards(); // Fetch current user
            setCards(response); // Assuming the user object has a 'cards' field containing their cards
        } catch (error) {
            console.error("Error fetching user cards:", error);
        }
    };
    const handleDeleteCard = (cardId) => {
        // Implement delete card functionality here
    };
    const toggleFavorite = (cardId) => {
        const updatedCards = cards.map((card) =>
            card._id === cardId ? { ...card, isFavorite: !card.isFavorite } : card
        );
        setCards(updatedCards);
        const favoriteCardIds = updatedCards.filter((card) => card.isFavorite).map((card) => card._id);
        localStorage.setItem("favoriteCardIds", JSON.stringify(favoriteCardIds));
    };


    return (
        <div className="container" style={{ backgroundColor: '#fff' }}>
            <div className="text-center">
                <h1>My Cards</h1>
            </div>

            <Row xs={1} md={2} lg={3} xl={4} className="row">
                {cards.map((card, index) => (
                    <Col key={index} className="mb-4">
                        <Card border="primary" style={{ backgroundColor: theme === 'dark' ? '#121212' : '#fff', borderWidth: '3px', color: textColor, height: "100%" }}>
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
                                            onClick={() => toggleFavorite(card._id)}>
                                            {card.isFavorite ? <i class="bi bi-star-fill"></i> : <i class="bi bi-star"></i>}
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button variant="danger" size="sm" onClick={() => handleDeleteCard(card._id)}>
                                            <i className="bi bi-trash-fill"></i>
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            onClick={() => navigate(`/UpdateCard/${card._id}`)}
                                        >
                                            <i className="bi bi-pencil-fill"></i>
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

export default MyCardsPage;