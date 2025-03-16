import withAdminAuth from '../../withAdminAuth.jsx';
import React, { useState, useEffect } from 'react';
import {useMutation} from '@apollo/client';
import {UPDATE_NOTIFICATION} from '../../../../utils/mutations.js';
import {Form, Button} from 'react-bootstrap';

const UpdateNotification = ({notification}) => {
    const [formData, setFormData] = useState({
        user: notification.user,
        notificationText: notification.notificationText,
        notificationDate: notification.notificationDate,
        viewed: notification.viewed,
        type: notification.type
    });

    const [updateNotification, {data, loading, error}] = useMutation(UPDATE_NOTIFICATION);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateNotification({
                variables: {
                    id: notification.id,
                    input: formData
                }
            });
        } catch (err) {
            console.error('Error updating notification:', err);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNotificationUser" className="mb-3">
                <Form.Label>User</Form.Label>
                <Form.Control
                    type="text"
                    name="user"
                    value={formData.user}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formNotificationText" className="mb-3">
                <Form.Label>Notification Text</Form.Label>
                <Form.Control
                    type="text"
                    name="notificationText"
                    value={formData.notificationText}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formNotificationDate" className="mb-3">
                <Form.Label>Notification Date</Form.Label>
                <Form.Control
                    type="text"
                    name="notificationDate"
                    value={formData.notificationDate}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formNotificationViewed" className="mb-3">
                <Form.Label>Viewed</Form.Label>
                <Form.Control
                    type="text"
                    name="viewed"
                    value={formData.viewed}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formNotificationType" className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Control
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Update Notification
            </Button>
        </Form>
    );
}

export default withAdminAuth(UpdateNotification);