const tdStore = `
  
type Store {
        id: ID!
        createdAt: Date
        updatedAt: Date
        isSuperStore: Boolean
        role: String
        active: Boolean
        analytics: [Analytics]
        visibility: Visibility
        token: [Token]
        providers: [UserProviders]
        session: [Session]
        state: [State]
        users: [User]
        admins: [User]
        owners: [User]
        permissions: [StorePermissions]
        password: String
        name: String
        description: String
        type: String
        category: [Category]
        subCategory: [Category]
        photoAlbums: [PhotoAlbum]
        recommendationId: [Recommendation]
        currency: String
        emailBook: [EmailBook]
        device: [Device]
        phoneBook: [PhoneBook]
        themes: [Themes]
        logos: [Logos]
        bannerImages: [BannerImages]
        profilePicture: [ProfilePicture]
        layouts: [LayoutList]
        addressBook: [Address]
        darkMode: Boolean
        colors: [ColorsIndex]
        subscriptions: [SubscriptionList]
        subscribers: [SubscriptionList]
        subscriptionProgram: [SubscriptionProgram]
        lovedProducts: [Product]
        wishlists: [Wishlist]
        recentlyViewed: [Product]
        recommendations: [Recommendation]
        orders: [Order]
        cart: UserCart
        reviews: [Review]
        reviewCount: Int
        reviewRating: Float
        products: [ProductList]
        notifications: [NotificationList]
        alerts: [AlertList]
        contents: [ContentList]
        conversations: [Conversations]
        messages: [MessageList]
        ownedMessages: [OwnedMessages]
        interests: [InterestType]
        shipping: [StoreShipping]
        loyaltyProgram: [LoyaltyProgram]
        promoCodes: [PromoCode]
    }

    type Analytics {
        totalRevenue: Float
        monthlyRevenue: Float
        totalOrders: Int
        conversionRate: Float
        visitorCount: Int
        averageOrderValue: Float
        totalProducts: Int
        totalCustomers: Int
        totalSubscribers: Int
    }

    type Visibility {
        isPublic: Boolean
        featured: Boolean
        seoKeywords: [String]
        seoDescription: String
    }

    type StorePermissions {
        defaultRoles: StorePermissionsDefault
        customRoles: [StorePermissionsCustom]
        userPermissions: [StorePermissionsUser]
    }

    type StorePermissionsDefault {
        admin: [String]
        superAdmin: [String]
        store: [String]
        user: [String]
        overlord: [String]
        superStore: [String]
    }

    type StorePermissionsCustom {
        roleName: String
        permissions: [String]
    }

    type StorePermissionsUser {
        userId: User
        permissions: [String]
    }

    type PhotoAlbum {       
        name: String
        description: String
        createdAt: Date
        updatedAt: Date
        photos: [PhotoAlbumPhotos]
        index: Int
    }

    input PhotoAlbumPhotos {
        photo: String
        index: Int
    }

    type OwnedMessages {
        alerts: [AlertsList]
        content: [ContentsList]
        notifications: [NotificationsList]
        messages: [MessagesList]
    }

    type InterestType {
        keyword: [Keyword],
        season: [Season],
        promotion: [Promotion],
        category: [Category],
        store: [Store],
    }
    
    type StoreShipping {
        methods: [String],
        estimatedDeliveryTime: [String],
        returnPolicy: String,
        shippingPolicy: String,
        addons: [String],
    }

    type SubscriptionProgram {
        subscription: AppSubscription
        token: Token
        points: Int
        rewards: [Product]
        discount: Number
        promocodes: [Token]
        renewalDate: Date
        active: Boolean
    }

    type LoyaltyProgram {
        subscription: [AppSubscription],
        users: [User],
        stores: [Store],
        wishlists: [Wishlist],
    }

    type PromoCode {
        code: Token,
        promotion: Promotion,
        discount: Float,
        products: [Product],
        stores: [Store],
        maxUses: Int,
        uses: Int,
    }

    type AlertsList {
        alert: UserAlert,
        index: Int,
    }

    type ContentsList {
        content: Content,
        index: Int,
    }

    type NotificationsList {
        notification: Notification,
        index: Int,
    }

    type MessagesList {
        message: Message,
        index: Int,
    }

        
    input StoreInput {
        id: ID
        createdAt: Date
        updatedAt: Date
        isSuperStore: Boolean
        role: String
        active: Boolean
        analytics: [AnalyticsInput]
        visibility: VisibilityInput
        token: [TokenInput]
        providers: [UserProvidersInput]
        session: [SessionInput]
        state: [StateInput]
        users: [ID]
        admins: [ID]
        owners: [ID]
        permissions: [StorePermissionsInput]
        name: String
        description: String
        type: String
        category: [ID]
        subCategory: [ID]
        photoAlbums: [PhotoAlbumInput]
        recommendationId: [ID]
        currency: String
        emailBook: [EmailBookInput]
        device: [DeviceInput]
        phone: [PhoneBookInput]
        password: String
        themes: [ThemesInput]
        logos: [LogosInput]
        bannerImages: [BannerImagesInput]
        profilePicture: [ProfilePictureInput]
        addressBook: [AddressInput]
        darkMode: Boolean
        colors: [ColorsIndexInput]
        subscriptions: [SubscriptionListInput]
        subscribers: [SubscriptionListInput]
        subscriptionProgram: [SubscriptionProgramInput]
        lovedProducts: [ID]
        wishlists: [ID]
        recentlyViewed: [ID]
        recommendations: [ID]
        orders: [ID]
        cart: ID
        reviews: [ID]
        reviewCount: Int
        reviewRating: Float
        products: [ProductListInput]
        ownedMessages: [OwnedMessagesInput]
        alerts: [AlertListInput]
        contents: [ContentListInput]
        conversations: [ConversationsInput]
        notifications: [NotificationListInput]
        messages: [MessageListInput]
        interests: [InterestTypeInput]
        shipping: [StoreShippingInput]
        loyaltyProgram: [LoyaltyProgramInput]
        promoCodes: [PromoCodeInput]
        }

    input AnalyticsInput {
        totalRevenue: Float
        monthlyRevenue: Float
        totalOrders: Int
        conversionRate: Float
        visitorCount: Int
        averageOrderValue: Float
        totalProducts: Int
        totalCustomers: Int
        totalSubscribers: Int
    }

    input VisibilityInput {
        isPublic: Boolean
        featured: Boolean
        seoKeywords: [String]
        seoDescription: String
    }

    input StorePermissionsInput {
        defaultRoles: StorePermissionsDefaultInput
        customRoles: [StorePermissionsCustomInput]
        userPermissions: [StorePermissionsUserInput]
    }

    input StorePermissionsDefaultInput {
        admin: [String]
        superAdmin: [String]
        store: [String]
        user: [String]
        overlord: [String]
        superStore: [String]
    }

    input StorePermissionsCustomInput {
        name: String
        permissions: [String]
    }

    input StorePermissionsUserInput {
        userId: ID
        permissions: [String]
    }

    input PhotoAlbumInput {       
        name: String
        description: String
        createdAt: Date
        updatedAt: Date
        photos: [PhotoAlbumPhotosInput]
        index: Int
    }

    input PhotoAlbumPhotosInput {
        photo: String
        index: Int
    }

    input OwnedMessagesInput {
        alerts: [AlertsListInput]
        content: [ContentsListInput]
        notifications: [NotificationsListInput]
        messages: [MessagesListInput]
    }

    input InterestTypeInput {
        keyword: [ID],
        season: [ID],
        promotion: [ID],
        category: [ID],
        store: [ID],
    }

    input StoreShippingInput {
        methods: [String],
        estimatedDeliveryTime: [String],
        returnPolicy: String,
        shippingPolicy: String,
        addons: [String],
    }

    input LoyaltyProgramInput {
        subscription: [SubscriptionInput],
        users: [ID],
        stores: [ID],
        wishlists: [ID],
    }

    input SubscriptionProgramInput {
        subscription: SubscriptionInput,
        token: TokenInput,
        points: Int,
        rewards: [ID],
        discount: Number,
        promocodes: [ID],
        renewalDate: Date,
        active: Boolean,
    }
    input PromoCodeInput {
        code: TokenInput,
        promotion: ID,
        discount: Float,
        products: [ID],
        stores: [ID],
        maxUses: Int,
        uses: Int,
    }

    input AlertsListInput {
        alert: ID,
        index: Int,
    }

    input ContentsListInput {
        content: ID,
        index: Int,
    }

    input NotificationsListInput {
        notification: ID,
        index: Int,
    }

    input MessagesListInput {
        message: ID,
        index: Int,
    }

    extend type Query {
        getStore(storeId: ID!): Store
    }

    extend type Mutation {
        createStore(store: StoreInput): Status
        updateStore(storeId: ID!, store: StoreInput): Status
        deleteStore(storeId: ID!): Status
    }

`;


export default tdStore;