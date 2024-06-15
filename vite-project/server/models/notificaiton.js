const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    notificationText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    notificationDate: {
        type: Date,
        default: Date.now,
    },
    viewed: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Notification', notificationSchema);
