import Joi from 'joi';

const EventValidation = Joi.object({
    EventInput : Joi.object({
        type: Joi.string().required(),
        createdAt: Joi.date().required(),
        updatedAt: Joi.date(),
        publishedAt: Joi.date(),
        startDate: Joi.date(),
        endDate: Joi.date(),
        languages: Joi.array().items(
            Joi.object({
                originalLanguage: Joi.string(),
                translatedLanguage: Joi.string(),
            })
        ),
        ownership: Joi.object({
            ownerType: Joi.string().valid(
                "user",
                "store",
                "admin",
                "superadmin",
                "wishlist"
            ),
            ownerId: Joi.string(),
        }),
        status: Joi.string().valid(
            "active",
            "inactive",
            "expired",
            "draft",
            "pending publish date"
        ),
        actions: Joi.array().items(
            Joi.object({
                action: Joi.string(),
                trigger: Joi.string(),
                responseType: Joi.string(),
                response: Joi.string(),
                index: Joi.number(),
            })
        ),
        ownedMessages: Joi.array().items(
            Joi.object({
                alerts: Joi.array().items(Joi.object({
                    alert: Joi.string(),
                    index: Joi.number(),
                })),
                content: Joi.array().items(Joi.object({
                    content: Joi.string(),
                    index: Joi.number(),
                })),
                notifications: Joi.array().items(Joi.object({
                    notification: Joi.string(),
                    index: Joi.number(),
                })),
                messages: Joi.array().items(Joi.object({
                    message: Joi.string(),
                    index: Joi.number(),
                })),
            })
        ),
    }),
});

export default EventValidation;