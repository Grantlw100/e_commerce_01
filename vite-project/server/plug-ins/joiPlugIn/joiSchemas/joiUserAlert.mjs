import Joi from "joi";
import joiSubInputs from "./joiSubInputs.mjs";

export const userAlertValidation = {
    UserAlertInput: Joi.object({
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        publishedAt: Joi.date(),
        expiredAt: Joi.date(),
        version: Joi.number(),
        status: Joi.string(),
        languages: Joi.array().items(
            Joi.object({
                originalLanguage: Joi.string(),
                translatedLanguage: Joi.string(),
            })
        ),
        privacy: Joi.string(),
        type: Joi.string(),
        title: Joi.string().min(3).max(100),
        text: Joi.string().min(3).max(4000),
        images: Joi.array().items(
            Joi.object({
                image: Joi.string(),
                index: Joi.number(),
            })
        ),
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
        category: Joi.array().items(Joi.string()),
        season: Joi.array().items(Joi.string()),
        promotion: Joi.array().items(Joi.string()),
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
