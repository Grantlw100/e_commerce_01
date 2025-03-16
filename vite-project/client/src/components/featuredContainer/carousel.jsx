import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useGlobalState } from '../../utils/Store/GlobalState.jsx';
import { useNavigate } from 'react-router-dom';

const style = {
    display: 'inline',
    margin: '5px',
    fontWeight: 'bold',
    backgroundColor: 'lightblue',
    borderRadius: '5px',
};

const CarouselComponent = ({ carouselItems, heading }) => {
    const navigate = useNavigate();
    const { state, addToCart, removeFromCart, openItemDetail } = useGlobalState();
    const { cart } = state; // Accessing cart from the global state

    const [currentIndex, setCurrentIndex] = useState(0);
    const displayCount = 5; // Number of items to display at once
    const [carouselItemsState, setCarouselItemsState] = useState([]);

    useEffect(() => {
        if (carouselItems) {
            const updatedCarouselItems = carouselItems.map(item => ({
                ...item,
                isLoved: item.loved || false,
                inCart: cart.some(cartItem => cartItem._id === item._id)
            }));
            setCarouselItemsState(updatedCarouselItems);
        }
        const interval = setInterval(() => {
            cycleItems('next');
        }, 5000);
        return () => clearInterval(interval); // Clean up interval on component unmount
    }, [currentIndex, carouselItems.length, cart]);

    const cycleItems = (direction) => {
        if (direction === 'prev') {
            setCurrentIndex(prevIndex => (prevIndex - 1 + carouselItemsState.length) % carouselItemsState.length);
        } else {
            setCurrentIndex(prevIndex => (prevIndex + 1) % carouselItemsState.length);
        }
    };

    const toggleLove = (id) => {
        const updatedItems = carouselItemsState.map(item => {
            if (item._id === id) {
                return { ...item, isLoved: !item.isLoved };
            }
            return item;
        });
        // Assuming there is a method in the global state to update items
        // Example: updateItemLoveStatus(updatedItems);
        setCarouselItemsState(updatedItems);
    };

    const getVisibleItems = () => {
        let visibleItemsArray = [];
        for (let i = 0; i < Math.min(displayCount, carouselItemsState.length); i++) {
            visibleItemsArray.push(carouselItemsState[(currentIndex + i) % carouselItemsState.length]);
        }
        return visibleItemsArray;
    };

    const handleOpenDetail = (item) => {
        openItemDetail(item, navigate);
    };

    return (
        <Container>
            <Row style={{ textAlign: 'center' }}>
                <Col>
                    <h2>{heading}</h2>
                </Col>
            </Row>
            <Container id='features-container' className="my-3">
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <Button onClick={() => cycleItems('prev')}>{"<"}</Button>
                    </Col>
                    {getVisibleItems().map((item) => (
                        <Col key={item._id} xs={6} md={2}>
                            <div className="item-card">
                                <div id='redirect'
                                    onClick={() => handleOpenDetail(item)}
                                    style={{ cursor: 'pointer' }}>
                                    <img src={item.image} alt={item.description} style={{ width: '100%' }} />
                                    <p style={style}>{item.name}</p>
                                </div>
                                <FontAwesomeIcon 
                                    icon={item.isLoved ? solidHeart : regularHeart} 
                                    style={{ color: item.isLoved ? 'pink' : 'grey', cursor: 'pointer' }} 
                                    onClick={() => toggleLove(item._id)}
                                />
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
                                <Button variant="info" style={{ height: '30px', fontSize: '12px' }} onClick={() => addToCart(item)}>Quick Add</Button>
                                {item.inCart && <Button variant="danger" onClick={() => removeFromCart(item._id)}>Remove</Button>}
                            </div>
                        </Col>
                    ))}
                    <Col xs="auto">
                        <Button onClick={() => cycleItems('next')}>{">"}</Button>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default CarouselComponent;
