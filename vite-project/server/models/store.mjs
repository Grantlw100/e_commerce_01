import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import pkg from "bcryptjs";
const { hash, compare } = pkg;
import { v4 as uuidv4 } from "uuid";

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

/*  MONGODB store MODEL */
/* Model creation for the store model within MongoDB & used by GraphQL */

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

const storeSchema = new Schema({
    // #region store meta --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updateedAt: {
        type: Date,
        default: Date.now,
    },
    // simple check to verify a store can utilize admin pages and functions
    isSuperStore: {
        type: Boolean,
        default: false,
    },
    // check to verify a store can access specific functions and pages
    // deleting products, pulling store information
    role: {
        type: String,
        default: "store",
        enum: ["store", "superStore"],
    },
    // check to verify a store is active and can access the site
    active: {
        type: Boolean,
        default: true,
    },
    analytics: {
        totalRevenue: { type: Number, default: 0 }, // Total earnings from store sales
        monthlyRevenue: { type: Number, default: 0 }, // Revenue for the current month
        totalOrders: { type: Number, default: 0 }, // Number of total orders placed
        conversionRate: { type: Number, default: 0 }, // Percentage of visitors who make a purchase
        visitorCount: { type: Number, default: 0 }, // Total number of unique visitors
        averageOrderValue: { type: Number, default: 0 }, // Avg. amount spent per order
        totalProducts: { type: Number, default: 0 }, // Number of products in store
        totalCustomers: { type: Number, default: 0 }, // Number of unique customers
        totalSubscribers: { type: Number, default: 0 }, // Number of newsletter subscribers 
    },
    visibility: {
        isPublic: { type: Boolean, default: true }, // Public or private store
        featured: { type: Boolean, default: false }, // Show as featured store
        seoKeywords: [{ type: String }], // Keywords to improve searchability
        seoDescription: { type: String }, // Short description for search engines
    },

    // #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    // #region store auth -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    // check to verify a store is active and can access the site
    token: [
        {
            type: Schema.Types.ObjectId,
            ref: "Token",
        },
    ],
    // for OAuth and other third party providers
    providers: [
        {
            provider: { type: String },
            providerId: { type: String },
            providerToken: { type: String }, // encrypted using hashing properties
            tokenExpiration: { type: Date },
        },
    ],
    session: [
        {
            // possibly use token as sessionId
            id: {
                type: String,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
            updatedAt: {
                type: Date,
                default: Date.now,
            },
            destroyAt: {
                type: Date,
            },
            timeout: {
                type: Date,
                default: Date.now,
            },
            duration: {
                type: Number,
            },
            lastVisitedPage: {
                type: String,
            },
            metadata: {
                deviceType: { type: String },
                deviceId: { type: String },
                ip: { type: String },
                storeAgent: { type: String },
            },
            location: {
                lat: { type: Number },
                long: { type: Number },
                country: { type: String },
                city: { type: String },
            },
        },
    ],
    // state id is used for changes to the store state, such as
    // cart contents, filters, promotions, and UI preferences.
    // should only reset or change when:
    // 1. store resets their profile state
    // 2. Admin or system changes that would require the reset of all store states
    // 3. state data structur changes
    state: {
        id: {
            type: String,
            default: uuidv4,
            unique: true,
        }, // Unique identifier for store state
        createdAt: {
            type: Date,
            default: Date.now,
        }, // Timestamp for creation of state
        updatedAt: {
            type: Date,
            default: Date.now,
        }, // Last updated timestamp for state changes
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    admins: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    owners: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    permissions: {
        // Default roles and their permissions
        defaultRoles: {
            admin: {
                type: [String],
                default: ["manage_products", "manage_orders", "view_users"],
            },
            superAdmin: {
                type: [String],
                default: ["manage_admins", "delete_store", "edit_store"],
            },
            user: {
                type: [String],
                default: ["view_store", "view_products", "view_orders"],
            },
            guest: { type: [String], default: ["view_store", "view_products"] },
            store: {
                type: [String],
                default: ["manage_products", "edit_store", "view_orders"],
            },
            superStore: {
                type: [String],
                default: [
                    "manage_products",
                    "edit_store",
                    "view_orders",
                    "manage_admins",
                ],
            },
        },
        // Store-specific role modifications
        customRoles: [
            {
                name: { type: String }, // Custom Role Name
                permissions: [{ type: String }], // Actions this role can perform
            },
        ],
        // Custom overrides per user
        userRoles: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                permissions: [{ type: String }], // ["manage_products", "edit_orders"]
            },
        ],
    },
    // #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    // #region store info ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    name: {
        type: String,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    type: {
        type: String,
        trim: true,
    },
    category: [
        {
            type: Schema.Types.ObjectId,
            ref: "Category",
            trim: true,
        },
    ],
    subCategory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Category",
            trim: true,
        },
    ],
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
    recommendationId: {
        type: Schema.Types.ObjectId,
        ref: "Recommendation",
    },
    currency: { type: String },
    emailBook: [
        {
            type: {
                type: String,
                enum: [
                    "personal",
                    "business",
                    "store",
                    "support",
                    "admin",
                    "main",
                ],
            },
            email: {
                type: String,
                required: true,
                unique: true,
                match: [/.+@.+\..+/, "Please enter a valid email address"],
            },
        },
    ],
    device: [{
            type: {
                type: String
            },
            name: {
                type: String
            },
            id: {
                type: String,
                default: uuidv4,
            },
            isAuthorized: {
                type: Boolean,
                default: false,
            },
        }],
    phoneBook: [
        {
            type: {
                type: String,
                enum: [
                    "personal",
                    "business",
                    "store",
                    "support",
                    "admin",
                    "main",
                ],
            },
            phone: {
                type: String,
                trim: true,
            },
        },
    ],
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
    profilePicture: [
        {
            image: {
                type: String,
                default: "https://via.placeholder.com/150",
            },
            index: {
                type: Number,
            },
        },
    ],
    layouts: [{ 
        layout: { type: Schema.Types.ObjectId, ref: 'Layout'},
        index: { type: Number }
     }], // Nested layouts
    addressBook: [
        {
            addressIndex: {
                type: Number,
                default: 0,
            },
            name: {
                type: String,
                trim: true,
            },
            address1: {
                type: String,
                required: true,
                trim: true,
            },
            address2: {
                type: String,
                trim: true,
            },
            city: {
                type: String,
                required: true,
                trim: true,
            },
            state: {
                type: String,
                required: true,
                trim: true,
            },
            country: {
                type: String,
                required: true,
                trim: true,
            },
            zip: {
                type: String,
                required: true,
                trim: true,
            },
        },
    ],
    darkMode: {
        type: Boolean,
        default: false,
    },
    colors: [
        {
            color: {
                type: String,
            },
            index: {
                type: Number,
            },
        },
    ],
    subscriptions: [
        {
            type: {
                type: String,
                enum: ["store", "user", "content",'wishlist'],
            },
            id: {
                type: Schema.Types.ObjectId,
                ref: "User" || "store" || "content",
            },
            index: {
                type: Number,
            },
        },
    ],
    subscribers: [
        {
            id: {
                type: Schema.Types.ObjectId,
                ref: "store"|| "user",
            },
            type: {
                type: String,
                enum: ["store", "user", "content",'wishlist'],
            },
            index: {
                type: Number,
            },
        },
    ],
    password: {
        type: String,
        required: true,
        minlength: 8,
    },

    // #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    // #region store lists --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    lovedProducts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    // add wishlist functionality
    wishlists: [
        {
            type: Schema.Types.ObjectId,
            ref: "Wishlist",
        },
    ],
    recentlyViewed: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    recommendations: [
        {
            type: Schema.Types.ObjectId,
            ref: "Recommendation",
        },
    ],
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order",
        },
    ],
    cart: {
        type: Schema.Types.ObjectId,
        ref: "Cart",
    },

    // #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    // #region store reviews -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    reviewCount: {
        type: Number,
        default: 0,
    },
    reviewRating: {
        type: Number,
        default: 0,
    },
    // #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    // #region store products ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
            },
            count: {
                type: Number,
                default: 1,
            },
            index: {
                type: Number,
            },
        },
    ],

    // #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    // #region store alerts  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event',
    }],
    notifications: [
        {
            notification: {
                type: Schema.Types.ObjectId,
                ref: "Notification",
            },
            read: {
                type: Boolean,
                default: false,
            },
        },
    ],
    alerts: [
        {
            alert: {
                type: Schema.Types.ObjectId,
                ref: "userAlert",
            },
            read: {
                type: Boolean,
                default: false,
            },
            subscribed: {
                type: Boolean,
                default: false,
            },
        },
    ],
    contents: [
        {
            content: {
                type: Schema.Types.ObjectId,
                ref: "Content",
            },
            read: {
                type: Boolean,
                default: false,
            },
            subscribed: {
                type: Boolean,
                default: false,
            },
        },
    ],
    conversations: [
        {
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
            messages: [{
                message: {
                    type: Schema.Types.ObjectId,
                    ref: "Message",
                },
                read: {
                    type: Boolean,
                    default: false,
                },
            }],
        },
    ],
    ownedMessages: [
            {
                alerts: [{
                    alert: {
                        type: Schema.Types.ObjectId,
                        ref: "Alert",
                    },
                    index: {type: Number},
                }],            
                contents: [{
                    content: {
                        type: Schema.Types.ObjectId,
                        ref: "Content",
                    },
                    index: {type: Number},
                }],
                notifications: [{
                    notification: {
                        type: Schema.Types.ObjectId,
                        ref: "Notification",
                    },
                    index: {type: Number},
                }],
                messages: [{
                    message: {
                        type: Schema.Types.ObjectId,
                        ref: "Message",
                    },
                    index: {type: Number},
                }],
            },
        ],
    interets: [
        {
            keyword: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Keyword",
                },
            ],
            category: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Category",
                },
            ],
            season: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Season",
                },
            ],
            promotion: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Promotion",
                },
            ],
            store: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Store",
                },
            ],
        },
    ],

    // #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    // #region store orders -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order",
        },
    ],
    // #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    // #region store shipping ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    shipping: {
        methods: [
            {
                type: String,
                enum: ["Standard", "Express", "Overnight", "In-Store Pickup"],
            },
        ],
        estimatedDeliveryTime: {
            type: String,
        }, // "3-5 business days"
        returnPolicy: {
            type: String,
        }, // Store's return/refund policy
        shippingPolicy: {
            type: String,
        }, // Store's shipping policy
        addons: [
            {
                type: String,
            },
        ], // Additional shipping options
    },
    // #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    // #region store loyalty ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    
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
});

// #region store methods ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
storeSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
        const saltRounds = 10;
        this.password = await hash(this.password, saltRounds);
    }
    next();
});

storeSchema.methods.isCorrectPassword = async function (password) {
    return compare(password, this.password);
};

// #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

const store = model("store", storeSchema);

export default store;
