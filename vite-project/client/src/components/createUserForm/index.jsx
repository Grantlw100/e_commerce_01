import React, { useState } from 'react';
import { Form, Button, Col, Row, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../utils/mutations.js'; // Ensure this path is correct

const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const [file, setFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await createUser({
        variables: {
          input: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            address: {
              address1: formData.address1,
              address2: formData.address2,
              city: formData.city,
              state: formData.state,
              zip: formData.zip,
              country: formData.country,
            },
          },
          file, // Pass the file directly
        },
      });
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Row>

      <Form.Group controlId="formEmail" className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPhone" className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formPassword" className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formConfirmPassword" className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type={showPassword ? 'text' : 'password'}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="showPasswordCheckbox" className="mb-3">
        <Form.Check 
          type="checkbox"
          label="Show Password"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
      </Form.Group>

      <Form.Group controlId="profilePicture" className="mb-3">
        <Form.Label>Profile Picture</Form.Label>
        <Form.Control
          type="file"
          name="profilePicture"
          onChange={handleFileChange}
        />
      </Form.Group>

      <Form.Group controlId="formAddress1" className="mb-3">
        <Form.Label>Address 1</Form.Label>
        <Form.Control
          type="text"
          name="address1"
          value={formData.address1}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formAddress2" className="mb-3">
        <Form.Label>Address 2</Form.Label>
        <Form.Control
          type="text"
          name="address2"
          value={formData.address2}
          onChange={handleChange}
        />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formState">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Row>

      <Form.Group controlId="formCountry" className="mb-3">
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {error && <Alert variant="danger">{error.message}</Alert>}
      {data && <Alert variant="success">User created successfully!</Alert>}

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Creating User...' : 'Create User'}
      </Button>
    </Form>
  );
};

export default CreateUserForm;
