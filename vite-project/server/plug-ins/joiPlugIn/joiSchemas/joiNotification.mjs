import Joi from 'joi';

export const notificationValidation = {
    NotificationInput: Joi.object({
        type: Joi.string().min(3).max(50).required(),
        createdAt: Joi.date().required(),
        updatedAt: Joi.date(),
        title: Joi.string().min(3).max(50).required(),
        text: Joi.string().min(3).max(2000).required(),
        colors: Joi.array().items(Joi.object({
            color: Joi.string(),
            index: Joi.number(),
        })),
        ownerId: Joi.string(),
    }),
};