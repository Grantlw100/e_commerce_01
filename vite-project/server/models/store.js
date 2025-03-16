import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;
import pkg from 'bcryptjs';
const { hash, compare } = pkg;
import { v4 as uuidv4 } from 'uuid';


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
        default: 'store',
        enum: ['store', 'superStore', 'ambassador', 'superemeOverlod','scout','elite', 'admin','grunt'],
    },

        // #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//



// #region store auth -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    // check to verify a store is active and can access the site
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
            storeAgent: { type: String },
        },
        location: {
            lat: { type:  Number,},
            long: { type:  Number,},
            country: { type:  String,},
            city: { type:  String,},
        },
    }],
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
            unique: true 
        },  // Unique identifier for store state
        createdAt: { 
            type: Date, 
            default: Date.now 
        },         // Timestamp for creation of state
        updatedAt: { 
            type: Date, 
            default: Date.now 
        },         // Last updated timestamp for state changes
      },
      users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
      
    // #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


    
// #region store info ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    storename: {
        type: String,
        unique: true,
        trim: true,
    },
    storeDescription: {
        type: String,
        trim: true,
    },
    storeType: {
        type: String,
        trim: true,
    },
    storeCategory: {
        type: String,
        trim: true,
    },
    storeSubCategory: {
        type: String,
        trim: true,
    },
    storeLocation: {
        type: String,
        trim: true,
    },
    photoAlbums: [{
        albumName: {
            type: String,
            trim: true,
        },
        photos: [{
        type: String,
        default: 'https://via.placeholder.com/150',
        }],
        albumId: {
            type: Schema.Types.ObjectId,
            ref: 'PhotoAlbum',
        },
    }],
    recommendationId: { 
        type: Schema.Types.ObjectId,
        ref: 'Recommendation',
     },
    currency: { type: String },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    phone: [{
        type: String,
        trim: true,
    }],
    profilePicture: {
        type: String,
        default: 'https://via.placeholder.com/150',
    },
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
    subscriptions: [{
        type: { 
            type: String,
            enum: ['storeAlerts', 'Content', 'store'],
        },
        status: { type: String },
        subscriptionId: { type: String },
    }],
    subscribers: [{
        subscriberId: { 
            type: Schema.Types.ObjectId,
            ref: 'store',
        }
    }],
    password: {
        type: String,
        required: true,
        minlength: 8,
    },

    // #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//



// #region store lists --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
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



// #region store reviews -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
    }],
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
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],
    productCount: {
        type: Number,
        default: 0, 
    },
    // #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//



// #region store content -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    content: [{
        type: Schema.Types.ObjectId,
        ref: 'Content',
    }],
    contentCount: {
        type: Number,
        default: 0,
    },
    // #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//



// #region store notifications ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    notifications: [{
        type: Schema.Types.ObjectId,
        ref: 'Notification',
    }],
    notificationCount: {
        type: Number,
        default: 0,
    },
    // #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


// #region store alerts  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    
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
        storeAlert: {
            type: Schema.Types.ObjectId,
            ref: 'storeAlert',
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
        storeContent: {
            type: Schema.Types.ObjectId,
            ref: 'storeContent',
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
    interets: [{
        type: String,
    }],

    // #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

});



// #region store methods ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
storeSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await hash(this.password, saltRounds);
    }
    next();
});

storeSchema.methods.isCorrectPassword = async function (password) {
    return compare(password, this.password);
};

// #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

const store = model('store', storeSchema);

export default store;




