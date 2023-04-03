import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import logo from './logo.jpeg';
import './navbar.css';

const NavBar = () => {
  return (
		<div className='navbar'>
      <Navbar collapseOnSelect expand="lg" bg="navbar" variant="light">
        <Container>
          <Navbar.Brand href="/"><img src={logo} alt="Logo" width="30" height="30" className="d-inline-block align-text-top me-2" />SFU</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
              <Button   variant="secondary" size="sm"><Nav.Link href="./signin">Signin</Nav.Link></Button>{' '}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
