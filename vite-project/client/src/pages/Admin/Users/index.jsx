import withAdminAuth from "../withAdminAuth.jsx";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { DELETE_USER } from '../../../utils/mutations.js';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_USERS, GET_SINGLE_USER } from "../../../utils/queries.js";
import useStoreContext from '../../../utils/Store/GlobalState.jsx';

function AdminUsers() {
    const navigate = useNavigate();
    const [state] = useStoreContext();
    const [deleteUser] = useMutation(DELETE_USER);
    const { loading, data } = useQuery(GET_ALL_USERS);
    const { data: userData } = useQuery(GET_SINGLE_USER, { variables: { id: state.user.id } });
    const [user, setUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    const filterByName = (name) => {
        const user = data?.users.find(user => user.firstName === name || user.lastName === name);
        setUser(user || null);
    };

    const filterByEmail = (email) => {
        const users = data?.users.filter(user => user.email.toLowerCase().includes(email.toLowerCase()));
        setFilteredUsers(users || []);
    };

    useEffect(() => {
        if (!state.user.isAdmin) {
            navigate('/login');
        }
    }, [state.user.isAdmin, navigate]);

    useEffect(() => {
        if (searchTerm) {
            filterByEmail(searchTerm);
        } else {
            setFilteredUsers([]);
        }
    }, [searchTerm, data]);

    return (
        <Container>
            <Row>
                <h1>Administrator User Deletion</h1>
            </Row>
            <Row>
                <h2>Find User by First or Last Name</h2>
                <Form.Control type="text" onChange={(e) => filterByName(e.target.value)} placeholder="Enter first or last name" />
                {user && (
                    <ul>
                        <li>{user.firstName} {user.lastName}</li>
                        <Button variant="danger" onClick={() => deleteUser({ variables: { id: user.id } })}>Delete</Button>
                    </ul>
                )}
            </Row>
            <Row>
                <h2>Find User by Email</h2>
                <Form.Control type="text" onChange={(e) => setSearchTerm(e.target.value)} placeholder="Enter email" />
                {filteredUsers.length > 0 && (
                    <ul>
                        {filteredUsers.map(user => (
                            <li key={user.id}>
                                {user.email}
                                <Button variant="danger" onClick={() => deleteUser({ variables: { id: user.id } })}>Delete</Button>
                            </li>
                        ))}
                    </ul>
                )}
            </Row>
            <Row>
                <Col>
                    <h3>All Users</h3>
                    {loading ? <h3>Loading...</h3> : 
                        <ul>
                            {data?.users.map(user => (
                                <li key={user.id}>
                                    {user.email}
                                    <Button variant="danger" onClick={() => deleteUser({ variables: { id: user.id } })}>Delete</Button>
                                </li>
                            ))}
                        </ul>
                    }
                </Col>
            </Row>
        </Container>
    );
}

export default withAdminAuth(AdminUsers);
