import React, { useState } from 'react';
import { Form, Button, Alert, Image } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { UPDATE_KEYWORD } from '../mutations'; // Ensure this path is correct

const UpdateKeywordForm = ({ keyword }) => {
  const [formData, setFormData] = useState({
    name: keyword.name,
    description: keyword.description,
    image: keyword.image,
  });

  const [file, setFile] = useState(null);
  const [updateKeyword, { data, loading, error }] = useMutation(UPDATE_KEYWORD);

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
      await updateKeyword({
        variables: {
          id: keyword.id,
          input: formData,
          file,
        },
      });
    } catch (err) {
      console.error('Error updating keyword:', err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formKeywordName" className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formKeywordDescription" className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </Form.Group>

    <Image src={formData.image} thumbnail />

      <Form.Group controlId="formKeywordImage" className="mb-3">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="file"
          onChange={handleFileChange}
        />
      </Form.Group>

      {error && <Alert variant="danger">{error.message}</Alert>}
      {data && <Alert variant="success">Keyword updated successfully!</Alert>}

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Updating Keyword...' : 'Update Keyword'}
      </Button>
    </Form>
  );
};

export default UpdateKeywordForm;
