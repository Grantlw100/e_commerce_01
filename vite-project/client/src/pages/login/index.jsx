import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../../utils/User/user.actions.js';
import { LOGIN_USER } from '../../utils/mutations.js';
import { useUserContext } from '../../utils/User/UserState.jsx';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

export default function Login() {
    const navigate = useNavigate();
    const [state, dispatch] = useUserContext();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [validated, setValidated] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            return;
        } 
        try {
            const { data } = await loginUser({
                variables: formData
            });
            dispatch({ type: LOGIN, payload: data.login });
            navigate('/');
        } catch (err) {
            console.error('Error logging in:', err);
            setErrorMsg('Invalid email or password.');
        }
        setValidated(true);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Login</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid email address.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a password.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Loading...' : 'Login'}
                        </Button>
                    </Form>
                    {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
                </Col>
            </Row>
        </Container>
    );
}
