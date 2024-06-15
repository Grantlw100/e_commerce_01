const mongoose = require('mongoose');
const { Schema } = mongoose;

const keywordSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
});

const seasonSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
});

const promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    discount: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
});

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
});

module.exports = {
    Keyword: mongoose.model('Keyword', keywordSchema),
    Season: mongoose.model('Season', seasonSchema),
    Promotion: mongoose.model('Promotion', promotionSchema),
    Category: mongoose.model('Category', categorySchema),
};
