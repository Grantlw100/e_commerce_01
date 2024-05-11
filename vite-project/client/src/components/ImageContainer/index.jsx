import { Container, Row, Col, Image } from 'react-bootstrap';
import image1 from './image1.png';
import image2 from './image2.png';
import image3 from './image3.png';
import image4 from './image4.png';

function ImageContainer() {
    return (
        <Container fluid id='image-container' >
            <Row>
                {[
                image1,
                image2,
                image3,
                image4
                ]
                .map(img => (
                    <Col xs={6} md={3} key={img}>
                        <Image src={img} alt="Description" fluid />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}


export default ImageContainer;