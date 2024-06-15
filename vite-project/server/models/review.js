const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    reviewText: {
        type: String,
        required: 'You need to leave a review!',
        minlength: 1,
        maxlength: 280,
    },
    reviewAuthor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reviewProduct: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    reviewDate: {
        type: Date,
        default: Date.now,
    },
    reviewRating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
});

module.exports = mongoose.model('Review', reviewSchema);
