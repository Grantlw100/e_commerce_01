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
    updateedAt: {
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
        enum: ['guest', 'user', 'admin', 'superAdmin','ambassador', 'superemeOverlod','scout','elite','grunt','arbiter'],
    },
    storeRoles : [(
        {
            storeId: { type: Schema.Types.ObjectId, ref: 'Store' },
            role: { type: String },
            isAuthorized: { type: Boolean },
            permissionsId: { type: String },
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
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
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
    phone: [{
        type: String,
        trim: true,
    }],
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
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
    subscriptions: [{
        type: { 
            type: String,
            enum: ['userAlerts', 'Content', 'User'],
        },
        status: { type: String },
        subscriptionId: { type: String },
    }],
    subscribers: [{
        subscriberId: { 
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
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
        userAlert: {
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
        userContent: {
            type: Schema.Types.ObjectId,
            ref: 'UserContent',
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




