import withAdminAuth from '../../withAdminAuth';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_KEYWORD } from '../../../../utils/mutations';
import { Form, Button } from 'react-bootstrap';

const CreateKeywordForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [file, setFile] = useState(null);

  const [createKeyword, { data, loading, error }] = useMutation(CREATE_KEYWORD);

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
      await createKeyword({
        variables: {
          input: formData,
          file: file
        }
      });
    } catch (err) {
      console.error('Error creating keyword:', err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formFile">
        <Form.Label>Keyword Image</Form.Label>
        <Form.Control
          type="file"
          name="file"
          onChange={handleFileChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Keyword'}
      </Button>
      {error && <p>Error: {error.message}</p>}
      {data && <p>Keyword created successfully!</p>}
    </Form>
  );
};

export default withAdminAuth(CreateKeywordForm)
