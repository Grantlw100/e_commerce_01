const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    }],
    orderDate: {
        type: Date,
        default: Date.now,
    },
    orderTotal: {
        type: Number,
        required: true,
        min: 0,
    },
    orderStatus: {
        type: String,
        required: true,
        enum: ['Processing', 'Shipped', 'Delivered'],
        default: 'Processing',
    },
    trackingNumber: {
        type: String,
        default: '',
    },
});

module.exports = mongoose.model('Order', orderSchema);
