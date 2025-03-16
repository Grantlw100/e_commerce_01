import withAdminAuth from '../../withAdminAuth.jsx';
import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_CONTENT } from '../../../../utils/mutations.js';

const CreateContent = () => {
    const [formData, setFormData] = useState({
        user: '',
        title: '',
        content: '',
        createdDate: '',
        modifiedDate: '',
        expirationDate: '',
        expirationStatus: '',
        contentType: '',
        published: false,
        viewed: false,
    });

    const [validated, setValidated] = useState(false);
    const [file, setFile] = useState(null);
    const [createContent, { data, loading, error }] = useMutation(CREATE_CONTENT);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            try {
                await createContent({
                    variables: {
                        input: formData,
                        file,
                    },
                });
                setFormData({
                    user: '',
                    title: '',
                    content: '',
                    createdDate: '',
                    modifiedDate: '',
                    expirationDate: '',
                    expirationStatus: '',
                    contentType: '',
                    published: false,
                    viewed: false,
                });
                setFile(null);
                setValidated(false);
            } catch (err) {
                console.error('Error creating content:', err);
            }
        }
        setValidated(true);
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="formContentUser" className="mb-3">
                <Form.Label>User</Form.Label>
                <Form.Control
                    type="text"
                    name="user"
                    value={formData.user}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formContentTitle" className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formContentText" className="mb-3">
                <Form.Label>Content Text</Form.Label>
                <Form.Control
                    as="textarea"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formCreatedDate" className="mb-3">
                <Form.Label>Created Date</Form.Label>
                <Form.Control
                    type="date"
                    name="createdDate"
                    value={formData.createdDate}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formContentType" className="mb-3">
                <Form.Label>Content Type</Form.Label>
                <Form.Control
                    type="text"
                    name="contentType"
                    value={formData.contentType}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formContentImage" className="mb-3">
                <Form.Label>Content Image</Form.Label>
                <Form.Control
                    type="file"
                    onChange={handleFileChange}
                    required
                />
            </Form.Group>

            <Button type="submit" className="mt-3">
                Submit
            </Button>
            {loading && <Spinner animation="border" role="status" />}
            {error && <Alert variant="danger">Error creating content</Alert>}
        </Form>
    );
};

export default withAdminAuth(CreateContent);
