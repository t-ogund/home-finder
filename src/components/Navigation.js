import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const Navigation = () => {
    return(
        <React.Fragment>
            <Navbar bg='light' expand='lg'>
              <Container>
                <Navbar.Brand href='/'>Home-Finder</Navbar.Brand>
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