import { Container, Row, Col, Nav, Navbar, DropdownButton, Dropdown } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import ItemDisplay from '../ItemDisplay/index.jsx';
import { useGlobalState } from '../../utils/Store/GlobalState.jsx'; // Ensure this path is correct

function ItemsContainer() {
    const { state } = useGlobalState(); // Accessing the global state
    const [category, setCategory] = useState("All Items");
    
    // Optionally, you can manage categories globally and remove this local state if categories are static or fetched from a database
    const categories = state.categories.length > 0 ? state.categories : [
        "All Items",
        "On Sale",
        "Bundles - Destash",
        "Decoupage Napkins",
        "Napkin - Bundles",
        "Rice Papers",
        "Nail-Jewelry Waterslides",
        "Cake Toppers",
        "Tiered Tray",
        "Craft DIY Supplies",
        "DIY - Craft Kits",
    ].sort();
    

    const filteredItems = state.items.filter(item => category === "All Items" || item.category === category);

    const categoryNav = (
        <Nav className="flex-column">
            {categories.map(cat => (
                <Nav.Link 
                    key={cat}
                    onClick={() => setCategory(cat)}
                    active={category === cat}>
                    {cat}
                </Nav.Link>
            ))}
        </Nav>
    );

    const categoryDropdown = (
        <DropdownButton 
            id="dropdown-basic-button"
            title="Categories"
            onSelect={eventKey => setCategory(eventKey)}
            className="mb-3"
        >
            {categories.map(cat => (
                <Dropdown.Item key={cat} eventKey={cat} active={category === cat}>
                    {cat}
                </Dropdown.Item>
            ))}
        </DropdownButton>
    );

    return (
        <Container>
            <Row>
                <Col md={4} className="d-none d-md-block">
                    {categoryNav}
                </Col>
                <Col xs={12} md={4} className="d-md-none">
                    {categoryDropdown}
                </Col>
                <Col xs={12} md={8} id='items-container'>
                    <ItemDisplay items={filteredItems} category={category} />
                </Col>
            </Row>
        </Container>
    );
}

export default ItemsContainer;
