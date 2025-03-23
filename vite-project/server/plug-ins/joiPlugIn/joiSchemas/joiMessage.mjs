import Joi from "joi";
import joiSubInputs from "./joiSubInputs.mjs";

export const messageValidation = Joi.object({
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
    receivership: Joi.object({
        ownerType: Joi.string().valid(
            "user",
            "store",
            "admin",
            "superadmin",
            "subscription"
        ),
        ownerId: Joi.string(),
    }),
    languages: Joi.array().items(
        Joi.object({
            originalLanguage: Joi.string(),
            translatedLanguage: Joi.string(),
        })
    ),
    text: Joi.string().required(),
    images: Joi.array().items(
        Joi.object({
            image: Joi.string(),
            index: Joi.number(),
        })
    ),
    type: Joi.string()
        .valid("text", "image", "system", "notification")
        .default("text"),
    createdAt: Joi.date().default(Date.now),
    updatedAt: Joi.date().default(Date.now),
    publishedAt: Joi.date().default(Date.now),
    deletedAt: Joi.date().default(null),
}).id("Message");

