import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function AboutPage() {
    return (
        <Container className="about-page mt-5">
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={8}>
                    <h1 className="text-center mb-4">About ZIV'S APP</h1>
                    <p>
                        Welcome to ZIV'S APP. A business card management application. 
                    </p>

                    <p>
                        My name is Itamar Herr. I built this application as a graduation project of React model in FullStack studies at hackerU.
                    </p>
                    <p>
                       On the home page of the app, guests can see a sample of business cards. If they register as a users they will get access to all the business cards in the app. 
                    </p>
                    <p>
                        Registered users can create a list of favorite cards. In eddition by clicking on the business cards and the users will get more details about that business.
                    </p>
                    <p>
                         A user who registers as a business user can also create his own cards and of course have the option to edit them. 
                    </p>
                    <p>
                         I invate you to Creat your own digital business card is quick and easy with ZIV'S APP. Within minutes, you can design a personalized card that reflects your brand identity and showcases your contact information.
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
