import { useUserContext } from '../../utils/User/UserState.jsx';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

function UserGreeting() {
    const { user } = useUserContext();

    return (
        <Container className="my-3">
            <Row>
                <Col>
                    {user && user.id ? (
                        <h1>Welcome back, {user.name}!</h1>
                    ) : (
                        <div>
                            <h1>Welcome to Crafty Bundles!</h1>
                            <Link to="/login">Log In</Link>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default UserGreeting;
