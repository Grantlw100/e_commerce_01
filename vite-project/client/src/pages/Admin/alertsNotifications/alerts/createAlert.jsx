import withAdminAuth from '../../withAdminAuth.jsx';
import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_ALERT } from '../../../../utils/mutations.js'; // Ensure this path is correct

const CreateAlertForm = () => {
    const [formData, setFormData] = useState({
        user: '',
        alertText: '',
        alertDate: '',
        viewed: false,
        type: ''
    });

    const [validated, setValidated] = useState(false);
    const [file, setFile] = useState(null);
    const [createAlert, { data, loading, error }] = useMutation(CREATE_ALERT);

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
                await createAlert({
                    variables: {
                        input: formData,
                        file,
                    },
                });
                setFormData({
                    user: '',
                    alertText: '',
                    alertDate: '',
                    viewed: false,
                    type: ''
                });
                setFile(null);
                setValidated(false);
            } catch (err) {
                console.error('Error creating alert:', err);
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

            <Form.Group controlId="formAlertType" className="mb-3">
                <Form.Label>Type</Form.Label>
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

            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>File</Form.Label>
                <Form.Control
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
            </Button>

            {error && <Alert variant="danger" className="mt-3">{error.message}</Alert>}
            {data && <Alert variant="success" className="mt-3">Alert created successfully!</Alert>}
        </Form>
    );
}

export default withAdminAuth(CreateAlertForm);
