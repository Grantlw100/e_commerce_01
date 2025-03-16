import withAdminAuth from "../../withAdminAuth.jsx";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_CONTENT } from "../../../../utils/mutations.js";
import { Form, Button, Alert, Spinner } from "react-bootstrap";

const UpdateContent = ({ content }) => {
    const [formData, setFormData] = useState({
        user: content.user,
        title: content.title,
        content: content.content,
        createdDate: content.createdDate,
        modifiedDate: content.modifiedDate,
        expirationDate: content.expirationDate,
        expirationStatus: content.expirationStatus,
        contentType: content.contentType,
        published: content.published,
        viewed: content.viewed,
    });

    const [file, setFile] = useState(null);
    const [validated, setValidated] = useState(false);
    const [updateContent, { data, loading, error }] = useMutation(UPDATE_CONTENT);

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
                await updateContent({
                    variables: {
                        id: content.id,
                        input: formData,
                        file,
                    },
                });
                setValidated(false);
            } catch (err) {
                console.error("Error updating content:", err);
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

            <Form.Group controlId="formContentContent" className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                    as="textarea"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formContentCreatedDate" className="mb-3">
                <Form.Label>Created Date</Form.Label>
                <Form.Control
                    type="date"
                    name="createdDate"
                    value={formData.createdDate}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formContentModifiedDate" className="mb-3">
                <Form.Label>Modified Date</Form.Label>
                <Form.Control
                    type="date"
                    name="modifiedDate"
                    value={formData.modifiedDate}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formContentExpirationDate" className="mb-3">
                <Form.Label>Expiration Date</Form.Label>
                <Form.Control
                    type="date"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formContentExpirationStatus" className="mb-3">
                <Form.Label>Expiration Status</Form.Label>
                <Form.Control
                    type="text"
                    name="expirationStatus"
                    value={formData.expirationStatus}
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

            <Form.Group controlId="formContentPublished" className="mb-3">
                <Form.Check
                    type="checkbox"
                    label="Published"
                    name="published"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                />
            </Form.Group>

            <Form.Group controlId="formContentViewed" className="mb-3">
                <Form.Check
                    type="checkbox"
                    label="Viewed"
                    name="viewed"
                    checked={formData.viewed}
                    onChange={(e) => setFormData({ ...formData, viewed: e.target.checked })}
                />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>File</Form.Label>
                <Form.Control
                    type="file"
                    onChange={handleFileChange}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                {loading ? (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : (
                    "Update Content"
                )}
            </Button>

            {error && <Alert variant="danger">{error.message}</Alert>}
        </Form>
    );
};

export default withAdminAuth(UpdateContent);
