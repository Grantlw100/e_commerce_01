import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useGlobalState } from "../../utils/Store/GlobalState"; // Ensure this path is correct

const Filtered = () => {
  const { state, updateFilters } = useGlobalState();
  const { categories, promotions, keywords, items, filters } = state;

  const onCategoryChange = (e) => {
    updateFilters("category", e.target.value);
  };

  const onPromotionChange = (e) => {
    updateFilters("promotion", e.target.value);
  };

  const onFeaturedChange = (e) => {
    updateFilters("featured", e.target.checked);
  };

  const onLovedChange = (e) => {
    updateFilters("loved", e.target.checked);
  };

  { /* Discount Filter Logix */}
  const [discountedItems, setDiscountedItems] = useState([0, 100]); // [item1, item2, ...
  const [discountSliderValue, setDiscountSliderValue] = useState(0);

  useEffect(() => {
    setDiscountSliderValue(discountedItems[0]);
  }, [discountedItems]);

  const handleDiscountSliderChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setDiscountSliderValue(newValue);
    updateFilters("discount", newValue);
  };

  useEffect(() => {
    const discounts = items.map((item) => parseFloat(item.discount));
    const maxDiscount = Math.max(...discounts);
    const minDiscount = Math.min(...discounts);
    setDiscountedItems([minDiscount, maxDiscount]);
  }, [items]);

  { /* Price Filter Logic */}
  const [priceRange, setPriceRange] = useState([0, 200]); // Default range, will update based on items
  const [sliderValue, setSliderValue] = useState(0);
  useEffect(() => {
    // Set initial slider value to max price
    setSliderValue(priceRange[1]);
  }, [priceRange]);

  const handleSliderChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setSliderValue(newValue);
    updateFilters("priceRange", [0, newValue]);
  };

  useEffect(() => {
    const prices = items.map((item) => parseFloat(item.price));
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    setPriceRange([minPrice, maxPrice]);
  }, [items]);


    { /* Rating Filter Logic */}
  const [rateRanger, setRateRanger] = useState([1, 5]); // Default range, will update based on items
  const [rateSliderValue, setRateSliderValue] = useState(1);
  useEffect(() => {
    // Set initial slider value to 1 by default to display all items
    setRateSliderValue(rateRanger[0]);
  }, [rateRanger]);

  const handleRateSliderChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setRateSliderValue(newValue);
    updateFilters("ratings", newValue);
  };

  { /* Keyword Filter Logic */}
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const toggleKeyword = (keyword) => {
    const currentIndex = selectedKeywords.indexOf(keyword);
    const newKeywords = [...selectedKeywords];

    if (currentIndex === -1) {
      newKeywords.length < 5 && newKeywords.push(keyword);
    } else {
      newKeywords.splice(currentIndex, 1);
    }

    setSelectedKeywords(newKeywords);
    updateFilters("keywords", newKeywords); // Assuming updateFilters can handle array updates
  };

  const onClearFilters = () => {
    updateFilters("category", "");
    updateFilters("promotion", "");
    updateFilters("priceRange", [0, 200]);
    updateFilters("rating", null);
    updateFilters("featured", false);
    updateFilters("loved", false);
    updateFilters("keywords", []);
    setSelectedKeywords([]);
  };

  // Simplified event handlers that call the provided callback functions
  return (
    <div>
      <Form>
        {/* Category Filter */}
        <Form.Group controlId="filterCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control as="select" onChange={onCategoryChange}>
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {/* Promotion Filter */}
        <Form.Group controlId="filterPromotion">
          <Form.Label>Promotion</Form.Label>
          <Form.Control as="select" onChange={onPromotionChange}>
            <option value="">All</option>
            {promotions.map((promotion) => (
              <option key={promotion} value={promotion}>
                {promotion}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {/* Keyword Filter */}
        <Form.Group controlId="filterKeyword">
          <Form.Label>Keywords</Form.Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {keywords.map((keyword) => (
              <Button
                key={keyword}
                variant={
                  selectedKeywords.includes(keyword) ? "primary" : "secondary"
                }
                onClick={() => toggleKeyword(keyword)}
              >
                {keyword}
              </Button>
            ))}
          </div>
        </Form.Group>

        {/* Price Filter */}
        <Form.Group controlId="filterPrice">
          <Form.Label>
            Price: {sliderValue} to {priceRange[1]}
          </Form.Label>
          <Form.Control
            type="range"
            min={priceRange[0]}
            max={priceRange[1]}
            value={sliderValue} // Bind the value here
            onChange={handleSliderChange} // Ensure this updates the state
            className="custom-slider"
          />
        </Form.Group>

        {/* Rating Filter */}
        <Form.Group controlId="filterRating">
          <Form.Label>
            Rating: {rateSliderValue} to {rateRanger[1]}
          </Form.Label>
          <Form.Control
            type="range"
            min={rateRanger[0]}
            max={rateRanger[1]}
            value={rateSliderValue} // Bind the value here
            step="0.1"
            onChange={handleRateSliderChange} // Ensure this updates the state
          />
        </Form.Group>

        {/* Discount Filter */}
        <Form.Group controlId="filterDiscount">
            <Form.Label>
                Discount: {discountSliderValue} to {discountedItems[1]}
            </Form.Label>
            <Form.Control
                type="range"
                min={discountedItems[0]}
                max={discountedItems[1]}
                value={discountSliderValue}
                onChange={handleDiscountSliderChange}
                className="custom-slider"
            />
        </Form.Group>

        {/* Featured Filter */}
        <Form.Group controlId="filterFeatured">
          <Form.Check
            type="checkbox"
            label="Featured"
            onChange={onFeaturedChange}
          />
        </Form.Group>

        {/* Loved Filter */}
        <Form.Group controlId="filterLoved">
          <Form.Check type="checkbox" label="Loved" onChange={onLovedChange} />
        </Form.Group>
        
        {/* Clear Filters Button */}
        <Button variant="secondary" onClick={onClearFilters}>
          Clear Filters
        </Button>
      </Form>
    </div>
  );
};

export default Filtered;
