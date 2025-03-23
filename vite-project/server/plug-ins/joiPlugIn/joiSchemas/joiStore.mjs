import Joi from "joi";
import joiSubInputs from "./joiSubInputs.mjs";

export const storeValidation = {
    StoreInput: Joi.object({
        // metadata
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        isSuperStore: Joi.boolean(),
        role: Joi.string(),
        active: Joi.boolean(),
        analytics: Joi.object({
            totalRevenue: Joi.number(),
            monthlyRevenue: Joi.number(),
            totalOrders: Joi.number(),
            conversionRate: Joi.number(),
            visitorCount: Joi.number(),
            averageOrderValue: Joi.number(),
            totalProducts: Joi.number(),
            totalCustomers: Joi.number(),
            totalSubscribers: Joi.number(),
        }),
        visibility: Joi.object({
            isPublic: Joi.boolean(),
            featured: Joi.boolean(),
            seoKeywords: Joi.array().items(Joi.string()),
            seoDescription: Joi.string(),
        }),
        // Auth
        token: Joi.array().items(Joi.string()),
        providers: Joi.array().items(
            Joi.object({
                provider: Joi.string(),
                providerId: Joi.string(),
                providerToken: Joi.string(),
                tokenExpiration: Joi.date(),
            })
        ),
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
        state: Joi.array().items(
            Joi.object({
                id: Joi.string(),
                createdAt: Joi.date(),
                updatedAt: Joi.date(),
            })
        ),
        users: Joi.array().items(Joi.string()),
        admins: Joi.array().items(Joi.string()),
        owners: Joi.array().items(Joi.string()),
        permissions: Joi.array().items(
            Joi.object({
                defaultRoles: Joi.object({
                    admin: Joi.array().items(Joi.string()),
                    superAdmin: Joi.array().items(Joi.string()),
                    store: Joi.array().items(Joi.string()),
                    user: Joi.array().items(Joi.string()),
                    overlord: Joi.array().items(Joi.string()),
                    superStore: Joi.array().items(Joi.string()),
                }),
                customRoles: Joi.object({
                    name: Joi.string(),
                    permissions: Joi.array().items(Joi.string()),
                }),
                userPermissions: Joi.object({
                    userId: Joi.string(),
                    permissions: Joi.array().items(Joi.string()),
                }),
            })
        ),
        password: Joi.string(),
        // Store Info
        name: Joi.string(),
        description: Joi.string(),
        type: Joi.string(),
        category: Joi.array().items(Joi.string()),
        subCategory: Joi.array().items(Joi.string()),
        photoAlbums: Joi.array().items(Joi.string()),
        layouts: Joi.array().items(
            Joi.object({
                layout: Joi.string(),
                index: Joi.number(),
            })
        ),
        recommnedationId: Joi.string(),
        currency: Joi.string(),
        emailBook: Joi.array().items(
            Joi.object({
                email: Joi.string(),
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
        phoneBook: Joi.array().items(
            Joi.object({
                phone: Joi.string(),
                type: Joi.string(),
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
        profilePictures: Joi.array().items(
            Joi.object({
                image: Joi.string(),
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
        darkMode: Joi.boolean(),
        colors: Joi.array().items(
            Joi.object({
                color: Joi.string(),
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
                    })),
                discounts: Joi.number(),
                promoCodes: Joi.array().items(Joi.string()),
                renewalDate: Joi.date(),
                active: Joi.boolean(),
            })
        ),
        lovedProducts: Joi.array().items(Joi.string()),
        wishlists: Joi.array().items(Joi.string()),
        recentlyViewed: Joi.array().items(Joi.string()),
        recommendations: Joi.array().items(Joi.string()),
        orders: Joi.array().items(Joi.string()),
        cart: Joi.string(),
        reviews: Joi.array().items(Joi.string()),
        reviewCount: Joi.number(),
        reviewRating: Joi.number(),
        products: Joi.array().items(
            Joi.object({
                product: Joi.string(),
                count: Joi.number(),
                index: Joi.number(),
            })
        ),
        stores: Joi.array().items(
            Joi.object({
                store: Joi.string(),
                index: Joi.number(),
            })
        ),
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
        conversations: Joi.array().items(
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
        ),
        ownership: Joi.array().items(
            Joi.object({
                ownerType: Joi.string().valid(
                    "user",
                    "store",
                    "admin",
                    "superadmin",
                    "subscription"
                ),
                ownerId: Joi.string(),
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
        orders: Joi.array().items(Joi.string()),
        shipping: Joi.object({
            methods: Joi.array().items(Joi.string()),
            estimatedDeliveryTime: Joi.array().items(Joi.string()),
            returnPolicy: Joi.string(),
            shippingPolicy: Joi.string(),
            addons: Joi.array().items(Joi.string()),
        }),
        loyaltyprogram: Joi.array().items(
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
    }),
};
