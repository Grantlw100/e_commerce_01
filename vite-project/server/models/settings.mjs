import { model, Schema } from 'mongoose';

const settingsSchema = new Schema({
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
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    darkMode: { type: Boolean, default: false },
    notifications: { type: Object },
    language: { type: String, default: 'en' },
    currency: { type: String, default: 'USD' },
    preferences: { type: Object }, // Store JSON data for additional custom settings
});

export default model('Settings', settingsSchema);