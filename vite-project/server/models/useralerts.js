const mongoose = require('mongoose');
const { Schema } = mongoose;

const userAlertSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    alertText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    alertDate: {
        type: Date,
        default: Date.now,
    },
    viewed: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('UserAlert', userAlertSchema);
