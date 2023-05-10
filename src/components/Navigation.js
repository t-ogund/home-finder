import React from 'react';
import {
  Container,
  Nav,
  Navbar
} from 'react-bootstrap';

const Navigation = () => {
    return(
          <Navbar className='p-2' fixed='top' bg='light' expand='lg'>
            <Container>
              <Navbar.Brand href='/'>Home Finder</Navbar.Brand>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='me-auto'>
                  <Nav.Link className='center-navlink' to='/' href='/'>Home</Nav.Link>
                  <Nav.Link className='center-navlink' to='sale-properties' href='sale-properties'>Buy</Nav.Link>
                  <Nav.Link className='center-navlink' to='rental-properties' href='rental-properties'>Rent</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
    )
}

export default Navigation;