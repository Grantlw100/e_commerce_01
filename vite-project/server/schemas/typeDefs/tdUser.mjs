const tdUser = /*gql*/`

    type User {
        id: ID!
        createdAt: Date
        updatedAt: Date
        isAdmin: Boolean
        role: String
        storeRoles: [StoreRoles]
        token: [Token]
        providers: [UserProviders]
        session: [Session]
        state: [State]
        username: String
        firstName: String
        lastName: String
        recommendationId: [Recommendation]
        currency: String
        emailBook: [EmailBook]
        phoneBook: [PhoneBook]
        device: [Device]
        password: String
        themes: [Themes]
        logos: [Logos]
        bannerImages: [BannerImages]
        profilePicture: [ProfilePicture]
        layouts: [LayoutList]
        addressBook: [Address]
        demographics: Demographics
        photoAlbums: [PhotoAlbum]
        darkMode: Boolean
        colors: [ColorsIndex]
        subscriptions: [SubscriptionList]
        subscribers: [SubscriptionList]
        subscriptionPrograms: [SubscriptionProgram]
        loyaltyProgram: [LoyaltyProgram]
        promoCodes: [PromoCode]
        lovedProducts: [Product]
        wishlists: [Wishlist]
        recentlyViewed: [Product]
        recommendations: [Recommendation]
        orders: [Order]
        cart: UserCart
        notifications: [NotificationList]
        alerts: [AlertList]
        contents: [ContentList]
        conversations: [Conversations]
        ownedMessages: [OwnedMessages]
        interests: [InterestType]
    }

    type StoreRoles {
        storeId: ID
        role: String
        isAuthorized: Boolean
        permissions: [String]
        token: [Token]
        }

    type Session {
        id: ID!
        createdAt: Date
        updatedAt: Date
        destroyAt: Date
        timeout: Date
        duration: Number
        lastVisitedPage: String
        metadata: SessionMetadata
        location: UserLocation
    }

    type SessionMetadata {
        ip: String
        userAgent: String
        deviceType: String
        deviceId: String
    }

    type UserLocation {
        lat: Number
        long: Number
        City: String
        Country: String
    }

    type State {
        id: String
        createdAt: Date
        updatedAt: Date
    }

    type EmailBook {
        email: String
        emailType: String
    }
    
    type PhoneBook {
        phone: String
        phoneType: String
    }

    type Themes {
        theme: String
        index: Number
        colors: [ColorsIndex]
    }

    type Logos {
        logo: String
        index: Number
    }

    type BannerImages {
        image: String
        index: Number
    }

    type ProfilePicture {
        image: String
        index: Number
    }
    
    type Device {
        type: String
        name: String
        id: String
    }

    type Address {
        addressIndex: Number
        name: String
        address1: String
        address2: String
        city: String
        state: String
        country: String
        zip: String
    }

    type Demographics {
        age: Number
        birthdate: Date
        language: String
        race: String
    }

    type PhotoAlbum {
        name: String
        photos: [PhotoAlbumPhotos]
        index: Int
    }

    type PhotoAlbumPhotos {
        photo: String
        index: Int
    }

    type NotificationsList {
        notification: Notification
        read: Boolean
    }

    type AlertsList {
        userAlert: UserAlert
        read: Boolean
        subscribed: Boolean
    }

    type ContentsList {
        content: Content
        read: Boolean
        subscribed: Boolean
    }

    type UserProviders {
        provider: String
        providerId: String
        provderToken: String
        # May not need providerToken at all
        providerExiration: Date
    }

    type InterestType {
    keyword: [Keyword]
    category: [Category]
    season: [Season]
    promotion: [Promotion]
    store: [Store]
    }

    input UserInput {
        createdAt: Date
        updatedAt: Date
        isAdmin: Boolean
        role: String
        storeRoles: [StoreRolesInput]
        token: [ID]
        providers: [UserProvidersInput]
        session: [SessionInput]
        state: [StateInput]
        username: String
        firstName: String
        lastName: String
        recommendationId: [ID]
        currency: String
        emailBook: [EmailBookInput]
        device: [DeviceInput]
        phoneBook: [PhoneBookInput]
        password: String
        themes: [ThemesInput]
        logos: [LogosInput]
        bannerImages: [BannerImagesInput]
        profilePicture: [ProfilePictureInput]
        layouts: [LayoutListInput]
        addressBook: [AddressInput]
        demographics: DemographicsInput
        photoAlbums: [PhotoAlbumInput]
        darkMode: Boolean
        colors: [ColorsIndexInput]
        subscriptions: [SubscriptionListInput]
        subscribers: [SubscriptionListInput]
        subscriptionPrograms: [SubscriptionProgramInput]
        loyaltyProgram: [LoyaltyProgramInput]
        lovedProducts: [ID]
        wishlists: [ID]
        recentlyViewed: [ID]
        recommendations: [ID]
        orders: [ID]
        cart: UserCartInput
        notifications: [NotificationListInput]
        alerts: [AlertListInput]
        contents: [ContentListInput]        
        conversations: [ConversationsInput]
        ownedMessages: [OwnedMessagesInput]
        interests: [InterestTypeInput]
    }

    input StoreRolesInput {
        storeId: ID
        role: String
        isAuthorized: Boolean   
        permissions: [String]
        token: [ID]
    }

    input SessionInput {
        id: ID!
        createdAt: Date
        updatedAt: Date
        destroyAt: Date
        timeout: Date
        duration: Number
        lastVisitedPage: String
        metadata: SessionMetadataInput
        location: UserLocationInput
    }

    input SessionMetadataInput {
        ip: String
        userAgent: String
        deviceType: String
        deviceId: String
    }

    input UserLocationInput {
        lat: Number
        long: Number
        City: String
        Country: String
    }

    input StateInput {
        id: String
        createdAt: Date
        updatedAt: Date
    }

    input EmailBookInput {
        email: String
        emailType: String
    }

    input PhoneBookInput {
        phone: String
        phoneType: String
    }

    input ThemesInput {
        theme: String
        index: Number
        colors: [ColorsIndexInput]
    }

    input LogosInput {
        logo: String
        index: Number
    }

    input BannerImagesInput {
        image: String
        index: Number
    }

    input ProfilePictureInput {
        image: String
        index: Number
    }

    input DeviceInput {
        type: String
        name: String
    }

    input AddressInput {
        addressIndex: Number
        name: String
        address1: String
        address2: String
        city: String
        state: String
        country: String
        zip: String
    }

    input DemographicsInput {
        age: Number
        birthdate: Date
        language: String
        race: String
    }

    type PhotoAlbumInput {
        name: String
        description: String
        createdAt: Date
        updatedAt: Date
        photos: [PhotoAlbumPhotosInput]
        index: Int
    }

    type PhotoAlbumPhotosInput {
        photo: String
        index: Int
    }

    input SubscriptionInput {
        type: String
        status: String
        subscriptionId: String
    }

    input NotificationsListInput {
        notification: ID
        read: Boolean
    }

    input AlertsListInput {
        userAlert: ID
        read: Boolean
        subscribed: Boolean
    }

    input ContentsListInput {
        content: ID
        read: Boolean
        subscribed: Boolean
    }

    input UserProvidersInput {
        provider: String
        providerId: String
        provderToken: String
        # May not need providerToken at all
        providerExiration: Date
    }

    input InterestTypeInput {
        keyword: [ID]
        category: [ID]
        season: [ID]
        promotion: [ID]
        store: [ID]
    }

    extend type Query {
        getUser: [User]
    }

    extend type Mutation {
        createUser(user: UserInput): User
        updateUser(id: ID!, user: UserInput): User
        deleteUser(id: ID!): User
        
    }

`;

export default tdUser;



// getUserById(id: ID!): User
// getUserByEmail(email: String!): User
// getUserByPhone(phone: String!): User
// getFilteredUsers(role: String, before: Date, after: Date): [User!]!
// getUserSession(userId: ID!): [Session]
// getUserState(userId: ID!): [State]
// getUserDevices(userId: ID!): [Device]
// getUserAddress(userId: ID!): [Address]
// getUserDemographics(userId: ID!): Demographics
// getUserSubscriptions(userId: ID!): [Subscription]
// getUserSubscribers(userId: ID!): [User]
// getUserLovedProducts(userId: ID!): [Product]
// getUserWishlists(userId: ID!): [Wishlist]
// getUserRecentlyViewed(userId: ID!): [Product]
// getUserRecommendations(userId: ID!): [Recommendation]
// getUserOrders(userId: ID!): [Order]
// getUserCart(userId: ID!): UserCart
// getUserNotifications(userId: ID!): [Notification]
// getUserContents(userId: ID!): [Content]
// getUserInterests(userId: ID!): [String]
// getUsersByProductInCart(productId: ID!): [User]

//loginUser(email: String, username: String, phone: String, password: String!): User
// logoutUser(userId: ID!): User
// changePassword(userId: ID!, oldPassword: String!, newPassword: String!): User
// changeTheme(userId: ID!, darkMode: Boolean): User
// createUserSession(userId: ID!, session: SessionInput): Session
// updateUserSession(userId: ID!, sessionId: ID!, session: SessionInput): Session
// deleteUserSession(userId: ID!, sessionId: ID!): Session
// createUserState(userId: ID!, state: StateInput): State
// updateUserState(userId: ID!, stateId: ID!, state: StateInput): State
// deleteUserState(userId: ID!, stateId: ID!): State
// createUserDevice(userId: ID!, device: DeviceInput): Device
// updateUserDevice(userId: ID!, deviceId: ID!, device: DeviceInput): Device
// deleteUserDevice(userId: ID!, deviceId: ID!): Device
// createUserAddress(userId: ID!, address: AddressInput): Address
// updateUserAddress(userId: ID!, addressIndex: Number!, address: AddressInput): Address
// deleteUserAddress(userId: ID!, addressIndex: Number!): Address
// createUserDemographics(userId: ID!, demographics: DemographicsInput): Demographics
// updateUserDemographics(userId: ID!, demographics: DemographicsInput): Demographics
// deleteUserDemographics(userId: ID!): Demographics
// createUserSubscription(userId: ID!, subscription: SubscriptionInput): Subscription
// updateUserSubscription(userId: ID!, subscriptionId: ID!, subscription: SubscriptionInput): Subscription
// deleteUserSubscription(userId: ID!, subscriptionId: ID!): Subscription
// createUserSubscriber(userId: ID!, subscriberId: ID!): User
// deleteUserSubscriber(userId: ID!, subscriberId: ID!): User
// createUserLovedProduct(userId: ID!, productId: ID!): Product
// deleteUserLovedProduct(userId: ID!, productId: ID!): Product
// createUserWishlist(userId: ID!, wishlistId: ID!): Wishlist
// deleteUserWishlist(userId: ID!, wishlistId: ID!): Wishlist
// createUserRecentlyViewed(userId: ID!, productId: ID!): Product
// deleteUserRecentlyViewed(userId: ID!, productId: ID!): Product
// createUserRecommendation(userId: ID!, recommendationId: ID!): Recommendation
// deleteUserRecommendation(userId: ID!, recommendationId: ID!): Recommendation
// createUserOrder(userId: ID!, orderId: ID!): Order
// deleteUserOrder(userId: ID!, orderId: ID!): Order