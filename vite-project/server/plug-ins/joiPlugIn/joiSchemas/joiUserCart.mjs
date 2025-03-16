import Joi from 'joi';

export const userCartValidation = {
    UserCartInput: Joi.object({
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        abandoned: Joi.boolean(),
        orderedAt: Joi.date(),
        userId: Joi.string(),
        products: Joi.array().items(Joi.string()),
        total: Joi.number()
    }),
}