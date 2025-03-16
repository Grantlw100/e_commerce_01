// import Joi from '../../../node_modules/joi/lib/index.js';
import Joi from 'joi';

export const tokenValidation = {
    tokenInput: Joi.object({
        userId: Joi.string(),
        role: Joi.string(),
        pin: Joi.object({
            count: Joi.number().min(3).max(10),
            pin: Joi.string(),
            date: Joi.date()
        }),
        token: Joi.string(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        expiresAt: Joi.date(),
        valid: Joi.boolean(),
        revokedAt: Joi.date(),
        metadata: Joi.object({
            ip: Joi.string(),
            userAgent: Joi.string(),
            deviceType: Joi.string(),
            deviceId: Joi.string()
        }),
        location: Joi.object({
            lat: Joi.number(),
            long: Joi.number(),
            address: Joi.string(),
            City: Joi.string(),
            Country: Joi.string()
        })
    }),
    tokenMetadataInput: Joi.object({
        ip: Joi.string(),
        userAgent: Joi.string(),
        deviceType: Joi.string(),
        deviceId: Joi.string()
    }),
    tokenLocationInput: Joi.object({
        lat: Joi.number(),
        long: Joi.number(),
        address: Joi.string(),
        City: Joi.string(),
        Country: Joi.string()
    })
}
    
