import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;
import pkg from 'bcryptjs';
const { hash, compare } = pkg;
import { v4 as uuidv4 } from 'uuid';


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
 
                    /*  MONGODB USER MODEL */
        /* Model creation for the User model within MongoDB & used by GraphQL */
        
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


const userSchema = new Schema({
// #region user meta --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    // simple check to verify a user can utilize admin pages and functions
    isAdmin: {
        type: Boolean,
        default: false,
    },
    // check to verify a user can access specific functions and pages
    // deleting products, pulling user information
    role: {
        type: String,
        default: 'user',
        enum: ['guest', 'user', 'admin', 'superAdmin','overlord'],
    },
    storeRoles : [(
        {
            storeId: { type: Schema.Types.ObjectId, ref: 'Store' },
            role: { type: String },
            isAuthorized: { type: Boolean },
            permissions: { type: [String] },
            token: { type: String },
        }
    )],

        // #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//



// #region user auth -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    // check to verify a user is active and can access the site
    token: [{
            type: Schema.Types.ObjectId,
            ref: 'Token',
    }],
    // for OAuth and other third party providers
    providers: [{
        provider: { type: String },
        providerId: { type: String },
        providerToken: { type: String }, // encrypted using hashing properties 
        tokenExpiration: { type: Date },
    }],
    session: [{
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
            userAgent: { type: String },
        },
        location: {
            lat: { type:  Number,},
            long: { type:  Number,},
            country: { type:  String,},
            city: { type:  String,},
        },
    }],
      // state id is used for changes to the user state, such as 
      // cart contents, filters, promotions, and UI preferences.
      // should only reset or change when:
        // 1. User resets their profile state 
        // 2. Admin or system changes that would require the reset of all user states 
        // 3. state data structur changes  
    state: {
        id: { 
            type: String, 
            default: uuidv4, 
            unique: true 
        },  // Unique identifier for user state
        createdAt: { 
            type: Date, 
            default: Date.now 
        },         // Timestamp for creation of state
        updatedAt: { 
            type: Date, 
            default: Date.now 
        },         // Last updated timestamp for state changes
      },

    // #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


    
// #region user info ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    username: {
        type: String,
        unique: true,
        trim: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    recommendationId: { 
        type: Schema.Types.ObjectId,
        ref: 'Recommendation',
     },
    currency: { type: String },
    emailBook: [{
        type: {
            type: String,
            enum: ['personal', 'business', 'store', 'support', 'admin','main'],
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid email address'],
        }
    }],
    phoneBook: [{
        phoneType: {
            type: String,
            enum: ['personal', 'business', 'store', 'support', 'admin','main'],
        },
       phone: { 
        type: String,
        trim: true,
        }
    }],
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
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
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
    logos: [{ 
        logos: {
            type: String
        },
        index: {
            type: Number,
        },
    }], // Store logo URL
    bannerImages: [{
        image:{
             type: String 
            },
        index:{
             type: Number
            }
    }], // Homepage banner
    profilePicture: [{
        image: {
            type: String,
            default: 'https://via.placeholder.com/150',
        },
        index: {
            type: Number,
        },
    }],
    layouts: [{ 
        layout: { type: Schema.Types.ObjectId, ref: 'Layout'},
        index: { type: Number }
     }], // Nested layouts
    addressBook: [{
        addressIndex: Number,
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
    }],
    demographics: {
        age:{ type: Number },
        birthdate: { type: Date },
        language: { type: String },
        race: { type: String },
    },
    darkMode: {
        type: Boolean,
        default: false,
    },
    
    colors: [{
        color: {
            type: String,
        },
        index: {
            type: Number,
        },
    }],
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
    // for the users subcriptions
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
    // for the entities subscribed to the user
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
    // #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//



// #region user lists --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    lovedProducts: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],
    // add wishlist functionality 
    wishlists: [{
        type: Schema.Types.ObjectId,
        ref: 'Wishlist',
    }],
    recentlyViewed: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],
    recommendations: [{
        type: Schema.Types.ObjectId,
        ref: 'Recommendation',
    }],
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order',
    }],
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart',
    },

    // #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//



// #region user alerts  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event',
    }],
    notifications: [{
        notification: {
            type: Schema.Types.ObjectId,
            ref: 'Notification',
        },
        read: {
            type: Boolean,
            default: false,
        },
    }],
    alerts: [{
        alert: {
            type: Schema.Types.ObjectId,
            ref: 'UserAlert',
        },
        read: {
            type: Boolean,
            default: false,
        },
        subscribed: {
            type: Boolean,
            default: false,
        },
    }],
    contents: [{
        content: {
            type: Schema.Types.ObjectId,
            ref: 'Content',
        },
        read: {
            type: Boolean,
            default: false,
        },
        subscribed: {
            type: Boolean,
            default: false,
        },
    }],
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
    interets: [{
        keyword: [{
            type: Schema.Types.ObjectId,
            ref: 'Keyword',
        }],
        category: [{
            type: Schema.Types.ObjectId,
            ref: 'Category',
        }],
        season: [{
            type: Schema.Types.ObjectId,
            ref: 'Season',
        }],
        promotion: [{
            type: Schema.Types.ObjectId,
            ref: 'Promotion',
        }],
        store: [{
            type: Schema.Types.ObjectId,
            ref: 'Store',
        }],
    }],

    // #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

});



// #region user methods ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return compare(password, this.password);
};

// #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

const User = model('User', userSchema);

export default User;




