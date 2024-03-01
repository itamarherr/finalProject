import { Link, Navigate } from "react-router-dom";
import NavigationBar from "../layout/NavigationBar";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import CardListPage from "./CardListPage";
import { Card, Row, Col, Button } from "react-bootstrap";
import { getCard } from "./service/apiCard";
import { ThemeContext } from "../Context/ThemeContext";


function HomePage() {
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
      setCards(response.slice(0, 8));
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  // const toggleFavorite = (cardId) => {
  //   const updatedCards = cards.map((card) =>
  //     card._id === cardId ? { ...card, isFavorite: !card.isFavorite } : card
  //   );
  //   setCards(updatedCards);
  //   const favoriteCardIds = updatedCards.filter((card) => card.isFavorite).map((card) => card._id);
  //   localStorage.setItem("favoriteCardIds", JSON.stringify(favoriteCardIds));
  // };

  return (
    <>

      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">ZIV'S APP</h1>
          <p className="lead">
            the place to publish your business
          </p>
          <div className="row">
            <div className="col-sm-4 col-md-8">
              <img
                src="https://picsum.photos/id/251/800/700"
                alt="Books"
                className="img-fluid rounded-2"
              />
            </div>
            <div className="col-sm-8 col-md-4">
              <h3>About us</h3>
              <p>
                Welcome to our innovative business card management app, where networking meets simplicity.</p>.
              Not only does our platform empower you to effortlessly organize your own business cards,
              <p> but it also opens doors to explore and connect with others in your professional sphere. </p>
              <p>Craft your unique digital business card within minutes, showcasing your brand identity with flair.
                Plus, with easy access to view and save cards from other businesses, networking has never been smoother.</p>
              <p>Say hello to a world where exchanging contact information is as easy as a tap.
                Join our community today and unlock endless networking possibilities at your fingertips.
              </p>

              {/* <div className="progress-stacked">
                <div
                  className="progress"
                  role="progressbar"
                  aria-label="Segment one"
                  aria-valuenow="15"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: "15%" }}
                >
                  <div className="progress-bar"></div>
                </div>
                <div
                  className="progress"
                  role="progressbar"
                  aria-label="Segment two"
                  aria-valuenow="30"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: "30%" }}
                >
                  <div className="progress-bar bg-success"></div>
                </div>
                <div
                  className="progress"
                  role="progressbar"
                  aria-label="Segment three"
                  aria-valuenow="20"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: "20%" }}
                >
                  <div className="progress-bar bg-info"></div>
                </div>
              </div>
              <div className="card">
                <h3>sites regoleation</h3>
              </div> */}
            </div>
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col">
              <div className="p-4 mb-3 mt-4 bg-light rounded border border-worning">
                <div className={`container ${theme === 'dark' ? 'btn-light' : 'btn-dark'}`} style={{ backgroundColor: theme === 'dark' ? '#fff' : '#343a40' }}>
                  <div className="text-center">
                    <h1 className={`${titleTextColor}`}>Sample business cards</h1>
                  </div>

                  <Row xs={1} md={2} lg={3} xl={4} className="row">
                    {cards.map((card, index) => (
                      <Col key={index} className="mb-4">
                        <Card border="primary" style={{ backgroundColor: theme === 'dark' ? '#121212' : '#fff', borderWidth: '3px', color: textColor, height: "100%" }}>
                          <Card.Header className={`${textColor}`}>Business card</Card.Header>
                          <Card.Body className={`${textColor}`} style={{ overflow: "auto" }}>
                            <div style={{ maxHeight: "150px", overflow: "hidden" }}></div>
                            <Card.Title className={`${textColor}`}>{card.title}</Card.Title>
                            <Card.Subtitle className={`${textColor}`}>{card.subtitle}</Card.Subtitle>
                            {/* <Card.Text>{card.description}</Card.Text> */}
                            <Card.Text>{card.phone}</Card.Text>
                            <Card.Text>{card.email}</Card.Text>
                            <Card.Img
                              variant="top"
                              src={card.image.url}
                              style={{ maxWidth: "100%", marginBottom: "10px", marginLeft: "10px" }}
                            />
                            {/* <Button
                              variant={card.isFavorite ? "warning" : "outline-warning"}
                              size="sm"
                              onClick={() => toggleFavorite(card._id)}
                            > */}
                            {/* {card.isFavorite ? "Remove from favorites" : "Add to favorites"} */}
                            {/* </Button> */}
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default HomePage;
