import mongoose, { model } from 'mongoose';


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

                    /*  MONGODB PRODUCT MODEL */
        /* Model creation for the Product model within MongoDB & used by GraphQL */

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


const { Schema } = mongoose;

const productSchema = new Schema({
    // descriptions
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
    primaryColors: [{
        type: String,
    }],
    secondaryColors: [{
        type: String,
    }],
    // meta
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
    }],
    season: [{
        type: Schema.Types.ObjectId,
        ref: 'Season',
    }],
    promotions: [{
        type: Schema.Types.ObjectId,
        ref: 'Promotion',
    }],
    keywords: [{
        type: Schema.Types.ObjectId,
        ref: 'Keyword',
    }],
    featured: {
        type: Boolean,
        default: false,
    },
    recommendationId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
    }],
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    makeYourOwn: {
        type: Boolean,
        default: false,
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
    taxCategory: {
        type: String,
        default: 'physical_goods',
    },
    // contentDetails
    includes: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],
    bundle: {
        type: Boolean,
        default: false,
    },
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
        },
        // xs, s, m, l, xl, xxl, xxxl
        // 3in, 6in, 12in, 24in, 48in, 96in, 192in
        // size 11, size 12, size 13, size 14, etc... 
        size: {
            type: String,
        }
    },
    userInteraction: {
        lovedCount: {
            type: Number,
            default: 0,
        },
        cartCount: {
            type: Number,
            default: 0,
        },
        wishlistCount: {
            type: Number,
            default: 0,
        },
        viewedCount: {
            type: Number,
            default: 0,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    version: {
        type: Number,
        default: 1,
    },
    // if a make your own or if the product is listed by a specific user 
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    // for later use to incorpoarate stores
    // store: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Store',
    // },
});

export default model('Product', productSchema);


