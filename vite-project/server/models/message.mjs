import {model, Schema} from 'mongoose';

// //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//
//                     /*  MONGODB MESSAGE MODEL */
//         /* Model creation for the Message model within MongoDB & used by GraphQL */
//         /* Messages are for long and detailed messages to users, stores, and admins */
//
// //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

const messageSchema = new Schema({
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
    receivership: {
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
    },// Could also be 'Store'
    languages: [{ 
        originalLanguage: {type: String },
        translatedLanguage: {type: String },
    }],
    text: { type: String, required: true },
    images: [{ 
        photo: { type: String },
        index: { type: Number },
    }],
    type: { type: String, enum: ['text', 'image', 'system', 'notification'], default: 'text' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    publishedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
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

export default model('Message', messageSchema);
// //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
