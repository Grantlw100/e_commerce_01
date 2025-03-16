import Joi from 'joi';

export const wishlistValidation = {
    UserWishlistInput: Joi.object({
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        deletedAt: Joi.date(),
        version: Joi.number(),
        name: Joi.string().trim(),
        image: Joi.string(),
        ownerId: Joi.string(),
        products: Joi.array().items(Joi.string()),
        private: Joi.boolean(),
        subscribers: Joi.array().items(Joi.string()),
        colors: Joi.array().items(Joi.object({
            color: Joi.string(),
            index: Joi.number(),
        })),
    }),
}