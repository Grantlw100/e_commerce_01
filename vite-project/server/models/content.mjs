import mongoose, { model } from 'mongoose';


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
 
                    /*  MONGODB CONTENT MODEL */
        /* Model creation for the Content model within MongoDB & used by GraphQL */
        
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


const { Schema } = mongoose;

const contentSchema = new Schema({

    // metadata
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    type: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    expiredAt: {
        type: Date,
    },
    version: {
        type: Number,
        default: 1,
    },
    status: {
        type: String,
        enum: ['active, inactive, expired, draft, pending publish date'],
    },
    publishAt: {
        type: Date
    },
    // content
    elements: [{
        position: { type: String },
        index: { type: Number },
        text: { 
            type: String,
            minlength: 1,
            maxlength: 10000,
        }
        }],
    images: [{
        image: { type: String },
        index: { type: Number },
    }],
    colors: [{
        color: { type: String },
        index: { type: Number },
    }],
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Content = model('Content', contentSchema);

export default Content;