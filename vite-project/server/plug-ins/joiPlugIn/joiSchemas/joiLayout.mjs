import Joi from "joi";
import joiSubInputs from "./joiSubInputs.mjs";

export const layoutValidation = {
    LayoutInput: Joi.object({
        createdAt: Joi.date().required(),
        updatedAt: Joi.date(),
        version: Joi.number(),
        permissions: Joi.array().items(Joi.string()),
        ownership: Joi.link("#OwnershipInput"),
        name: Joi.string().min(3).max(50).required(),
        description: Joi.string().min(3).max(50).required(),
        type: Joi.string().min(3).max(50).required(),
        structure: Joi.object(),
        components: Joi.array().items(
            Joi.object({
                type: Joi.string(),
                index: Joi.number(),
            })
        ),
        elements: Joi.array().items(
            Joi.object({
                type: Joi.string(),
                position: Joi.string(),
                index: Joi.number(),
                text: Joi.string(),
            })
        ),
        colors: Joi.array().items(
            Joi.object({
                color: Joi.string(),
                index: Joi.number(),
            })
        ),
        themes: Joi.array().items(
            Joi.object({
                theme: Joi.string(),
                index: Joi.number(),
                colors: Joi.array().items(
                    Joi.object({
                        color: Joi.string(),
                        index: Joi.number(),
                    })
                ),
            })
        ),
        logos: Joi.array().items(
            Joi.object({
                logo: Joi.string(),
                index: Joi.number(),
            })
        ),
        bannerImages: Joi.array().items(
            Joi.object({
                image: Joi.string(),
                index: Joi.number(),
            })
        ),
        layouts: Joi.array().items(
            Joi.object({
                layout: Joi.string(),
                index: Joi.number(),
            })
        ),
    }),
};
