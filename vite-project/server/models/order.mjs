import mongoose, { model } from 'mongoose';



//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
 
                    /*  MONGODB ORDER MODEL */
        /* Model creation for the Order model within MongoDB & used by GraphQL */
        
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


const { Schema } = mongoose;

const orderSchema = new Schema({
    // meta
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    orderedAt: {
        type: Date,
        default: Date.now,
    },
    orderStatus: {
        type: String,
        required: true,
        enum: ['Processing', 'Shipped', 'Delivered'],
        default: 'Processing',
    },
    ownership: {
            ownerType: {
                type: String,
                enum: ["user", "store", "admin", "superadmin", "wishlist"],
                default: "store",
            },
            ownerId: {
                type: Schema.Types.ObjectId,
                refPath: "ownership.ownerType", // Dynamic reference
                required: true,
            },
        },
    orderedFrom: [{
       storeId: { 
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: true,
       },
       products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        }]
    }],
    // content
    products: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                default: 1,
            },
            index: {
                type: Number,
            },
        }],
    total: {
        type: Number,
        required: true,
        min: 0,
    },
    // value
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
    discounts: [{
        type: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        promocode: {
            type: Schema.Types.ObjectId,
            ref: 'Token',
        },
        promotions: [{
            type: Schema.Types.ObjectId,
            ref: 'Promotion',
        }],
    }],
    // Shipping
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
        address1: {
            type: String,
            minlength: 1,
            maxlength: 280,
        },
        address2: {
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
});

export default model('Order', orderSchema);
