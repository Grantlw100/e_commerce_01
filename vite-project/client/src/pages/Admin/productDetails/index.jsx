import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Form, Alert } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import withAdminAuth from '../withAdminAuth.jsx';
import {
  DELETE_CATEGORY,
  DELETE_KEYWORD,
  DELETE_PROMOTION,
  DELETE_SEASON,
} from '../../../utils/mutations.js';
import {
  GET_ALL_CATEGORIES,
  GET_ALL_PROMOTIONS,
  GET_ALL_KEYWORDS,
  GET_ALL_SEASONS,
} from '../../../utils/queries.js';
import CreateSeasonForm from './Seasons/index.jsx'
import UpdateSeasonForm from './Seasons/updateseason.jsx';
import CreatePromotionForm from './Promotions/index.jsx';
import UpdatePromotionForm from './Promotions/updatepromo.jsx';
import CreateCategoryForm from './Categories/index.jsx';
import UpdateCategoryForm  from './Categories/updatecat.jsx';
import CreateKeywordForm from './Keywords/index.jsx';
import UpdateKeywordForm from './Keywords/updatekey.jsx';

function AdminProductDetails() {
  const [selectedDetail, setSelectedDetail] = useState('promotions');
  const [details, setDetails] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const { data: promotionsData } = useQuery(GET_ALL_PROMOTIONS);
  const { data: categoriesData } = useQuery(GET_ALL_CATEGORIES);
  const { data: keywordsData } = useQuery(GET_ALL_KEYWORDS);
  const { data: seasonsData } = useQuery(GET_ALL_SEASONS);

  const [deleteCategory] = useMutation(DELETE_CATEGORY);
  const [deleteKeyword] = useMutation(DELETE_KEYWORD);
  const [deletePromotion] = useMutation(DELETE_PROMOTION);
  const [deleteSeason] = useMutation(DELETE_SEASON);

  useEffect(() => {
    switch (selectedDetail) {
      case 'promotions':
        setDetails(promotionsData?.promotions || []);
        break;
      case 'categories':
        setDetails(categoriesData?.categories || []);
        break;
      case 'keywords':
        setDetails(keywordsData?.keywords || []);
        break;
      case 'seasons':
        setDetails(seasonsData?.seasons || []);
        break;
      default:
        setDetails([]);
    }
  }, [selectedDetail, promotionsData, categoriesData, keywordsData, seasonsData]);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleDelete = async (id) => {
    try {
      switch (selectedDetail) {
        case 'promotions':
          await deletePromotion({ variables: { id } });
          break;
        case 'categories':
          await deleteCategory({ variables: { id } });
          break;
        case 'keywords':
          await deleteKeyword({ variables: { id } });
          break;
        case 'seasons':
          await deleteSeason({ variables: { id } });
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`Error deleting ${selectedDetail.slice(0, -1)}:`, error);
    }
  };

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <Form.Group controlId="selectDetail">
            <Form.Label>Select Detail Type</Form.Label>
            <Form.Control as="select" onChange={(e) => setSelectedDetail(e.target.value)} value={selectedDetail}>
              <option value="promotions">Promotions</option>
              <option value="categories">Categories</option>
              <option value="keywords">Keywords</option>
              <option value="seasons">Seasons</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row className="my-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Create New {selectedDetail.slice(0, -1)}</Card.Title>
              {selectedDetail === 'promotions' && <CreatePromotionForm />}
              {selectedDetail === 'categories' && <CreateCategoryForm />}
              {selectedDetail === 'keywords' && <CreateKeywordForm />}
              {selectedDetail === 'seasons' && <CreateSeasonForm />}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="my-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{selectedDetail.charAt(0).toUpperCase() + selectedDetail.slice(1)}</Card.Title>
              <ul className="list-unstyled">
                {details.map((detail) => (
                  <li key={detail.id} className="mb-3">
                    <Card>
                      <Card.Body>
                        <Card.Title>{detail.name}</Card.Title>
                        <Button variant="primary" onClick={() => handleSelectItem(detail)}>Update</Button>
                        <Button variant="danger" onClick={() => handleDelete(detail.id)} className="ml-2">Delete</Button>
                      </Card.Body>
                    </Card>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {selectedItem && (
        <Row className="my-3">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Update {selectedDetail.slice(0, -1)}</Card.Title>
                {selectedDetail === 'promotions' && <UpdatePromotionForm promotion={selectedItem} />}
                {selectedDetail === 'categories' && <UpdateCategoryForm category={selectedItem} />}
                {selectedDetail === 'keywords' && <UpdateKeywordForm keyword={selectedItem} />}
                {selectedDetail === 'seasons' && <UpdateSeasonForm season={selectedItem} />}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default withAdminAuth(AdminProductDetails);