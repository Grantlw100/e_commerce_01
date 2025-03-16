import withAdminAuth from '../../withAdminAuth.jsx';
import React, { useState } from 'react';
import { Form, Button, Alert, Image } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_NOTIFICATION } from '../../../../utils/mutations.js'; // Ensure this path is correct

const CreateNotificationForm = () => {
    const [formData, setFormData] = useState({
        user: '',
        notificationText: '',
        notificationDate: '',
        viewed: false,
        type: ''
    });

    const [validated, setValidated] = useState(false);
    const [createNotification, { data, loading, error }] = useMutation(CREATE_NOTIFICATION);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            try {
                await createNotification({
                    variables: {
                        input: formData,
                    },
                });
                setFormData({
                    user: '',
                    notificationText: '',
                    notificationDate: '',
                    viewed: false,
                    type: ''
                });
                setValidated(false);
            } catch (err) {
                console.error('Error creating notification:', err);
            }
        }
        setValidated(true);
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                <Form.Label>Text</Form.Label>
                <Form.Control
                    type="text"
                    name="notificationText"
                    value={formData.notificationText}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formNotificationDate" className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                    type="text"
                    name="notificationDate"
                    value={formData.notificationDate}
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

            <Button variant="primary" type="submit">
                Create Notification
            </Button>
        </Form>
    );
}

export default withAdminAuth(CreateNotificationForm);