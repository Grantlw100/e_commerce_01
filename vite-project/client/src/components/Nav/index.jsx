import { LinkContainer } from 'react-router-bootstrap';
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas, Modal } from 'react-bootstrap';
import { useState, useMemo } from 'react';
import { useUserContext } from '../../utils/User/UserState.jsx';
import { useGlobalState } from '../../utils/Store/GlobalState.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import "./navbar.css";
import CartModal from '../CartModal/index.jsx';

export default function NavBar() {
    const { user } = useUserContext();
    const { state } = useGlobalState();
    const { cart, totalItems } = state;
    console.log(cart);

    const totalCost = useMemo(() => {
        return cart.reduce((total, item) => total + Number(item.price) * item.purchaseQuantity, 0);
    }, [cart]);

    const [showCart, setShowCart] = useState(false);

    const handleCartShow = () => setShowCart(true);
    const handleCartHide = () => setShowCart(false);

    return (
        <>
        {/* Modal for showing and hiding the cart in the NavBar. Will need additional code for adding and removing items from the cart*/}
        <CartModal show={showCart} handleClose={handleCartHide} />
        

            {/* Navbar with Offcanvas for mobile */}
            {[false].map((expand) => (
            <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
            <Container fluid>
                <LinkContainer to="/">
                    <Navbar.Brand href="#">Crafty Bundles</Navbar.Brand>
                </LinkContainer>
                <Button onClick={handleCartShow}>
                    Cart <FontAwesomeIcon icon={faShoppingCart} /> ({cart.length})
                </Button>

                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
                >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Crafty Bundles
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                    <LinkContainer to="/">
                        <Nav.Link to="/">Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/cart">
                            <Nav.Link>
                                Cart <FontAwesomeIcon icon={faShoppingCart} /> ({cart.length}) ${totalCost}
                            </Nav.Link>
                        </LinkContainer>
                    <LinkContainer to="/checkout">
                        <Nav.Link to="/checkout">Checkout</Nav.Link>
                    </LinkContainer>
                <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <LinkContainer to="/itemDetail">
                        <NavDropdown.Item to="/itemDetail">ItemDetail</NavDropdown.Item>
                    </LinkContainer>
                    {!user && (
                    <>
                    <LinkContainer to="/login">
                        <NavDropdown.Item to="/login">Login</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/signup">
                        <NavDropdown.Item to="/signup">Signup</NavDropdown.Item>
                    </LinkContainer>
                    </>
                    )}
                    <LinkContainer to="/orderHistory">
                        <NavDropdown.Item to="/orderHistory">OrderHistory</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/categories">
                        <NavDropdown.Item to="/categories">Categories</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/products">
                        <NavDropdown.Item to="/products">Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/shipping">
                        <NavDropdown.Item to="/shipping">Shipping</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/success">
                        <NavDropdown.Item to="/success">Success</NavDropdown.Item>
                    </LinkContainer>
                <NavDropdown.Divider />
                {user && user.isAdmin && (
                    <>
                    <NavDropdown.Header>Admin</NavDropdown.Header>
                    <LinkContainer to="/Admin/">
                        <NavDropdown.Item to="/Admin/">AdminDashboard</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/Admin/Products">
                        <NavDropdown.Item to="/Admin/Products">AdminProducts</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/Admin/Orders">
                        <NavDropdown.Item to="/Admin/Orders">AdminOrders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/Admin/Users">
                        <NavDropdown.Item to="/Admin/Users">AdminUsers</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/Admin/Reviews">
                        <NavDropdown.Item to="/Admin/Reviews">AdminReviews</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/Admin/Categories">
                        <NavDropdown.Item to="/Admin/Categories">AdminCategories</NavDropdown.Item>
                    </LinkContainer>
                    </>
                )}
                </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
