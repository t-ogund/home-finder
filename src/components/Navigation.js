import React from 'react';
import {
  Container,
  Nav,
  Navbar
} from 'react-bootstrap';

const Navigation = () => {
    return(
        <React.Fragment>
            <Navbar fixed='top' bg='light' expand='lg'>
              <Container>
                <Navbar.Brand href='/'>Home Finder</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                  <Nav className='me-auto'>
                    <Nav.Link to='/' href='/'>Home</Nav.Link>
                    <Nav.Link to='sale-properties' href='sale-properties'>Buy</Nav.Link>
                    <Nav.Link to='rental-properties' href='rental-properties'>Rent</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
        </React.Fragment>
    )
}

export default Navigation;