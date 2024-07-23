import React, { useState } from 'react';
import { Form, Button, Alert, Image } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { UPDATE_CATEGORY } from '../mutations'; // Ensure this path is correct

const UpdateCategoryForm = ({ category }) => {
  const [formData, setFormData] = useState({
    name: category.name,
   description: category.description,
    image: category.image,
  });

  const [file, setFile] = useState(null);
  const [updateCategory, { data, loading, error }] = useMutation(UPDATE_CATEGORY);

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
      await updateCategory({
        variables: {
          id: category.id,
          input: formData,
          file,
        },
      });
    } catch (err) {
      console.error('Error updating category:', err);
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

      <Image src={formData.image} alt={formData.name} fluid />

      <Form.Group controlId="formCategoryImage" className="mb-3">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="file"
          onChange={handleFileChange}
        />
      </Form.Group>

      {error && <Alert variant="danger">{error.message}</Alert>}
      {data && <Alert variant="success">Category updated successfully!</Alert>}

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Updating Category...' : 'Update Category'}
      </Button>
    </Form>
  );
};

export default UpdateCategoryForm;
