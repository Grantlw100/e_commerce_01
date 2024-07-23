import React, { useState } from 'react';
import { Form, Button, Alert, Image } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { UPDATE_SEASON } from '../mutations'; // Ensure this path is correct

const UpdateSeasonForm = ({ season }) => {
  const [formData, setFormData] = useState({
    name: season.name,
    description: season.description,
    image: season.image,
    startDate: season.startDate,
    endDate: season.endDate,
  });

  const [file, setFile] = useState(null);
  const [updateSeason, { data, loading, error }] = useMutation(UPDATE_SEASON);

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
      await updateSeason({
        variables: {
          id: season.id,
          input: formData,
          file,
        },
      });
    } catch (err) {
      console.error('Error updating season:', err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formSeasonName" className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formSeasonDescription" className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Image src={formData.image} alt={formData.name} fluid />

      <Form.Group controlId="formSeasonImage" className="mb-3">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="file"
          onChange={handleFileChange}
        />
      </Form.Group>

        <Form.Group controlId="formSeasonStartDate" className="mb-3">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
        />
        </Form.Group>

        <Form.Group controlId="formSeasonEndDate" className="mb-3">
        <Form.Label>End Date</Form.Label>
        <Form.Control
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
        />
        </Form.Group>

      {error && <Alert variant="danger">{error.message}</Alert>}
      {data && <Alert variant="success">Season updated successfully!</Alert>}

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Updating Season...' : 'Update Season'}
      </Button>
    </Form>
  );
};

export default UpdateSeasonForm;
