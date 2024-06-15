const mongoose = require('mongoose');
const { Schema } = mongoose;

const userCartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    }],
    cartTotal: {
        type: Number,
        required: true,
        min: 0,
    },
});

module.exports = mongoose.model('UserCart', userCartSchema);
