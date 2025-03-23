import Joi from "joi";
import joiSubInputs from "./joiSubInputs.mjs";

export const productDetailValidation = {
    KeywordInput: Joi.object({
        name: Joi.string().min(3).max(50).required(),
        image: Joi.string(),
        description: Joi.string(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
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
    }),
    SeasonInput: Joi.object({
        name: Joi.string().min(3).max(50).required(),
        startDate: Joi.date(),
        endDate: Joi.date(),
        image: Joi.string(),
        description: Joi.string(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
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
    }),
    PromotionInput: Joi.object({
        name: Joi.string().min(3).max(50).required(),
        discount: Joi.number().required(),
        startDate: Joi.date(),
        endDate: Joi.date(),
        image: Joi.string(),
        description: Joi.string(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        colors: Joi.array().items(
            Joi.object({
                color: Joi.string(),
                index: Joi.number(),
            })
        ),
        promocodes: Joi.array().items(Joi.string()),
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
    }),
    CategoryInput: Joi.object({
        name: Joi.string().min(3).max(50).required(),
        image: Joi.string(),
        description: Joi.string(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
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
    }),
};
