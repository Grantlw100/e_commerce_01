import mongoose, { model } from 'mongoose';


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
 
                    /*  MONGODB REVIEW MODEL */
        /* Model creation for the Review model within MongoDB & used by GraphQL */
        
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


const { Schema } = mongoose;

const reviewSchema = new Schema({
    // meta
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt : {
        type: Date,
        default: Date.now,
    },
    deletedAt: {
        type: Date,
    },
    text: {
        type: String,
        required: 'You need to leave a review!',
        minlength: 1,
        maxlength: 280,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    product: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        },
        index: {
            type: Number
        },
        count: {
            type: Number,
            default: 1,
        },
    }],
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    images: [{
        photo: {
            type: String,
        },
        index: {
            type: Number,
        },
    }],
});

export default model('Review', reviewSchema);
