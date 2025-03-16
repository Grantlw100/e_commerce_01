import mongoose, { model } from 'mongoose';


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
 
                    /*  MONGODB NOTIFICATION MODEL */
        /* Model creation for the Notification model within MongoDB & used by GraphQL */
        
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//



const { Schema } = mongoose;

const notificationSchema = new Schema({
    // meta
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
    // content
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
    },
    text: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
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

const Notification = model('Notification', notificationSchema);

export default Notification