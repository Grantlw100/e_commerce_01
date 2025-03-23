import Joi from "joi";

export const settingsValidation = {
    SettingsInput: Joi.object({
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        darkMode: Joi.boolean(),
        notifications: Joi.object(),
        language: Joi.string(),
        currency: Joi.string(),
        preferences: Joi.array().items(Joi.string()),
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
