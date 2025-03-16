import mongoose, { model } from 'mongoose';



//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
 
                    /*  MONGODB ORDER MODEL */
        /* Model creation for the Order model within MongoDB & used by GraphQL */
        
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


const { Schema } = mongoose;

const orderSchema = new Schema({
    // meta
    userId: {
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    orderStatus: {
        type: String,
        required: true,
        enum: ['Processing', 'Shipped', 'Delivered'],
        default: 'Processing',
    },
    // cost
    total: {
        type: Number,
        required: true,
        min: 0,
    },
    subtTotal: {
        type: Number,
        required: true,
    },
    tax: [{
        code: {
            type: String,
        },
        rate: {
            type: Number,
        },
        amount: {
            type: Number,
        },
    }],
    // Statis
    trackingNumber: {
        type: String,
        default: '',
    },
    shippingDetails: {
        arrivalDate: {
            type: Date,
        },
        shippedDate: {
            type: Date,
        },
        shippingMethod: {
            type: String,
            minlength: 1,
            maxlength: 50,
        },
        address: {
            type: String,
            minlength: 1,
            maxlength: 280,
        },
        city: {
            type: String,
            minlength: 1,
            maxlength: 50,
        },
        state: {
            type: String,
            minlength: 1,
            maxlength: 50,
        },
        zip: {
            type: String,
            minlength: 1,
            maxlength: 10,
        },
    },
    discounts: [{
        type: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        code: {
            type: String,
        },
        promotions: [{
            type: Schema.Types.ObjectId,
            ref: 'Promotion',
        }],
    }],
});

export default model('Order', orderSchema);
