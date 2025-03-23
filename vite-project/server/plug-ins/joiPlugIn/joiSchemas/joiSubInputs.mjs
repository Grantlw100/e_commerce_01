import Joi from "joi";

const SubInputValidation = Joi.object({
    // STORE SPECIFIC INPUTS
    AnalyticsInput: Joi.object({
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
    VisibilityInput: Joi.object({
        isPublic: Joi.boolean(),
        featured: Joi.boolean(),
        seoKeywords: Joi.array().items(Joi.string()),
        seoDescription: Joi.string(),
    }),
    StorePermissionsInput: Joi.object({
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
    }),
    StorePermissionsDefaultInput: Joi.object({
        admin: Joi.array().items(Joi.string()),
        superAdmin: Joi.array().items(Joi.string()),
        store: Joi.array().items(Joi.string()),
        user: Joi.array().items(Joi.string()),
        overlord: Joi.array().items(Joi.string()),
        superStore: Joi.array().items(Joi.string()),
    }),
    StoreShippingInput: Joi.object({
        methods: Joi.array().items(Joi.string()),
        estimatedDeliveryTime: Joi.array().items(Joi.string()),
        returnPolicy: Joi.string(),
        shippingPolicy: Joi.string(),
        addons: Joi.array().items(Joi.string()),
    }),
    StoreRolesInput: Joi.object({
        storeId: Joi.string(),
        role: Joi.string(),
        isAuthorized: Joi.boolean(),
        permissions: Joi.array().items(Joi.string()),
        token: Joi.array().items(Joi.string()),
    }),

    // UI && LAYOUT SPECIFIC INPUTS
    ContentElementsInput: Joi.object({
        type: Joi.string(),
        position: Joi.string(),
        index: Joi.number(),
        text: Joi.string(),
    }),
    ColorsIndexInput: Joi.object({
        color: Joi.string(),
        index: Joi.number(),
    }),
    ComponentListInput: Joi.object({
        type: Joi.string(),
        index: Joi.number(),
    }),

    // IMAGES && DECORATION SPECIFIC INPUTS
    ImageIndexInput: Joi.object({
        image: Joi.string(),
        index: Joi.number(),
    }),
    PhotoAlbumInput: Joi.object({
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
    }),
    ThemesInput: Joi.object({
        theme: Joi.string(),
        index: Joi.number(),
        colors: Joi.array().items(
            Joi.object({
                color: Joi.string(),
                index: Joi.number(),
            })
        ),
    }),
    ProviderInput: Joi.object({
        provider: Joi.string(),
        providerId: Joi.string(),
        providerToken: Joi.string(),
        tokenExpiration: Joi.date(),
    }),
    LogosInput: Joi.object({
        logo: Joi.string(),
        index: Joi.number(),
    }),
    BannerImagesInput: Joi.object({
        image: Joi.string(),
        index: Joi.number(),
    }),
    ProfilePicturesInput: Joi.object({
        image: Joi.string(),
        index: Joi.number(),
    }),

    // USER ALERTS && NOTIFICATIONS SPECIFIC INPUTS
    LanguageTranslationInput: Joi.object({
        originalLanguage: Joi.string(),
        translatedLanguage: Joi.string(),
    }),
    StoreListInput: Joi.object({
        store: Joi.string(),
        index: Joi.number(),
    }),
    ProductsListInput: Joi.object({
        product: Joi.string(),
        count: Joi.number(),
        index: Joi.number(),
    }),
    LayoutListInput: Joi.object({
        layout: Joi.string(),
        index: Joi.number(),
    }),
    ConversationsInput: Joi.object({
        conversationWith: Joi.object({
            ownerType: Joi.string(),
            ownerId: Joi.string(),
        }),
        messages: Joi.object({
            message: Joi.string(),
            read: Joi.boolean(),
            publishedAt: Joi.date(),
        }),
    }),
    MessageListInput: Joi.object({
        message: Joi.string(),
        read: Joi.boolean(),
        publishedAt: Joi.date(),
    }),
    NotificationListInput: Joi.object({
        notification: Joi.string(),
        read: Joi.boolean(),
    }),
    ContentListInput: Joi.object({
        content: Joi.string(),
        read: Joi.boolean(),
        subscribed: Joi.boolean(),
    }),
    AlertListInput: Joi.object({
        alert: Joi.string(),
        read: Joi.boolean(),
        subscribed: Joi.boolean(),
    }),
    AlertsListInput: Joi.object({
        alert: Joi.string(),
        index: Joi.number(),
    }),
    NotificationsListInput: Joi.object({
        notification: Joi.string(),
        index: Joi.number(),
    }),
    ContentsListInput: Joi.object({
        content: Joi.string(),
        index: Joi.number(),
    }),
    MessagesListInput: Joi.object({
        message: Joi.string(),
        index: Joi.number(),
    }),
    OwnedMessageInput: Joi.object({
        alerts: Joi.array().items(Joi.string()),
        notifications: Joi.array().items(Joi.string()),
        content: Joi.array().items(Joi.string()),
        layouts: Joi.array().items(Joi.string()),
    }),

    // SUBSCRIPTION && PAYMENT SPECIFIC INPUTS
    LoyaltyProgramInput: Joi.object({
        subscription: Joi.array().items(Joi.string()),
        users: Joi.array().items(Joi.string()),
        stores: Joi.array().items(Joi.string()),
        wishlists: Joi.array().items(Joi.string()),
    }),
    PromoCodeInput: Joi.object({
        code: Joi.string(),
        promotion: Joi.string(),
        discount: Joi.number(),
        products: Joi.array().items(Joi.string()),
        stores: Joi.array().items(Joi.string()),
        maxUses: Joi.number(),
        uses: Joi.number(),
    }),
    SubscriptionsListInput: Joi.object({
        id: Joi.string(),
        index: Joi.number(),
        type: Joi.string(),
    }),
    DiscountTierInput: Joi.object({
        minPoints: Joi.number(),
        discountPercent: Joi.number(),
        discountCode: Joi.string(),
        expiresAt: Joi.date(),
        index: Joi.number(),
    }),
    RewardInput: Joi.object({
        reward: Joi.string(),
        threshold: Joi.number(),
        achieved: Joi.boolean(),
        index: Joi.number(),
    }),
    CancellationInput: Joi.object({
        reason: Joi.string(),
        refundStatus: Joi.string(),
    }),
    SubscriptionProgramInput: Joi.object({
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
    }),
    // USER && OWNER && INFORMATION SPECIFIC INPUTS
    OwnershipInput: Joi.object({
        ownerType: Joi.string().valid(
            "user",
            "store",
            "admin",
            "superadmin",
            "subscription"
        ),
        ownerId: Joi.string(),
    }),
    UserInteractionInput: Joi.object({
        lovedCount: Joi.number(),
        cartCount: Joi.number(),
        wishlistCount: Joi.number(),
        viewedCount: Joi.number(),
    }),
    EmailBookInput: Joi.object({
        email: Joi.string(),
        type: Joi.string(),
    }),
    PhoneBookInput: Joi.object({
        phone: Joi.string(),
        type: Joi.string(),
    }),
    InterestTypeInput: Joi.object({
        keyword: Joi.array().items(Joi.string()),
        season: Joi.array().items(Joi.string()),
        promotion: Joi.array().items(Joi.string()),
        category: Joi.array().items(Joi.string()),
        store: Joi.array().items(Joi.string()),
    }),
    DeviceInput: Joi.object({
        type: Joi.string(),
        name: Joi.string(),
        id: Joi.string(),
        isAuthorized: Joi.boolean(),
    }),
    UserLocationInput: Joi.object({
        lat: Joi.number(),
        long: Joi.number(),
        City: Joi.string(),
        Country: Joi.string(),
    }),
    AddressInput: Joi.object({
        addressIndex: Joi.number(),
        name: Joi.string(),
        address1: Joi.string(),
        address2: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        country: Joi.string(),
        zip: Joi.string(),
    }),
    DemographicsInput: Joi.object({
        age: Joi.number(),
        birthdate: Joi.date(),
        language: Joi.string(),
        race: Joi.string(),
    }),

    // META DATA SPECIFIC INPUTS
    SessionMetadataInput: Joi.object({
        ip: Joi.string(),
        userAgent: Joi.string(),
        deviceType: Joi.string(),
        deviceId: Joi.string(),
    }),
    StateInput: Joi.object({
        id: Joi.string(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
    }),

    // Token Specific Inputs

    TokenPinInput: Joi.object({
        count: Joi.number(),
        pin: Joi.string(),
        updatedAt: Joi.date(),
    }),
    TokenMetadataInput: Joi.object({
        ip: Joi.string(),
        userAgent: Joi.string(),
        deviceType: Joi.string(),
        deviceId: Joi.string(),
    }),
    TokenLocationInput: Joi.object({
        lat: Joi.number(),
        long: Joi.number(),
        city: Joi.string(),
        country: Joi.string(),
    }),

    // ORDER SPECIFIC INPUTS
    ShippingDetailsInput: Joi.object({
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
    OrderDiscountInput: Joi.object({
        type: Joi.string(),
        amount: Joi.number(),
        token: Joi.string(),
        promotions: Joi.array().items(Joi.string()),
    }),
    OrderedFromInput: Joi.object({
        storeId: Joi.string(),
        products: Joi.array().items(Joi.string()),
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

    // PRODUCT SPECIFIC INPUTS
    DimensionsInput: Joi.object({
        length: Joi.number(),
        width: Joi.number(),
        height: Joi.number(),
        size: Joi.string(),
    }),
    InventoryInput: Joi.object({
        stock: Joi.number(),
        reserverd: Joi.number(),
        sold: Joi.number(),
        restockThreshold: Joi.number(),
        lastRestocked: Joi.date(),
        restockActive: Joi.boolean(),
    }),

    // EVENT SPECIFIC INPUTS
    ActionInput: Joi.object({
        action: Joi.string().required(),
        trigger: Joi.string().required(),
        responseType: Joi.string().required(),
        response: Joi.string().required(),
        index: Joi.number().required(),
    }),
    TriggerInput: Joi.object({
        event: Joi.string().required(),
        sourceId: Joi.string().required(),
        sourceType: Joi.string().required(),
        action: Joi.string().required(),
    }),
});

export default SubInputValidation;
