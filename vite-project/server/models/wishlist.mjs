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
    status: { type: String, enum: ['active', 'inactive', 'expired', 'draft', 'pending publish date'] },
    languages: [{
        originalLanguage: { type: String, default: 'en' },
        translatedLanguage: { type: String, default: 'en' },
    }],
    name: {
        type: String,
        trim: true,
    },
    photoAlbums: [
        {
            name: {
                type: String,
                trim: true,
            },
            description: {
                type: String,
                trim: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
            updatedAt: {
                type: Date,
                default: Date.now,
            },
            photos: [
                {
                    photo: {
                        type: String,
                        default: "https://via.placeholder.com/150",
                    },
                    index: { type: Number },
                },
            ],
            index: { type: Number },
        },
    ],
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
    //content
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
    privacy: {
        type: String,
        enum: ['public', 'private', 'protected'],
        default: 'public',
    },
    subscribers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'||'Store',
    }],
    subscriptions: [{
        type: Schema.Types.ObjectId,
        ref: 'User'||'Store',
    }],
    subscriptionProgram: [{
        subscription: {
            type: Schema.Types.ObjectId,    
            ref: 'Subscription',
        },
        token: {
            type: Schema.Types.ObjectId,
            ref: 'Token',
        },
        points: {
            type: Number,
        },
        rewards: [{
            type: Schema.Types.ObjectId,
            ref: 'Products',
        }],
        discounts: {
            type: Number,
        },
        promoCodes: [{
            type: Schema.Types.ObjectId,
            ref: 'Token',
        }],
        renewalDate: {
            type: Date,
        },
        active: {
            type: Boolean,
            default: false,
        },
    }],
    loyaltyProgram: [{
        subscription: {
            type: Schema.Types.ObjectId,    
            ref: 'Subscription',
        },
        users: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
        stores: [{
            type: Schema.Types.ObjectId,
            ref: 'Store',
        }],
        wishlists: [{
            type: Schema.Types.ObjectId,
            ref: 'Wishlist',
        }],
    }],
    promoCode: [{
        code: {
            type: Schema.Types.ObjectId,
            ref: 'Token',
        },
        promotion: {
            type: Schema.Types.ObjectId,
            ref: 'Promotion',
        },
        discount: {
            type: Number,
        },
        products: [{
            type: Schema.Types.ObjectId,
            ref: 'Product',
        }],
        stores: [{
            type: Schema.Types.ObjectId,
            ref: 'Store',
        }],
        maxUses: {
            type: Number,
        },
        uses: {
            type: Number,
        },
    }],
    colors: [{
        color: {type: String},
        index: {type: Number},
    }],
    layouts: [{ 
        layout: { type: Schema.Types.ObjectId, ref: 'Layout'},
        index: { type: Number }
     }], // Nested layouts
    
});

export default model('Wishlist', wishlistSchema);