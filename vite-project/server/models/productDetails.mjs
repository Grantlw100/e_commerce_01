import mongoose, { model } from 'mongoose';




//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
 
                    /*  MONGODB PRODUCT DETAIL MODEL'S */
        /* Model creation for the Keyword, Season, Promotion, and Category model within MongoDB & used by GraphQL */
        
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


const { Schema } = mongoose;

// #region Keyword --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    colors: [{
        color: {type: String},
        index: {type: Number},
    }],
});
        // #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// #region Season --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    colors: [{
        color: {type: String},
        index: {type: Number},
    }],
});

        // #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// #region Promotion --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    colors: [{
        color: {type: String},
        index: {type: Number},
    }],
});
    
            // #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// #region Category --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
    subcategories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    colors: [{
        color: {type: String},
        index: {type: Number},
    }],
});

        // #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



        
const Keyword = model('Keyword', keywordSchema);
const Season = model('Season', seasonSchema);
const Promotion = model('Promotion', promotionSchema);
const Category = model('Category', categorySchema);

const productDetails = [Keyword, Season, Promotion, Category];

export default productDetails;