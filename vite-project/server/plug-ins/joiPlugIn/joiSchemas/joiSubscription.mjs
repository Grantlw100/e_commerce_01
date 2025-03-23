import Joi from "joi";
import joiSubInputs from "./joiSubInputs.mjs";

export const subscriptionValidation = {
    SubscriptionInput: Joi.object({
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        version: Joi.number(),
        ownership: Joi.object({
            ownerType: Joi.string().valid(
                "user",
                "store",
                "admin",
                "superadmin",
                "subscription"
            ),
            ownerId: Joi.string(),
        }),
        name: Joi.string(),
        description: Joi.string(),
        active: Joi.boolean(),
        type: Joi.string(),
        token: Joi.string(),
        startDate: Joi.date(),
        endDate: Joi.date(),
        trialPeriod: Joi.boolean(),
        plan: Joi.string(),
        price: Joi.number(),
        billingCycle: Joi.string(),
        status: Joi.string(),
        renewalDate: Joi.date(),
        gracePeriod: Joi.number(),
        pointsPerDollar: Joi.number(),
        discountTiers: Joi.array().items(
            Joi.object({
                minPoints: Joi.number(),
                discountPercent: Joi.number(),
                discountCode: Joi.string(),
                expiresAt: Joi.date(),
                index: Joi.number(),
            })
        ),
        rewards: Joi.array().items(
            Joi.object({
                reward: Joi.string(),
                threshold: Joi.number(),
                achieved: Joi.boolean(),
                index: Joi.number(),
            })
        ),
        cancellation: Joi.object({
            reason: Joi.string(),
            refundStatus: Joi.string(),
        }),
        contents: Joi.array().items(Joi.string()),
        notifications: Joi.array().items(Joi.string()),
        alerts: Joi.array().items(Joi.string()),
        messages: Joi.array().items(Joi.string()),
        keywords: Joi.array().items(Joi.string()),
        categories: Joi.array().items(Joi.string()),
        seasons: Joi.array().items(Joi.string()),
        promotions: Joi.array().items(Joi.string()),
        promoCodes: Joi.array().items(Joi.string()),
        policies: Joi.array().items(Joi.string()),
    }),
};
