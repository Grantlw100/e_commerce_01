import Joi from "joi";
import joiSubInputs from "./joiSubInputs.mjs";

export const notificationValidation = {
    NotificationInput: Joi.object({
        type: Joi.string().min(3).max(50).required(),
        createdAt: Joi.date().required(),
        updatedAt: Joi.date(),
        languages: Joi.array().items(
            Joi.object({
                originalLanguage: Joi.string(),
                translatedLanguage: Joi.string(),
            })
        ),
        title: Joi.string().min(3).max(50).required(),
        text: Joi.string().min(3).max(2000).required(),
        colors: Joi.array().items(
            Joi.object({
                color: Joi.string(),
                index: Joi.number(),
            })
        ),
        layouts: Joi.array().items(
            Joi.object({
                layout: Joi.string(),
                index: Joi.number(),
            })
        ),
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
        keyword: Joi.array().items(Joi.string()),
        season: Joi.array().items(Joi.string()),
        promotion: Joi.array().items(Joi.string()),
        category: Joi.array().items(Joi.string()),
        products: Joi.array().items(
            Joi.object({
                product: Joi.string(),
                count: Joi.number(),
                index: Joi.number(),
            })
        ),
        stores: Joi.array().items(
            Joi.object({
                store: Joi.string(),
                index: Joi.number(),
            })
        ),
    }),
};
