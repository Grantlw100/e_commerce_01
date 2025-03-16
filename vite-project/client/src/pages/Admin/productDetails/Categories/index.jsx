import withAdminAuth from '../../withAdminAuth.jsx';
import React, { useState } from 'react';
import { Form, Button, Col, Row, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_CATEGORY } from '../../../../utils/mutations.js';

const CreateCategoryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
   description: '',
  });

  const [file, setFile] = useState(null);
  const [createCategory, { data, loading, error }] = useMutation(CREATE_CATEGORY);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory({
        variables: {
          input: formData,
          file,
        },
      });
    } catch (err) {
      console.error('Error creating category:', err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formCategoryName" className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formCategoryDescription" className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formCategoryImage" className="mb-3">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="file"
          onChange={handleFileChange}
        />
      </Form.Group>

      {error && <Alert variant="danger">{error.message}</Alert>}
      {data && <Alert variant="success">Category created successfully!</Alert>}

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Creating Category...' : 'Create Category'}
      </Button>
    </Form>
  );
};

export default withAdminAuth(CreateCategoryForm);
