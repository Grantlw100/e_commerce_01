import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Filtered from '../../components/filtration/index.jsx'; // Ensure this path is correct
import MultiPurposeItemDisplay from '../../components/multiPurposeItems/index.jsx'; // Ensure this path is correct
import { useGlobalState } from '../../utils/Store/GlobalState.jsx'; // Ensure this path is correct

export default function Products() {
    const { state } = useGlobalState();
    const { items, filters, toggleLoved } = state;
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        function applyFilters(items, filters) {
            return items.filter(item => {
                const matchesCategory = !filters.category || item.category === filters.category;
                const matchesPromotion = !filters.promotion || item.promotion === filters.promotion;
                const withinPriceRange = item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1];
                const matchesFeatured = filters.featured === false || item.featured === filters.featured;
                const matchesLoved = filters.loved === false || item.loved === filters.loved;
                // Update here to ensure all keywords must match
                const matchesKeywords = filters.keywords.length === 0 || filters.keywords.every(k => item.keywords.includes(k));
                const matchesRating = filters.ratings === null || item.averageRating >= filters.ratings;
                const matchesDiscount = filters.discount === null || item.discount >= filters.discount;
    
                return matchesCategory && matchesPromotion && withinPriceRange && matchesFeatured && matchesLoved && matchesKeywords && matchesRating && matchesDiscount;
            });
        }
    
        // Ensure items are loaded before filtering
        if (items.length > 0) {
            const result = applyFilters(items, filters);
            setFilteredItems(result);
            setLoading(false);
        }
    }, [items, filters]);
    
    console.log(filteredItems);
    console.log(filters);
    

    return (
        <div>
            <h1>Products</h1>
            <Container>
                <Row>
                    <Col md={4} className="d-none d-md-block">
                        <Filtered />
                    </Col>
                    <Col xs={12} md={8} id='items-container'>
                        {loading ? (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : (
                            <MultiPurposeItemDisplay items={filteredItems} />
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
