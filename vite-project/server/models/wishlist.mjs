import { model, Schema } from 'mongoose';


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
 
                    /*  MONGODB WISHLIST MODEL */
        /* Model creation for the Wishlist model within MongoDB & used by GraphQL */
        
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


const wishlistSchema = new Schema({
    // metadata: 
    createdAt: { type: Date},
    updatedAt: { type: Date },
    deletedAt: { type: Date },
    version: { type: Number },
    name: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    //content
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],
    private: {
        type: Boolean,
        default: true,
    },
    subscribers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    colors: [{
        color: {type: String},
        index: {type: Number},
    }],
});

export default model('Wishlist', wishlistSchema);