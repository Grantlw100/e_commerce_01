import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalState } from '../../utils/Store/GlobalState.jsx';
import { Container, Row, Col, Button, Card, Carousel } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import ZoomInModal from '../../components/zoomInModal/index.jsx';
import {useNavigate} from 'react-router-dom';
import './itemDetail.css'
import CarouselComponent from '../../components/featuredContainer/carousel.jsx';
import useProductInteraction from '../../utils/Analytics/analytics.utils.js/productInteraction.js';

export default function ItemDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { state, addToCart, removeFromCart, toggleLoved, openItemDetail } = useGlobalState();
    const { items } = state;

    const [item, setItem] = useState({ descriptionImages: [], includes: [] });
    const [currentImage, setCurrentImage] = useState('');
    const [modal, setModal] = useState('');
    const [relatedItems, setRelatedItems] = useState([]);
    const heading = 'Related Items';

    useEffect(() => {
        const itemId = parseInt(id);
        const foundItem = items.find(item => item._id === itemId);
        setItem(foundItem || { descriptionImages: [], includes: [] });

        if (foundItem) {
            // Assuming each include has its own images array
            const imageArray = [foundItem.image, ...foundItem.descriptionImages, ...foundItem.includes.flatMap(include => include.images)];
            setCurrentImage(imageArray[0]); // Set the first image as the current image
            console.log(foundItem)
            console.log(imageArray)
            const relatedByCategory = items.filter(item => item.category === foundItem.category && item._id !== itemId);
            const relatedByKeywords = items.filter(item => item.keywords.some(keyword => foundItem.keywords.includes(keyword)) && item._id !== itemId);
            setRelatedItems([...relatedByCategory, ...relatedByKeywords]);
        }
    }, [items, id]);

    const cycleImages = (direction) => {
        const imageArray = [item.image, ...item.descriptionImages, ...item.includes.flatMap(include => include.images)];
        const currentIndex = imageArray.indexOf(currentImage);
        const nextIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
        
        if (nextIndex >= 0 && nextIndex < imageArray.length) {
            setCurrentImage(imageArray[nextIndex]);
        }
    };

    const handleImageClick = (image) => {
        setCurrentImage(image);
        setModal(true);
    };

    const handleCloseModal = () => {
        setModal(false);
    };

    const handleClickImage = (image) => {
        setCurrentImage(image);
    };

    const handleAddIncludeToCart = (include) => {
        addToCart(include);
        useProductInteraction('handleAddIncludeToCart', include._id);
    }

    const handleOpenDetail = (item) => {
        openItemDetail(item, navigate);
    }

    return (
        <Container>
            <Row>
                <Col xs={6} md={3}>
                    <ul className='image-list' >
                        {[item.image, ...item.descriptionImages, ...item.includes.flatMap(include => include.images)].map((image, index) => (
                            <li key={index} onClick={() => handleClickImage(image)}>
                                <img src={image} alt={`${item.name} detail`} className='w-100' />
                            </li>
                        ))}
                    </ul>
                </Col>
                <Col>
                    <img src={currentImage} alt={item.name} className='w-100' onClick={() => handleImageClick(currentImage)} />
                </Col>
                <Col>
                    <h2>{item.name}</h2>
                    {item.featured && <p>Featured</p>}

                    {item.discount > 0 ? ( 
                        <div>
                            <p>Discount: {item.discount}%</p>
                            <p>{item.description}</p>
                                <div className='price-list'>
                                    <p>${item.price}</p>
                                    <p
                                    style={{ 
                                        textDecoration: 'line-through',color: 'red',
                                        fontWeight: 'bold',
                                        borderRadius: '5px',
                                        backgroundColor: 'lightred' 
                                    }}>
                                        ${item.originalPrice}
                                    </p> 
                                </div>
                        </div>
                    ) : (
                        <div>
                            <p>{item.description}</p>
                            <p>${item.price}</p>
                        </div>
                    )}
                    <Button onClick={() => addToCart(item)}>Add to Cart</Button>
                    <Button onClick={() => removeFromCart(item._id)}>Remove from Cart</Button>
                    <FontAwesomeIcon icon={item.isLoved ? solidHeart : regularHeart} onClick={() => 
                        toggleLoved(item)} />
                </Col>
            </Row>
            <Row style={{height: '500px',}} >
                <Col>
                    <h3>Details</h3>
                    <p>{item.bunlded ? 'Bundled' : null}</p>
                    <h2>Category</h2>
                    <p>{item.category}</p>
                    <h2>Promotion</h2>
                    <p>{item.promotion}</p>
                    <h2>Keywords</h2>
                    <ul>
                        {item.keywords?.length > 0 && item.keywords.map((keyword, index) => (
                            <li key={index}>{keyword}</li>
                        ))}
                    </ul>

                </Col>
                <Col style={{overflowY: 'auto', height: '500px'}} >
                    <Card>
                        <Card.Header>
                            <h3>Reviews</h3>
                            <h1>`{item.averageRating}`</h1>
                        </Card.Header>
                        <Card.Body>
                            <p>
                                {item.reviews?.map(review => (
                                <div key={review._id}>
                                    <p>{review.reviewer}</p>
                                    <p>{review.review}</p>
                                    <p>{review.rating}</p>
                                </div>
                            ))}
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col style={{overflowY: 'auto', height: '500px'}}  >
                    {item.includes.length > 0 && item.bundled && (
                            <div>
                                <h3>Includes:</h3>
                                <Accordion defaultActiveKey="0">
                                    {item.includes.map((include, index) => (
                                        <Accordion.Item eventKey={`${index}`} key={index}>
                                            <Accordion.Header>{include.name}</Accordion.Header>
                                            <Accordion.Body>
                                                <p>Price: ${include.price}</p>
                                                <Button onClick={() => handleAddIncludeToCart(include)}>Add to Cart</Button>
                                                {include.images && include.images.map((image, imgIndex) => (
                                                    <img onClick={() => handleClickImage(image)} key={imgIndex} src={image} alt={`${include.name} detail`} className="w-100 my-2" />
                                                ))}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            </div>
                        )}
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Related Items</h3>
                    <CarouselComponent carouselItems={relatedItems} heading={heading}/>
                </Col>
            </Row>
            <ZoomInModal
                show={modal}
                handleClose={handleCloseModal}
                image={currentImage}
                item={item}
            />
        </Container>
    );
}