import React, { useState } from 'react';
import { Form, Button, Col, Row, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_SEASON } from '../mutations'; // Ensure this path is correct

const CreateSeasonForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
    });
    
    const [file, setFile] = useState(null);
    const [createSeason, { data, loading, error }] = useMutation(CREATE_SEASON);
    
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
        await createSeason({
            variables: {
            input: formData,
            file,
            },
        });
        } catch (err) {
        console.error('Error creating season:', err);
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
            required
            />
        </Form.Group>

        <Form.Group controlId="formSeasonStartDate" className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            />
        </Form.Group>

        <Form.Group controlId="formSeasonEndDate" className="mb-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            />
        </Form.Group>
    
        <Form.Group controlId="formSeasonImage" className="mb-3">
            <Form.Label>Season Image</Form.Label>
            <Form.Control
            type="file"
            name="file"
            onChange={handleFileChange}
            required
            />
        </Form.Group>
    
        <Button type="submit">Create Season</Button>
        </Form>
    );
    }

export default CreateSeasonForm;