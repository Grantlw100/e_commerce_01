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
    abandonedAt: {
        type: Date,
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
    products: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
            count: {
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
});

export default model('UserCart', userCartSchema);
