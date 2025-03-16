import withAdminAuth from "../withAdminAuth.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStoreContext from "../../../utils/Store/GlobalState.jsx";
import {Container, Row, Col, Button} from 'react-bootstrap';

function AdminDash() {

    const navigate = useNavigate();

    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        if (!state.user.isAdmin) {
            navigate('/login');
        }
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1>Admin Dashboard</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={() => handleNavigation('/admin/products')}>Products</Button>
                    </Col>
                    <Col>
                        <Button onClick={() => handleNavigation('/admin/categories')}>Categories</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={() => handleNavigation('/admin/promotions')}>Promotions</Button>
                    </Col>
                    <Col>
                        <Button onClick={() => handleNavigation('/admin/keywords')}>Keywords</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={() => handleNavigation('/admin/seasons')}>Seasons</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default withAdminAuth(AdminDash);