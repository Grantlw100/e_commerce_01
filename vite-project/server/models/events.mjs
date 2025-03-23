import mongoose, {Schema } from 'mongoose';

const eventSchema = new Schema({
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
    publishedAt: {
        type: Date,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    languages: [{
        originalLanguage: {
            type: String,
            default: 'en',
        },
        translatedLanguage: {
            type: String,
            default: 'en',
        },
    }],
    // content
    ownership: {
            ownerType: {
                type: String,
                enum: ["user", "store", "admin", "superadmin", "wishlist"],
                default: "store",
            },
            ownerId: {
                type: Schema.Types.ObjectId,
                refPath: "ownership.ownerType", // Dynamic reference
                required: true,
            },
        },
    status: {
        type: String,
        enum: ['active, inactive, expired, draft, pending publish date'],
    },
    actions: [{
        action: {type: String},
        trigger: {type: String},
        responseType: {type: String},
        response: {type:String },
        index: {type: Number},
    }],
    ownedMessages: [
        {
            alerts: [{
                alert: {
                    type: Schema.Types.ObjectId,
                    ref: "Alert",
                },
                index: {type: Number},
            }],            
            contents: [{
                content: {
                    type: Schema.Types.ObjectId,
                    ref: "Content",
                },
                index: {type: Number},
            }],
            notifications: [{
                notification: {
                    type: Schema.Types.ObjectId,
                    ref: "Notification",
                },
                index: {type: Number},
            }],
            messages: [{
                message: {
                    type: Schema.Types.ObjectId,
                    ref: "Message",
                },
                index: {type: Number},
            }],
        },
    ],
});

const Event = mongoose.model('Event', eventSchema);

export default Event;