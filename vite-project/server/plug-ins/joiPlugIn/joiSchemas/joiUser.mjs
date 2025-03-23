import Joi from "joi";
import joiSubInputs from "./joiSubInputs.mjs";

export const userValidation = {
    UserInput: Joi.object({
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        isAdmin: Joi.boolean(),
        role: Joi.string(),
        storeRoles: Joi.array().items(Joi.link("#StoreRoleInput")),
        token: Joi.array().items(Joi.string()),
        providers: Joi.array().items(Joi.string()),
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
                deviceId: Joi.string(),
            }),
            location: Joi.object({
                lat: Joi.number(),
                long: Joi.number(),
                city: Joi.string(),
                country: Joi.string(),
            }),
        }),
        state: Joi.object({
            id: Joi.string(),
            createdAt: Joi.date(),
            updatedAt: Joi.date(),
        }),
        username: Joi.string().min(3).max(50),
        firstName: Joi.string().min(3).max(50),
        lastName: Joi.string().min(3).max(50),
        recommendationId: Joi.string(),
        currency: Joi.string(),
        emailBook: Joi.array().items(
            Joi.object({
                email: Joi.string(),
                type: Joi.string(),
            })
        ),
        phoneBook: Joi.array().items(
            Joi.object({
                phone: Joi.string(),
                type: Joi.string(),
            })
        ),
        device: Joi.array().items(
            Joi.object({
                type: Joi.string(),
                name: Joi.string(),
                id: Joi.string(),
                isAuthorized: Joi.boolean(),
            })
        ),
        password: Joi.string().min(8).max(50),
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
        profilePicture: Joi.array().items(
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
        addressBook: Joi.array().items(
            Joi.object({
                addressIndex: Joi.number(),
                name: Joi.string(),
                address1: Joi.string(),
                address2: Joi.string(),
                city: Joi.string(),
                state: Joi.string(),
                country: Joi.string(),
                zip: Joi.string(),
            })
        ),
        demographics: Joi.object({
            age: Joi.number(),
            birthdate: Joi.date(),
            language: Joi.string(),
            race: Joi.string(),
        }),
        darkmode: Joi.boolean(),
        colors: Joi.array().items(
            Joi.object({
                color: Joi.string(),
                index: Joi.number(),
            })
        ),
        photoAlbums: Joi.array().items(
            Joi.object({
                name: Joi.string(),
                description: Joi.string(),
                createdAt: Joi.date(),
                updatedAt: Joi.date(),
                photos: Joi.array().items(
                    Joi.object({
                        image: Joi.string(),
                        index: Joi.number(),
                    })
                ),
                index: Joi.number(),
            })
        ),
        subscriptions: Joi.array().items(
            Joi.object({
                id: Joi.string(),
                index: Joi.number(),
                type: Joi.string(),
            })
        ),
        subscribers: Joi.array().items(
            Joi.object({
                id: Joi.string(),
                index: Joi.number(),
                type: Joi.string(),
            })
        ),
        subscriptionProgram: Joi.array().items(
            Joi.object({
                subscription: Joi.string(),
                token: Joi.string(),
                points: Joi.number(),
                rewards: Joi.array().items(Joi.object({
                        reward: Joi.string(),
                        threshold: Joi.number(),
                        achieved: Joi.boolean(),
                        index: Joi.number(),
                    }),),
                discounts: Joi.number(),
                promoCodes: Joi.array().items(Joi.string()),
                renewalDate: Joi.date(),
                active: Joi.boolean(),
            })
        ),
        loyaltyProgram: Joi.array().items(
            Joi.object({
                subscription: Joi.array().items(Joi.string()),
                users: Joi.array().items(Joi.string()),
                stores: Joi.array().items(Joi.string()),
                wishlists: Joi.array().items(Joi.string()),
            })
        ),
        promoCode: Joi.array().items(
            Joi.object({
                code: Joi.string(),
                promotion: Joi.string(),
                discount: Joi.number(),
                products: Joi.array().items(Joi.string()),
                stores: Joi.array().items(Joi.string()),
                maxUses: Joi.number(),
                uses: Joi.number(),
            })
        ),
        lovedproducts: Joi.array().items(Joi.string()),
        wishlists: Joi.array().items(Joi.string()),
        recentlyViewed: Joi.array().items(Joi.string()),
        recommendations: Joi.array().items(Joi.string()),
        orders: Joi.array().items(Joi.string()),
        cart: Joi.string(),
        notifications: Joi.array().items(
            Joi.object({
                notification: Joi.string(),
                read: Joi.boolean(),
            })
        ),
        alerts: Joi.array().items(
            Joi.object({
                alert: Joi.string(),
                read: Joi.boolean(),
                subscribed: Joi.boolean(),
            })
        ),
        contents: Joi.array().items(
            Joi.object({
                content: Joi.string(),
                read: Joi.boolean(),
                subscribed: Joi.boolean(),
            })
        ),
        messages: Joi.array().items(
            Joi.array().items(
                Joi.object({
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
                    messages: Joi.object({
                        message: Joi.string(),
                        read: Joi.boolean(),
                        publishedAt: Joi.date(),
                    }),
                })
            )
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
        interests: Joi.array().items(
            Joi.object({
                keyword: Joi.array().items(Joi.string()),
                season: Joi.array().items(Joi.string()),
                promotion: Joi.array().items(Joi.string()),
                category: Joi.array().items(Joi.string()),
                store: Joi.array().items(Joi.string()),
            })
        ),
    }),
};
