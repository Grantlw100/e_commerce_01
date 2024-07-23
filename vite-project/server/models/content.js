const {mongoose} = require('../db/mongoose');
const {Schema} = mongoose;

const contentSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 10000,
    },
    contentImages: [{
        type: String,
    }],
    createdDate: {
        type: Date,
        default: Date.now,
    },
    modifiedDate: {
        type: Date,
        default: Date.now,
    },
    expirationDate: {
        type: Date,
    },
    expirationStatus: {
        type: Boolean,
        default: false,
    },
    contentType: {
        type: String,
        required: true,
    },
    published: {
        type: Boolean,
        default: false,
    },
    viewed: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
});

module.exports = mongoose.model('Content', contentSchema);