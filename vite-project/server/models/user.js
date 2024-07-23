const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Order = require('./order');
const { Product, UserCart, Notification, UserAlert } = require('.');

const userSchema = new Schema({
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
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    phone: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    address: {
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
        zip: {
            type: String,
            required: true,
            trim: true,
        },
    },
    viewedLanding:{
        type: Boolean,
        default: false,
    },
    admin: {
        type: Boolean,
        default: false,
    },
    lovedProducts: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],
    recentlyViewed: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order',
    }],
    notifications: [{
        type: Schema.Types.ObjectId,
        ref: 'Notification',
    }],
    userAlerts: [{
        type: Schema.Types.ObjectId,
        ref: 'UserAlert',
    }],
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'UserCart',
    },
    darkMode: {
        type: Boolean,
        default: false,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    modifiedDate: {
        type: Date,
        default: Date.now,
    },
    profilePicture: {
        type: String,
        default: 'https://via.placeholder.com/150',
    },
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
