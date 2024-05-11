

const onCategoryChange = (e) => {
    setCategory(e);
}

const onPromotionChange = (e) => {
    setPromotion(e);
}

const onKeywordChange = (e) => {
    setKeyword(e);
}

const onPriceChange = (e) => {
    setPrice(e);
}

const onRatingChange = (e) => {
    setRating(e);
}

const onFeaturedChange = (e) => {
    setFeatured(e);
}

const onLovedChange = (e) => {
    setLoved(e);
}

const onDiscountChange = (e) => {
    setDiscount(e);
}

const onClearFilters = () => {
    setCategory('');
    setPromotion('');
    setKeyword('');
    setPrice('');
    setRating('');
    setFeatured('');
    setLoved('');
}

const onFilterChange = (e) => {
    const filterKey = e.target.id;
    const value = e.target.value;
    updateFilters(filterKey, value);
}

export {
    onCategoryChange,
    onPromotionChange,
    onKeywordChange,
    onPriceChange,
    onRatingChange,
    onFeaturedChange,
    onLovedChange,
    onClearFilters,
    onFilterChange,
    onDiscountChange
}