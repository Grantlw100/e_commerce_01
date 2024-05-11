import { useUserContext } from '../../utils/User/UserState';
import { Link, Navigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import FeaturedItems from '../../components/featuredContainer';
import ImageContainer from '../../components/ImageContainer';
import ItemsContainer from '../../components/itemContainer';
import UserGreeting from '../../components/userGreeting';
import { Container, Row, Col } from 'react-bootstrap'; 
import './home.css';
import {
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10
 } from '../../assets/images/index';


export default function Home() {
    const { user } = useUserContext();
    const items = [
        { image: image1, description: 'Item 1' },
        { image: image2, description: 'Item 2' },
        { image: image3, description: 'Item 3' },
        { image: image4, description: 'Item 4' },
        { image: image5, description: 'Item 5' },
        { image: image6, description: 'Item 6' },
        { image: image7, description: 'Item 7' },
        { image: image8, description: 'Item 8' },
        { image: image9, description: 'Item 9' },
        { image: image10, description: 'Item 10' },
    ];

    if (user.isAdmin === true) {
        return <Navigate to="/Admin" />
    }

    return (
        <Container fluid>
            <Row className="mb-3">
                <Col>
                <FeaturedItems items={items} />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <UserGreeting />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <ImageContainer />
                </Col>
            </Row>
            <Row className="mb-3">
                <LinkContainer to="/products">
                    <Link>View and Filter All Products</Link>
                </LinkContainer>
            </Row>
            <Row id='ItemsContainer' >
                <Col>
                    <ItemsContainer />
                </Col>
            </Row>
        </Container>
    );
}