import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
 
                    /*  MONGODB USER ALERT MODEL */
        /* Model creation for the User Alert model within MongoDB & used by GraphQL */
        
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


const userAlertSchema = new Schema({
    // meta
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    publishAt: {
        type: Date,
        default: Date.now,
    },
    // content
    text: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    type: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
    },
    colors: [{
        color: {type: String},
        index: {type: Number},
    }],
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

export default model('UserAlert', userAlertSchema);
