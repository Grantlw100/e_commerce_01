import Joi from "joi";
import joiSubInputs from "./joiSubInputs.mjs";

export const orderValidation = {
    OrderInput: Joi.object({
        createdAt: Joi.date().required(),
        updatedAt: Joi.date(),
        orderedAt: Joi.date().required(),
        orderStatus: Joi.string().required(),
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
        orderedFrom: Joi.array().items(
            Joi.object({
                storeId: Joi.string(),
                products: Joi.array().items(Joi.string()),
            })
        ),
        products: Joi.array().items(
            Joi.object({
                product: Joi.string(),
                count: Joi.number(),
                index: Joi.number(),
            })
        ),
        total: Joi.number().required(),
        subtTotal: Joi.number().required(),
        tax: Joi.array().items(
            Joi.object({
                code: Joi.string(),
                rate: Joi.number(),
                amount: Joi.number(),
            })
        ),
        discounts: Joi.array().items(
            Joi.object({
                type: Joi.string(),
                amount: Joi.number(),
                code: Joi.string(),
                promotions: Joi.array().items(Joi.string()),
            })
        ),
        trackingNumber: Joi.string(),
        shippingDetails: Joi.object({
            arrivalDate: Joi.date(),
            shippedDate: Joi.date(),
            shippingMethod: Joi.string(),
            shippingCost: Joi.number(),
            address1: Joi.string(),
            address2: Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
            zip: Joi.string(),
        }),
    }),
};
