import mongoose, { model } from 'mongoose';


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
 
                    /*  MONGODB CONTENT MODEL */
        /* Model creation for the Content model within MongoDB & used by GraphQL */
        /* Content model is used for large text content such as articles, blog posts, etc. */
        
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


const { Schema } = mongoose;

const contentSchema = new Schema({

    // metadata
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    expiredAt: {
        type: Date,
    },
    publishedAt: {
        type: Date
    },
    version: {
        type: Number,
        default: 1,
    },
    status: {
        type: String,
        enum: ['active, inactive, expired, draft, pending publish date'],
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
    languages: [{
        originalLanguage: {
            type: String,
            default: 'en',
        },
        translatedLanguage: {
            type: String,
            default: 'en',
        },
    }],
    privacy: {
        type: String,
        enum: ['public', 'private', 'protected'],
        default: 'public',
    },
    // content
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    type: {
        type: String,
        required: true,
    },
    elements: [{
        position: { type: String },
        index: { type: Number },
        text: { 
            type: String,
            minlength: 1,
            maxlength: 10000,
        }
        }],
    images: [{
        image: { type: String },
        index: { type: Number },
    }],
    colors: [{
        color: { type: String },
        index: { type: Number },
    }],
    layouts: [{ 
        layout: { type: Schema.Types.ObjectId, ref: 'Layout'},
        index: { type: Number }
     }], // Nested layouts
    keyword: [{
        type: Schema.Types.ObjectId,
        ref: 'Keyword',
    }],
    season: [{
        type: Schema.Types.ObjectId,
        ref: 'Season',
    }],
    promotion: [{
        type: Schema.Types.ObjectId,
        ref: 'Promotion',
    }],
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
    }],
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
    stores: [{
        store: {
            type: Schema.Types.ObjectId,
            ref: 'Store'
        },
        index: {
            type: Number,
        },
    }],
    trigger: {
        event: {
            type: Schema.Types.ObjectId,
            ref: 'Event',
        },
        sourceId: {
            type: Schema.Types.ObjectId,
        },
        sourceType: {
            type: String,
        },
        action: {
            type: String,
        },
    },
});

const Content = model('Content', contentSchema);

export default Content;