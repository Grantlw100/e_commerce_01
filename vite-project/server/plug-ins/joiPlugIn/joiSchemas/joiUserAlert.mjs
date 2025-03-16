import Joi from 'joi';

export const userAlertValidation = {
    UserAlertInput: Joi.object({
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        deletedAt: Joi.date(),
        type: Joi.string(),
        title: Joi.string().min(3).max(100),
        text: Joi.string().min(3).max(4000),
        colors: Joi.object({
            color: Joi.string(),
            index: Joi.number()
        }),
        ownerId: Joi.string()
    }),
}