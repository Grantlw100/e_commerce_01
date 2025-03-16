import Joi from 'joi';

export const reviewValidation = {
    ReviewInput: Joi.object({
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        deletedAt: Joi.date(),
        text: Joi.string().min(3).max(4000),
        author: Joi.string(),
        product: Joi.string(),
        rating: Joi.number().min(1).max(5),
        images: Joi.array().items(Joi.string())
    }),
}