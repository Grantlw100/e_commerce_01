import Joi from "joi";

export const reviewValidation = {
    ReviewInput: Joi.object({
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        deletedAt: Joi.date(),
        text: Joi.string().min(3).max(4000),
        author: Joi.string(),
        product: Joi.array().items(
            Joi.object({
                product: Joi.string(),
                count: Joi.number(),
                index: Joi.number(),
            })
        ),
        store: Joi.string(),
        rating: Joi.number().min(1).max(5),
        images: Joi.array().items(
            Joi.object({
                image: Joi.string(),
                index: Joi.number(),
            })
        ),
    }),
};
