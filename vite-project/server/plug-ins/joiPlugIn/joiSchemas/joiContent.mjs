import Joi from 'joi';

export const contentValidation = {
    ContentInput: Joi.object({
        title: Joi.string().min(3).max(50).required(),
        type: Joi.string().min(3).max(50).required(),
        content: Joi.string().min(3).max(2000).required(),
        createdAt: Joi.date().required(),
        updatedAt: Joi.date(),
        expiredAt: Joi.date(),
        version: Joi.number(),
        status: Joi.boolean(),
        publishAt: Joi.date(),
        images: Joi.array().items(Joi.object({
            image: Joi.string(),
            index: Joi.number(),
        })),
        elements: Joi.array().items(Joi.object({
            position: Joi.string(),
            index: Joi.number(),
            text: Joi.string(),
        })),
        colors: Joi.array().items(Joi.object({
            color: Joi.string(),
            index: Joi.number(),
        })),
        ownerId: Joi.string(),
    }),
    ContentElementsInput: Joi.object({
        position: Joi.string(),
        index: Joi.number(),
        text: Joi.string(),
    }),
    ContentImagesInput: Joi.object({
        image: Joi.string(),
        index: Joi.number(),
    }),
};