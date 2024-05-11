import React, { useMemo } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useGlobalState } from '../../utils/Store/GlobalState';  // Ensure correct path

const formatPrice = (price) => {
    const number = Number(price);
    return isNaN(number) ? "0.00" : number.toFixed(2);
};

const CartModal = ({ show, handleClose }) => {
    const { state, removeFromCart, addToCart } = useGlobalState();  
    const { cart } = state;  

    const totalCost = useMemo(() => {
      return cart.reduce((total, item) => total + Number(item.price) * item.purchaseQuantity, 0);
    }, [cart]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Shopping Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {cart.length > 0 ? (
                  cart.map(item => (
                    <div key={item._id}>
                        {item.name} - {item.purchaseQuantity} x ${formatPrice(item.price)}
                        <Button onClick={() => removeFromCart(item._id)}>Remove</Button>
                        <Button onClick={() => addToCart(item)}>Add More</Button>
                    </div>
                  ))
                ) : (
                  <p>Your cart is empty.</p>
                )}
                
                <div>Total: ${formatPrice(totalCost)}</div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleClose}>Checkout</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CartModal;
