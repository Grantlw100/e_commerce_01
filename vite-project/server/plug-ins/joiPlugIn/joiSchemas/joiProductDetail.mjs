import Joi from 'joi';

export const productDetailValidation = {
    KeywordInput : Joi.object({
        name: Joi.string().min(3).max(50).required(),
        image: Joi.string(),
        description: Joi.string(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        colors: Joi.array().items(Joi.object({
            color: Joi.string(),
            index: Joi.number(),
        })),
    }),
    SeasonInput : Joi.object({
        name: Joi.string().min(3).max(50).required(),
        startDate: Joi.date(),
        endDate: Joi.date(),
        image: Joi.string(),
        description: Joi.string(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        colors: Joi.array().items(Joi.object({
            color: Joi.string(),
            index: Joi.number(),
        })),
    }),
    PromotionInput : Joi.object({
        name: Joi.string().min(3).max(50).required(),
        discount: Joi.number().required(),
        startDate: Joi.date(),
        endDate: Joi.date(),
        image: Joi.string(),
        description: Joi.string(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        colors: Joi.array().items(Joi.object({
            color: Joi.string(),
            index: Joi.number(),
        })),
    }),
    CategoryInput : Joi.object({
        name: Joi.string().min(3).max(50).required(),
        description: Joi.string(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        colors: Joi.array().items(Joi.object({
            color: Joi.string(),
            index: Joi.number(),
        })),
    }),
};