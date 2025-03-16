import withAdminAuth from '../../withAdminAuth.jsx';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_ALERT } from '../../../../utils/mutations.js';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

const UpdateAlert = ({ alert }) => {
    const [formData, setFormData] = useState({
        user: alert.user,
        alertText: alert.alertText,
        alertDate: alert.alertDate,
        alertImage: alert.alertImage,
        viewed: alert.viewed,
        type: alert.type
    });

    const [file, setFile] = useState(null);
    const [validated, setValidated] = useState(false);
    const [updateAlert, { data, loading, error }] = useMutation(UPDATE_USER_ALERT);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            try {
                await updateAlert({
                    variables: {
                        id: alert.id,
                        input: formData,
                        file,
                    },
                });
            } catch (err) {
                console.error('Error updating alert:', err);
            }
        }
        setValidated(true);
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="formAlertUser" className="mb-3">
                <Form.Label>User</Form.Label>
                <Form.Control
                    type="text"
                    name="user"
                    value={formData.user}
                    onChange={handleChange}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a user.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formAlertText" className="mb-3">
                <Form.Label>Alert Text</Form.Label>
                <Form.Control
                    type="text"
                    name="alertText"
                    value={formData.alertText}
                    onChange={handleChange}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please provide alert text.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formAlertDate" className="mb-3">
                <Form.Label>Alert Date</Form.Label>
                <Form.Control
                    type="date"
                    name="alertDate"
                    value={formData.alertDate}
                    onChange={handleChange}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid date.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formAlertImage" className="mb-3">
                <Form.Label>Alert Image</Form.Label>
                <Form.Control
                    type="file"
                    name="alertImage"
                    onChange={handleFileChange}
                />
            </Form.Group>

            <Form.Group controlId="formViewed" className="mb-3">
                <Form.Check
                    type="checkbox"
                    label="Viewed"
                    name="viewed"
                    checked={formData.viewed}
                    onChange={(e) => setFormData({ ...formData, viewed: e.target.checked })}
                />
            </Form.Group>

            <Form.Group controlId="formAlertType" className="mb-3">
                <Form.Label>Alert Type</Form.Label>
                <Form.Control
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a type.
                </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
            </Button>

            {error && <Alert variant="danger" className="mt-3">{error.message}</Alert>}
            {data && <Alert variant="success" className="mt-3">Alert updated successfully!</Alert>}
        </Form>
    );
}

export default withAdminAuth(UpdateAlert);
