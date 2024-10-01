import React, { useContext, useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { getCard } from "./service/apiCard";
import { ThemeContext } from "../Context/ThemeContext";

function HomePage() {
  const [cards, setCards] = useState([]);
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "dark" ? "text-light" : "text-dark";
  const titleTextColor = theme === "dark" ? "text-dark" : "text-light";

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = () => {
    const sampleCards = [
      {
        title: "Tech Innovators",
        subtitle: "Leading IT Solutions",
        image: { url: "https://picsum.photos/id/1/200/200" },
      },
      {
        title: "Creative Minds Studio",
        subtitle: "Design and Marketing Agency",
        image: { url: "https://picsum.photos/id/10/200/200" },
      },
      {
        title: "Green Earth Landscaping",
        subtitle: "Eco-Friendly Landscaping Services",
        image: { url: "https://picsum.photos/id/20/200/200" },
      },
      {
        title: "Future Fintech",
        subtitle: "Financial Technology Experts",
        image: { url: "https://picsum.photos/id/30/200/200" },
      },
      {
        title: "Urban Style Architects",
        subtitle: "Modern Architecture & Design",
        image: { url: "https://picsum.photos/id/50/200/200" },
      },
      {
        title: "Fresh Bites Catering",
        subtitle: "Delicious Catering for Events",
        image: { url: "https://picsum.photos/id/60/200/200" },
      },
      {
        title: "Elite Fitness Gym",
        subtitle: "Personal Training and Wellness",
        image: { url: "https://picsum.photos/id/70/200/200" },
      },
      {
        title: "Smart Home Solutions",
        subtitle: "Automating Your Home Life",
        image: { url: "https://picsum.photos/id/80/200/200" },
      },
    ];
    setCards(sampleCards);
  };

  return (
    <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">ZIV'S APP</h1>
          <p className="lead">the place to publish your business</p>
          <div className="row">
            <div className="col-sm-4 col-md-8">
              <img
                src="https://picsum.photos/id/370/800/700"
                alt="Books"
                className="img-fluid rounded-2"
              />
            </div>
            <div className="col-sm-8 col-md-4">
              <h3>Business Cards menegment</h3>

              <p>
                Welcome to ZIV'S APP. A business cards management application.
              </p>
              <p>
                If you register as a user, you'll be able to find countless
                business cards, like the sample below.
              </p>
              <p>
                In our app, registered users can create a list of favorite
                cards. Additionally, by clicking on the business cards, users
                will get more details about each business.
              </p>
              <p>
                Users who register as business users can also create their own
                cards and, of course, have the option to edit and manage them.
              </p>
              <p>
                We invite you to create your own digital business card. It's
                quick and easy with ZIV'S APP. Within minutes, you can design a
                personalized card that reflects your brand identity and
                showcases your contact information.
              </p>
              <p>
                Ready to get started? Simply press the Signup button to access
                our platform.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col">
              <div className="p-4 mb-3 mt-4 bg-light rounded border border-worning">
                <div
                  className={`container ${
                    theme === "dark" ? "btn-light" : "btn-dark"
                  }`}
                  style={{
                    backgroundColor: theme === "dark" ? "#fff" : "#343a40",
                  }}
                >
                  <div className="text-center">
                    <h1 className={`${titleTextColor}`}>
                      Sample business cards
                    </h1>
                  </div>

                  <Row xs={1} md={2} lg={3} xl={4} className="row">
                    {cards.map((card, index) => (
                      <Col key={index} className="mb-4">
                        <Card
                          border="primary"
                          style={{
                            backgroundColor:
                              theme === "dark" ? "#121212" : "#fff",
                            borderWidth: "3px",
                            color: textColor,
                            height: "100%",
                          }}
                        >
                          <Card.Header className={`${textColor}`}>
                            Business card
                          </Card.Header>
                          <Card.Body
                            className={`${textColor}`}
                            style={{ overflow: "auto" }}
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
                            <Card.Text>{card.phone}</Card.Text>
                            <Card.Text>{card.email}</Card.Text>
                            <Card.Img
                              variant="top"
                              src={card.image.url}
                              style={{
                                maxWidth: "100%",
                                marginBottom: "10px",
                                marginLeft: "10px",
                              }}
                            />
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
