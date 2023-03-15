import React from 'react';
import { 
    Container, 
    Row, 
    Col, 
    Form, 
    Button, 
    Card 
} from 'react-bootstrap';

const Home = () => {
    return(
        <React.Fragment>
            <Container fluid className='splash'>
                <Row className='input-row'>
                    <Col xs={8} md={6} lg={4}>
                    <Form>
                        <Form.Group className='mb-3' controlId='input-query'>
                            <Form.Control className='p-3' type='text' placeholder='Enter an address, neighborhood, city or ZIP code' />
                        </Form.Group>
                    </Form>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row className='card-row'>
                    <Col className='home-card-column'>
                        <Card className='home-card'>
                        <Card.Img variant='top' src='apartment.jpg' />
                            <Card.Body>
                                <Card.Title>
                                    Rent a home
                                </Card.Title>
                                <Card.Text>
                                    We're creating a seamless online experience - from shopping
                                    on the largest rental network, to applying, to paying rent.
                                </Card.Text>
                                <Button variant='primary'>
                                    Find rentals
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='home-card-column'>
                        <Card className='home-card'>
                        <Card.Img variant='top' src='sell-house.jpg' height='300'/>
                            <Card.Body>
                                <Card.Title>
                                    Sell a home
                                </Card.Title>
                                <Card.Text>
                                    No matter what path you take to sell your home, 
                                    we can hep you navigate a successful sale.
                                </Card.Text>
                                <Button disabled variant='primary'>
                                    Coming soon
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='home-card-column'>
                        <Card className='home-card'>
                        <Card.Img variant='top' src='buy-house.jpg' height='275' />
                            <Card.Body>
                                <Card.Title>
                                    Buy a home
                                </Card.Title>
                                <Card.Text>
                                    Find your place with an immersive photo experience 
                                    and the most listings, including things you won't find 
                                    anywhere else.
                                </Card.Text>
                                <Button variant='primary'>
                                    Browse Homes
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            
        </React.Fragment>
    )
}

export default Home;