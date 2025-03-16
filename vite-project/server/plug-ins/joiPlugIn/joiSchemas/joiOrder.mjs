import Joi from 'joi';


export const orderValidation = {
   OrderInput: Joi.object({
       userId: Joi.string().required(),
       products: Joi.array().items(Joi.string()).required(),
       createdAt: Joi.date().required(),
       updatedAt: Joi.date(),
       orderDate: Joi.date().required(),
       orderStatus: Joi.string().required(),
       total: Joi.number().required(),
       subtTotal: Joi.number().required(),
       tax: Joi.array().items(Joi.object({
           code: Joi.string(),
           rate: Joi.number(),
           amount: Joi.number(),
       })),
       trackingNumber: Joi.string(),
       shippingDetails: Joi.object({
           arrivalDate: Joi.date(),
           shippedDate: Joi.date(),
           shippingMethod: Joi.string(),
           shippingCost: Joi.number(),
           address: Joi.string(),
           city: Joi.string(),
           state: Joi.string(),
           zip: Joi.string(),
       }),
   }),
    ShippingDetailsInput: Joi.object({
         arrivalDate: Joi.date(),
         shippedDate: Joi.date(),
         shippingMethod: Joi.string(),
         shippingCost: Joi.number(),
         address: Joi.string(),
         city: Joi.string(),
         state: Joi.string(),
         zip: Joi.string(),
    }),
    TaxInput: Joi.object({
        code: Joi.string(),
        rate: Joi.number(),
        amount: Joi.number(),
    }),
    DiscountInput: Joi.object({
        type: Joi.string(),
        amount: Joi.number(),
        code: Joi.string(),
        promotions: Joi.array().items(Joi.string()),
    }),
};