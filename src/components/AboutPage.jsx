import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function AboutPage() {
    return (
        <Container className="about-page mt-5">
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={8}>
                    <h1 className="text-center mb-4">About ZIV'S APP</h1>
                    <p>
                        Welcome to ZIV'S APP, a business card management application. 
                    </p>

                    <p>
                        My name is Itamar Herr. I built this application as a graduation project for the React module in my FullStack studies at HackerU.
                    </p>
                    <p>
                       On the home page, guests can view a sample of business cards. If they register as users, they will gain access to all the business cards in the app.
                    </p>
                    <p>
                       Registered users can create a list of favorite cards. Additionally, by clicking on business cards, users will get more details about each business.
                    </p>
                    <p>
                        A user who registers as a business user can also create their own cards and, of course, have the option to edit them.
                    </p>
                    <p>
                       I invite you to create your own digital business card. It's quick and easy with ZIV'S APP. Within minutes, you can design a personalized card that reflects your brand identity and showcases your contact information.
                    </p>
                    <p>
                       Ready to get started? Simply press the Signup button to access our platform.
                    </p>
                  
    
                </Col>
            </Row>
        </Container>
    );
}

export default AboutPage;
