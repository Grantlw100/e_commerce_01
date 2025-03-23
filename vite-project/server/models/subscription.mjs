import { model, Schema } from "mongoose";

const subscriptionSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    version: { type: Number, default: 1 },

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

    name: { type: String, required: true },
    description: { type: String },
    active: { type: Boolean, default: true },
    type: { type: String, enum: ["subscription", "trial", "loyaltyProgram"], default: "subscription" },
    token: { type: Schema.Types.ObjectId, ref: "Token" },

    startDate: { type: Date },
    endDate: { type: Date },
    trialPeriod: { type: Number },

    plan: { type: String },
    price: { type: Number },
    billingCycle: { type: String, enum: ["monthly", "yearly"] },
    status: { type: String, enum: ["active", "expired", "canceled"], default: "active" },

    renewalDate: { type: Date },
    gracePeriod: { type: Number, default: 7 }, // Grace period before cancellation

    // Loyalty Program Enhancements
    pointsPerDollar: { type: Number },
    discountTiers: [{
        minPoints: { type: Number },
        discountPercent: { type: Number },
        discountCode: { type: String },
        expiresAt: { type: Date },
        index: { type: Number },
    }],
    rewards: [{
        reward: [{ type: Schema.Types.ObjectId, ref: "Product" }],
        threshold: { type: Number, default: 100 }, // Points needed for a reward
        achieved: { type: Boolean, default: false },
        index: { type: Number },
    }],

    // Cancellation & Refund Tracking
    cancellation: {
        reason: { type: String, enum: ["user_request", "payment_failure", "store_closed", "other"] },
        refundStatus: { type: String, enum: ["pending", "approved", "denied"], default: "pending" },
    },
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
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
    keywords: [{ type: Schema.Types.ObjectId, ref: "Keyword" }],
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    seasons: [{ type: Schema.Types.ObjectId, ref: "Season" }],
    promotions: [{ type: Schema.Types.ObjectId, ref: "Promotion" }],
    promoCodes: [{ type: Schema.Types.ObjectId, ref: "Token" }],
    policies: [{ type: [String]}],
});

export default model("Subscription", subscriptionSchema);
