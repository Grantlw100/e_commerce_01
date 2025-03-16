import withAdminAuth from '../withAdminAuth';
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { UPDATE_PRODUCT } from '../../../utils/mutations';

const UpdateProductForm = ({ product, keywords, seasons, promotions, categories }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    quickDescription: product.quickDescription,
    description: product.description,
    category: product.category._id,
    season: product.season?._id,
    promotion: product.promotion?._id,
    keywords: product.keywords.map(k => k._id),
    price: product.price,
    quantity: product.quantity,
    discount: product.discount,
    featured: product.featured,
    bundled: product.bundled,
    image: product.image,
    descriptionImages: product.descriptionImages,
    weight: product.weight,
    dimensions: {
      length: product.dimensions.length,
      width: product.dimensions.width,
      height: product.dimensions.height,
    },
    taxCategory: product.taxCategory,
  });

  const [productImage, setProductImage] = useState(null);
  const [descriptionImages, setDescriptionImages] = useState([]);

  const [updateProduct, { data, loading, error }] = useMutation(UPDATE_PRODUCT);

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
      await updateProduct({
        variables: {
          id: product.id,
          input: formData,
          productImage,
          descriptionImages,
        },
      });
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formProductName">
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formQuickDescription">
        <Form.Label>Quick Description</Form.Label>
        <Form.Control
          type="text"
          name="quickDescription"
          value={formData.quickDescription}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formSeason">
        <Form.Label>Season</Form.Label>
        <Form.Control
          as="select"
          name="season"
          value={formData.season}
          onChange={handleChange}
        >
          <option value="">Select a season</option>
          {seasons.map((season) => (
            <option key={season.id} value={season.id}>{season.name}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formPromotion">
        <Form.Label>Promotion</Form.Label>
        <Form.Control
          as="select"
          name="promotion"
          value={formData.promotion}
          onChange={handleChange}
        >
          <option value="">Select a promotion</option>
          {promotions.map((promotion) => (
            <option key={promotion.id} value={promotion.id}>{promotion.name}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formDiscount">
        <Form.Label>Discount</Form.Label>
        <Form.Control
          type="number"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formFeatured">
        <Form.Check
          type="checkbox"
          label="Featured"
          name="featured"
          checked={formData.featured}
          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
        />
      </Form.Group>

      <Form.Group controlId="formProductImage">
        <Form.Label>Product Image</Form.Label>
        <Form.Control
          type="file"
          onChange={handleProductImageChange}
        />
      </Form.Group>

      <Form.Group controlId="formDescriptionImages">
        <Form.Label>Description Images</Form.Label>
        <Form.Control
          type="file"
          multiple
          onChange={handleDescriptionImagesChange}
        />
      </Form.Group>

      <Form.Group controlId="formKeywords">
        <Form.Label>Keywords</Form.Label>
        {keywords.map((keyword) => (
          <Form.Check
            key={keyword.id}
            type="checkbox"
            label={keyword.name}
            value={keyword.id}
            checked={formData.keywords.includes(keyword.id)}
            onChange={handleKeywordsChange}
          />
        ))}
      </Form.Group>

      <Form.Group controlId="formQuantity">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBundled">
        <Form.Check
          type="checkbox"
          label="Bundled"
          name="bundled"
          checked={formData.bundled}
          onChange={(e) => setFormData({ ...formData, bundled: e.target.checked })}
        />
      </Form.Group>

      <Form.Group controlId="formWeight">
        <Form.Label>Weight</Form.Label>
        <Form.Control
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formDimensions">
        <Form.Label>Dimensions</Form.Label>
        <Row>
          <Col>
            <Form.Control
              type="number"
              placeholder="Length"
              name="length"
              value={formData.dimensions.length}
              onChange={(e) => setFormData({ ...formData, dimensions: { ...formData.dimensions, length: parseFloat(e.target.value) } })}
              required
            />
          </Col>
          <Col>
            <Form.Control
              type="number"
              placeholder="Width"
              name="width"
              value={formData.dimensions.width}
              onChange={(e) => setFormData({ ...formData, dimensions: { ...formData.dimensions, width: parseFloat(e.target.value) } })}
              required
            />
          </Col>
          <Col>
            <Form.Control
              type="number"
              placeholder="Height"
              name="height"
              value={formData.dimensions.height}
              onChange={(e) => setFormData({ ...formData, dimensions: { ...formData.dimensions, height: parseFloat(e.target.value) } })}
              required
            />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group controlId="formProductTaxCategory">
        <Form.Label>Tax Category</Form.Label>
        <Form.Control
          type="text"
          name="taxCategory"
          value={formData.taxCategory}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Updating Product...' : 'Update Product'}
      </Button>

      {error && <Alert variant="danger">{error.message}</Alert>}
      {data && <Alert variant="success">Product updated successfully!</Alert>}
    </Form>
  );
};

export default withAdminAuth(UpdateProductForm);
