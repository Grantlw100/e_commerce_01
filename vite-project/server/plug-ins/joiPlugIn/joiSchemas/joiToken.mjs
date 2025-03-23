// import Joi from '../../../node_modules/joi/lib/index.js';
import Joi from "joi";
import joiSubInputs from "./joiSubInputs.mjs";

export const tokenValidation = {
    tokenInput: Joi.object({
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
        role: Joi.string(),
        pin: Joi.object({
            count: Joi.number(),
            pin: Joi.string(),
            updatedAt: Joi.date(),
        }),
        token: Joi.string(),
        type: Joi.string(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        expiredAt: Joi.date(),
        valid: Joi.boolean(),
        revokedAt: Joi.date(),
        metadata: Joi.object({
            ip: Joi.string(),
            userAgent: Joi.string(),
            deviceType: Joi.string(),
            deviceId: Joi.string(),
        }),
        location: Joi.object({
            lat: Joi.number(),
            long: Joi.number(),
            city: Joi.string(),
            country: Joi.string(),
        }),
    }),
};
