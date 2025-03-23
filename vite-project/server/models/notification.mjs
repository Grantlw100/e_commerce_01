import mongoose, { model } from 'mongoose';


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
 
                    /*  MONGODB NOTIFICATION MODEL */
        /* Model creation for the Notification model within MongoDB & used by GraphQL */
        /* Notifications are for small and quick messages to users, stores, and admins */

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//



const { Schema } = mongoose;

const notificationSchema = new Schema({
    // meta
    type: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
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
    // content
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
    },
    text: {
        type: String,
        required: true,
    },
    colors: [{
        color: {type: String},
        index: {type: Number},
    }],
    layouts: [{ 
        layout: { type: Schema.Types.ObjectId, ref: 'Layout'},
        index: { type: Number }
     }], // Nested layouts
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

const Notification = model('Notification', notificationSchema);

export default Notification