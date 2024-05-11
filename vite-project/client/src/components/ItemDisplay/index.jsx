import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Pagination, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useGlobalState } from '../../utils/Store/GlobalState';
import { useNavigate } from 'react-router-dom';

const style = {
    display: 'inline',
    margin: '5px',
    fontWeight: 'bold',
    backgroundColor: 'lightblue',
    borderRadius: '5px',
};

const ItemDisplay = ({ category }) => {
    const navigate = useNavigate();
    const { state, addToCart, removeFromCart, openItemDetail } = useGlobalState(); // Using items from global state
    const { items, cart } = state; // Accessing items directly from the global state
    const itemsPerPage = 36;
    const [currentPage, setCurrentPage] = useState(1);

    // Filter and map items for display
    const [displayItems, setDisplayItems] = useState([]);

    useEffect(() => {
        // Filter items by category and check if they are in the cart in a single step
        const updatedItems = items
            .filter(item => category === "All Items" || item.category === category)
            .map(item => ({
                ...item,
                isLoved: item.loved || false,
                inCart: cart.some(cartItem => cartItem._id === item._id) // Check if item is in cart
            }));
        setDisplayItems(updatedItems);
    }, [items, cart, category]); // Include cart in the dependency array

    const toggleLove = (id) => {
        const updatedItems = displayItems.map(item => {
            if (item._id === id) {
                return {...item, isLoved: !item.isLoved};
            }
            return item;
        });
        setDisplayItems(updatedItems);
    };

    const pageCount = Math.ceil(displayItems.length / itemsPerPage);
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = displayItems.slice(firstItemIndex, lastItemIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleOpenDetail = (item) => {
        openItemDetail(item, navigate);
    };


    if (!currentItems.length) {
        return <h2>No items found</h2>;
    }

    return (
        <Container id='item-display'>
            <Row>
                {currentItems.map((item) => (
                    <Col key={item._id} xs={6} md={3} className="mb-4">
                        <div className="item-card">
                            <div id='redirect'
                                 onClick={() => handleOpenDetail(item)}
                                 style={(
                                        { cursor: 'pointer' }

                                 )} >
                                    <img src={item.image} alt={item.description} style={{ width: '100%' }} />
                                    <p style={style}>{item.name}</p>
                                </div>
                            <FontAwesomeIcon 
                                icon={item.isLoved ? solidHeart : regularHeart} 
                                style={{ color: item.isLoved ? 'pink' : 'grey', cursor: 'pointer', display: 'inline'}}
                                onClick={() => toggleLove(item._id)}
                            />
                            <p style={{backgroundColor: 'lightblue', padding: '5px', borderRadius: '5px'}}>{item.description}</p>
                            <p className="text-muted">
                                {item.discount > 0 ? (
                                    <>
                                        <span style={{ backgroundColor:'red', textDecoration: 'line-through', borderRadius:'5px' }}>
                                            ${item.originalPrice}
                                        </span>
                                        {' '}<span style={{backgroundColor: 'lightgreen', fontWeight:'bolder', borderRadius:'5px'}}>${item.discountedPrice}</span>
                                    </>
                                ) : (
                                    <span style={{backgroundColor: 'lightgreen', fontWeight:'bolder', borderRadius: '5px'}}>${item.originalPrice}</span>
                                )}
                            </p>
                            {item.promotion && <p style={{backgroundColor: 'lightgreen', padding: '5px', borderRadius: '5px'}}>{item.promotion}</p>}
                            <Button variant="info" style={{height:'30px', fontSize:'12px' }} onClick={() => addToCart(item)}>Quick Add</Button>
                            {item.inCart && <Button variant="danger" onClick={() => removeFromCart(item._id)}>Remove</Button>}
                        </div>
                    </Col>
                ))}
            </Row>
            <Pagination className="justify-content-center">
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                {[...Array(pageCount).keys()].map(number => (
                    <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => handlePageChange(number + 1)}>
                        {number + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pageCount} />
                <Pagination.Last onClick={() => handlePageChange(pageCount)} disabled={currentPage === pageCount} />
            </Pagination>
        </Container>
    );
};

export default ItemDisplay;
