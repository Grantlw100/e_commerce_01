import Joi from "joi";
import joiSubInputs from "./joiSubInputs.mjs";

export const wishlistValidation = {
    UserWishlistInput: Joi.object({
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        deletedAt: Joi.date(),
        version: Joi.number(),
        status: Joi.string().valid(
            "active",
            "inactive",
            "expired",
            "draft",
            "pending publish date"
        ),
        languages: Joi.array().items(
            Joi.object({
                originalLanguage: Joi.string(),
                translatedLanguage: Joi.string(),
            })
        ),
        name: Joi.string().trim(),
        photoAlbums: Joi.array().items(
            Joi.object({
                name: Joi.string(),
                description: Joi.string(),
                createdAt: Joi.date(),
                updatedAt: Joi.date(),
                photos: Joi.array().items(
                    Joi.object({
                        image: Joi.string(),
                        index: Joi.number(),
                    })
                ),
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
        privacy: Joi.string(),
        subscribers: Joi.array().items(Joi.string()),
        subscriptions: Joi.array().items(Joi.string()),
        subscriptionProgram: Joi.array().items(
            Joi.object({
                subscription: Joi.string(),
                token: Joi.string(),
                points: Joi.number(),
                rewards: Joi.array().items(Joi.object({
                        reward: Joi.string(),
                        threshold: Joi.number(),
                        achieved: Joi.boolean(),
                        index: Joi.number(),
                    })),
                discounts: Joi.number(),
                promoCodes: Joi.array().items(Joi.string()),
                renewalDate: Joi.date(),
                active: Joi.boolean(),
            })
        ),
        loyaltyProgram: Joi.array().items(
            Joi.object({
                subscription: Joi.array().items(Joi.string()),
                users: Joi.array().items(Joi.string()),
                stores: Joi.array().items(Joi.string()),
                wishlists: Joi.array().items(Joi.string()),
            })
        ),
        promoCodes: Joi.array().items(
            Joi.object({
                code: Joi.string(),
                promotion: Joi.string(),
                discount: Joi.number(),
                products: Joi.array().items(Joi.string()),
                stores: Joi.array().items(Joi.string()),
                maxUses: Joi.number(),
                uses: Joi.number(),
            })
        ),
        stores: Joi.array().items(
            Joi.object({
                store: Joi.string(),
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
    }),
};
