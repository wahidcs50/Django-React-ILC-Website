import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom"
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar expand="lg" className="sticky-top text-dark" style={{height: '100px', backgroundColor:'#cccccc'}}> {/* Increase height */}
      <Container fluid>
        <Navbar.Brand>
            <img
              src="/assets/COMSATS_new_logo-2.jpg"
              width="100"
              height="100"
              className="d-inline-block align-top rounded-circle"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        <Navbar.Brand className="d-flex flex-column align-items-center text-center">
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>INDUSTRY LIAISON CELL</span> {/* Adjust font size and weight */}
          <span style={{ fontSize: '0.9rem' }}>COMSATS UNIVERSITY ISLAMABAD</span> {/* Adjust font size */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="mr-auto dark">
            <Nav.Link href="/" style={{ fontWeight: 'bold' }}>Home</Nav.Link> {/* Nav.Link instead of NavItem and NavLink */}
            <Nav.Link href="/about" style={{ fontWeight: 'bold' }}>About Us</Nav.Link>
            <Nav.Link href="/contacts" style={{ fontWeight: 'bold' }}>Contacts</Nav.Link>
          </Nav>
          <Form className="d-flex align-items-center ms-auto"> {/* Use grid system for alignment */}
            <FormControl type="text" placeholder="Search" className="mr-sm-2" style={{ height: '39px' }} />
            <Button variant="" style={{ backgroundColor: '#7575b7', color: 'white'}}>Search</Button>
          </Form>
          <Link to="/signintype" className="btn  mr-auto" style={{ marginLeft: "10px",marginRight: "10px", backgroundColor: '#7575b7', color: 'white'}}>
                SignIn
          </Link>
          <Link to="/signuptype" className="btn " style={{ backgroundColor: '#7575b7', color: 'white'}}>
                SignUp
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
    
};

export default Header;
