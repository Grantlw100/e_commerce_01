import withAdminAuth from '../withAdminAuth';
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PRODUCT } from '../../../utils/mutations'; 
import { GET_ALL_PROMOTIONS, GET_ALL_CATEGORIES, GET_ALL_KEYWORDS, GET_ALL_SEASONS } from '../../../utils/queries';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

const CreateProductForm = ({ keywords, promotions, categories, seasons }) => {
  const [formData, setFormData] = useState({
    name: '',
    quickDescription: '',
    description: '',
    category: '',
    season: '',
    promotion: '',
    price: 0,
    discount: 0,
    featured: false,
    keywords: [],
    includes: [],
    reviews: [],
    bundled: false,
    quantity: 0,
    weight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0,
    },
    taxCategory: '',
  });

  const [productImage, setProductImage] = useState(null);
  const [descriptionImages, setDescriptionImages] = useState([]);
  const [createProduct, { data, loading, error }] = useMutation(CREATE_PRODUCT);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleKeywordsChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      if (checked) {
        return { ...prevState, keywords: [...prevState.keywords, value] };
      } else {
        return { ...prevState, keywords: prevState.keywords.filter((keyword) => keyword !== value) };
      }
    });
  };

  const handleProductImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleDescriptionImagesChange = (e) => {
    setDescriptionImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct({
        variables: {
          input: formData,
          productImage,
          descriptionImages,
        },
      });
    } catch (err) {
      console.error('Error creating product:', err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formProductName" className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formProductQuickDescription" className="mb-3">
        <Form.Label>Quick Description</Form.Label>
        <Form.Control
          type="text"
          name="quickDescription"
          value={formData.quickDescription}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formProductDescription" className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formProductCategory" className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Control as="select" name="category" onChange={handleChange} required>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formProductSeason" className="mb-3">
        <Form.Label>Season</Form.Label>
        <Form.Control as="select" name="season" onChange={handleChange}>
          <option value="">Select a season</option>
          {seasons.map((season) => (
            <option key={season.id} value={season.id}>{season.name}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formProductPromotion" className="mb-3">
        <Form.Label>Promotion</Form.Label>
        <Form.Control as="select" name="promotion" onChange={handleChange}>
          <option value="">Select a promotion</option>
          {promotions.map((promotion) => (
            <option key={promotion.id} value={promotion.id}>{promotion.name}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formProductKeywords" className="mb-3">
        <Form.Label>Keywords</Form.Label>
        {keywords.map((keyword) => (
          <Form.Check
            key={keyword.id}
            type="checkbox"
            label={keyword.name}
            value={keyword.id}
            onChange={handleKeywordsChange}
          />
        ))}
      </Form.Group>

      <Form.Group controlId="formProductPrice" className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formProductDiscount" className="mb-3">
        <Form.Label>Discount</Form.Label>
        <Form.Control
          type="number"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formProductFeatured" className="mb-3">
        <Form.Check
          type="checkbox"
          label="Featured"
          name="featured"
          checked={formData.featured}
          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
        />
      </Form.Group>

      <Form.Group controlId="formProductImage" className="mb-3">
        <Form.Label>Product Image</Form.Label>
        <Form.Control
          type="file"
          onChange={handleProductImageChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formProductDescriptionImages" className="mb-3">
        <Form.Label>Description Images</Form.Label>
        <Form.Control
          type="file"
          multiple
          onChange={handleDescriptionImagesChange}
        />
      </Form.Group>

      <Form.Group controlId="formProductBundled" className="mb-3">
        <Form.Check
          type="checkbox"
          label="Bundled"
          name="bundled"
          checked={formData.bundled}
          onChange={(e) => setFormData({ ...formData, bundled: e.target.checked })}
        />
      </Form.Group>

      <Form.Group controlId="formProductQuantity" className="mb-3">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formProductWeight" className="mb-3">
        <Form.Label>Weight</Form.Label>
        <Form.Control
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formProductLength" className="mb-3">
        <Form.Label>Length</Form.Label>
        <Form.Control
          type="number"
          name="length"
          value={formData.dimensions.length}
          onChange={(e) => setFormData({ ...formData, dimensions: { ...formData.dimensions, length: parseFloat(e.target.value) } })}
          required
        />
      </Form.Group>

      <Form.Group controlId="formProductWidth" className="mb-3">
        <Form.Label>Width</Form.Label>
        <Form.Control
          type="number"
          name="width"
          value={formData.dimensions.width}
          onChange={(e) => setFormData({ ...formData, dimensions: { ...formData.dimensions, width: parseFloat(e.target.value) } })}
          required
        />
      </Form.Group>

      <Form.Group controlId="formProductHeight" className="mb-3">
        <Form.Label>Height</Form.Label>
        <Form.Control
          type="number"
          name="height"
          value={formData.dimensions.height}
          onChange={(e) => setFormData({ ...formData, dimensions: { ...formData.dimensions, height: parseFloat(e.target.value) } })}
          required
        />
      </Form.Group>

      <Form.Group controlId="formProductTaxCategory" className="mb-3">
        <Form.Label>Tax Category</Form.Label>
        <Form.Control
          type="text"
          name="taxCategory"
          value={formData.taxCategory}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Creating Product...' : 'Submit'}
      </Button>

      {error && <Alert variant="danger">{error.message}</Alert>}
      {data && <Alert variant="success">Product created successfully!</Alert>}
    </Form>
  );
};

export default withAdminAuth(CreateProductForm);
