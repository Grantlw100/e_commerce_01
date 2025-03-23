import { Schema, model } from 'mongoose';

// //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//
//                     /*  MONGODB LAYOUT MODEL */
//         /* Model creation for the Layout model within MongoDB & used by GraphQL */
//         /* Layout model is used for the layout of content, pages, elements, components, etc... */
//
// //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

const layoutSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    version: { type: Number, default: 1 },
    permissions: [{ type: String }], // Who can use this layout (store, admin, superadmin, etc.)
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
    name: { type: String, required: true, unique: true }, // e.g., 'Product Page', 'Admin Dashboard'
    description: { type: String }, // e.g., 'Layout for the product page'
    type: { type: String }, // e.g., 'page', 'element', 'component'
    structure: { type: Object }, // JSON structure for the page layout
    components: [{ 
        type:{type: String}, 
        index:{type: Number},
    }], // List of components used in this layout
    elements: [{
        type: {type: String },
        position: {type: String },
        index: {type:Number},
        text: {type: String},
    }], // List of elements used in this layout
    colors: [{
        color: { type: String },
        index: { type: Number },
    }], // e.g., "primary", "secondary", "accent"
    themes: [{ 
        theme: { 
            type: String, 
            default: "default" 
        },
        index: {
            type: Number,
        },
        colors: [{
            color: { type: String },
            index: { type: Number },
        }],
    }], // e.g., "dark", "modern", "classic"
    logos: [
        {
            logo: {
                type: String,
            },
            index: {
                type: Number,
            },
        },
    ], // Store logo URL
    bannerImages: [
        {
            image: {
                type: String,
            },
            index: {
                type: Number,
            },
        },
    ], // Homepage banner
    layouts: [{ 
        layout: {
            type: Schema.Types.ObjectId,
            ref: 'Layout'},
        index: { type: Number } 
    }], // Nested layouts
});

export default model('Layout', layoutSchema);