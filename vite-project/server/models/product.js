const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    quickDescription: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    descriptionImages: {
        type: [String],
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    season: {
        type: Schema.Types.ObjectId,
        ref: 'Season',
    },
    promotion: {
        type: Schema.Types.ObjectId,
        ref: 'Promotion',
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    loved: {
        type: Boolean,
        default: false,
    },
    viewed: {
        type: Boolean,
        default: false,
    },
    keywords: [{
        type: Schema.Types.ObjectId,
        ref: 'Keyword',
    }],
    includes: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
    }],
    bundled: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    weight: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    dimensions: {
        length: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        width: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        height: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        }
    },
    taxCategory: {
        type: String,
        default: 'physical_goods',
    },
});

module.exports = mongoose.model('Product', productSchema);
