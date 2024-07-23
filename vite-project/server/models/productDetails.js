const mongoose = require('mongoose');
const { Schema } = mongoose;

const keywordSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
});

const seasonSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
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
    image: {
        type: String,
    },
    description: {
        type: String,
    },
});

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    image: {
        type: String,
    },
   description: {
        type: String,
    },
});

module.exports = {
    Keyword: mongoose.model('Keyword', keywordSchema),
    Season: mongoose.model('Season', seasonSchema),
    Promotion: mongoose.model('Promotion', promotionSchema),
    Category: mongoose.model('Category', categorySchema),
};
