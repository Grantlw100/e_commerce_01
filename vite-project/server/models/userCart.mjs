import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
 
                    /*  MONGODB CART MODEL */
        /* Model creation for the Cart model within MongoDB & used by GraphQL */
        
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


const userCartSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    abandoned: {
        type: Boolean,
    },
    orderedAt: {
        type: Date,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    }],
    total: {
        type: Number,
        required: true,
        min: 0,
    },
});

export default model('UserCart', userCartSchema);
