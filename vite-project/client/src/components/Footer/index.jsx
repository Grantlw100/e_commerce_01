import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import './footer.css';

export default function Footer() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary footer">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/reviews">
                <Nav.Link to="/reviews">Reviews</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
                <Nav.Link to="/about">About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
                <Nav.Link to="/contact">Contact</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/terms">
                <Nav.Link to="/terms">Terms & Privacy Policy</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
