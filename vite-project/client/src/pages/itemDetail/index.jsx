import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalState } from '../../utils/Store/GlobalState';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

export default function ItemDetail() {
    const { id } = useParams();
    const { state, addToCart, removeFromCart, toggleLove } = useGlobalState();
    const { items } = state;
    console.log(items);
    const [item, setItem] = useState({ descriptionImages: [], includesImages: [] });
    const [currentImage, setCurrentImage] = useState('');

    useEffect(() => {
        const itemId = parseInt(id); // Adjust parsing as per your ID type
        const foundItem = items.find(item => item._id === itemId);
        setItem(foundItem || { descriptionImages: [], includesImages: [] });

        if (foundItem) {
            // Combine all images into one array with the main image at the start
            const imageArray = [foundItem.image, ...foundItem.descriptionImages, ...foundItem.includesImages];
            setCurrentImage(imageArray[0]); // Set the first image as the current image
        }
    }, [items, id]);

    const cycleImages = (direction) => {
        const imageArray = [item.image, ...item.descriptionImages, ...item.includes.images];
        const currentIndex = imageArray.indexOf(currentImage);
        const nextIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
        
        if (nextIndex >= 0 && nextIndex < imageArray.length) {
            setCurrentImage(imageArray[nextIndex]);
        }
    };

    const handleClickImage = (image) => {
        setCurrentImage(image);
    };

    return (
        <Container>
            <Row>
                <Col xs={6} md={3}>
                    <ul>
                        {[item.image, ...item.descriptionImages, ...item.includesImages].map((image, index) => (
                            <li key={index} onClick={() => handleClickImage(image)}>
                                <img src={image} alt={`${item.name} detail`} className='w-100' />
                            </li>
                        ))}
                    </ul>
                </Col>
                <Col>
                    <img src={currentImage} alt={item.name} className='w-100' />
                </Col>
                <Col>
                    <h2>{item.name}</h2>
                    { item.featured && <p>Featured</p>}
                    { item.discount > 0 && <p>Discount: {item.discount}%</p>}
                    <p>${item.price}</p>
                    <p>{item.description}</p>
                    <Button onClick={() => addToCart(item)}>Add to Cart</Button>
                    <Button onClick={() => removeFromCart(item._id)}>Remove from Cart</Button>
                    <FontAwesomeIcon icon={item.isLoved ? solidHeart : regularHeart} onClick={() => toggleLove(item._id)} />
                </Col>
            </Row>
        </Container>
    );
}
