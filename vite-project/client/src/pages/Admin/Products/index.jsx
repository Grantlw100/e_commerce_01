import withAdminAuth from '../withAdminAuth.jsx';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Form, Button, Col, Row, Alert, ListGroup } from 'react-bootstrap';
import { CREATE_PRODUCT, DELETE_PRODUCT } from '../../../utils/mutations.js';
import { GET_ALL_PROMOTIONS, GET_ALL_CATEGORIES, GET_ALL_KEYWORDS, GET_ALL_SEASONS, GET_ALL_PRODUCTS } from '../../../utils/queries.js';
import CreateProductForm from './createProductForm.jsx';
import UpdateProductForm from './updateProduct.jsx';
import { useGlobalState } from '../../../utils/Store/GlobalState.jsx';

const ProductForm = () => {
  const { state } = useGlobalState();
  const { items, categories, promotions, keywords, seasons } = state;

  const [properForm, setProperForm] = useState('create');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const { data: promotionsData } = useQuery(GET_ALL_PROMOTIONS);
  const { data: categoriesData } = useQuery(GET_ALL_CATEGORIES);
  const { data: keywordsData } = useQuery(GET_ALL_KEYWORDS);
  const { data: seasonsData } = useQuery(GET_ALL_SEASONS);
  const { data: productsData } = useQuery(GET_ALL_PRODUCTS);

  useEffect(() => {
    if (promotionsData) state.setPromotions(promotionsData.promotions);
    if (categoriesData) state.setCategories(categoriesData.categories);
    if (keywordsData) state.setKeywords(keywordsData.keywords);
    if (seasonsData) state.setSeasons(seasonsData.seasons);
    if (productsData) state.setItems(productsData.products);
  }, [promotionsData, categoriesData, keywordsData, seasonsData, productsData, state]);

  const handleFormChange = (form) => {
    setProperForm(form);
    setSelectedProduct(null);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setProperForm('update');
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct({ variables: { id } });
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <Button variant="success" onClick={() => handleFormChange('create')}>Create Product</Button>
          <Button variant="primary" onClick={() => handleFormChange('update')}>Update/Delete Product</Button>
        </Col>
      </Row>
      {properForm === 'create' ? (
        <CreateProductForm 
          keywords={keywords} 
          promotions={promotions} 
          categories={categories} 
          seasons={seasons} 
        />
      ) : (
        <>
          <ListGroup>
            {items.map((product) => (
              <ListGroup.Item key={product.id}>
                <Row>
                  <Col md={6}>
                    <h5>{product.name}</h5>
                    <p>{product.quickDescription}</p>
                    <p>{product.price}</p>
                    <p>{product.quantity}</p>
                  </Col>
                  <Col md={6} className="text-right">
                    <Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                    <Button variant="info" onClick={() => handleSelectProduct(product)}>Update</Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
          {selectedProduct && (
            <UpdateProductForm 
              product={selectedProduct} 
              keywords={keywords} 
              promotions={promotions} 
              categories={categories} 
              seasons={seasons} 
            />
          )}
        </>
      )}
    </Container>
  );
};

export default withAdminAuth(ProductForm);
