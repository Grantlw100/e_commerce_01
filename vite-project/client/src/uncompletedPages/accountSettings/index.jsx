// To create account settings form must complete the integration of the following components:
// 1. AccountSettingsForm.jsx
// 2. AccountSettingsForm.css
// 3. products 

import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_USER, DELETE_USER, CLEAR_RECENTLY_VIEWED } from '../../utils/mutations.js';
import { GET_SINGLE_USER } from '../../utils/queries.js';
import { useNavigate } from 'react-router-dom';

import { useGlobalState } from '../../utils/Store/GlobalState.jsx';
import { useUserContext } from '../../utils/User/UserState.jsx';


const AccountSettings = () => {
    const { state, toggleLoved, RecentlyViewed, LovedItems } = useGlobalState();
    const { user } = useUserContext();

    const [lovedItems, setLovedItems] = useState([LovedItems]);
    const [recentlyViewed, setRecentlyViewed] = useState([RecentlyViewed]);

    const [deleteUser] = useMutation(DELETE_USER);
    const [clearRecentlyViewed] = useMutation(CLEAR_RECENTLY_VIEWED);
    
    const navigate = useNavigate();
    const getSingleUser = useQuery(GET_SINGLE_USER);

    useEffect (() => {
            if (!user) {
            try {
                getSingleUser();
            } catch (error) {
                console.error(error);
            }
            }
    }, [user, navigate]);

    useEffect(() => {
        if (data) {
            setLovedItems(data.lovedItems);
            setRecentlyViewed(data.recentlyViewed);
        }
    }, [data]);


    return (
        <Container>
            <Row>
                <Col>
                    <h1>Account Settings</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>User Information</h2>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                    <p>{user.firstName} {user.lastName}</p>
                    <p>{user.address.address1}</p>
                    {user.address.address2 && <p>{user.address.address2}</p>}
                    <p>{user.address.city}, {user.address.state} {user.address.zip}</p>
                    <button onClick={() => navigate('/account-settings/edit')}>Edit</button>
                    <button onClick={() => handleDarkMode()}></button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Change Password</h2>
                    <button onClick={() => navigate('/account-settings/change-password')}>Change Password</button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Recently Viewed Items</h2>
                    {recentlyViewed.map((item) => (
                        <p>{item.name}</p>
                    ))}
                    <button onClick={() => clearRecentlyViewed()}>Clear Recently Viewed</button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Loved Items</h2>
                    {lovedItems.map((item) => (
                        <p>{item.name}</p>
                    ))}
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Delete Account</h2>
                    <button onClick={() => deleteUser()}>Delete Account</button>
                </Col>
            </Row>
        </Container>
    )

}

export default AccountSettings;
