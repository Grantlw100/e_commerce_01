import mongoose , { model } from 'mongoose';

// manage user sessions and refresh tokens for the application
const { Schema } = mongoose;
// token 4-6 digit pin stored in the token itself which will be used to verify the user's identity
// tokens should not be stored in the database, but if they are, they should be encrypted
// tokens should be updated regularly and invalidated when they are no longer needed
    // token will consist of userId, i.p. address, expiry, 4 - 6 digit pin

const TokenSchema = new Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
    },
    // pass not a robot check. token for guests and real users
    role: {
        type: String,
        enum: ['guest', 'user', 'admin', 'superadmin'],
        default: 'guest'
    },
    pin: {
        count: { type: Number, default: 8},
        pin: { type: String },
        date: { type: Date }
    },
    token: {
        type: String,
    },
    tokenType: {
        type: String,
        enum: ['guest', 'user', 'admin', 'superadmin', 'store', 'superStore', 'supremeOverLord'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
    },
    valid: {
        type: Boolean,
        default: true
    },
    revokedAt: {
        type: Date,
    },
    metadata: {
        ip: { type: String },
        userAgent: { type: String},
        deviceType: { type: String },
        deviceId: { type: String }
    },
    location: {
        lat: { type: Number },
        long: { type: Number },
        city: { type: String },
        country: { type: String }
    },
    // incorporate token blacklisting via version control ( if the version is 2, the token is 
    // invalid), JTI blacklisting (adding a specific users tokens jti to a blacklist), and 
    // location blacklisting
});

export default mongoose.model('Token', TokenSchema);




// save tokens for 
    // token revocation
        // invalidate token befor eit expiers 
    // audit trails 
        // you need audit trails 
    // refresh tokens are used 
        // refresh tokens, long lived, should alwyas be stored securely in a database to allow revocation and tracking 
    // session persistence
        // if an app uses sessions and you want to allow users to resume sessions across devices after browser restarts 
    // token metadata is required 
        // if token creatin time, ecppiration, or associated IP addresses 
// do not save tokens for 

    // stateless tokens 

    // short lived tokens 

    // auth flow does not require revocation 


// best practives for storing tokens 
    // encrypt tokens 
        // use encryption tokens to store refresh tokens or sensitive session data 
    // hash tokens for comparison 
        // instead of saving the raw token, store a hashed version for validation. prevents raw token exposure in case of a database breach 
    // use TTL or Expiry Fields
        // set expiration timestamps on database entries to automatically purge expired tokens 
    // seperate table for tokens 
        // user logs out, remove or mark their token as invalid in the database
    // invalidate tokens on logout 