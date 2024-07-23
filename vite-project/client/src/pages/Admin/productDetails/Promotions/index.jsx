import React, { useState } from 'react';
import { Form, Button, Col, Row, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_PROMOTION } from '../mutations'; // Ensure this path is correct

const CreatePromotionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    discount: '',
  });

  const [file, setFile] = useState(null);
  const [createPromotion, { data, loading, error }] = useMutation(CREATE_PROMOTION);

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
      await createPromotion({
        variables: {
          input: formData,
          file,
        },
      });
    } catch (err) {
      console.error('Error creating promotion:', err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formPromotionName" className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPromotionDescription" className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </Form.Group>

        <Form.Group controlId="formPromotionStartDate" className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
            />
        </Form.Group>

        <Form.Group controlId="formPromotionEndDate" className="mb-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
            />
        </Form.Group>

        <Form.Group controlId="formPromotionDiscount" className="mb-3">
            <Form.Label>Discount</Form.Label>
            <Form.Control
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                required
            />
        </Form.Group>

      <Form.Group controlId="formPromotionImage" className="mb-3">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="file"
          onChange={handleFileChange}
        />
      </Form.Group>

      {error && <Alert variant="danger">{error.message}</Alert>}
      {data && <Alert variant="success">Promotion created successfully!</Alert>}

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Creating Promotion...' : 'Create Promotion'}
      </Button>
    </Form>
  );
};

export default CreatePromotionForm;
