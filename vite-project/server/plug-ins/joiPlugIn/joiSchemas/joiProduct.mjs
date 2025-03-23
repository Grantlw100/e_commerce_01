import Joi from "joi";
import joiSubInputs from "./joiSubInputs.mjs";

export const productValidation = {
    ProductInput: Joi.object({
        name: Joi.string().min(3).max(50).required(),
        quickDescription: Joi.string().min(3).max(500).required(),
        description: Joi.string().min(3).max(2000).required(),
        descriptionImages: Joi.array().items(
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
        category: Joi.array().items(Joi.string()),
        season: Joi.array().items(Joi.string()),
        promotion: Joi.array().items(Joi.string()),
        keyword: Joi.array().items(Joi.string()),
        featured: Joi.boolean(),
        recommendationId: Joi.string().min(3).max(50).required(),
        reviews: Joi.array().items(Joi.string()),
        rating: Joi.number().min(1).max(5),
        makeYourOwn: Joi.boolean(),
        price: Joi.number().required(),
        discount: Joi.number(),
        taxCategory: Joi.string().min(3).max(50).required(),
        includes: Joi.array().items(Joi.string()),
        bundle: Joi.boolean(),
        bundled: Joi.boolean(),
        images: Joi.array().items(
            Joi.object({
                image: Joi.string(),
                index: Joi.number(),
            })
        ),
        quantity: Joi.number().required(),
        weight: Joi.number().required(),
        dimensions: Joi.object({
            length: Joi.number(),
            width: Joi.number(),
            height: Joi.number(),
            size: Joi.string(),
        }),
        inventory: Joi.object({
            stock: Joi.number(),
            reserverd: Joi.number(),
            sold: Joi.number(),
            restockThreshold: Joi.number(),
            lastRestocked: Joi.date(),
            restockActive: Joi.boolean(),
        }),
        userInteraction: Joi.object({
            lovedCount: Joi.number(),
            cartCount: Joi.number(),
            wishlistCount: Joi.number(),
            viewedCount: Joi.number(),
        }),
        createdAt: Joi.date().required(),
        updatedAt: Joi.date(),
        version: Joi.number().required(),
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
