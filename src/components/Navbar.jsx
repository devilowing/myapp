// src/components/Navbar.jsx
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarComponent = ({ isLoggedIn, isAdmin, onLogout }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">My App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {isLoggedIn && <Nav.Link as={Link} to="/datalist">DataList</Nav.Link>}
          {isLoggedIn && <Nav.Link as={Link} to="/finance">Finance</Nav.Link>}
          {isLoggedIn && <Nav.Link as={Link} to="/debt">Debt</Nav.Link>}
            {isLoggedIn && isAdmin && <Nav.Link as={Link} to="/add-category">เพิ่มหมวดหมู่</Nav.Link>}
          </Nav>
          <Nav className="ms-auto">
            {isLoggedIn ? (
              <Nav.Link onClick={onLogout}>Logout</Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
