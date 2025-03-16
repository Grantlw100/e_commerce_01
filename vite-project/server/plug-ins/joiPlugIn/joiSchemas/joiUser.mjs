import Joi from 'joi';

export const userValidation = {
    UserInput: Joi.object({
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        isAdmin: Joi.boolean(),
        role: Joi.string(),
        token: Joi.array().items(Joi.string()),
        session: Joi.object({
            id: Joi.string(),
            createdAt: Joi.date(),
            updatedAt: Joi.date(),
            destroyAt: Joi.date(),
            timeout: Joi.date(),
            duration: Joi.number(),
            lastVisitedPage: Joi.string(),
            metadata: Joi.object({
                ip: Joi.string(),
                userAgent: Joi.string(),
                deviceType: Joi.string(),
                deviceId: Joi.string()
            }),
            location: Joi.object({
                lat: Joi.number(),
                long: Joi.number(),
                City: Joi.string(),
                Country: Joi.string()
            })
        }),
        state: Joi.object({
            id: Joi.string(),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        }),
        username: Joi.string().min(3).max(50),
        firstName: Joi.string().min(3).max(50),
        lastName: Joi.string().min(3).max(50),
        recommendationId: Joi.string(),
        email: Joi.string().email(),
        device: Joi.object({
            type: Joi.string(),
            name: Joi.string(),
            id: Joi.string()
        }),
        phone: Joi.string().regex(/^[0-9]{10}$/),
        password: Joi.string().min(8).max(50),
        profilePicture: Joi.string(),
        addressBook: Joi.object({
            addressIndex: Joi.number(),
            name: Joi.string(),
            address1: Joi.string(),
            address2: Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
            country: Joi.string(),
            zip: Joi.string(),
        }),
        demographics: Joi.object({
            age: Joi.number(),
            birthdate: Joi.date(),
            language: Joi.string(),
            race: Joi.string()
        }),
        darkmode: Joi.boolean(),
        colors: Joi.object({
            color: Joi.string(),
            index: Joi.number()
        }),
        subscriptions: Joi.object({
            type: Joi.string(),
            status: Joi.string(),
            subscriptionId: Joi.string()
        }),
        notifications: Joi.object({
            notification: Joi.string(),
            read: Joi.boolean(),
        }),
        alerts: Joi.object({
            userAlert: Joi.string(),
            read: Joi.boolean(),
            subscribed: Joi.boolean()
        }),
        contents: Joi.object({
            userContent: Joi.string(),
            read: Joi.boolean(),
            subscribed: Joi.boolean()
        }),
    }),
    SessionMetadataInput: Joi.object({
        ip: Joi.string(),
        userAgent: Joi.string(),
        deviceType: Joi.string(),
        deviceId: Joi.string()
    }),
    UserLocationInput: Joi.object({
        lat: Joi.number(),
        long: Joi.number(),
        City: Joi.string(),
        Country: Joi.string()
    }),
    StateInput: Joi.object({
        id: Joi.string(),
        createdAt: Joi.date(),
        updatedAt: Joi.date()
    }),
    DeviceInput: Joi.object({
        type: Joi.string(),
        name: Joi.string()
    }),
    AddressInput: Joi.object({
        addressIndex: Joi.number(),
        name: Joi.string(),
        address1: Joi.string(),
        address2: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        country: Joi.string(),
        zip: Joi.string()
    }),
    DemographicsInput: Joi.object({
        age: Joi.number(),
        birthdate: Joi.date(),
        language: Joi.string(),
        race: Joi.string()
    }),
    SubscriptionInput: Joi.object({
        type: Joi.string(),
        status: Joi.string(),
        subscriptionId: Joi.string()
    }),
    NotificationsInput: Joi.object({
        notification: Joi.string(),
        read: Joi.boolean()
    }),
    AlertsInput: Joi.object({
        userAlert: Joi.string(),
        read: Joi.boolean(),
        subscribed: Joi.boolean()
    }),
    ContentsInput: Joi.object({
        userContent: Joi.string(),
        read: Joi.boolean(),
        subscribed: Joi.boolean()
    }),
}
