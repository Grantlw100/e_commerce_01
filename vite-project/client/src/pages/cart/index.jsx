import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../utils/Store/GlobalState.jsx";
import { Button, Container, Row, Col, Card, Accordion } from "react-bootstrap";
// import { formatPrice } from "../../utils/cart.helpers";
// import { calculateShipping } from "../../utils/cart.helpers";
// import { calculateTax } from "../../utils/cart.helpers";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

export default function CartPage() {
    const navigate = useNavigate();
    const { state, removeFromCart, addToCart, openItemDetail } = useGlobalState();
    const { cart } = state;

    const totalCost = cart.reduce((total, item) => total + Number(item.price) * item.purchaseQuantity, 0);

    return (
        <div>
            <h1>Cart</h1>
            <Container>
                <Row>
                    <Col>
                        {cart.length > 0 ? (
                            cart.map(item => (
                                <Card key={item._id}>
                                    <Card.Body>
                                        <Row>
                                            <Col xs={3}>
                                                <Card.Img src={item.image} alt={item.name} />
                                            </Col>
                                            <Col>
                                                <Card.Title>{item.name}</Card.Title>
                                                <Card.Text>
                                                    {item.purchaseQuantity} x ${formatPrice(item.price)}
                                                </Card.Text>
                                                <Button onClick={() => removeFromCart(item._id)}>Remove</Button>
                                                <Button onClick={() => openItemDetail(item._id)}>Details</Button>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            ))
                        ) : (
                            <p>Your cart is empty.</p>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>Total: ${formatPrice(totalCost)}</h2>
                        <Button onClick={() => navigate('/checkout')}>Proceed to Shipping</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}