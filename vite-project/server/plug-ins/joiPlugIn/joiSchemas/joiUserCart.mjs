import Joi from "joi";
import joiSubInputs from "./joiSubInputs.mjs";

export const userCartValidation = {
    UserCartInput: Joi.object({
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        abandonedAt: Joi.date(),
        abaondoned: Joi.boolean(),
        orderedAt: Joi.date(),
        abandonedAt: Joi.date(),
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
        products: Joi.array().items(
            Joi.object({
                product: Joi.string(),
                count: Joi.number(),
                index: Joi.number(),
            })
        ),
        total: Joi.number(),
    }),
};
