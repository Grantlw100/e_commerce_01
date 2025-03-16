const tdUser = /*gql*/`

    type User {
        id: ID!
        createdAt: Date
        updatedAt: Date
        isAdmin: Boolean
        role: String
        token: [Token]
        providers: [UserProviders]
        session: [Session]
        state: [State]
        username: String
        firstName: String
        lastName: String
        recommendationId: [Recommendation]
        currency: String
        email: String
        device: [Device]
        phone: [String]
        password: String
        profilePicture: String
        addressBook: [Address]
        demographics: Demographics
        darkMode: Boolean
        colors: [ColorsIndex]
        subscriptions: [Subscription]
        subscribers: [User]
        lovedProducts: [Product]
        wishlists: [Wishlist]
        recentlyViewed: [Product]
        recommendations: [Recommendation]
        orders: [Order]
        cart: UserCart
        notifications: [Notifications]
        alerts: [UserAlert]
        contents: [Contents]
        interests: [String]
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

    type Subscription {
        type: String
        status: String
        subscriptionId: String
    }

    type Notifications {
        notification: Notification
        read: Boolean
    }

    type Alerts {
        userAlert: UserAlert
        read: Boolean
        subscribed: Boolean
    }

    type Contents {
        userContent: Content
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

    input UserInput {
        createdAt: Date
        updatedAt: Date
        isAdmin: Boolean
        role: String
        token: [TokenInput]
        providers: [UserProvidersInput]
        session: [SessionInput]
        state: [StateInput]
        username: String
        firstName: String
        lastName: String
        recommendationId: [ID]
        currency: String
        email: String
        devices: [DeviceInput]
        phone: [String]
        password: String
        profilePicture: String
        addressBook: [AddressInput]
        demographics: DemographicsInput
        darkMode: Boolean
        colors: [ColorsIndexInput]
        subscriptions: [SubscriptionInput]
        subscribers: [ID]
        lovedProducts: [ID]
        wishlists: [ID]
        recentlyViewed: [ID]
        recommendations: [ID]
        orders: [ID]
        cart: UserCartInput
        notifications: [ID]
        alerts: [ID]
        contents: [ID]
        interests: [String]
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

    input SubscriptionInput {
        type: String
        status: String
        subscriptionId: String
    }

    input NotificationsInput {
        notification: ID
        read: Boolean
    }

    input AlertsInput {
        userAlert: ID
        read: Boolean
        subscribed: Boolean
    }

    input ContentsInput {
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

    type Query {
        getUsers(userId: [ID]!): [User]
        getUserById(id: ID!): User
        getUserByEmail(email: String!): User
        getUserByPhone(phone: String!): User
        getFilteredUsers(role: String, before: Date, after: Date): [User!]!
        getUserSession(userId: ID!): [Session]
        getUserState(userId: ID!): [State]
        getUserDevices(userId: ID!): [Device]
        getUserAddress(userId: ID!): [Address]
        getUserDemographics(userId: ID!): Demographics
        getUserSubscriptions(userId: ID!): [Subscription]
        getUserSubscribers(userId: ID!): [User]
        getUserLovedProducts(userId: ID!): [Product]
        getUserWishlists(userId: ID!): [Wishlist]
        getUserRecentlyViewed(userId: ID!): [Product]
        getUserRecommendations(userId: ID!): [Recommendation]
        getUserOrders(userId: ID!): [Order]
        getUserCart(userId: ID!): UserCart
        getUserNotifications(userId: ID!): [Notifications]
        getUserContents(userId: ID!): [Contents]
        getUserInterests(userId: ID!): [String]
        getUsersByProductInCart(productId: ID!): [User]
    }

    type Mutation {
        createUser(user: UserInput): User
        updateUser(id: ID!, user: UserInput): User
        deleteUser(id: ID!): User
        loginUser(email: String, username: String, phone: String, password: String!): User
        logoutUser(userId: ID!): User
        changePassword(userId: ID!, oldPassword: String!, newPassword: String!): User
        changeTheme(userId: ID!, darkMode: Boolean): User
        createUserSession(userId: ID!, session: SessionInput): Session
        updateUserSession(userId: ID!, sessionId: ID!, session: SessionInput): Session
        deleteUserSession(userId: ID!, sessionId: ID!): Session
        createUserState(userId: ID!, state: StateInput): State
        updateUserState(userId: ID!, stateId: ID!, state: StateInput): State
        deleteUserState(userId: ID!, stateId: ID!): State
        createUserDevice(userId: ID!, device: DeviceInput): Device
        updateUserDevice(userId: ID!, deviceId: ID!, device: DeviceInput): Device
        deleteUserDevice(userId: ID!, deviceId: ID!): Device
        createUserAddress(userId: ID!, address: AddressInput): Address
        updateUserAddress(userId: ID!, addressIndex: Number!, address: AddressInput): Address
        deleteUserAddress(userId: ID!, addressIndex: Number!): Address
        createUserDemographics(userId: ID!, demographics: DemographicsInput): Demographics
        updateUserDemographics(userId: ID!, demographics: DemographicsInput): Demographics
        deleteUserDemographics(userId: ID!): Demographics
        createUserSubscription(userId: ID!, subscription: SubscriptionInput): Subscription
        updateUserSubscription(userId: ID!, subscriptionId: ID!, subscription: SubscriptionInput): Subscription
        deleteUserSubscription(userId: ID!, subscriptionId: ID!): Subscription
        createUserSubscriber(userId: ID!, subscriberId: ID!): User
        deleteUserSubscriber(userId: ID!, subscriberId: ID!): User
        createUserLovedProduct(userId: ID!, productId: ID!): Product
        deleteUserLovedProduct(userId: ID!, productId: ID!): Product
        createUserWishlist(userId: ID!, wishlistId: ID!): Wishlist
        deleteUserWishlist(userId: ID!, wishlistId: ID!): Wishlist
        createUserRecentlyViewed(userId: ID!, productId: ID!): Product
        deleteUserRecentlyViewed(userId: ID!, productId: ID!): Product
        createUserRecommendation(userId: ID!, recommendationId: ID!): Recommendation
        deleteUserRecommendation(userId: ID!, recommendationId: ID!): Recommendation
        createUserOrder(userId: ID!, orderId: ID!): Order
        deleteUserOrder(userId: ID!, orderId: ID!): Order
    }

`;

export default tdUser;