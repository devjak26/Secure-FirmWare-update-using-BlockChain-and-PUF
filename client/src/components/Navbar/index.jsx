import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import logo from './logo.jpeg';

const NavBar = () => {
  return (
		<>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home"><img src={logo} alt="Logo" width="30" height="30" className="d-inline-block align-text-top me-2" />SUF</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
              <Button variant="secondary" size="sm"><Nav.Link href="./signin">Signin</Nav.Link></Button>{' '}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
